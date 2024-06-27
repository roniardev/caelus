import { Icon } from '@iconify/react';
import { showNotification } from '@mantine/notifications';
import { match } from 'ts-pattern';

type NotificationProps = {
  title: string;
  message: string;
  type: 'success' | 'info' | 'loading' | 'error';
};

export const useShowNotification = () => (props: NotificationProps) => {
  showNotification({
    title: props.title,
    message: props.message,
    withBorder: true,
    autoClose: 5000,
    color: match(props.type)
      .with('success', () => 'green.6')
      .with('info', () => 'teal.6')
      .with('loading', () => 'blue.6')
      .with('error', () => 'red.6')
      .exhaustive(),
    radius: 'md',
    loading: match(props.type)
      .with('loading', () => true)
      .otherwise(() => false),
    icon: match(props.type)
      .with('success', () => (
        <Icon icon="tabler:check" width={14} height={14} />
      ))
      .with('info', () => (
        <Icon icon="mdi:information" width={14} height={14} />
      ))
      .with('loading', () => (
        <Icon icon="tabler:loader" width={14} height={14} />
      ))
      .with('error', () => (
        <Icon icon="tabler:alert-triangle" width={14} height={14} />
      ))
      .exhaustive(),
  });
};
