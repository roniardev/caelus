import { Flex } from '@mantine/core';

import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';

export default function LocaleLayout({ children }) {
  return (
    <Flex w="100vw" mih="100vh" direction="column" justify="space-between">
      <Header />
      {children}
      <Footer />
    </Flex>
  );
}
