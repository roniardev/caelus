'use client';

import { Burger, Container, Flex, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';

import classes from './styles.module.css';

import { ColorSchemeToggle } from '@/components/utils/ColorSchemeToggle';
import LocaleSwitcher from '@/components/utils/LanguageSwitcher';

import { usePathname } from '@/navigation';

const links = [{ link: '/bento', label: 'Bento' }];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const pathName = usePathname();

  const items = links.map((link) => (
    <Link
      href={link.link}
      prefetch
      key={link.label}
      className={classes.link}
      data-active={pathName === link.link || undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <header
      className={classes.header}
      style={{
        height: opened ? 'fit-content' : '3.75rem',
        zIndex: 100,
      }}
    >
      <Container size="md" className={classes.inner}>
        <Text fw={900} size="lg">
          Caelus
        </Text>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Group gap={12} visibleFrom="xs">
          <ColorSchemeToggle />
          <LocaleSwitcher />
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="xs"
          size="sm"
          aria-label="Show list menu"
        />
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
