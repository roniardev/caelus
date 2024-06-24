'use client';

import {
  ActionIcon,
  Badge,
  Container,
  Divider,
  Flex,
  Group,
  rem,
  Text,
} from '@mantine/core';
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-react';
import { GeistMono } from 'geist/font';

import classes from './styles.module.css';

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Text size="lg" fw={900}>
            Caelus
          </Text>
          <Text size="xs" className={classes.description}>
            Caelus is a open source project
          </Text>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Flex direction="column" gap="sm" justify="center">
          <Text size="xs" fw={400}>
            © {new Date().getFullYear()} Caelus.
          </Text>
          <Divider
            size="xs"
            variant="dotted"
            labelPosition="center"
            color="cyan"
            className={GeistMono.className}
            label={
              <Badge size="xs" variant="outline" tt="uppercase" fw={700}>
                System Info
              </Badge>
            }
          />
          <Flex
            direction="row"
            align="center"
            gap="xs"
            className={GeistMono.className}
          >
            <Text size={rem(10)} fw={900} tt="uppercase">
              Version
            </Text>
            <Badge
              size="xs"
              variant="gradient"
              gradient={{ from: 'yellow', to: 'indigo', deg: 278 }}
            >
              DEV-2024.5.20
            </Badge>
            <Badge variant="dot" size="xs" color="green.5">
              Normal
            </Badge>
          </Flex>
        </Flex>
        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            aria-label="Our twitter link"
          >
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            aria-label="Our youtube link"
          >
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            aria-label="Our instagram link"
          >
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
