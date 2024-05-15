import { Button, Menu, rem } from '@mantine/core';
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
        <Button size="xs" variant="outline" w={rem(150)}>
          {t(locale)}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Ganti Bahasa</Menu.Label>
        {locales.map((v) => (
          <Link
            href={pathname.substring(0, 1) + v + pathname.substring(2 + 1)}
            key={v}
            prefetch
          >
            <Menu.Item>{t(v)}</Menu.Item>
          </Link>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
