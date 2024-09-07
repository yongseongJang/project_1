'use client';

import { useState, useContext } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import { CorporationClassIcon } from '@/app/(group)/components';
import { ReportContext } from '@/contexts';

const ReportHeaderLayout = styled.div`
  display: flex;
`;

const ReportHeaderLeftRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 354px;
  height: 52px;
  padding: 0px 22.5px 0px 24px;
  border: 0.6px solid #b0bec5;
  border-left: 0;
  border-top: 0;
`;

const ReportHeaderRightRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 354px);
  height: 52px;
  border: 0.6px solid #b0bec5;
  border-left: 0;
  border-right: 0;
  border-top: 0;
`;

const ReportHeaderBox = styled.div`
  display: flex;
  align-items: center;
`;

const ReportHeaderText = styled.div`
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  color: #000000cc;
`;

const ReportHeaderFoldBtnBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  cursor: pointer;

  &:hover {
    background-color: #0000000a;
  }
`;

const ReportHeaderFoldBtn = styled.div<{ $isOpen: boolean }>`
  width: 10px;
  height: 10px;
  border: 1px solid #000000b2;
  border-bottom: 1.2px;
  border-left: 1.2px;
  transform: ${(props) => (props.$isOpen ? 'rotate(-45deg)' : 'rotate(135deg)')};
  margin-top: ${(props) => (props.$isOpen ? '17px' : '12px')};
  margin-left: 15px;
`;

const ReportHeaderAngleBracket = styled.div`
  width: 10px;
  height: 10px;
  border: 1px solid #000000b2;
  border-bottom: 1.2px;
  border-left: 1.2px;
  transform: rotate(45deg);

  margin: 0px 14.5px 0px 10px;
`;

const ReportHeaderCloseBtnBox = styled.div`
  margin-right: 28px;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  cursor: pointer;

  &:hover {
    background-color: #0000000a;
  }
`;

const ReportHeaderCloseBtn = styled.div`
  margin-left: 19.5px;
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 1.5px;
    top: 50%;
    height: 15px;
    background-color: #000000e5;
  }

  &:before {
    transform: translate(0%, 80%) rotate(45deg);
  }
  &:after {
    transform: translate(0%, 80%) rotate(-45deg);
  }
`;

interface ReportHeaderProps {
  isVisibleReportIndex: boolean;
  onClickFoldBtn: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ReportHeader = ({ isVisibleReportIndex, onClickFoldBtn } = ReportHeaderProps) => {
  const { reportContextValue, updateReportContextValue } = useContext(ReportContext);
  const router = useRouter();
  const handleClickCloseBtn = (e: React.MouseEvent<HTMLDivElement>) => {
    router.back();
  };

  return (
    <ReportHeaderLayout>
      <ReportHeaderLeftRow>
        <ReportHeaderText>문서 목차</ReportHeaderText>
        <ReportHeaderFoldBtnBox onClick={onClickFoldBtn}>
          <ReportHeaderFoldBtn $isOpen={isVisibleReportIndex} />
        </ReportHeaderFoldBtnBox>
      </ReportHeaderLeftRow>
      <ReportHeaderRightRow>
        <ReportHeaderBox>
          <CorporationClassIcon corporationClass={reportContextValue.corporationClass} />
          <ReportHeaderText>{reportContextValue.corporationName}</ReportHeaderText>
          <ReportHeaderAngleBracket />
          <ReportHeaderText>{reportContextValue.reportTitle}</ReportHeaderText>
        </ReportHeaderBox>
        <ReportHeaderCloseBtnBox onClick={handleClickCloseBtn}>
          <ReportHeaderCloseBtn />
        </ReportHeaderCloseBtnBox>
      </ReportHeaderRightRow>
    </ReportHeaderLayout>
  );
};

export default ReportHeader;
