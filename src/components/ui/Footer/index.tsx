'use client';

import { ActionIcon, Container, Group, rem, Text } from '@mantine/core';
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import classes from './styles.module.css';

export function Footer() {
  const t = useTranslations('Footer');

  const data = useMemo(
    () => [
      {
        title: t('About.head'),
        links: [
          { label: t('About.features'), link: '#' },
          { label: t('About.pricing'), link: '#' },
          { label: t('About.support'), link: '#' },
          { label: t('About.forums'), link: '#' },
        ],
      },
      {
        title: t('Project.head'),
        links: [
          { label: t('Project.contribute'), link: '#' },
          { label: t('Project.mediaAssets'), link: '#' },
          { label: t('Project.changelog'), link: '#' },
          { label: t('Project.releases'), link: '#' },
        ],
      },
      {
        title: t('Community.head'),
        links: [
          { label: t('Community.joinDiscord'), link: '#' },
          { label: t('Community.followTwitter'), link: '#' },
          { label: t('Community.emailNewsletter'), link: '#' },
          { label: t('Community.githubDiscussion'), link: '#' },
        ],
      },
    ],

    [t],
  );

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        size="xs"
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Text size="lg" fw={900}>
            Caelus
          </Text>
          <Text size="xs" className={classes.description}>
            {t('subTitle')}
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text size="sm" fw={600}>
          © {new Date().getFullYear()} roniar.dev, {t('copyRight')}
        </Text>

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
