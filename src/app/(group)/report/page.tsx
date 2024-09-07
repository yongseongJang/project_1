'use client';

import { createElement, useState, useRef, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';

import { ReportHeader, ReportIndex, ReportBody, ReportLoginBanner } from './components';
import { Loading } from '@/app/(group)/components';
import { useFetchReportIndexQuery } from '@/queries';

import { reportIndex as data } from './reportIndex.ts';

const ReportPageLayout = styled.div`
  position: relative;
  height: 100%;
`;

const ReportPage = () => {
  const searchParams = useSearchParams();
  const reportID = searchParams.get('receptionNumber');
  const [isVisibleBanner, setIsVisibleBanner] = useState<boolean>(false);
  const [isVisibleReportIndex, setIsVisibleReportIndex] = useState<boolean>(false);
  const [currentIndexLabel, setCurrentIndexLabel] = useState<string>('1-0-0');
  const fetchedIndexLabelRef = useRef<string>(currentIndexLabel);
  const contentRef = useRef<{ [key: string]: HTMLElement }>({});

  const { isLoading, isError, error, data } = useFetchReportIndexQuery(reportID);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    //setIsVisibleBanner(true)
  };

  const handleReportIndex = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsVisibleReportIndex((isVisibleReportIndex) => !isVisibleReportIndex);
  };

  const handleClickIndexLabel = (indexLabel: string) => {
    setCurrentIndexLabel(indexLabel);

    if (data.toc_arr.indexOf(indexLabel) > data.toc_arr.indexOf(fetchedIndexLabelRef.current)) {
      contentRef.current[fetchedIndexLabelRef.current].scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
      fetchedIndexLabelRef.current = indexLabel;
    }
  };

  useEffect(() => {
    contentRef.current[currentIndexLabel]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [currentIndexLabel, contentRef.current]);

  if (isLoading) {
    return <Loading style={{ width: '90px', height: '90px' }} isVisibleText={true} />;
  }

  // if (isError) {
  //   throw error
  // }

  return (
    data && (
      <ReportPageLayout onWheel={handleWheel}>
        <ReportHeader
          isVisibleReportIndex={isVisibleReportIndex}
          onClickFoldBtn={handleReportIndex}
        />
        {isVisibleReportIndex && (
          <ReportIndex index={data.toc_data} onClickIndexLabel={handleClickIndexLabel} />
        )}
        <ReportBody
          reportID={reportID}
          indexLabels={data.toc_arr}
          currentIndexLabel={currentIndexLabel}
          updateCurrentIndexLabel={handleClickIndexLabel}
          fetchedIndexLabelRef={fetchedIndexLabelRef}
          ref={contentRef}
        />
        {isVisibleBanner && <ReportLoginBanner />}
      </ReportPageLayout>
    )
  );
};

export default ReportPage;
