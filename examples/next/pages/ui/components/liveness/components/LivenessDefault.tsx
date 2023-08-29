import { View, Flex, Loader, Text, SelectField } from '@aws-amplify/ui-react';
import {
  FaceLivenessDetector,
  FaceLivenessDetectorCore,
} from '@aws-amplify/ui-react-liveness';
import { useLiveness } from './useLiveness';
import { SessionIdAlert } from './SessionIdAlert';
import LivenessInlineResults from './LivenessInlineResults';
import { useEffect, useState } from 'react';

export default function LivenessDefault({
  disableInstructionScreen = false,
  components = undefined,
  credentialProvider = undefined,
}) {
  const {
    getLivenessResponse,
    createLivenessSessionApiError,
    createLivenessSessionApiData,
    createLivenessSessionApiLoading,
    handleGetLivenessDetection,
    stopLiveness,
  } = useLiveness();

  const [cameraDevices, setCameraDevices] = useState([]);
  const [deviceId, setDeviceId] = useState();

  if (createLivenessSessionApiError) {
    return <div>Some error occured...</div>;
  }

  function onUserCancel() {
    stopLiveness();
  }

  useEffect(() => {
    const getCameraDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      let count = 0;
      const videoDevices = [];
      devices.forEach((mediaDevice) => {
        if (mediaDevice.kind === 'videoinput') {
          count += 1;
          const option = {
            deviceId: mediaDevice.deviceId,
            label: mediaDevice.label || `Camera ${count}`,
          };
          videoDevices.push(option);
        }
      });

      setDeviceId(videoDevices[0].deviceId);
      console.log({ videoDevices });
      setCameraDevices(videoDevices);
    };

    getCameraDevices();
  }, []);

  const handleChangeDeviceId = (id) => {
    setDeviceId(id);
  };

  return (
    <View maxWidth="640px" margin="0 auto">
      {createLivenessSessionApiLoading ? (
        <Flex justifyContent="center" alignItems="center">
          <Loader /> <Text as="span">Loading...</Text>
        </Flex>
      ) : (
        <Flex
          direction="column"
          gap="xl"
          position="relative"
          style={{ zIndex: '2' }}
        >
          <SessionIdAlert sessionId={createLivenessSessionApiData.sessionId} />

          {!!getLivenessResponse ? (
            <LivenessInlineResults
              getLivenessResponse={getLivenessResponse}
              onUserCancel={onUserCancel}
            />
          ) : null}

          <Flex gap="0" direction="column" position="relative">
            {!getLivenessResponse ? (
              credentialProvider ? (
                <FaceLivenessDetectorCore
                  sessionId={createLivenessSessionApiData.sessionId}
                  region={'us-east-1'}
                  onUserCancel={onUserCancel}
                  onAnalysisComplete={async () => {
                    await handleGetLivenessDetection(
                      createLivenessSessionApiData.sessionId
                    );
                  }}
                  onError={(error) => {
                    console.error(error);
                  }}
                  disableInstructionScreen={disableInstructionScreen}
                  components={components}
                  config={{ credentialProvider }}
                />
              ) : (
                <>
                  <SelectField
                    label="Select Camera"
                    onChange={(e) => handleChangeDeviceId(e.target.value)}
                  >
                    {cameraDevices.map((camera) => (
                      <option value={camera.deviceId} key={camera.deviceId}>
                        {camera.label}
                      </option>
                    ))}
                  </SelectField>
                  <FaceLivenessDetector
                    sessionId={createLivenessSessionApiData.sessionId}
                    region={'ap-south-1'}
                    onUserCancel={onUserCancel}
                    onAnalysisComplete={async () => {
                      await handleGetLivenessDetection(
                        createLivenessSessionApiData.sessionId
                      );
                    }}
                    onError={(error) => {
                      console.error(error);
                    }}
                    disableInstructionScreen={disableInstructionScreen}
                    components={components}
                    deviceId={deviceId}
                  />
                </>
              )
            ) : null}
          </Flex>
        </Flex>
      )}
    </View>
  );
}
