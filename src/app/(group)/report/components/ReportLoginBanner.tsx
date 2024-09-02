'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import NaverSVG from '@/static/images/naver_s.svg';
import GoogleSVG from '@/static/images/google_s.svg';

const ReportLoginBannerLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3500;
`;

const ReportLoginBannerDimmed = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const ReportLoginBannerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 108px;

  height: 330px;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 14.4%,
    #ffffff 39.4%
  );

  position: absolute;
  bottom: 0;
  z-index: 3;
`;

const ReportLoginBannerText = styled.span`
  font-size: 22px;
  font-weight: 700;
  line-height: 26.4px;
  color: #000000b2;
`;

const ReportLoginGoogleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 28px;
  padding-right: 65.5px;

  width: 350px;
  height: 48px;
  background-color: #ffffff;
  border: 1px solid #0000001a;
  border-radius: 8px;
  margin-top: 32px;
  cursor: pointer;

  span {
    font-size: 16px;
    font-weight: 500;
    line-height: 19.2px;
    color: #000000b2;
  }

  &:hover {
    background-color: #00000014;
  }
`;

const ReportLoginNaverBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 28px;
  padding-right: 71px;

  width: 350px;
  height: 48px;
  background-color: #00c73c;
  border-radius: 8px;
  margin-top: 16px;
  cursor: pointer;

  span {
    font-size: 16px;
    font-weight: 500;
    line-height: 19.2px;
    color: #ffffff;
  }

  &:hover {
    background-color: #00b737;
  }
`;

const ReportLoginBannerAnchor = styled.a`
  font-weight: 500;
  font-size: 14px;
  line-height: 19.6px;
  color: #000000b2;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 16px;

  &:hover {
    color: #000000e5;
  }
`;

const ReportLoginBanner = () => {
  const router = useRouter();

  const handleClick = (e: React.AnchorEvent<HTMLA>) => {
    e.preventDefault();

    router.back();
  };

  return (
    <ReportLoginBannerLayout>
      <ReportLoginBannerDimmed />
      <ReportLoginBannerBox>
        <ReportLoginBannerText>다음 내용은 로그인 후 이용해 주세요.</ReportLoginBannerText>
        <ReportLoginGoogleBox>
          <GoogleSVG />
          <ReportLoginBannerText>Google 계정으로 시작하기</ReportLoginBannerText>
        </ReportLoginGoogleBox>
        <ReportLoginNaverBox>
          <NaverSVG />
          <ReportLoginBannerText>네이버 계정으로 시작하기</ReportLoginBannerText>
        </ReportLoginNaverBox>
        <ReportLoginBannerAnchor onClick={handleClick}>돌아가기</ReportLoginBannerAnchor>
      </ReportLoginBannerBox>
    </ReportLoginBannerLayout>
  );
};

export default ReportLoginBanner;
