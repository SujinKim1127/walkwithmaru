import {
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
  startOfWeek,
  format,
  addDays,
} from "date-fns";
import styled from "styled-components";
import color from "../util/color";
import { useEffect, useRef, useState } from "react";

const { green, sky, orange, brown } = color;

interface UserColor {
  name: string;
}

export interface CProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: any;
  schedule: any;
  unavailableData: any;
}

const Cells = ({
  currentMonth,
  selectedDate,
  onDateClick,
  schedule,
  unavailableData,
}: CProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const [data, setData] = useState<any>([]);
  const [selectday, setSelectday] = useState(new Date());
  const [state, setState] = useState(false);
  const statedayRef = useRef<string>("");

  const rows = [];
  let days = [];
  let day = startDate;
  let formatDate = "";

  useEffect(() => {
    schedule.map((el: any) => {
      setData((prev: any) => [el.day, ...prev]);
    });
  }, [schedule]);

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formatDate = format(day, "d");
      const cloneDay = day;
      statedayRef.current = day.toDateString();
      const string = cloneDay.toDateString();
      days.push(
        <Container>
          <CellBox
            className={`
                    ${
                      !isSameDay(day, selectedDate)
                        ? "none"
                        : isSameDay(day, selectedDate)
                          ? "select"
                          : format(currentMonth, "M") !== format(day, "M")
                            ? "not-valid"
                            : "valid"
                    }`}
            onClick={() => {
              onDateClick(cloneDay);
            }}
          >
            <span
              className={`
            ${
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : !isSameDay(day, selectedDate)
                  ? "none"
                  : isSameDay(day, selectedDate)
                    ? "textselect"
                    : ""
            }`}
            >
              {formatDate}
            </span>
            <IndicatorRow>
              <Square>
                {data.indexOf(string) !== -1 ? (
                  <>
                    {schedule.map((el: any) => {
                      return (
                        <>
                          {string === el.day ? (
                            el.time === "even" ? (
                              <Evening
                                name={el.name}
                                className={
                                  format(currentMonth, "M") !== format(day, "M")
                                    ? "text not-valid"
                                    : ""
                                }
                              ></Evening>
                            ) : el.time === "morn" ? (
                              <Morning
                                name={el.name}
                                className={
                                  format(currentMonth, "M") !== format(day, "M")
                                    ? "text not-valid"
                                    : ""
                                }
                              ></Morning>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}
              </Square>
              <XMarkColumn>
                {unavailableData
                  .filter((el: any) => el.day === string)
                  .map((el: any) => (
                    <XMark
                      key={el.id}
                      name={el.name}
                      className={
                        format(currentMonth, "M") !== format(day, "M")
                          ? "text not-valid"
                          : ""
                      }
                    >
                      ✕
                    </XMark>
                  ))}
              </XMarkColumn>
            </IndicatorRow>
          </CellBox>
        </Container>,
      );
      day = addDays(day, 1);
    }
    rows.push(<RowBox>{days}</RowBox>);
    days = [];
  }
  return <Body className="body">{rows}</Body>;
};

const Container = styled.div`
  display: flex;
  justify-content: center;

  .not-valid {
    color: white;
    display: none;
  }
  .none {
    // 오늘이 아닌 날짜
  }
  .select {
    // 오늘
    font-weight: 700;
  }
  .textselect {
    color: blue;
    font-weight: 1000;
  }
  span {
    display: block;
    width: 100%;
    padding: 1px 0 1px 4px;
    text-align: left;
    box-sizing: border-box;
  }
`;

const CellBox = styled.div`
  width: 45px;
  display: flex;
  flex-direction: column;
`;

const RowBox = styled.div`
  display: flex;
  height: 65px;
  margin-bottom: 5px;
`;

const IndicatorRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2px;
  margin: 2px 0 2px 4px;
`;

const Square = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const XMarkColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1px;
`;

const XMark = styled.div<UserColor>`
  font-size: 8px;
  font-weight: 1000;
  line-height: 8px;
  width: 10px;
  height: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.name === "수진" ? green : props.name === "지은" ? brown : "gray"};
`;

const Morning = styled.div<UserColor>`
  border-radius: 3px;
  width: 17px;
  height: 8px;
  background-color: ${(props) =>
    props.name === "수진"
      ? green
      : props.name === "태훈"
        ? orange
        : props.name === "유정"
          ? sky
          : props.name === "지은"
            ? brown
            : "gray"};
`;

const Evening = styled.div<UserColor>`
  border-radius: 3px;
  width: 17px;
  height: 8px;
  background-color: ${(props) =>
    props.name === "수진"
      ? green
      : props.name === "태훈"
        ? orange
        : props.name === "유정"
          ? sky
          : props.name === "지은"
            ? brown
            : "gray"};
`;

const Body = styled.div`
  font-size: 12px;
`;

export default Cells;
