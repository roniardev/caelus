import { Container, Flex, Text } from '@mantine/core';

import { Welcome } from './sections/Welcome/Welcome';

const HomePageFeatures: React.FC = () => (
  <Container py="md">
    <Welcome />
    <Flex direction="column" gap="md" mt="md">
      <Text>
        Organizations are looking for developers with the skills to build modern
        apps, which can dramatically increase agility, release velocity, and
        enable you to build more reliable, scalable applications. Interested in
        growing your skills in this in-demand area? We recommend AWS
        Modernization Pathways: Move to Cloud Native Serverless on AWS Skill
        Builder, our official online learning center.
      </Text>
      <Text>
        Organizations are looking for developers with the skills to build modern
        apps, which can dramatically increase agility, release velocity, and
        enable you to build more reliable, scalable applications. Interested in
        growing your skills in this in-demand area? We recommend AWS
        Modernization Pathways: Move to Cloud Native Serverless on AWS Skill
        Builder, our official online learning center.
      </Text>
      <Text>
        Organizations are looking for developers with the skills to build modern
        apps, which can dramatically increase agility, release velocity, and
        enable you to build more reliable, scalable applications. Interested in
        growing your skills in this in-demand area? We recommend AWS
        Modernization Pathways: Move to Cloud Native Serverless on AWS Skill
        Builder, our official online learning center.
      </Text>
      <Text>
        Organizations are looking for developers with the skills to build modern
        apps, which can dramatically increase agility, release velocity, and
        enable you to build more reliable, scalable applications. Interested in
        growing your skills in this in-demand area? We recommend AWS
        Modernization Pathways: Move to Cloud Native Serverless on AWS Skill
        Builder, our official online learning center.
      </Text>
    </Flex>
  </Container>
);

export default HomePageFeatures;
