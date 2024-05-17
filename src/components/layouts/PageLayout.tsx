import { Flex } from '@mantine/core';
import { ReactNode } from 'react';

import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';

type Props = {
  children?: ReactNode;
};

export default function PageLayout({ children }: Props) {
  return (
    <Flex w="100vw" mih="100vh" direction="column" justify="space-between">
      <Header />
      <Flex
        my={100}
        style={{
          width: '100%',
        }}
        mih="70vh"
      >
        {children}
      </Flex>
      <Flex
        mah="60vw"
        w="100vw"
        style={{
          width: 'auto',
        }}
      >
        <Footer />
      </Flex>
    </Flex>
  );
}
