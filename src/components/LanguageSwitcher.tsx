import { SegmentedControl } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <SegmentedControl
      value={i18n.language}
      onChange={(value) => i18n.changeLanguage(value)}
      data={[
        { label: 'English', value: 'en' },
        { label: 'Français', value: 'fr' },
      ]}
      size="sm"
    />
  );
};
