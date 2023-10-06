'use client';

import {
  ActionIcon,
  Burger,
  Container,
  Flex,
  Group,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

import useTheme from '@/stores/useTheme';

import { css } from '../../../../styled-system/css';

type HeaderSimpleProps = {
  links: { link: string; label: string }[];
};

function Nav({ links }: HeaderSimpleProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [, setActive] = useState('');
  const { state, send } = useTheme();
  const isDark = state.matches('dark');

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      onClick={() => {
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Flex py="md">
      <Container
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        })}
      >
        <Link href="/">Caleus</Link>
        <Group gap="sm">{items}</Group>
        <ActionIcon
          variant="outline"
          color={isDark ? 'yellow' : 'blue'}
          onClick={() => send('SWITCH')}
          title="Toggle color scheme"
        >
          {isDark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
        <Burger opened={opened} onClick={toggle} size="sm" />
      </Container>
      {opened && (
        <Group justify="center">
          {items.map((item) => (
            <Text key={item.key}>{item}</Text>
          ))}
          <ActionIcon
            variant="outline"
            color={isDark ? 'yellow' : 'blue'}
            onClick={() => send('SWITCH')}
            title="Toggle color scheme"
          >
            {isDark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
        </Group>
      )}
    </Flex>
  );
}

export default Nav;
