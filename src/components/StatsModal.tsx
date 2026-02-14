import { format, startOfMonth, endOfMonth } from "date-fns";
import styled from "styled-components";
import color from "../util/color";

const { green, sky, orange, brown } = color;

type MemberInfo = {
  name: string;
  color: string;
};

type StatRow = {
  name: string;
  color: string;
  morning: number;
  evening: number;
  total: number;
};

export interface StatsModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentMonth: Date;
  schedule: any[];
}

const MEMBERS: MemberInfo[] = [
  { name: "태훈", color: orange },
  { name: "유정", color: sky },
  { name: "지은", color: brown },
  { name: "수진", color: green },
];

const StatsModal = ({
  isOpen,
  setIsOpen,
  currentMonth,
  schedule,
}: StatsModalProps) => {
  if (!isOpen) return null;

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthLabel = `${format(currentMonth, "yyyy")}년 ${format(currentMonth, "M")}월`;

  const monthSchedule = schedule.filter((entry: any) => {
    const entryDate = new Date(entry.day);
    return entryDate >= monthStart && entryDate <= monthEnd;
  });

  const stats: StatRow[] = MEMBERS.map(({ name, color }) => {
    const memberEntries = monthSchedule.filter(
      (entry: any) => entry.name === name,
    );
    const morning = memberEntries.filter(
      (entry: any) => entry.time === "morn",
    ).length;
    const evening = memberEntries.filter(
      (entry: any) => entry.time === "even",
    ).length;

    return { name, color, morning, evening, total: morning + evening };
  });

  return (
    <Backdrop onClick={() => setIsOpen(false)}>
      <Panel onClick={(e) => e.stopPropagation()}>
        <Title>{monthLabel} 산책 통계</Title>

        <Table>
          <thead>
            <Tr>
              <Th>담당자</Th>
              <Th>아침</Th>
              <Th>저녁</Th>
              <Th>합계</Th>
            </Tr>
          </thead>
          <tbody>
            {stats.map((row) => (
              <Tr key={row.name}>
                <Td>
                  <NameTag $color={row.color}>{row.name}</NameTag>
                </Td>
                <Td>{row.morning}</Td>
                <Td>{row.evening}</Td>
                <TdBold>{row.total}</TdBold>
              </Tr>
            ))}
          </tbody>
        </Table>

        <CloseButton onClick={() => setIsOpen(false)}>닫기</CloseButton>
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
  width: 280px;
  background: #fff;
  border-radius: 14px;
  padding: 20px 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 16px;
  color: #222;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #f0f0f0;
`;

const Th = styled.th`
  padding: 8px 4px;
  font-size: 12px;
  font-weight: 600;
  color: #888;
  text-align: center;
`;

const Td = styled.td`
  padding: 10px 4px;
  font-size: 13px;
  text-align: center;
  color: #444;
`;

const TdBold = styled.td`
  padding: 10px 4px;
  font-size: 13px;
  text-align: center;
  font-weight: 700;
  color: #222;
`;

const NameTag = styled.span<{ $color: string }>`
  display: inline-block;
  padding: 2px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${({ $color }) => $color};
  color: #fff;
`;

const CloseButton = styled.div`
  margin-top: 14px;
  padding: 10px 0;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #4a90d9;
  cursor: pointer;
  border-top: 1px solid #eee;
`;

export default StatsModal;
