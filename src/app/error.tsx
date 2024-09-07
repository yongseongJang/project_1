'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import errorImage from '@/static/images/error.png';

const ErrorLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
`;

const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorText = styled.span`
  margin: 20px 0px 6px 0px;
  font-weight: 700;
  font-size: 22px;
  line-height: 26.25px;
`;

const ErrorSubText = styled.span`
  font-weight: 500;
  font-size: 15px;
  line-height: 21px;
  color: #00000066;
`;

const ErrorAnchor = styled.a`
  font-weight: 500;
  font-size: 15px;
  line-height: 17.9px;
  color: #00000066;
  cursor: pointer;
  text-decoration: underline;
`;

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    router.push('/');
  };

  return (
    <ErrorLayout>
      <ErrorBox>
        <Image src={errorImage} alt='error' />
        <ErrorText>오류 발생</ErrorText>
        <ErrorSubText>서버에서 데이터를 불러오는 중 얘기치 못한 오류가 발생했습니다.</ErrorSubText>
        <ErrorSubText>잠시 후에 다시 시도해주세요.</ErrorSubText>
        <ErrorAnchor onClick={handleClick}>돌아가기</ErrorAnchor>
      </ErrorBox>
    </ErrorLayout>
  );
};

export default Error;
