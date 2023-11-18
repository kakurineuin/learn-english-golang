import {
  Flex,
  Box,
  Heading,
  Button,
  Spacer,
  Text,
  Center,
} from '@chakra-ui/react';

function Menus() {
  const homeClickHandler = () => {
    router.push('/');
  };
  const examClickHandler = () => {
    router.push('/restricted/exam');
  };
  const wordClickHandler = () => {
    router.push('/restricted/word');
  };
  const favoriteWordMeaningClickHandler = () => {
    router.push('/restricted/word/favorite');
  };
  const WordCardClickHandler = () => {
    router.push('/restricted/word/card');
  };
  const signUpHandler = () => {
    router.push('/auth/signup');
  };
  const signInHandler = () => {
    signIn(undefined, { callbackUrl: '/' });
  };
  const signOutHandler = () => {
    signOut({ callbackUrl: window.location.origin });
  };

  return (
    <Flex p="3" className="w-full backdrop-blur-md bg-gray-950/60">
      <Box p="2">
        <Heading size="md">Learn English</Heading>
      </Box>
      <Spacer />
      {session && (
        <Center mr={8}>
          <Text fontSize="xl">{session!.user!.name}</Text>
        </Center>
      )}
      <Box>
        {!session && (
          <Button
            colorScheme="red"
            variant="outline"
            mr="2"
            onClick={signUpHandler}
          >
            註冊
          </Button>
        )}

        {!session && (
          <Button
            colorScheme="teal"
            variant="outline"
            mr="2"
            onClick={signInHandler}
          >
            登入
          </Button>
        )}

        {session && (
          <Button
            colorScheme="teal"
            variant="outline"
            mr="2"
            onClick={signOutHandler}
          >
            登出
          </Button>
        )}

        <Button
          colorScheme="teal"
          variant="outline"
          mr="2"
          onClick={homeClickHandler}
        >
          首頁
        </Button>

        <Button
          colorScheme="teal"
          variant="outline"
          mr="2"
          isDisabled={!session}
          onClick={examClickHandler}
        >
          測驗管理 {!session && '(請先登入)'}
        </Button>

        <Button
          colorScheme="teal"
          variant="outline"
          mr="2"
          isDisabled={!session}
          onClick={wordClickHandler}
        >
          查詢單字 {!session && '(請先登入)'}
        </Button>

        <Button
          colorScheme="teal"
          variant="outline"
          mr="2"
          isDisabled={!session}
          onClick={favoriteWordMeaningClickHandler}
        >
          最愛的單字解釋 {!session && '(請先登入)'}
        </Button>

        <Button
          colorScheme="teal"
          variant="outline"
          mr="2"
          isDisabled={!session}
          onClick={WordCardClickHandler}
        >
          單字卡 {!session && '(請先登入)'}
        </Button>
      </Box>
    </Flex>
  );
}

export default Menus;
