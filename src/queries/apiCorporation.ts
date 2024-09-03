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
    retry: false
  });

  let mockData = []
  if (/^(삼|삼성|삼성전|삼성전자)/.test(corporation)) {
    mockData =  [ 
        {
          corp_name: '삼성전자 서비스주식회사',
          corp_code: '00258999',
          stock_name: '삼성전자서비스',
          stock_code: '', 
        },  
        {
          corp_name: '삼성전자서비스씨에스 주식회사',
          corp_code: '01345812',
          stock_name: '삼성전자서비스씨에스',
          stock_code: '', 
        },  
        {
          corp_name: '삼성전자판매 주식회사',
          corp_code: '00252074',
          stock_name: '삼성전자판매',
          stock_code: '', 
        },  
        {
          corp_name: '삼성전자로지텍(주)', 
          corp_code: '00366997',
          stock_name: '삼성전자로지텍',
          stock_code: '', 
        },  
    ];
  }

  return { isLoading, isError, error, data: mockData };
};
