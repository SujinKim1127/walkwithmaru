import { useState } from "react";
import styled from "styled-components";
import { dbService } from "../firebase";

export interface TProps {
  selectedDate: Date;
  name: String;
  isTimeOpen: boolean;
  setIsTimeOpen: (classname: boolean) => void;
}

const TimeModal = ({
  selectedDate,
  name,
  isTimeOpen,
  setIsTimeOpen,
}: TProps) => {
  const [morn, setMorn] = useState("morn");

  const onSubmit = async () => {
    await dbService.collection("days").add({
      name: name,
      time: morn,
      day: selectedDate.toDateString(),
    });
    setMorn("morn");
  };

  if (!isTimeOpen) return null;

  return (
    <Backdrop onClick={() => setIsTimeOpen(false)}>
      <Panel onClick={(e) => e.stopPropagation()}>
        <Option $active={morn === "morn"} onClick={() => setMorn("morn")}>
          아침
        </Option>
        <Divider />
        <Option $active={morn === "even"} onClick={() => setMorn("even")}>
          저녁
        </Option>
        <Divider />
        <DoneButton
          onClick={() => {
            setIsTimeOpen(false);
            onSubmit();
          }}
        >
          완료
        </DoneButton>
      </Panel>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Panel = styled.div`
  width: 200px;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
`;

const Option = styled.div<{ $active: boolean }>`
  padding: 14px 0;
  text-align: center;
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) => ($active ? "#222" : "#999")};
  background: ${({ $active }) => ($active ? "#f5f5f5" : "transparent")};
  cursor: pointer;
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 0 16px;
`;

const DoneButton = styled.div`
  padding: 13px 0;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #4a90d9;
  cursor: pointer;
`;

export default TimeModal;
