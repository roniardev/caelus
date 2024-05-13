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
          <ColorSchemeToggle />
          <Flex mb="sm">
            <LocaleSwitcher />
          </Flex>
          {items}
        </Flex>
      )}
    </header>
  );
}
