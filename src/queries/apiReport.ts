import { useQuery, useMutation } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/queries';
import { API } from '@/apis';

import { reportIndex } from '@/app/(group)/report/reportIndex'
import { data as reportContent1 } from '@/app/(group)/report/reportContent1'
import { data as reportContent2 } from '@/app/(group)/report/reportContent2'
import { data as reportContent3 } from '@/app/(group)/report/reportContent3'

const api = new API();

const fetchReportListQueryMockData = {
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
};

export const useFetchReportListQuery = (
  queryKeyItem: string,
  corporationName: string,
  corporationCode: string,
  params?: { [key: string]: any } = {},
) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [QUERY_KEYS.fetchReportList, queryKeyItem, corporationName, corporationCode],
    queryFn: async () => {
      const response = await api.get(
        `/report/${corporationCode ? corporationCode : corporationName}`,
        params,
      );

      return response.data;
    },
    retry: false,
  });

  let mockData = { items: [] }
  if (/^(삼|삼성|삼성전|삼성전자)/.test(corporationName)) {
    mockData = fetchReportListQueryMockData  
  }

  return { isLoading, isError, error, data: mockData };
};

export const useFetchReportIndexQuery = (reportID: string) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [QUERY_KEYS.fetchReportIndex, reportID],
    queryFn: async () => {
      const response = await api.get(`/report/get/toc/${reportID}`);

      return response.data;
    },
    retry: false,
  });

  let mockData = reportIndex

  return { isLoading, isError, error, data: mockData };
};

export const useFetchReportQuery = (reportID: string, label: string) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [QUERY_KEYS.fetchReport, reportID, label],
    queryFn: async () => {
      await api.get(`/auth/get-state`)

      const response = await api.get(`/report/get/report/${reportID}/${label}`);

      return response.data;
    },
    retry: false,
  });

  const mockData = [ reportContent1, reportContent2, reportContent3 ]

  return { isLoading, isError, error, data: mockData };
};

export const useDescribeMutation = () => {
  return useMutation({
    mutationFn: async (prompt: string) => {
      return await api.post(`/openai`, { prompt });
    },
  });
};
