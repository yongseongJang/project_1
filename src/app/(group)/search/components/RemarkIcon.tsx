import { useState } from 'react';
import styled from 'styled-components';

const RemarkIconLayout = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const RemarkIconBox = styled.div<{ backgroundColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  padding: 2px;
  background-color: ${(props) => props.backgroundColor};
`;

const RemarkIconText = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #ffffff;
`;

const RemarkDetailBox = styled.div`
  border-radius: 8px;
  border: 1px solid #0000001a;
  padding: 12px 10px;
  position: absolute;
  top: 25px;
  width: max-content;
  background-color: #ffffff;
  z-index: 3500;
`;

const RemarkDetailText = styled.span`
  font-weigth: 400;
  font-size: 13px;
  line-height: 15.51px;
  color: #000000b2;
`;

interface RemarkIconProps {
  remarkType: number;
}

const getRemarkIconInfo = (remarkType: number): { text: string; color: string } => {
  switch (remarkType) {
    case '유':
      return {
        text: '유',
        color: '#93C5A0',
        detail: '본 공시사항은 한국거래소 유가증권시장본부 소관임',
      };
    case '코':
      return {
        text: '코',
        color: '#7B89C6',
        detail: '본 공시사항은 한국거래소 코스닥시장본부 소관임',
      };
    case '채':
      return { text: '넥', color: '#72A8DC', detail: '본 문서는 한국거래소 코넥스시장 소관임' };
    case '넥':
      return {
        text: '채',
        color: '#FC7F7F',
        detail: '본 문서는 한국거래소 채권상장법인 공시사항임',
      };
    case '공':
      return { text: '공', color: '#2FC5CC', detail: '본 공시사항은 공정거래위원회 소관임' };
    case '연':
      return { text: '연', color: '#B2CA8C', detail: '본 보고서는 연결부분을 포함한 것임' };
    case '정':
      return {
        text: '정',
        color: '#C98C70',
        detail: '본 보고서 제출 후 정정신고가 있으니 관련 보고서를 참조하시기 바람',
      };
    case '철':
      return {
        text: '철',
        color: '#7E858B',
        detail: '본 보고서는 철회(간주)되었으니 관련 철회신고서(철회간주안내)를 참고하시기 바람',
      };
    default:
      return { text: '', color: '#FFFFFF', detail: '' };
  }
};

const RemarkIcon = ({ remarkType }: RemarkIconProps) => {
  const [isVisibleDetail, setIsVisibleDetail] = useState<boolean>(false);
  const { text, color, detail } = getRemarkIconInfo(remarkType);

  const handleMouseEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsVisibleDetail((isVisibleDetail) => !isVisibleDetail);
  };

  return (
    <RemarkIconLayout>
      <RemarkIconBox
        backgroundColor={color}
        onMouseEnter={handleMouseEvent}
        onMouseLeave={handleMouseEvent}
      >
        <RemarkIconText>{text}</RemarkIconText>
      </RemarkIconBox>
      {isVisibleDetail && (
        <RemarkDetailBox>
          <RemarkDetailText>{detail}</RemarkDetailText>
        </RemarkDetailBox>
      )}
    </RemarkIconLayout>
  );
};

export default RemarkIcon;
