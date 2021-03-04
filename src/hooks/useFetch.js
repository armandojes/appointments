import { useEffect } from 'react';

const useFetch = (handler, deeps = []) => {
  useEffect(() => {
    handler();
  }, deeps);
};

export default useFetch;
