import { Button, LoadingOverlay, Modal, Text } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

import { logout } from '@/lib/auth/actions';

export default function Logout() {
  const [open, toggle] = useToggle();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      notifications.show({
        title: 'Logout',
        message: 'You have been logged out successfully',
        color: 'green',
        autoClose: 2000,
      });
    } catch (error) {
      notifications.show({
        title: 'Logout',
        message: 'An error occurred while logging out',
        color: 'red',
        autoClose: 2000,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <LoadingOverlay visible={loading} />
      <Button color="red.6" size="compact-md" onClick={() => toggle()}>
        Logout
      </Button>
      <Modal
        opened={open}
        onClose={() => {}}
        title="Logout"
        centered
        size="sm"
        withCloseButton
      >
        <Text>Are you sure you want to logout?</Text>
        <Button onClick={handleLogout}>Logout</Button>
      </Modal>
    </>
  );
}
