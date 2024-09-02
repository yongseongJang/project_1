'use client';

import styled from 'styled-components';

interface ReportDescriptionProps {
  description: string;
}

const ReportDescriptionLayout = styled.div`
  position: relative;
`;

const ReportDescriptionBox = styled.div`
  background: #ffffff;
  padding: 8px;
  box-shadow: 0px 0px 8px 0px #00000029;
`;

const ReportDescriptionContainer = styled.div`
  border: 0.6px solid #0080ffcc;
  border-radius: 0px 8px 8px 8px;
  padding: 16px;
`;

const ReportDescriptionText = styled.span`
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #000000cc;
  word-break: break-all;
`;

const ReportDescriptionVerticalBox = styled.div`
  position: absolute;
  padding-right: 10px;
  top: -5px;
  left: -4px;

  span:nth-child(1) {
    display: block;
    height: 10px;
    border-left: 5px solid #0080ff;
    border-top: 5px solid transparent;
  }

  span:nth-child(2) {
    display: block;
    height: 10px;
    border-left: 5px solid #0080ff;
    border-bottom: 5px solid transparent;
  }
`;
const ReportDescriptionHorizontalBox = styled.div`
  display: flex;
  position: absolute;
  top: -5px;
  left: -4px;

  span:nth-child(1) {
    display: inline-block;
    width: 10px;
    border-top: 5px solid #0080ff;
    border-left: 5px solid transparent;
  }

  span:nth-child(2) {
    display: inline-block;
    width: 10px;
    border-bottom: 5px solid #0080ff;
    border-right: 5px solid transparent;
  }
`;

const ReportDescription = ({ description }: ReportDescriptionProps) => {
  return (
    <ReportDescriptionLayout>
      <ReportDescriptionVerticalBox>
        <span />
        <span />
      </ReportDescriptionVerticalBox>
      <ReportDescriptionHorizontalBox>
        <span />
        <span />
      </ReportDescriptionHorizontalBox>
      <ReportDescriptionBox>
        <ReportDescriptionContainer>
          <ReportDescriptionText>{description}</ReportDescriptionText>
        </ReportDescriptionContainer>
      </ReportDescriptionBox>
    </ReportDescriptionLayout>
  );
};

export default ReportDescription;
