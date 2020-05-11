const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const http = require("http");

const cors = require("cors");
const fileRouter = require("./controller/file");
const loginRouter = require("./controller/login");
const recruitRouter = require("./controller/recruit");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
  })
);

app.use("/static", express.static(__dirname + "/dist")); // react 쓰기위한 것
app.use("/file", fileRouter);
app.use("/login", loginRouter);
app.use("/recruit", recruitRouter);
app.set("view engine", "ejs"); // .env를 사용하기 위한 ejs

app.get("/", (req, res) => {
  /**
   * 메인 페이지로 구글 로그인 화면을 띄운다 싱글페이지로 만들 것으로 합쳐버리자
   */
  return res.render("index");
});


server.listen(9170, () => console.log("서버 진행중 9170"));
