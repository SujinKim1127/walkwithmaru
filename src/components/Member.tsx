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
  const [username, setUserName] = useState("");
  const [time, setTime] = useState(new Date());
  const [clickname, setClickname] = useState("");

  return (
    <Container>
      <HeaderBox>
        <TitleBox>담당자</TitleBox>
        <PlusBox>
          <Icon onClick={() => setIsOpen(true)} icon="ic:round-plus" />
        </PlusBox>
        <MemberModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </HeaderBox>
      <MemberBox>
        <UserBox>
          <PersonalBox color={orange}>
            <UserNametxt
              onClick={() => {
                setIsTimeOpen(true);
                setClickname("태훈");
              }}
            >
              태훈&nbsp;
            </UserNametxt>
            <UserPlusbtn>
              <Icon
                icon="ic:round-plus"
                onClick={() => {
                  setIsTimeOpen(true);
                  setClickname("태훈");
                }}
              />
            </UserPlusbtn>
          </PersonalBox>
          <PersonalBox color={sky}>
            <UserNametxt
              onClick={() => {
                setIsTimeOpen(true);
                setClickname("유정");
              }}
            >
              유정&nbsp;
            </UserNametxt>
            <UserPlusbtn>
              <Icon
                icon="ic:round-plus"
                onClick={() => {
                  setIsTimeOpen(true);
                  setClickname("유정");
                }}
              />
            </UserPlusbtn>
          </PersonalBox>
          <PersonalBox color={brown}>
            <UserNametxt
              onClick={() => {
                setIsTimeOpen(true);
                setClickname("지은");
              }}
            >
              지은&nbsp;
            </UserNametxt>
            <UserPlusbtn>
              <Icon
                icon="ic:round-plus"
                onClick={() => {
                  setIsTimeOpen(true);
                  setClickname("지은");
                }}
              />
            </UserPlusbtn>
          </PersonalBox>
          <PersonalBox color={green}>
            <UserNametxt
              onClick={() => {
                setIsTimeOpen(true);
                setClickname("수진");
              }}
            >
              수진&nbsp;
            </UserNametxt>
            <UserPlusbtn>
              <Icon
                icon="ic:round-plus"
                onClick={() => {
                  setIsTimeOpen(true);
                  setClickname("수진");
                }}
              />
            </UserPlusbtn>
          </PersonalBox>
          <TimeModal
            selectedDate={selectedDate}
            name={clickname}
            isTimeOpen={isTimeOpen}
            setIsTimeOpen={setIsTimeOpen}
          />
        </UserBox>
      </MemberBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 315px;
  border-top: 1px solid black;
  margin: 0 auto;
  flex-direction: column;
`;

const HeaderBox = styled.div`
  display: flex;
  margin-right: auto;
  margin-top: 20px;
`;

const TitleBox = styled.div``;

const PlusBox = styled.div`
  display: flex;
  text-align: center;
  margin: auto 0 auto 5px;
  cursor: pointer;
`;

const MemberBox = styled.div`
  margin-top: 16px;
`;

const UserBox = styled.div`
  display: flex;
`;
const PersonalBox = styled.div`
  width: 60px;
  height: 32px;
  border-radius: 10px;
  margin-right: 10px;
  display: flex;
  background-color: ${(props) => (props.color ? props.color : "gray")};
`;

const UserNametxt = styled.div`
  margin: auto 0 auto 7px;
`;

const UserPlusbtn = styled.div`
  display: flex;
  margin: auto 0;
  cursor: pointer;
`;

export default Member;
