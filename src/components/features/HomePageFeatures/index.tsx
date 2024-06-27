import { Container, Flex } from '@mantine/core';

import { ListPosts } from './sections/ListPosts';
import ModalCreatePost from './sections/ModalCreatePost';

const HomePageFeatures: React.FC = () => (
  <Container py="md" w="100%">
    <Flex direction="column" gap="md" w="100%">
      <ModalCreatePost />
      <ListPosts />
    </Flex>
  </Container>
);

export default HomePageFeatures;
