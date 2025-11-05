import { useState } from 'react';
import { Container, Tabs } from '@mantine/core';
import { SpeedConversion } from '../features/SpeedConversion';
import { VMACalculator } from '../features/VMACalculator';
import { RaceCalculator } from '../features/RaceCalculator/RaceCalculator';
import { HeartRateZones } from '../features/HeartRateZones';

export function MainPage() {
  const [activeTab, setActiveTab] = useState<string | null>('speed-conversion');

  return (
    <Container size="lg" py="xl">
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="speed-conversion">Speed/Pace Conversion</Tabs.Tab>
          <Tabs.Tab value="vma-calculator">VMA Calculator</Tabs.Tab>
          <Tabs.Tab value="race-calculator">Race Time/Speed</Tabs.Tab>
          <Tabs.Tab value="hr-zones">Heart Rate Zones</Tabs.Tab>
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
