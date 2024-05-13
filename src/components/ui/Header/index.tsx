'use client';

import { Burger, Container, Flex, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

import classes from './styles.module.css';

import { ColorSchemeToggle } from '@/components/utils/ColorSchemeToggle';
import LocaleSwitcher from '@/components/utils/LanguageSwitcher';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <button
      type="button"
      key={link.label}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </button>
  ));

  return (
    <header
      className={classes.header}
      style={{
        height: opened ? 'fit-content' : '3.75rem',
      }}
    >
      <Container size="md" className={classes.inner}>
        <Text fw={900} size="lg">
          Caelus
        </Text>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Group gap={5} visibleFrom="xs">
          <ColorSchemeToggle />
          <LocaleSwitcher />
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>

      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{
          visibility: opened ? 'visible' : 'hidden',
        }}
        hiddenFrom="xs"
      >
        <ColorSchemeToggle />
        <Flex mb="sm">
          <LocaleSwitcher />
        </Flex>
        {items}
      </Flex>
    </header>
  );
}
