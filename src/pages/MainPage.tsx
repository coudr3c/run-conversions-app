import { useState } from "react";
import { Container, Tabs } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { SpeedConversion } from "../features/SpeedConversion";
import { VMACalculator } from "../features/VMACalculator";
import { RaceCalculator } from "../features/RaceCalculator/RaceCalculator";
import { HeartRateZones } from "../features/HeartRateZones";

export function MainPage() {
  const [activeTab, setActiveTab] = useState<string | null>("speed-conversion");
  const { t } = useTranslation("features");

  return (
    <Container size="lg" py="xl">
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="speed-conversion">{t("tabs.speedConversion")}</Tabs.Tab>
          <Tabs.Tab value="vma-calculator">{t("tabs.vmaCalculator")}</Tabs.Tab>
          <Tabs.Tab value="race-calculator">{t("tabs.raceCalculator")}</Tabs.Tab>
          <Tabs.Tab value="hr-zones">{t("tabs.heartRateZones")}</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="speed-conversion" pt="xl">
          <SpeedConversion />
        </Tabs.Panel>

        <Tabs.Panel value="vma-calculator" pt="xl">
          <VMACalculator />
        </Tabs.Panel>

        <Tabs.Panel value="race-calculator" pt="xl">
          <RaceCalculator />
        </Tabs.Panel>

        <Tabs.Panel value="hr-zones" pt="xl">
          <HeartRateZones />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
