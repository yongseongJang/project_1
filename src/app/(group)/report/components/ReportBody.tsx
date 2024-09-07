'use client';

import { forwardRef, useRef, useCallback, MutableRefObject } from 'react';
import styled from 'styled-components';

import { ReportContent } from '.';
import { useIntersectionObserver } from '@/hooks';

const ReportBodyLayout = styled.div`
  height: calc(100% - 52px);
  width: 100%;
  overflow-y: scroll;
  padding: 0px 22.5px 0px 24px;

  position: relative;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e6e6e6;
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

const ReportBodyIntersectionObserverElement = styled.div`
  width: 100%;
  height: 10px;
`;

interface ReportBodyProps {
  reportID: string;
  indexLabels: string[];
  currentIndexLabel: string;
  updateCurrentIndexLabel: (indexLabel: string) => void;
  fetchedIndexLabelRef: MutableRefObject<string>;
}

const ReportBody = forwardRef<ReportBodyProps, { [key: string]: HTMLElement }>(
  (
    { reportID, indexLabels, currentIndexLabel, updateCurrentIndexLabel, fetchedIndexLabelRef },
    ref,
  ) => {
    const observerRef = useRef<HTMLDivElement | null>(null);
    let beforeCurrentIndexLabel = true;

    const observerCallback = useCallback(() => {
      if (typeof ref === 'function' || !ref || !ref.current || !ref.current[currentIndexLabel]) return;

      const i = indexLabels.indexOf(fetchedIndexLabelRef.current);

      if (i + 1 === indexLabels.length) return;

      updateCurrentIndexLabel(indexLabels[i + 1]);
    }, [currentIndexLabel]);

    useIntersectionObserver(observerCallback, observerRef);

    return (
      <ReportBodyLayout>
        {indexLabels.map((indexLabel: string, i: number) => {
          if (!beforeCurrentIndexLabel) return;

          if (indexLabel === fetchedIndexLabelRef.current) {
            beforeCurrentIndexLabel = false;
          }

          return (
            <ReportContent
              key={`${reportID}_${indexLabel}`}
              reportID={reportID}
              indexLabel={indexLabel}
              ref={ref}
            />
          );
        })}
        <ReportBodyIntersectionObserverElement ref={observerRef} />
      </ReportBodyLayout>
    );
  },
);

ReportBody.displayName = 'ReportBody'

export default ReportBody;
