'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

import { useNaverLoginQuery, useGoogleLoginQuery } from '@/queries'

import NaverSVG from '@/static/images/naver.svg';
import GoogleSVG from '@/static/images/google.svg';

const OAuthModalLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3500;
`;

const OAuthModalDimmed = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000040;
`;

const OAuthModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;

  width: 442px;
  height: 335px;
  background-color: #ffffff;
  border-radius: 14px;
`;

const OAuthModalHeader = styled.div`
  height: 62px;
`;

const OAuthModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 62px);
`;

const OAuthModalTitleText = styled.span`
  font-size: 22px;
  font-weight: 700;
  line-height: 26.4px;
  color: #000000e5;
`;

const OAuthModalGoogleBox = styled.div`
  width: 72px;
  height: 72px;
  border: 1px solid #0000001a;
  border-radius: 8px;
  padding-top: 15px;
  padding-left: 15px;
  background-color: #ffffff;

  &:hover {
    background-color: #00000014;
  }
`;

const OAuthModalNaverBox = styled.div`
  width: 72px;
  height: 72px;
  border: 1px solid #0000001a;
  border-radius: 8px;
  background-color: #00c73c;
  padding-top: 17px;
  padding-left: 17px;

  &:hover {
    background-color: #00b737;
  }
`;

const OAuthModalText = styled.span`
  padding-top: 16px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.2px;
  color: #00000099;
`;

const OAuthModalRow = styled.div`
  padding-top: 32px;
  display: flex;

  > div:nth-child(1) {
    margin-right: 46px;
  }
`;

const OAuthModalCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const OAuthModalCloseBtn = styled.div`
  position: relative;
  width: 13.5px;
  height: 13.5px;
  border: 1.5px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 105%;
    left: 145%;
    width: 1.5px;
    height: 19px;
    background-color: #000000e5;
  }

  &:before {
    transform: translate(-25%, -25%) rotate(45deg);
  }

  &:after {
    transform: translate(-25%, -25%) rotate(-45deg);
  }
`;

const OAuthModalCloseBtnBox = styled.div`
  float: right;
  margin: 16px 16px 0px 0px;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  cursor: pointer;

  &:hover {
    background-color: #0000000a;
  }
`;

interface OAuthModalProps {
  changeModalStatus: (status: boolean) => void;
}

const OAuthModal = ({ changeModalStatus }: OAuthModalProps) => {
  const router = useRouter()
  const { isLoading: isNaverLoginLoading, isError: isNaverLoginError, error: naverLoginError, data: naverLoginUrl } = useNaverLoginQuery()
  const { isLoading: isGoogleLoginLoading, isError: isGoogleLoginError, error: googleLoginError, data: googleLoginUrl } = useGoogleLoginQuery()

  if ( isNaverLoginError ) { throw naverLoginError }
  if ( isGoogleLoginError ) { throw googleLoginError }

  const handleNaverLoginClick = () => {
      router.push(naverLoginUrl) 
  }

  const handleGoogleLoginClick = () => {
      router.push(googleLoginUrl)
  }

  return (
    <OAuthModalLayout>
      <OAuthModalDimmed />
      <OAuthModalBox>
        <OAuthModalHeader>
          <OAuthModalCloseBtnBox onClick={() => changeModalStatus(false)}>
            <OAuthModalCloseBtn />
          </OAuthModalCloseBtnBox>
        </OAuthModalHeader>
        <OAuthModalBody>
          <OAuthModalTitleText>Aimdat에 오신 것을 환영합니다.</OAuthModalTitleText>
          <OAuthModalText>
            로그인 후 10,000+개의 공시 자료를
            <br />
            쉽게 이용해 보세요.
          </OAuthModalText>
          <OAuthModalRow>
            <OAuthModalCol onClick={handleGoogleLoginClick}>
              <OAuthModalGoogleBox>
                <GoogleSVG />
              </OAuthModalGoogleBox>
              <OAuthModalText>구글로 시작하기</OAuthModalText>
            </OAuthModalCol>
            <OAuthModalCol onClick={handleNaverLoginClick}>
              <OAuthModalNaverBox>
                <NaverSVG />
              </OAuthModalNaverBox>
              <OAuthModalText>네이버로 시작하기</OAuthModalText>
            </OAuthModalCol>
          </OAuthModalRow>
        </OAuthModalBody>
      </OAuthModalBox>
    </OAuthModalLayout>
  );
};

export default OAuthModal;
