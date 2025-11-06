import { Box, Text, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const { t } = useTranslation("header");

  return (
    <Box
      style={{
        background: "linear-gradient(135deg, #228be6 0%, #1971c2 100%)",
        color: "white",
        padding: "1.5rem 2rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Group justify="space-between" align="flex-start" mb="sm">
        <div>
          <Text size="xl" fw={700} mb="xs">
            {t("title")}
          </Text>
          <Text size="sm" opacity={0.9}>
            {t("subtitle")}
          </Text>
        </div>
        <LanguageSwitcher />
      </Group>
    </Box>
  );
}
