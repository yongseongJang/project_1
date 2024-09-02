import styled, { keyframes } from 'styled-components';

const SpinnerAnimation = keyframes`
    from {
     transform: rotate(0deg)
    }

    to {
      transform: rotate(360deg)
    } 
`;

const LoadingLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoadingSpinner = styled.div<{ $style: { width: string; height: string } }>`
  width: ${(props) => props.$style?.width ?? '0px'};
  height: ${(props) => props.$style?.height ?? '0px'};

  border: 8px solid #ffffff;
  border-top-color: #0080ff;
  border-radius: 100%;

  animation: ${SpinnerAnimation} 1s linear infinite;
`;

const LoadingText = styled.span`
  margin: 50px 0px 8px 0px;
  font-weight: 700;
  font-size: 22px;
  line-height: 26.25px;
`;

const LoadingSubText = styled.span`
  font-weight: 500;
  font-size: 15px;
  line-height: 17.9px;
  color: #00000066;
`;

interface LoadingProps {
  style: {
    width: string;
    height: string;
  };
  isVisibleText: boolean;
}

const Loading = ({ style, isVisibleText }: LoadingProps) => {
  return (
    <LoadingLayout>
      <LoadingSpinner $style={style} />
      {isVisibleText && (
        <>
          <LoadingText>데이터를 가져오는 중입니다.</LoadingText>
          <LoadingSubText>잠시만 기다려주세요.</LoadingSubText>
        </>
      )}
    </LoadingLayout>
  );
};

export default Loading;
