import { useAuth } from '@clerk/clerk-expo';
import { useMemo } from 'react';

import { createApiClient } from '../api/client';

export const useApiClient = () => {
  const { getToken } = useAuth();

  return useMemo(() => createApiClient(() => getToken()), [getToken]);
};
