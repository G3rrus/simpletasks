import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  Stack,
  extendTheme,
} from '@chakra-ui/react';
import { useTracker } from 'meteor/react-meteor-data';
import { Tasks } from './tasks/Tasks';
import { LoginForm } from './auth/LoginForm';
import { Navbar } from './common/Navbar';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Navbar user={user} />
        <Stack as={Box} spacing={{ base: 8 }}>
          {!user ? <LoginForm /> : <Tasks user={user} />}
        </Stack>
      </ChakraProvider>
    </>
  );
};
