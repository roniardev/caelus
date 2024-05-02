'use client';

import {
  ActionIcon,
  Burger,
  Container,
  Flex,
  Group,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react';
import { useState } from 'react';

import classes from './styles.module.css';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Text fw={900} size="lg">
          Caleus
        </Text>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Group gap={5} visibleFrom="xs">
          <ActionIcon
            variant="outline"
            color={colorScheme === 'dark' ? 'yellow' : 'blue'}
            onClick={toggleColorScheme}
            title="Toggle color scheme"
          >
            {colorScheme === 'dark' ? (
              <IconSunFilled size={18} />
            ) : (
              <IconMoonFilled size={18} />
            )}
          </ActionIcon>
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
      {opened && (
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{
            width: '100%',
          }}
          className={classes.mobileExpandContainer}
        >
          <ActionIcon
            variant="outline"
            color={colorScheme === 'dark' ? 'yellow' : 'blue'}
            onClick={toggleColorScheme}
            title="Toggle color scheme"
            my="md"
          >
            {colorScheme === 'dark' ? (
              <IconSunFilled size={18} />
            ) : (
              <IconMoonFilled size={18} />
            )}
          </ActionIcon>

          {items}
        </Flex>
      )}
    </header>
  );
}
