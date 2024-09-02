import styled from 'styled-components';

const CorporationClassIconLayout = styled.div`
  padding-left: 12px;
  padding-right: 8px;
`;

const CorporationClassIconBox = styled.div<{ $backgroundColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  padding: 2px;
  background-color: ${(props) => props.$backgroundColor};
`;
const CorporationClassIconText = styled.span`
  font-weigth: 700;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #ffffff;
`;

interface CorporationClassIconProps {
  corporationClass: string;
}

const getCorporationClassIconInfo = (corporationClass: string): { text: string; color: string } => {
  switch (corporationClass) {
    case 'N':
      return { text: '넥', color: '#498EB9' };
    case 'K':
      return { text: '코', color: '#BF7EB8' };
    case 'Y':
      return { text: '유', color: '#EF9A87' };
    case 'E':
      return { text: 'IR', color: '#F698AB' };
    default:
      return { text: '', color: '#FFFFFF' };
  }
};

const CorporationClassIcon = ({ corporationClass }: CorporationClassIconProps) => {
  const { text, color } = getCorporationClassIconInfo(corporationClass);
  return (
    <CorporationClassIconLayout>
      <CorporationClassIconBox $backgroundColor={color}>
        <CorporationClassIconText>{text}</CorporationClassIconText>
      </CorporationClassIconBox>
    </CorporationClassIconLayout>
  );
};

export default CorporationClassIcon;
