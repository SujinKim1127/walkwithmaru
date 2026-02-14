import { addMonths, format, subMonths } from "date-fns";
import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import StatsModal from "../components/StatsModal";

export interface MProps {
  currentMonth: Date;
  setCurrentMonth: (classname: Date) => void;
  schedule: any[];
}

const Header = ({ currentMonth, setCurrentMonth, schedule }: MProps) => {
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <Container>
      <DateBox>
        <span className="textdate">
          {format(currentMonth, "yyyy")}년 &nbsp; {format(currentMonth, "M")}월
        </span>
      </DateBox>
      <RightGroup>
        {/* 📊 통계 버튼 */}
        <StatsButton onClick={() => setIsStatsOpen(true)}>
          <Icon icon="material-symbols:bar-chart-rounded" />
        </StatsButton>
        <ArrowBox>
          <Icon
            className="left"
            icon="material-symbols:arrow-back-ios-new-rounded"
            onClick={prevMonth}
          />
          <Icon
            icon="material-symbols:arrow-forward-ios-rounded"
            onClick={nextMonth}
          />
        </ArrowBox>
      </RightGroup>
      <StatsModal
        isOpen={isStatsOpen}
        setIsOpen={setIsStatsOpen}
        currentMonth={currentMonth}
        schedule={schedule}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px 0 15px;
  margin-bottom: 10px;

  .left {
    margin-right: 10px;
  }
`;

const DateBox = styled.div`
  font-weight: 800;
`;

const RightGroup = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatsButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  color: #666;
  transition: color 0.15s;

  &:hover {
    color: #333;
  }
`;

const ArrowBox = styled.div`
  display: flex;
  align-items: center;
`;

export default Header;
