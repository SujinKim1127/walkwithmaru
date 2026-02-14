import styled from "styled-components";
import { dbService } from "../firebase";
import { useEffect, useState } from "react";
import PersonPart from "./PersonPart";

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
      <Divider />
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
  margin: 0 auto 12px auto;
  width: 315px;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f8;
  border-radius: 12px;
  padding: 12px 16px;
  gap: 4px;
`;

const TextBox = styled.div`
  margin: auto;
`;

const MorningBox = styled.div`
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 4px 0;
`;

const MorningText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 24px;
  background-color: #fff3e0;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #e68a00;
  flex-shrink: 0;
`;

const MorningPartBox = styled.div`
  margin-left: 8px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e8e8e8;
`;

const EveningBox = styled.div`
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 4px 0;
`;

const EveningText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 24px;
  background-color: #e8eaf6;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #5c6bc0;
  flex-shrink: 0;
`;

const EveningPartBox = styled.div`
  margin-left: 8px;
`;

export default Part;
