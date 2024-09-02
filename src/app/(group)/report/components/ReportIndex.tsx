'use client';

import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import foldImage from '@/static/images/fold.png';
import unfoldImage from '@/static/images/unfold.png';

const ReportIndexLayout = styled.div`
  display: flex;
  flex-direction: column;

  width: 354px;
  height: calc(100% - 68px);
  border-radius: 0px 0px 16px 16px;
  border-width: 0px 0.6px 0.6px 0.6px;
  border-style: solid;
  border-color: #b0bec5;
  background-color: #f7f7f7;

  position: absolute;
  overflow-y: scroll;
  z-index: 2;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cccccc;
    heigth: 100px;
    border-radius: 100px;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #999999;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-track {
    width: 5px;
  }
`;

const ReportIndexBox = styled.div`
  border-bottom: 0.6px solid #e6e6e6;
  padding: 11px 0px;
`;

const ReportIndexRow = styled.div<{ $shouldPadding: boolean }>`
  display: flex;
  padding: 6px 0px 6px 0px;
  padding-left: ${(props) => (props.$shouldPadding ? '24px' : '0px')};
`;

const ReportIndexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReportIndexVerticalLine = styled.div`
  border: 0 solid #00000033;
  border-left-width: 2px;
  border-style: dotted;
  margin-top: 3px;
  margin-left: 32px;
  height: 100%;
`;

const ReportIndexHorizontalLine = styled.div<{ $showBorder: boolean }>`
  border: 0 solid #00000033;
  border-top-width: ${(props) => (props.$showBorder ? '2px' : '0px')};
  border-style: dotted;
  margin-top: 8px;
  width: 19px;
`;

const ReportIndexImageBox = styled.div`
  cursor: pointer;
`;

const ReportIndexText = styled.span`
  padding-left: 8px;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  color: #000000cc;
  cursor: pointer;

  &:hover {
    font-weight: 600;
  }
`;

type ReportIndexType = {
  title_name: string;
  title_label: string;
  children: ReportIndexType[];
};

interface ReportIndexProps {
  index: any;
  onClickIndexLabel: (indexLabel: string) => void;
}

const createElementRecursive = (
  title: string,
  label: string,
  children: ReportIndexType[],
  isChildElement: boolean,
  onClickIndexLabel: (indexLabel: string) => void,
  foldStatus: { [key: string]: boolean },
  handleClickFoldImage: (label: string) => void,
  indexLabelFoldStatus: { [key: string]: boolean },
): ReactNode => {
  if (children.length > 0) {
    foldStatus[label] = false;
  }
  return (
    <>
      <ReportIndexRow $shouldPadding={children.length > 0}>
        <ReportIndexCol>
          {children.length > 0 ? (
            <ReportIndexImageBox onClick={() => handleClickFoldImage(label)}>
              <Image
                src={indexLabelFoldStatus[label] ? foldImage : unfoldImage}
                alt='unfold image'
              />
            </ReportIndexImageBox>
          ) : (
            <ReportIndexHorizontalLine $showBorder={isChildElement} />
          )}
        </ReportIndexCol>
        <ReportIndexCol>
          <ReportIndexText onClick={() => onClickIndexLabel(label)}>{title}</ReportIndexText>
        </ReportIndexCol>
      </ReportIndexRow>
      {children.length > 0 && !indexLabelFoldStatus[label] && (
        <ReportIndexRow $sholudPadding={true}>
          <ReportIndexCol>
            <ReportIndexVerticalLine />
          </ReportIndexCol>
          <ReportIndexCol>
            {children.map((child) => {
              return createElementRecursive(
                child.title_name,
                child.title_label,
                child.children,
                true,
                onClickIndexLabel,
                foldStatus,
                handleClickFoldImage,
                indexLabelFoldStatus,
              );
            })}
          </ReportIndexCol>
        </ReportIndexRow>
      )}
    </>
  );
};

const ReportIndex = ({ index, onClickIndexLabel }: ReportIndexProps) => {
  const [indexLabelFoldStatus, setIndexLabelFoldStatus] = useState<{ [key: string]: boolean }>({});
  const foldStatus: { [key: string]: boolean } = {};

  useEffect(() => {
    setIndexLabelFoldStatus(foldStatus);
  }, []);

  const handleClickFoldImage = (label: string) => {
    setIndexLabelFoldStatus((indexLabelFoldStatus) => ({
      ...indexLabelFoldStatus,
      [label]: !indexLabelFoldStatus[label],
    }));
  };

  return (
    <ReportIndexLayout>
      {index.map((reportIndex: ReportIndexType) => {
        return (
          <ReportIndexBox key={reportIndex.title_label}>
            {createElementRecursive(
              reportIndex.title_name,
              reportIndex.title_label,
              reportIndex.children,
              false,
              onClickIndexLabel,
              foldStatus,
              handleClickFoldImage,
              indexLabelFoldStatus,
            )}
          </ReportIndexBox>
        );
      })}
    </ReportIndexLayout>
  );
};

export default ReportIndex;
