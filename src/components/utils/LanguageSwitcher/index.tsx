import { Select } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

export default function LocaleSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale();
  const locales = ['en', 'id'] as const;
  const t = useTranslations('Locales');

  return (
    <Select
      size="xs"
      disabled={isPending}
      data={locales.map((v) => ({
        label: t(v),
        value: v,
        disabled: v === locale,
      }))}
      withCheckIcon={false}
      defaultValue={locale}
      onChange={(v) => {
        const nextLocale = v;
        startTransition(() => {
          const resData =
            pathname.substring(0, 1) + nextLocale + pathname.substring(2 + 1);
          if (nextLocale) {
            router.replace(resData);
          }
        });
      }}
    />
  );
}
