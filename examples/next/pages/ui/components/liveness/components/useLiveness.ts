import { useState, useEffect } from 'react';
// import { API } from 'aws-amplify';
// import useSWR from 'swr';
import axios from 'axios';

export function useLiveness() {
  const [isLivenessActive, setLivenessActive] = useState(false);
  const [getLivenessResponse, setGetLivenessResponse] = useState(null);
  const [createLivenessSessionApiLoading, setCreateLivenessSessionApiLoading] =
    useState(true);
  const [createLivenessSessionApiData, setCreateLivenessSessionApiData] =
    useState(null);
  const createLivenessSessionApiError = false;

  useEffect(() => {
    const fetchCreateLiveness = async () => {
      const { data } = await axios.post(
        'https://preprod-api-face-capture.leegality.com/create-session'
      );
      console.log('createSession', { data });
      setCreateLivenessSessionApiData({ sessionId: data.session_id });
      setCreateLivenessSessionApiLoading(false);
    };

    fetchCreateLiveness();
  }, []);

  // let {
  //   data: createLivenessSessionApiData,
  //   error: createLivenessSessionApiError,
  //   isValidating: createLivenessSessionApiLoading,
  //   mutate,
  // } = useSWR(
  //   'CreateStreamingLivenessSession',
  //   () => API.post('BYOB', '/liveness/create', {}),
  //   { revalidateOnFocus: false }
  // );

  // createLivenessSessionApiError = false;
  // createLivenessSessionApiData = {
  //   sessionId: 'ab570848-ff04-4949-adce-6d16ac188a88'
  // }

  const handleCreateLivenessSession = () => {
    setLivenessActive(true);
  };

  const handleExit = () => {
    stopLiveness();
  };

  const handleUserExit = (event: CustomEvent) => {
    event.preventDefault();
    stopLiveness();
  };

  const handleSuccess = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    stopLiveness();
  };

  const stopLiveness = () => {
    setLivenessActive(false);
    setGetLivenessResponse(null);
    // mutate();
  };

  const handleGetLivenessDetection = async (sessionId: any) => {
    const { data } = await axios.get(
      `https://preprod-api-face-capture.leegality.com/get-session-results?session_id=${sessionId}`
    );
    console.log('handleAnalysisComplete', { data });
    setGetLivenessResponse(data);
  };

  return {
    isLivenessActive,
    getLivenessResponse,
    handleCreateLivenessSession,
    handleExit,
    handleUserExit,
    handleSuccess,
    handleGetLivenessDetection,
    stopLiveness,
    createLivenessSessionApiData,
    createLivenessSessionApiError,
    createLivenessSessionApiLoading,
  };
}
