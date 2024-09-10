'use client';

import { useState, useLayoutEffect } from 'react'
import styled from 'styled-components';
import Link from 'next/link';

import { Button, SearchBar, Symbol, Spinner } from '@/components';
import { OAuthModal } from '@/app/components';
import { useModal } from '@/hooks';

const LandingPageLayout = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  height: 100%;
`;

const LandingPageLeftCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 57%;
  background-color: #0080ff12;
`;

const LandingPageRightCol = styled.div`
  position: relative;
  width: 43%;
`;

const LandingPageParagraphBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LandingPageButtonBox = styled.div`
  float: right;
  position: relative;
  right: 5%;
  padding-top: 4%;
`;

const LandingPageSearchBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 87%;

  > div {
    margin-bottom: 59px;
  }
`;

const LandingPageParagraph = styled.p`
  width: 100%;
  color: #5fafff;
  font-weight: 700;
  font-size: 40px;
  line-height: 64px;
  letter-space: -2%;
  text-align: center;
`;

const LandingPageText = styled.span`
  color: #0080ff;
  font-weight: 500;
`;

const LandingPageButtonText = styled(LandingPageText)`
  display: block;
  font-weight: 400;
  font-size: 14px;
  line-height: 16.8px;
  align-content: center;
`;

const LandingPageFooterBox = styled.div`
  display: flex;
  color: #00000066;
  margin-bottom: 29px;
  justify-content: center;

  > span {
    margin-left: 17px;
    margin-right: 17px;
  }
`;

const LandingPageAnchor = styled.a`
  front-size: 12px;
  font-weight: 400;
  line-height: 14.4px;

  &:hover {
    color: #000000cc;
    border-bottom: 1px solid #000000cc;
  }
`;

const LandingPage = () => {
  const [ isMobile, setIsMobile ]  = useState<boolean>(false)
  const { isVisibleModal, changeModalStatus } = useModal();


  useLayoutEffect(() => {		 
  	const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  	const isMobile = /android|iphone|ipad|iPod/i.test(userAgent)

	setIsMobile(isMobile)
  }, [])

  if ( isMobile ) return ( <LandingPageLayout>모바일은 지원하지 않습니다.</LandingPageLayout> )

  return (
    <LandingPageLayout>
      <LandingPageLeftCol>
        <LandingPageParagraphBox>
          <LandingPageParagraph>
            <LandingPageText>어려운 공시자료</LandingPageText>를 쉽게 찾아보세요
          </LandingPageParagraph>
          <LandingPageParagraph>
            <LandingPageText>GPT 기반 </LandingPageText>용어 해석 서비스
          </LandingPageParagraph>
        </LandingPageParagraphBox>
      </LandingPageLeftCol>
      <LandingPageRightCol>
        <LandingPageButtonBox onClick={() => changeModalStatus(true)}>
          <Button style={{ width: '81px', height: '38px' }}>
            <LandingPageButtonText>시작하기</LandingPageButtonText>
          </Button>
        </LandingPageButtonBox>
        <LandingPageSearchBox>
          <Symbol
            style={{ width: '100px', height: '100px', fontWeight: '800', fontSize: '24px' }}
          />
          <SearchBar
            style={{ width: '82%', height: '48px' }}
            placeholderText={'관심있는 기업명을 입력해 보세요.'}
          ></SearchBar>
        </LandingPageSearchBox>
        <LandingPageFooterBox>
          <LandingPageAnchor href='policy' target='_blank'>
            개인정보처리방침
          </LandingPageAnchor>
          <span>|</span>
          <LandingPageAnchor href='terms' target='_blank'>
            이용약관
          </LandingPageAnchor>
        </LandingPageFooterBox>
      </LandingPageRightCol>
      {isVisibleModal && <OAuthModal changeModalStatus={changeModalStatus} />}
    </LandingPageLayout>
  );
};

export default LandingPage;
