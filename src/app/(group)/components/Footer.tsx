import styled from 'styled-components';
import Image from 'next/image';

import footerLogo from '@/static/images/footer_logo.png';

const FooterLayout = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0px 32px;
    font-weight: 400
    font-size: 12px; 
    line-height: 14.4px;
    color: #00000066;
`;

const FooterLeftCol = styled.div`
  display: flex;
`;

const FooterRightCol = styled.div`
  display: flex;
  margin-top: 12px;
  margin-botton: 14px;

  div:nth-child(2) {
    margin-left: 32px;
  }
`;

const FooterBox = styled.div``;

const FooterAnchorBox = styled.div`
  margin: 13px 0px 13px 81px;
`;

const FooterImageBox = styled.div`
  margin-top: 9px;
`;

const FooterText = styled.span`
  white-space: pre;
`;

const FooterAnchor = styled.a`
  margin-right: 33px;

  &:hover {
    color: #000000cc;
    border-bottom: 1px solid #000000cc;
  }
`;

const Footer = () => {
  return (
    <FooterLayout>
      <FooterLeftCol>
        <FooterImageBox>
          <Image src={footerLogo} alt='logo' />
        </FooterImageBox>
        <FooterAnchorBox>
          <FooterAnchor href='/policy' target="_blank">개인정보처리방침</FooterAnchor>
          <FooterAnchor href='/terms' target="_blank">이용약관</FooterAnchor>
        </FooterAnchorBox>
      </FooterLeftCol>
      <FooterRightCol>
        <FooterBox>
          <FooterText>Contact aimdat.office@gmail.com</FooterText>
        </FooterBox>
        <FooterBox>
          <FooterText>ⓒ 2024 Aimdat</FooterText>
        </FooterBox>
      </FooterRightCol>
    </FooterLayout>
  );
};

export default Footer;
