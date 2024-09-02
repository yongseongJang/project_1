import { useQuery, useMutation } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/queries';
import { API } from '@/apis';

const api = new API();

export const useFetchReportListQuery = (
  corporationName: string,
  corporationCode: string,
  params?: { [key: string]: any } = {},
) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [QUERY_KEYS.fetchReportList, corporationName, params],
    queryFn: async () => {
      const response = await api.get(
        `/report/${corporationCode ? corporationCode : corporationName}`,
        params,
      );

      return response.data;
    },
  });

  return { isLoading, isError, error, data };
};

export const useFetchReportIndexQuery = (reportID: string) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [QUERY_KEYS.fetchReportIndex, reportID],
    queryFn: async () => {
      const response = await api.get(`/report/get/toc/${reportID}`);

      return response.data;
    },
  });

  return { isLoading, isError, error, data };
};

export const useFetchReportQuery = (reportID: string, label: string) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [QUERY_KEYS.fetchReport, reportID, label],
    queryFn: async () => {
      await api.get(`/auth/get-state`)

      const response = await api.get(`/report/get/report/${reportID}/${label}`);

      return response.data;
    },
  });

  return { isLoading, isError, error, data };
};

export const useDescribeMutation = () => {
  return useMutation({
    mutationFn: async (prompt: string) => {
      return await api.post(`/openai`, { prompt });
    },
  });
};
