import {
  Card,
  Title,
  TextInput,
  Button,
  Box,
  Text,
  Grid,
  Table,
  Badge,
  Divider,
} from "@mantine/core";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export function HeartRateZones() {
  const { t } = useTranslation("features");
  const { t: tCommon } = useTranslation("common");

  const [heartRateMin, setHeartRateMin] = useState<number>(60);
  const [heartRateMax, setHeartRateMax] = useState<number>(190);
  const [heartRateReserve, setHeartRateReserve] = useState<number>(130);

  const data = useMemo(() => {
    const zones = [
      { name: t("hrZonesTable.z1"), focus: t("hrZonesTable.recovery"), color: "grey" },
      {
        name: t("hrZonesTable.z2"),
        focus: t("hrZonesTable.endurance"),
        color: "teal",
      },
      { name: t("hrZonesTable.z3"), focus: t("hrZonesTable.tempo"), color: "green" },
      { name: t("hrZonesTable.z4"), focus: t("hrZonesTable.lactate"), color: "orange" },
      { name: t("hrZonesTable.z5"), focus: t("hrZonesTable.vo2max"), color: "red" },
    ];
    return [
      [0.5, 0.6],
      [0.6, 0.7],
      [0.7, 0.8],
      [0.8, 0.9],
      [0.9, 1],
    ].map(([from, to], idx) => {
      const zone = zones[idx];
      return {
        zone: zone.name,
        percentage: from * 100 + "-" + to * 100 + "%",
        range:
          Math.round(
            isNaN(heartRateMin) ? 0 : heartRateMin + from * heartRateReserve
          ) +
          "-" +
          Math.round(
            isNaN(heartRateMin) ? 0 : heartRateMin + to * heartRateReserve
          ),
        focus: zone.focus,
        color: zone.color,
      };
    });
  }, [heartRateMin, heartRateReserve]);

  return (
    <Card shadow="sm" padding="xl" radius="md">
      <Title order={2} mb="lg">
        {t("heartRateZones.title")}
      </Title>

      <Grid mb="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            value={heartRateMin}
            onChange={(event) => {
              const v = parseInt(event.currentTarget.value);
              if (!isNaN(v) && v >= 0) {
                setHeartRateMin(v);
                setHeartRateReserve(Math.max(heartRateMax - v, 0));
              } else {
                setHeartRateMin(NaN);
              }
            }}
            label={tCommon("labels.resting_hr")}
            placeholder="60"
            type="number"
            step={1}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            value={heartRateMax}
            onChange={(event) => {
              const v = parseInt(event.currentTarget.value);
              if (!isNaN(v) && v >= 0) {
                setHeartRateMax(v);
                setHeartRateReserve(Math.max(v - heartRateMin, 0));
              } else {
                setHeartRateMax(NaN);
              }
            }}
            label={tCommon("labels.max_hr")}
            placeholder="190"
            type="number"
            step={1}
          />
        </Grid.Col>
      </Grid>

      <Button mt="sm">{tCommon("buttons.calculate_hr_zones")}</Button>

      <Box
        style={{
          backgroundColor: "#fff3bf",
          borderLeft: "4px solid #fab005",
          padding: "1rem",
          marginTop: "1.5rem",
          borderRadius: "4px",
        }}
      >
        <Text size="sm" c="dimmed">
          <strong>{t("heartRateZones.method_title")}</strong>
          <br />
          {t("heartRateZones.hr_reserve_formula")}
          <br />
          {t("heartRateZones.target_hr_formula")}
        </Text>
      </Box>

      <Divider my="xl" />

      <Title order={3} size="h4" mb="md">
        {t("heartRateZones.section_title")}
      </Title>

      <Box style={{ overflowX: "auto" }}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t("hrZonesTable.zone")}</Table.Th>
              <Table.Th>{t("hrZonesTable.percent_reserve")}</Table.Th>
              <Table.Th>{t("hrZonesTable.hr_range")}</Table.Th>
              <Table.Th>{t("hrZonesTable.training_focus")}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((zone, index) => (
              <Table.Tr key={index}>
                <Table.Td>
                  <Badge color={zone.color} variant="light" size="lg">
                    {zone.zone}
                  </Badge>
                </Table.Td>
                <Table.Td>{zone.percentage}</Table.Td>
                <Table.Td>{zone.range}</Table.Td>
                <Table.Td>{zone.focus}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Box>

      <Box
        style={{
          backgroundColor: "#fff3bf",
          borderLeft: "4px solid #fab005",
          padding: "1rem",
          marginTop: "1.5rem",
          borderRadius: "4px",
        }}
      >
        <Text size="sm" c="dimmed">
          <strong>{t("heartRateZones.example_calculation")}</strong> With Resting HR = 60 and Max HR = 190
          <br />
          HR Reserve = 190 - 60 = 130 bpm
          <br />
          Z2 (60%): (130 × 0.60) + 60 = 138 bpm
          <br />
          Z2 (70%): (130 × 0.70) + 60 = 151 bpm
        </Text>
      </Box>
    </Card>
  );
}
