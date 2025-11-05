import {
  Card,
  Title,
  Text,
  TextInput,
  Box,
  Divider,
  Chip,
  Group,
} from "@mantine/core";
import { useCallback, useState } from "react";
import * as utils from "../../utils/utils";
import { RaceTime } from "./RaceTime";
import { RequiredPace } from "./RequiredPace";

export function RaceCalculator() {
  const [selectedDistance, setSelectedDistance] = useState<number>(5);
  const [customDistance, setCustomDistance] = useState<number>(NaN);
  const [selectedChip, setSelectedChip] = useState<string>("5 km");

  const roundToThreeDecimals = useCallback((a: number) => {
    return utils.roundToThreeDecimals(a);
  }, []);

  const distances = [
    "5 km",
    "10 km",
    "20 km",
    "Half Marathon",
    "Marathon",
    "Custom",
  ];

  const handleChipChange = (value: string) => {
    setSelectedChip(value);

    switch (value) {
      case "5 km":
        setSelectedDistance(5);
        break;
      case "10 km":
        setSelectedDistance(10);
        break;
      case "20 km":
        setSelectedDistance(20);
        break;
      case "Half Marathon":
        setSelectedDistance(21.0975);
        break;
      case "Marathon":
        setSelectedDistance(42.195);
        break;
      case "Custom":
        setSelectedDistance(isNaN(customDistance) ? 0 : customDistance);
        break;
    }
  };

  return (
    <Card shadow="sm" padding="xl" radius="md">
      <Title order={2} mb="lg">
        Race Time/Speed Calculator
      </Title>

      <Box mb="xl">
        <Text size="sm" fw={500} mb="sm">
          Select Distance
        </Text>
        <Chip.Group
          multiple={false}
          value={selectedChip}
          onChange={handleChipChange}
        >
          <Group gap="xs">
            {distances.map((distance) => (
              <Chip key={distance} value={distance}>
                {distance}
              </Chip>
            ))}
          </Group>
        </Chip.Group>

        <TextInput
          value={customDistance}
          onChange={(event) => {
            if (event.currentTarget.value == "") {
              setCustomDistance(NaN);
            }
            const distance = roundToThreeDecimals(
              parseFloat(event.currentTarget.value)
            );
            setCustomDistance(distance);
            // If "Custom" chip is selected, update the selected distance
            if (selectedChip === "Custom") {
              setSelectedDistance(isNaN(distance) ? 0 : distance);
            }
          }}
          label="Custom Distance (km)"
          placeholder="42.195"
          type="number"
          step={0.1}
          mt="md"
          style={{ maxWidth: "300px" }}
        />
      </Box>

      <Divider my="xl" />

      <RaceTime distance={selectedDistance} />

      <Divider my="xl" />

      <RequiredPace distance={selectedDistance} />
    </Card>
  );
}
