'use client';

import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import productImage from '@/static/images/landing.png';

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
  padding-top: 15%;
`;

const LandingPageImageContainer = styled.div`
  position: relative;
  flex-grow: 1;
`;

const LandingPageImageBox = styled.div`
  position: absolute;
  bottom: 0;
  padding-top: 12%;
  padding-left: 4%;
  padding-right: 4%;
  height: 100%;
  width: 100%;
  max-height: 582px;

  img {
    display: block;
    width: 100%;
    height: inherit;
  }
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
  const { isVisibleModal, changeModalStatus } = useModal();

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
        <LandingPageImageContainer>
          <LandingPageImageBox>
            <Image priority={true} src={productImage} alt='product image' />
          </LandingPageImageBox>
        </LandingPageImageContainer>
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
