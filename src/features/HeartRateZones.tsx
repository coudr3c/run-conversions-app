import { Card, Title, TextInput, Button, Box, Text, Grid, Table, Badge, Divider } from '@mantine/core';
import { useMemo, useState } from 'react';

export function HeartRateZones() {
  const [heartRateMin, setHeartRateMin] = useState<number>(60)
  const [heartRateMax, setHeartRateMax] = useState<number>(190)
  const [heartRateReserve, setHeartRateReserve] = useState<number>(130)

  const data = useMemo(() => {
    const zones = [
      { name: 'Z1', focus: 'Recovery, warm-up, cool-down', color: 'grey' },
      { name: 'Z2', focus: 'Endurance base building, easy runs', color: 'teal' },
      { name: 'Z3', focus: 'Tempo runs, aerobic development', color: 'green' },
      { name: 'Z4', focus: 'Lactate threshold, race pace', color: 'orange' },
      { name: 'Z5', focus: 'VO2max intervals, high intensity', color: 'red' },
    ]
    return [[0.5, 0.6], [0.6, 0.7], [0.7, 0.8], [0.8, 0.9], [0.9, 1]].map(([from, to], idx) => {
      const zone = zones[idx]
      return {
        zone: zone.name,
        percentage: from * 100 + '-' + to * 100 + '%',
        range: Math.round(isNaN(heartRateMin) ? 0 : heartRateMin + (from * heartRateReserve)) + '-' + Math.round(isNaN(heartRateMin) ? 0 : heartRateMin + (to * heartRateReserve)),
        focus: zone.focus,
        color: zone.color
      }
    })
    }, [heartRateMin, heartRateReserve])

  return (
    <Card shadow="sm" padding="xl" radius="md">
      <Title order={2} mb="lg">
        Heart Rate Zones Calculator
      </Title>

      <Grid mb="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            value={heartRateMin}
            onChange={(event) => {
              const v = parseInt(event.currentTarget.value)
              if (!isNaN(v) && v >= 0) {
                setHeartRateMin(v)
                setHeartRateReserve(Math.max(heartRateMax - v, 0))
              } else {
                setHeartRateMin(NaN)
              }
            }}
            label="Resting Heart Rate (bpm)"
            placeholder="60"
            type="number"
            step={1}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            value={heartRateMax}
            onChange={(event) => {
              const v = parseInt(event.currentTarget.value)
              if (!isNaN(v) && v >= 0) {
                setHeartRateMax(v)
                setHeartRateReserve(Math.max(v - heartRateMin, 0))
              } else {
                setHeartRateMax(NaN)
              }
            }}
            label="Maximum Heart Rate (bpm)"
            placeholder="190"
            type="number"
            step={1}
          />
        </Grid.Col>
      </Grid>

      <Button mt="sm">Calculate HR Zones</Button>

      <Box
        style={{
          backgroundColor: '#fff3bf',
          borderLeft: '4px solid #fab005',
          padding: '1rem',
          marginTop: '1.5rem',
          borderRadius: '4px',
        }}
      >
        <Text size="sm" c="dimmed">
          <strong>Heart Rate Reserve Method (Karvonen Formula)</strong>
          <br />
          HR Reserve = Max HR - Resting HR
          <br />
          Target HR = (HR Reserve × Intensity %) + Resting HR
        </Text>
      </Box>

      <Divider my="xl" />

      <Title order={3} size="h4" mb="md">
        Training Zones
      </Title>

      <Box style={{ overflowX: 'auto' }}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Zone</Table.Th>
              <Table.Th>% of Reserve</Table.Th>
              <Table.Th>Heart Rate Range (bpm)</Table.Th>
              <Table.Th>Training Focus</Table.Th>
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
          backgroundColor: '#fff3bf',
          borderLeft: '4px solid #fab005',
          padding: '1rem',
          marginTop: '1.5rem',
          borderRadius: '4px',
        }}
      >
        <Text size="sm" c="dimmed">
          <strong>Example calculation:</strong> With Resting HR = 60 and Max HR = 190
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
