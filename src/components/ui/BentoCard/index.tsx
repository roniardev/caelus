import { Card, Flex, Text, Title } from '@mantine/core';

export function BentoCard() {
  return (
    <Flex direction="column" gap="md">
      <Flex
        direction="row"
        justify="space-between"
        style={{
          width: '100%',
        }}
        gap="xl"
      >
        <Card withBorder shadow="xs" radius="md" w="60%">
          <Title order={3}> What is Caleus?</Title>
          <Text mt="sm">
            Caleus adalah opiniated boilerplate berbasis: Next.js 14, Mantine
            v7. Panda CSS, React Query, next-intl. Dilengkapi dengan DX yang
            memudahkan penggunaannya untuk membuat Project dengan cepat
          </Text>
        </Card>
        <Card withBorder shadow="xs" radius="md" w="40%">
          <Title order={3}> What is Caleus?</Title>
        </Card>
      </Flex>
    </Flex>
  );
}
