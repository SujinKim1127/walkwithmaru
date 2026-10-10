import styled from "styled-components";
import { Icon } from "@iconify/react";
import color from "../util/color";
import MemberModal from "./MemberModal";
import { useState } from "react";
import TimeModal from "./TimeModal";

const { green, sky, orange, brown } = color;

export interface SProps {
  selectedDate: Date;
}

const Member = ({ selectedDate }: SProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [clickname, setClickname] = useState("");

  return (
    <Container>
      <Row>
        <TitleBox>담당자</TitleBox>
        <TagGroup>
          <PersonalBox
            color={orange}
            onClick={() => {
              setIsTimeOpen(true);
              setClickname("태훈");
            }}
          >
            <PlusCircle>+</PlusCircle>
            태훈
          </PersonalBox>
          <PersonalBox
            color={sky}
            onClick={() => {
              setIsTimeOpen(true);
              setClickname("유정");
            }}
          >
            <PlusCircle>+</PlusCircle>
            유정
          </PersonalBox>
          <PersonalBox
            color={brown}
            onClick={() => {
              setIsTimeOpen(true);
              setClickname("지은");
            }}
          >
            <PlusCircle>+</PlusCircle>
            지은
          </PersonalBox>
          <PersonalBox
            color={green}
            onClick={() => {
              setIsTimeOpen(true);
              setClickname("수진");
            }}
          >
            <PlusCircle>+</PlusCircle>
            수진
          </PersonalBox>
        </TagGroup>
      </Row>
      <MemberModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <TimeModal
        selectedDate={selectedDate}
        name={clickname}
        isTimeOpen={isTimeOpen}
        setIsTimeOpen={setIsTimeOpen}
      />
    </Container>
  );
};

// 🎨 부드러운 구분선 + 깔끔한 레이아웃
const Container = styled.div`
  display: flex;
  width: 315px;
  margin: 0 auto;
  flex-direction: column;
  padding-top: 14px;
`;

// 📌 담당자 타이틀 + 태그를 한 줄로 배치
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TitleBox = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #333;
  white-space: nowrap;
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const PersonalBox = styled.div`
  padding: 4px 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: ${(props) => (props.color ? props.color : "gray")};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

const PlusCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 14px;
  border-radius: 50%;
  background-color: transparent;
  font-size: 10px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.6);
  flex-shrink: 0;
  margin-bottom: 2px;
`;

export default Member;
