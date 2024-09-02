import { useQuery, useMutation } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/queries';
import { API } from '@/apis';

const api = new API();

export const useNaverLoginQuery = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [QUERY_KEYS.fetchNaverLogin],
    queryFn: async () => {
        const response = await api.get('/auth/naver/client')

        return response.data
    }
  })

  return { isLoading, isError, error, data } 
}

export const useGoogleLoginQuery = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [QUERY_KEYS.fetchGoogleLogin],
    queryFn: async () => {
        const response = await api.get('/auth/google/client')

        return response.data
    }
  })

  return { isLoading, isError, error, data } 
}

