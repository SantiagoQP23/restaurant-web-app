import { AxiosCall } from '../models';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false);
  // const [controller, setController] = useState<AbortController | null >(null);
  let controller: AbortController;

  const callEndpoint = async (axiosCall: AxiosCall<any>) => {
    // if (axiosCall.controller) setController(axiosCall.controller);
    if (axiosCall.controller) controller = axiosCall.controller;

    setLoading(true);
    let result = {} as AxiosResponse<any>;
    try {
      result = await axiosCall.call;
    } catch (err: any) {
      setLoading(false);
      throw err;
    }
    setLoading(false);
    return result;
  };

  const cancelEndpoint = () => {
    if (controller) {
      controller.abort();
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, []);

  return { loading, callEndpoint, cancelEndpoint };
};
