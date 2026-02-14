import styled from "styled-components";
import { Icon } from "@iconify/react";
import color from "../util/color";
import { dbService } from "../firebase";
import { useEffect, useRef, useState } from "react";
import PersonPart from "./PersonPart";

const { green, sky, orange, brown } = color;

interface UserColor {
  name: string;
}

export interface DProps {
  selectedDate: Date;
}

const Part = ({ selectedDate }: DProps) => {
  const [schedule, setSchedule] = useState<any>([]);

  useEffect(() => {
    dbService.collection("days").onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSchedule(newArray);
    });
  }, []);

  return (
    <Container>
      <MorningBox>
        <MorningText>
          <TextBox>아침</TextBox>
        </MorningText>
        {schedule.map((el: any, id: number) => {
          return (
            <>
              {selectedDate.toDateString() === el.day ? (
                el.time === "morn" ? (
                  <MorningPartBox>
                    <PersonPart daytimedata={el} />
                  </MorningPartBox>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </>
          );
        })}
      </MorningBox>
      <EveningBox>
        <EveningText>
          <TextBox>저녁</TextBox>
        </EveningText>
        {schedule.map((el: any, id: number) => {
          return (
            <>
              {selectedDate.toDateString() === el.day ? (
                el.time === "even" ? (
                  <EveningPartBox>
                    <PersonPart daytimedata={el} />
                  </EveningPartBox>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </>
          );
        })}
      </EveningBox>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto 10px auto;
  width: 315px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextBox = styled.div`
  margin: auto;
`;

const MorningBox = styled.div`
  display: flex;
  height: 75px;
`;

const MorningText = styled.div`
  display: flex;
  text-align: center;
  width: 30px;
`;

const MorningPartBox = styled.div`
  margin: auto 0 auto 15px;
`;

const EveningBox = styled.div`
  display: flex;
  height: 75px;
`;

const EveningText = styled.div`
  display: flex;
  text-align: center;
  width: 30px;
`;

const EveningPartBox = styled.div`
  margin: auto 0 auto 15px;
`;

const UserBox = styled.div<UserColor>`
  width: 60px;
  height: 32px;
  display: flex;
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
  border-radius: 10px;
`;

const UserNametxt = styled.div`
  margin: auto 0 auto 7px;
`;

const UserDeletebtn = styled.div`
  display: flex;
  margin: auto 0;
`;

export default Part;
