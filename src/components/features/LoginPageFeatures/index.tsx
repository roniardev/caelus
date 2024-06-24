import { Container, em } from '@mantine/core';

import { LoginForm } from './sections/LoginForm';

const LoginPageFeatures: React.FC = () => (
  <Container maw={em(480)} w="100%">
    <LoginForm />
  </Container>
);

export default LoginPageFeatures;
