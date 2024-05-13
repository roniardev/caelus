import { Container, Flex, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { Welcome } from './sections/Welcome/Welcome';

const HomePageFeatures: React.FC = () => {
  const t = useTranslations('Home');

  return (
    <Container py="md">
      <Welcome />
      <Flex direction="column" gap="md" mt="md">
        <Text size="sm">{t('firstParagraph')}</Text>
        <Text size="sm">{t('secondParagraph')}</Text>
        <Text size="sm">{t('thirdParagraph')}</Text>
      </Flex>
    </Container>
  );
};

export default HomePageFeatures;
