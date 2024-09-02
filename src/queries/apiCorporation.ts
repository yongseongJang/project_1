import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/queries';
import { API } from '@/apis';

const api = new API();

export const useFetchCorporationQuery = (corporation: string) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [QUERY_KEYS.fetchCorporation, corporation],
    queryFn: async () => {
      if (corporation.trim() === '') return {};

      const response = await api.get(`/corp?query=${corporation}`);

      return response.data;
    },
  });

  return { isLoading, isError, error, data };
};
