import { Flex, Text, Image } from '@aws-amplify/ui-react';
import { Badge, Button } from '@aws-amplify/ui-react';

function truncateNumber(number, digitsAfterDot) {
  const str = `${number}`;
  const truncated = str.slice(0, str.indexOf('.') + digitsAfterDot + 1);
  return Math.max(parseFloat(truncated), 0.0001);
}

export default function LivenessInlineResults({
  getLivenessResponse,
  onUserCancel,
}) {
  // const { isLive, confidenceScore, auditImageBytes } = getLivenessResponse;
  console.log({ getLivenessResponse });

  // // Previously the rekognition backend passed the base64 string but from the api direclty you receive a byte array
  // var base64string = Buffer.from(
  //   new Uint8Array(Object.values(auditImageBytes))
  // ).toString('base64');
  // const displayScore = truncateNumber(confidenceScore, 4);
  return (
    <>
      <Flex as="div" direction="column">
        <Text>Liveness result:</Text>
        <Text margin="0 0.5rem">
          {JSON.stringify(getLivenessResponse, null, 4)}
        </Text>
      </Flex>
      {/* 
      <Text as="span" style={{ whiteSpace: 'nowrap' }}>
        Confidence score:
        <Badge variation={isLive ? 'success' : 'error'} margin="0 0.5rem">
          {displayScore}
        </Badge>
      </Text> */}

      {/* <Flex justifyContent="start">
        <Button variation="primary" type="button" onClick={onUserCancel}>
          Try again
        </Button>
      </Flex> */}

      {/* <Image
        width="100%"
        height="100%"
        src={`data:image/jpeg;base64,${base64string}`}
        alt="Audit image"
      /> */}
    </>
  );
}
