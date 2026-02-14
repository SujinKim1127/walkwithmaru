import styled from "styled-components";
import { Icon } from "@iconify/react";
import { dbService } from "../firebase";
import { useEffect, useRef, useState } from "react";
import color from "../util/color";

const { green, sky, orange, brown } = color;

interface UserColor {
  name: string;
}

interface Data {
  id: string;
  time: string;
  day: string;
  name: string;
}

export interface DProps {
  daytimedata: Data;
}

const PersonPart = ({ daytimedata }: DProps) => {
  const onDeleteClick = async () => {
    const data = await dbService.doc(`days/${daytimedata.id}`).delete();
  };

  return (
    <UserBox name={daytimedata.name}>
      <UserNametxt onClick={onDeleteClick}>
        {daytimedata.name}&nbsp;
      </UserNametxt>
      <UserDeletebtn>
        <Icon onClick={onDeleteClick} icon="ic:round-close" />
      </UserDeletebtn>
    </UserBox>
  );
};

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
  cursor: pointer;
`;

export default PersonPart;
