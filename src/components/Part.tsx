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
      <Row>
        <Section>
          <TimeLabel bgColor="#fff3e0" textColor="#e68a00">
            아침
          </TimeLabel>
          <TagList>
            {schedule.map((el: any) => (
              <>
                {selectedDate.toDateString() === el.day &&
                  el.time === "morn" && <PersonPart daytimedata={el} />}
              </>
            ))}
          </TagList>
        </Section>
        <Divider />
        <Section>
          <TimeLabel bgColor="#e8eaf6" textColor="#5c6bc0">
            저녁
          </TimeLabel>
          <TagList>
            {schedule.map((el: any) => (
              <>
                {selectedDate.toDateString() === el.day &&
                  el.time === "even" && <PersonPart daytimedata={el} />}
              </>
            ))}
          </TagList>
        </Section>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto 12px auto;
  width: 315px;
  padding: 10px 14px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
`;

// 📦 아침/저녁 각 영역 (flex: 1로 반반)
const Section = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
`;

interface TimeLabelProps {
  bgColor: string;
  textColor: string;
}

const TimeLabel = styled.span<TimeLabelProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 8px;
  background-color: ${(props) => props.bgColor};
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: ${(props) => props.textColor};
  flex-shrink: 0;
`;

// 🏷️ 태그 목록
const TagList = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

// ⏐ 세로 구분선
const Divider = styled.div`
  width: 1px;
  height: 20px;
  background-color: #ddd;
  flex-shrink: 0;
  margin-right: 14px;
`;

export default Part;
