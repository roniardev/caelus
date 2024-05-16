import { Button, Menu, rem, Text } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const locales = ['en', 'id'] as const;
  const t = useTranslations('Locales');

  return (
    <Menu>
      <Menu.Target>
        <Button size="xs" variant="default" color="orange" w={rem(150)}>
          {t(locale)}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t('selectTitle')}</Menu.Label>
        {locales.map((v) => (
          <Menu.Item disabled={v === locale}>
            <Link
              href={pathname.substring(0, 1) + v + pathname.substring(2 + 1)}
              key={v}
              prefetch
              aria-disabled={v === locale}
              scroll={false}
            >
              <Text size="xs">{t(v)}</Text>
            </Link>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
