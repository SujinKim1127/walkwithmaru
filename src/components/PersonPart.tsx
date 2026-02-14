import styled from "styled-components";
import { Icon } from "@iconify/react";
import { dbService } from "../firebase";
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
    await dbService.doc(`days/${daytimedata.id}`).delete();
  };

  return (
    <Tag name={daytimedata.name}>
      <TagName>{daytimedata.name}</TagName>
      <DeleteBtn onClick={onDeleteClick}>
        <Icon icon="ic:round-close" width={12} />
      </DeleteBtn>
    </Tag>
  );
};

const Tag = styled.div<UserColor>`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px 8px 4px 10px;
  border-radius: 16px;
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

const TagName = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #000;
`;

const DeleteBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.35);
  color: #000;
  cursor: pointer;
  padding: 0;
  margin-left: 4px;
`;

export default PersonPart;
