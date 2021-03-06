const mailgun = require("mailgun-js")({
  //mailgun 모듈
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
  host: process.env.MAILGUN_HOST,
});
const redis = require("redis");
const redisClient = redis.createClient();

const { MailForm } = require("../models");
const path = require("path");
const crypto = require("crypto");

const sendUserResult = (io, user, error) => {
  // 메일 보내는 것 성공여부에 관계없이 결과를 프론트에 던져준다.
  const toClient = {
    user,
    isError: error,
  };
  io.emit("list-add", toClient);
};

const reSend = async (req, res) => {
  const { key } = req.body;
  const io = req.app.get("socketio");
  redisClient.get(key, (error, data) => {
    if (error || data === null) {
      return res.status(500).send("레디스 데이터 가져오지 못함");
    }
    res.sendStatus(200);
    const mailgunPromises = JSON.parse(data).map((data) => {
      return mailgun
        .messages()
        .send(data)
        .then(() => sendUserResult(io, data.to, false))
        .catch(() => {
          sendUserResult(io, data.to, true);
          return data;
        });
    });

    Promise.all(mailgunPromises).then((failList) => {
      redisClient.set(key, JSON.stringify(failList.filter(Boolean)));
    });
  });
};

/**
 * 지원자들 리스트를 받아서 그냥 메일을 쭈욱 보낸다.
 * TODO: 보낸 결과를 io.emit으로 전송한다.
 *
 * POST /api/email/send
 * body:
 * {
 *   "type": "meeting",
 *   "users": [
 *     { "name": "Alice", "email": "alice@nomail.com", "isPass": true, ... },
 *     { "name": "Bob", "email": "bob@nomail.com", "isPass": false, ... },
 *     ...
 *   ]
 * }
 */
const send = async (req, res) => {
  const mailforms = await MailForm.scope({ method: ["whereType", req.body.type] }, "passedFirst").findAll();
  const io = req.app.get("socketio");
  if (mailforms.length !== 2 || mailforms[0].pass !== true || mailforms[1].pass !== false) {
    res.sendStatus(422);
    return;
  }

  res.sendStatus(200);
  console.log("메일 전송 시작");
  const mailgunPromises = req.body.users
    .map((user) => {
      const mailform = user.pass ? mailforms[0] : mailforms[1];
      console.log(mailform.title);
      return {
        from: "YAPP <no-reply@yapp.co.kr>",
        to: user.email,
        subject: mailform.title,
        html: `<html>
          <img src="cid:${mailform.header_image}" width="750px" height="150px">
          <p>${mailform.contents.replace(/\[name\]/g, user.name).replace(/\[meetingTime\]/g, user.meetingTime)}</p>
          </html>`,
        inline: path.join(__dirname, "../public/", mailform.header_image),
        attachment: user.pass && path.join(__dirname, "../public/", mailform.map_image),
      };
    })
    .map((data) => {
      return mailgun
        .messages()
        .send(data)
        .then(() => sendUserResult(io, data.to, false))
        .catch(() => {
          sendUserResult(io, data.to, true);
          return data;
        });
    });

  Promise.all(mailgunPromises).then((failList) => {
    const key = crypto.randomBytes(16).toString("hex");
    redisClient.set(key, JSON.stringify(failList.filter(Boolean)));
    io.emit("send-key", key);
  });
};

module.exports = {
  send: send,
  reSend: reSend,
};
