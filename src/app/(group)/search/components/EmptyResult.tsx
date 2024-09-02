'use client';

import styled from 'styled-components';
import Image from 'next/image';

import noSearchImage from '@/static/images/no_search.png';

const EmptyResultLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const EmptyResultImageBox = styled.div`
  width: 226px;
  height: 226px;
  background: #00000008;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyResultText = styled.span`
  font-size: 22px;
  font-weight: 700;
  line-height: 26.25px;
  padding-top: 29px;
`;
const EmptyResultAsk = styled.span`
  font-size: 15px;
  font-weight: 400;
  color: #00000066;
  line-height: 17.9px;
  padding-top: 16px;
`;

const EmptyResult = () => {
  return (
    <EmptyResultLayout>
      <EmptyResultImageBox>
        <Image src={noSearchImage} alt='no search image' />
      </EmptyResultImageBox>
      <EmptyResultText>검색결과가 없습니다.</EmptyResultText>
      <EmptyResultAsk>검색어의 철자가 정확한지 확인해주세요.</EmptyResultAsk>
    </EmptyResultLayout>
  );
};

export default EmptyResult;
