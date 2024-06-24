import { Container } from '@mantine/core';

import { Welcome } from './sections/Welcome/Welcome';

const HomePageFeatures: React.FC = () => (
  <Container py="md">
    <Welcome />
  </Container>
);

export default HomePageFeatures;
