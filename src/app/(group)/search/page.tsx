'use client';

import { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';

import { Loading } from '@/app/(group)/components';
import { SearchResult, Table, EmptyResult } from '@/app/(group)/search/components';
import { useFetchReportListQuery } from '@/queries';
import { useIntersectionObserver } from '@/hooks';

const SearchPageLayout = styled.div`
  padding-top: 32px;
  padding-left: 7%;
  display: flex;

  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchPageLeftCol = styled.div`
  width: 233px;
  display: flex;
  flex-direction: column;
`;

const SearchPageRightCol = styled.div`
  width: 841px;
  width: calc(93% - 233px);
`;

const SearchPageText = styled.span`
  font-weight: 700;
  font-size: 15px;
  line-height: 24px;
  height: 51px;
  border-bottom: 1px solid #00000033;
  padding: 13px 8px 13px 0px;
`;

const SearchPageIntersectionObserverElement = styled.div`
  width: 100%;
  height: 10px;
`;

const data = {
  items: [
    {
      corp_cls: '',
      corp_name: '삼성전자',
      corp_code: "{{urlParam 'corp_code'}}",
      stock_code: '005930',
      report_name: '임원ㆍ주요주주특정증권등소유상황보고서',
      reception_number: '20240611000462',
      filer_name: '송재혁',
      reception_date: '20240611',
      remark: '공',
    },
    {
      corp_cls: 'Y',
      corp_name: '삼성전자',
      corp_code: "{{urlParam 'corp_code'}}",
      stock_code: '005930',
      report_name: '임원ㆍ주요주주특정증권등소유상황보고서',
      reception_number: '20240607000054',
      filer_name: '윤주한',
      reception_date: '20240607',
      remark: '유',
    },
    {
      corp_cls: 'Y',
      corp_name: '삼성전자',
      corp_code: "{{urlParam 'corp_code'}}",
      stock_code: '005930',
      report_name: '임원ㆍ주요주주특정증권등소유상황보고서',
      reception_number: '20240607000045',
      filer_name: '박순철',
      reception_date: '20240607',
      remark: '코',
    },
    {
      corp_cls: 'Y',
      corp_name: '삼성전자',
      corp_code: "{{urlParam 'corp_code'}}",
      stock_code: '005930',
      report_name: '임원ㆍ주요주주특정증권등소유상황보고서',
      reception_number: '20240607000008',
      filer_name: '김동욱',
      reception_date: '20240607',
      remark: '채',
    },
    {
      corp_cls: 'Y',
      corp_name: '삼성전자',
      corp_code: "{{urlParam 'corp_code'}}",
      stock_code: '005930',
      report_name: '임원ㆍ주요주주특정증권등소유상황보고서',
      reception_number: '20240604000031',
      filer_name: '노태문',
      reception_date: '20240604',
      remark: '넥',
    },
  ],
  total: 2819,
  page: 1,
  pages: 10,
  size: 50,
  matched_corps_meta: {
    삼성전자: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 255,
    },
    삼성물산: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 125,
    },
    삼성전자1: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 255,
    },
    삼성물산1: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 125,
    },

    삼성전자2: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 255,
    },
    삼성물산2: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 125,
    },
    삼성전자4: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 255,
    },
    삼성물산5: {
      corp_code: "{{urlParam 'corp_code'}}",
      count: 125,
    },
  },
  selected_corp: '',
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const corporationName = searchParams.get('name');
  const corporationCode = searchParams.get('code');
  const [page, setPage] = useState<number>(1);
  const [selectedCorporation, setSelectedCorporation] = useState<string>('');
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { isLoading, isError, error } = useFetchReportListQuery(corporationName, corporationCode, {
    page,
    size: 30,
    selected_corp: selectedCorporation,
  });

  const handleClickCorporation = (corporation: string) => {
    setPage(1);
    setSelectedCorporation(corporation);
  };

  //update page function for useIntersectionObserver hook
  const observerCallback = useCallback(() => {
    if (page >= data.pages) return;

    setPage((page) => page + 1);
  }, [page, selectedCorporation]);

  useIntersectionObserver(observerCallback, observerRef);

  // if (isLoading) {
  //   return <Loading style={{ width: '90px', height: '90px' }} isVisibleText={true} />;
  // }

  // if (isError) {
  //   throw error
  // }

  return data?.items?.length > 0 ? (
    <SearchPageLayout>
      <SearchPageLeftCol>
        <SearchPageText>{corporationName}</SearchPageText>
        <SearchResult
          result={data.size}
          selectedCorporation={selectedCorporation}
          corporations={data.matched_corps_meta}
          onClickCorporation={handleClickCorporation}
        />
      </SearchPageLeftCol>
      <SearchPageRightCol>
        <Table page={page} selectedCorporation={selectedCorporation} />
        <SearchPageIntersectionObserverElement ref={observerRef} />
      </SearchPageRightCol>
    </SearchPageLayout>
  ) : (
    <EmptyResult />
  );
};

export default SearchPage;
