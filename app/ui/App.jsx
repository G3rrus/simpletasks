import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  ColorModeScript,
  extendTheme,
  ChakraProvider,
  Box,
} from '@chakra-ui/react';
import { Navbar } from './common/Navbar';
import { Footer } from './common/Footer';
import './i18n';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      'html, body': {
        bg: props.colorMode === 'dark' ? 'red.200' : 'red.200',
      },
    //   a: {
    //     bg: props.colorMode === 'dark' ? 'teal.300' : 'red.500',
    //   },
    }),
  },
});

export const App = () => (
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <Navbar />
      <Box maxW="6xl" mx="auto">
        <Outlet />
      </Box>
      <Footer />
    </ChakraProvider>
  </>
);
