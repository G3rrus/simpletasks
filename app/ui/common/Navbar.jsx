import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorMode,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from './Routes';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const toggleLanguage = () => {
      if (i18n.language === 'en') {
          i18n.changeLanguage('de');
      } else {
          i18n.changeLanguage('en');
      }
  }

  const logout = () => {
    Meteor.logout(() => {
      navigate(RoutePaths.ROOT);
    });
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('blue.300', 'blue.700')}
        color={useColorModeValue('messenger.800', 'messenger.200')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('blue.800', 'blue.800')}
        align="center"
      >
        <Flex flex={{ base: 1 }} justify="start">
          <Text
            textAlign="left"
            fontFamily="heading"
            color={useColorModeValue('messenger.800', 'messenger.200')}
          >
            <Link
              bg={useColorModeValue('messenger.800', 'messenger.200')}
              bgClip="text"
              onClick={() => navigate(RoutePaths.ROOT)}
            >
              {t('main.Title')}
            </Link>
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          <Button
            fontSize="sm"
            fontWeight={400}
            onClick={toggleLanguage}
            bg={useColorModeValue('blackAlpha.300', 'whiteAlpha.200')}
            _hover={{
                bg: `${useColorModeValue('blackAlpha.400', 'whiteAlpha.300')}`,
            }}
          >
          {i18n.language}
          </Button>
          <Button
            onClick={toggleColorMode}
            aria-label={colorMode === 'light' ? 'Sun Icon' : 'Moon Icon'}
            bg={useColorModeValue('blackAlpha.300', 'whiteAlpha.200')}
            _hover={{
                bg: `${useColorModeValue('blackAlpha.400', 'whiteAlpha.300')}`,
            }}
          >
            {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
          </Button>
          {user && (
            <Button
                fontSize="sm"
                fontWeight={400}
                onClick={logout}
                bg={useColorModeValue('blackAlpha.300', 'whiteAlpha.200')}
                _hover={{
                    bg: `${useColorModeValue('blackAlpha.400', 'whiteAlpha.300')}`,
                }}
            >
              {t('main.logout')}
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
