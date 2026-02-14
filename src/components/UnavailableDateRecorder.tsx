import styled from "styled-components";
import { dbService } from "../firebase";
import color from "../util/color";

const { brown, green } = color;

interface UnavailableDateRecorderProps {
  selectedDate: Date;
}

const UnavailableDateRecorder = ({
  selectedDate,
}: UnavailableDateRecorderProps) => {
  const handleToggle = async (name: string) => {
    const dateString = selectedDate.toDateString();

    try {
      const snapshot = await dbService
        .collection("unavailable")
        .where("day", "==", dateString)
        .where("name", "==", name)
        .get();

      if (!snapshot.empty) {
        const batch = dbService.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      } else {
        await dbService.collection("unavailable").add({
          day: dateString,
          name,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("🔥 토글 실패:", error);
    }
  };

  return (
    <Container>
      <Label>안되는 날짜 기록</Label>
      <ButtonGroup>
        <RecordButton bgColor={brown} onClick={() => handleToggle("지은")}>
          지은
        </RecordButton>
        <RecordButton bgColor={green} onClick={() => handleToggle("수진")}>
          수진
        </RecordButton>
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.div`
  margin: 12px auto;
  width: 315px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background-color: #f7f7f8;
  border-radius: 12px;
  padding: 10px 16px;
`;

const Label = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #555;
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
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

export default UnavailableDateRecorder;
