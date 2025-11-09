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
import { useTranslation } from "react-i18next";
import * as utils from "../../utils/utils";
import { RaceTime } from "./RaceTime";
import { RequiredPace } from "./RequiredPace";

export function RaceCalculator() {
  const { t } = useTranslation("features");
  const { t: tCommon } = useTranslation("common");

  const [selectedDistance, setSelectedDistance] = useState<number>(5);
  const [customDistance, setCustomDistance] = useState<number>(NaN);
  const [selectedChip, setSelectedChip] = useState<string>(t("raceCalculatorDistances.5km"));

  const roundToThreeDecimals = useCallback((a: number) => {
    return utils.roundToThreeDecimals(a);
  }, []);

  const distances = [
    t("raceCalculatorDistances.5km"),
    t("raceCalculatorDistances.10km"),
    t("raceCalculatorDistances.20km"),
    t("raceCalculatorDistances.half_marathon"),
    t("raceCalculatorDistances.marathon"),
    t("raceCalculatorDistances.custom"),
  ];

  const handleChipChange = (value: string) => {
    setSelectedChip(value);

    if (value === t("raceCalculatorDistances.5km")) {
      setSelectedDistance(5);
    } else if (value === t("raceCalculatorDistances.10km")) {
      setSelectedDistance(10);
    } else if (value === t("raceCalculatorDistances.20km")) {
      setSelectedDistance(20);
    } else if (value === t("raceCalculatorDistances.half_marathon")) {
      setSelectedDistance(21.0975);
    } else if (value === t("raceCalculatorDistances.marathon")) {
      setSelectedDistance(42.195);
    } else if (value === t("raceCalculatorDistances.custom")) {
      setSelectedDistance(isNaN(customDistance) ? 0 : customDistance);
    }
  };

  return (
    <Card shadow="sm" padding="xl" radius="md">
      <Title order={2} mb="lg">
        {t("raceCalculator.title")}
      </Title>

      <Box mb="xl">
        <Text size="sm" fw={500} mb="sm">
          {tCommon("labels.select_distance")}
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
            if (selectedChip === t("raceCalculatorDistances.custom")) {
              setSelectedDistance(isNaN(distance) ? 0 : distance);
            }
          }}
          label={t("raceCalculator.custom_distance")}
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
