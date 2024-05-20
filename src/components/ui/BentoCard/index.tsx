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
        gap="md"
      >
        <Card withBorder w="60%">
          <Title order={4}> What is Caleus?</Title>
          <Text mt="sm" size="xs">
            Caleus adalah opiniated boilerplate berbasis: Next.js 14, Mantine
            v7. Panda CSS, React Query, next-intl. Dilengkapi dengan DX yang
            memudahkan penggunaannya untuk membuat Project dengan cepat
          </Text>
        </Card>
        <Card withBorder w="40%">
          <Title order={4}> What is Caleus?</Title>
        </Card>
      </Flex>
    </Flex>
  );
}
