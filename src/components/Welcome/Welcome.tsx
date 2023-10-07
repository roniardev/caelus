import { Text, Title } from '@mantine/core';

import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'pink', to: 'yellow' }}
        >
          Caelus
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This is my opiniated Next.js starter. It is using Mantine.
      </Text>
    </>
  );
}
