import { useState } from 'react';
import { Badge, Button, Box, Center, Flex, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import CardWithScale from '../CardWithScale';
import ShowText from '../ShowText';

type Props = {
  examId: string;
  topic: string;
  description: string;
  isPublic: boolean;
  questionCount: number;
  recordCount: number;
};

function ExamInfoCard({
  examId,
  topic,
  description,
  isPublic,
  questionCount,
  recordCount,
}: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const goStartExamClickHandler = () => {
    router.push(`/restricted/exam/${examId}/start`);
  };
  const goExamRecordClickHandler = () => {
    router.push(`/restricted/exam/${examId}/record`);
  };

  const [isShowDescription, setIsShowDescription] = useState(false);
  const showDescriptionOnAnimationComplete = () => {
    // 動畫結束後，再延遲一下下，感覺上會好一點
    setTimeout(() => setIsShowDescription(true), 500);
  };

  return (
    <CardWithScale
      onAnimationComplete={() => showDescriptionOnAnimationComplete()}
    >
      <Box
        boxShadow="xl"
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Box p="6">
          <Flex>
            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
              {topic}
            </Box>
            <Spacer />
            {isPublic && (
              <Center>
                <Badge variant="outline" colorScheme="green">
                  Public
                </Badge>
              </Center>
            )}
          </Flex>

          <Box>{isShowDescription && <ShowText>{description}</ShowText>}</Box>

          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {questionCount} questions
          </Box>

          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {recordCount} records
          </Box>

          <Box mt="4">
            {questionCount > 0 && (
              <Button
                mr="3"
                variant="outline"
                colorScheme="teal"
                size="sm"
                isDisabled={!session}
                onClick={goStartExamClickHandler}
              >
                開始測驗
              </Button>
            )}

            {recordCount > 0 && (
              <Button
                variant="outline"
                colorScheme="blue"
                size="sm"
                isDisabled={!session}
                onClick={goExamRecordClickHandler}
              >
                成績紀錄
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </CardWithScale>
  );
}

export default ExamInfoCard;
