import styled from "styled-components";
import { dbService } from "../firebase";
import color from "../util/color";

const { brown, yellow } = color;

interface UnavailableDateRecorderProps {
  selectedDate: Date;
}

const UnavailableDateRecorder = ({
  selectedDate,
}: UnavailableDateRecorderProps) => {
  const handleRecord = async (name: string) => {
    const dateString = selectedDate.toDateString();

    try {
      await dbService.collection("unavailable").add({
        day: dateString,
        name,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("🔥 기록 실패:", error);
    }
  };

  return (
    <Container>
      <Label>안되는 날짜 기록</Label>
      <ButtonGroup>
        <RecordButton bgColor={brown} onClick={() => handleRecord("지은")}>
          지은
        </RecordButton>
        <RecordButton bgColor={yellow} onClick={() => handleRecord("수진")}>
          수진
        </RecordButton>
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.div`
  margin: 10px auto;
  width: 315px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Label = styled.span`
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

interface ButtonProps {
  bgColor: string;
}

const RecordButton = styled.button<ButtonProps>`
  background-color: ${(props) => props.bgColor};
  color: #000;
  border: none;
  border-radius: 10px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

export default UnavailableDateRecorder;
