import { Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

import classes from './Welcome.module.css';

export function Welcome() {
  const t = useTranslations('Home');

  return (
    <>
      <Title className={classes.title} ta="center">
        {t('title')}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'pink', to: 'yellow' }}
        >
          Caelus
        </Text>
      </Title>
      <Text ta="center" size="lg" maw={580} mx="auto" mt="xl" fw={600}>
        {t('subtitle')}
      </Text>
    </>
  );
}
