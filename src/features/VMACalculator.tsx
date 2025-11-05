import { Card, Title, TextInput, Box, Text, Table, Divider } from '@mantine/core';
import { useCallback, useMemo, useState } from 'react';
import type { Pace, Time } from '../types/types';
import * as utils from '../utils/utils';

export function VMACalculator() {
  const [inputSpeed, setInputSpeed] = useState<number>(12);

  const roundToTwoDecimals = useCallback((a: number) => {
    return utils.roundToTwoDecimals(a)
  }, [])

  const speedToPace = useCallback((speed: number) => {
    return utils.speedToPace(speed)
  }, [])

  const paceAndDistanceToTime = useCallback((pace: Pace, distance: number) => {
    return utils.paceAndDistanceToTime(pace, distance)
  }, [])

  const formatPace = useCallback((pace: Pace) => {
    return utils.formatPace(pace)
  }, [])

  const formatTime = useCallback((time: Time) => {
    return utils.formatTime(time)
  }, [])

  const data = useMemo(() => {
    return [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7].map(i => {
      const pace = speedToPace(inputSpeed * i) 
      return {
        vma: i * 100 + '%',
        speed: roundToTwoDecimals(inputSpeed * i),
        pace: formatPace(pace),
        km5: formatTime(paceAndDistanceToTime(pace, 5)),
        km10: formatTime(paceAndDistanceToTime(pace, 10)),
        km20: formatTime(paceAndDistanceToTime(pace, 20)),
        half: formatTime(paceAndDistanceToTime(pace, 21.0975)),
        marathon: formatTime(paceAndDistanceToTime(pace, 42.195)) 
      }
    })
    }, [formatPace, formatTime, inputSpeed, paceAndDistanceToTime, roundToTwoDecimals, speedToPace])

  return (
    <Card shadow="sm" padding="xl" radius="md">
      <Title order={2} mb="lg">
        VMA (Vitesse Maximale Aérobie) Calculator
      </Title>

      <TextInput
        value={inputSpeed}
        onChange={(event) => {
          if (event.currentTarget.value == '') {
            setInputSpeed(NaN)
          }
          setInputSpeed(roundToTwoDecimals(parseFloat(event.currentTarget.value)))}
        }
        label="Your VMA (km/h)"
        placeholder="16.0"
        type="number"
        step={0.1}
        style={{ maxWidth: '300px' }}
      />

      <Box
        style={{
          backgroundColor: '#e7f5ff',
          border: '1px solid #a5d8ff',
          borderRadius: '4px',
          padding: '1rem',
          marginTop: '1rem',
        }}
      >
        <Text size="xs" fw={600} tt="uppercase" c="#1971c2" mb="xs">
          Estimated VO2max
        </Text>
        <Text size="xl" fw={700} c="#1864ab">
          {inputSpeed * 3.5} ml/kg/min
        </Text>
        <Text size="xs" c="dimmed" mt="xs">
          Formula: VO2max ≈ VMA × 3.5
        </Text>
      </Box>

      <Divider my="xl" />

      <Title order={3} size="h4" mb="md">
        Race Times by VMA Percentage
      </Title>

      <Box style={{ overflowX: 'auto' }}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>% VMA</Table.Th>
              <Table.Th>Speed (km/h)</Table.Th>
              <Table.Th>Pace (min/km)</Table.Th>
              <Table.Th>5 km</Table.Th>
              <Table.Th>10 km</Table.Th>
              <Table.Th>20 km</Table.Th>
              <Table.Th>Half Marathon (21.1 km)</Table.Th>
              <Table.Th>Marathon (42.2 km)</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((row, index) => (
              <Table.Tr key={index}>
                <Table.Td fw={600}>{row.vma}</Table.Td>
                <Table.Td>{row.speed}</Table.Td>
                <Table.Td>{row.pace}</Table.Td>
                <Table.Td>{row.km5}</Table.Td>
                <Table.Td>{row.km10}</Table.Td>
                <Table.Td>{row.km20}</Table.Td>
                <Table.Td>{row.half}</Table.Td>
                <Table.Td>{row.marathon}</Table.Td>
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
          marginTop: '1rem',
          borderRadius: '4px',
        }}
      >
        <Text size="sm" c="dimmed">
          <strong>Note:</strong> These are theoretical times based on VMA percentages. Actual race
          performance depends on training, conditions, and pacing strategy. Marathon times typically
          correspond to 75-85% VMA for trained runners.
        </Text>
      </Box>
    </Card>
  );
}
