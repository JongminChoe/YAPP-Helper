import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDataByFormRequest } from "../../../../store/action/desire";
import classNames from "classnames/bind";
import styles from "./styles.scss";
import Filter from "../../../atomic/InputStyle/Filter";
import { useParams } from "react-router-dom";
import NomalButton from "../../../atomic/Button/NomalButton";
import useHisotryRoute from "../../../../hooks/useHistoryRoute";

const cx = classNames.bind(styles);
type FilterString = "all" | "pass" | "fail";

const EmailGradeThird = () => {
  const dispatch = useDispatch();
  const { pushHistory } = useHisotryRoute();
  const [filterStr, setFilterStr] = useState<FilterString>("all");
  const { allList } = useSelector<RootStore>((state) => state.desire) as DesireState;
  const { type } = useParams() as { type: string };

  const filterClick = useCallback((target) => {
    setFilterStr(target as FilterString);
  }, []);

  useEffect(() => {
    dispatch(setUserDataByFormRequest());
  }, []);

  return (
    <div className={cx("wrapper")}>
      <p>3. 셀 분류확인</p>
      <p>분류완료! 잘 분류되었는지 명단을 확인하세요</p>
      <div className={cx("filter-wrapper")}>
        <Filter onClick={filterClick} value="all" filterValue={filterStr}>
          전체
        </Filter>
        <Filter onClick={filterClick} value="pass" filterValue={filterStr}>
          합격
        </Filter>
        <Filter onClick={filterClick} value="fail" filterValue={filterStr}>
          불합격
        </Filter>
      </div>
      <table>
        <thead>
          <tr>
            <td>name</td>
            <td>email</td>
            <td>isPass</td>
            <td>meetingTime</td>
          </tr>
        </thead>
        <tbody>
          {allList[0] &&
            allList
              .filter((user) => {
                if (filterStr === "all") {
                  return true;
                }
                if (filterStr === "pass") {
                  return user.isPass;
                }
                if (filterStr === "fail") {
                  return !user.isPass;
                }
              })
              .map((user) => {
                return (
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isPass.toString()}</td>
                    <td>{user.meetingTime ? user.meetingTime : ""}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      <footer className="inner-grade-footer">
        <NomalButton
          color="lightBlue"
          size="default"
          onClick={() => {
            pushHistory(`/email/${type}/2`);
          }}
        >
          이전
        </NomalButton>
        <NomalButton
          color="default"
          size="default"
          onClick={() => {
            pushHistory(`/email/${type}/4`);
          }}
        >
          다음
        </NomalButton>
      </footer>
    </div>
  );
};

export default EmailGradeThird;
