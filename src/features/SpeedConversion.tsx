import { Card, Title, Grid, TextInput, Button, Box, Text } from '@mantine/core';
import { useCallback, useState } from 'react';
import type { Pace } from '../types/types';
import * as utils from '../utils/utils';

export function SpeedConversion() {
  const [inputSpeed, setInputSpeed] = useState<number>(12);
  const [inputPaceMin, setInputPaceMin] = useState<number>(5);
  const [inputPaceSec, setInputPaceSec] = useState<number>(0);

  const [displayedSpeed, setDisplayedSpeed] = useState<number>(12);
  const [displayedPace, setDisplayedPace] = useState<Pace>({ minutes: 5, seconds: 0 });

  const roundToTwoDecimals = useCallback((a: number) => {
    return utils.roundToTwoDecimals(a)
  }, [])

  const speedToPace = useCallback((speed: number) => {
    return utils.speedToPace(speed)
  }, [])

  const paceToSpeed = useCallback(({ minutes, seconds }: Pace) => {
    if (minutes == 0 && seconds == 0) return 0
    return roundToTwoDecimals(60 / (minutes + seconds / 60))
  }, [roundToTwoDecimals])

  const handleConvertToSpeed = () => {
    setDisplayedPace({ minutes: isNaN(inputPaceMin) ? 0 : inputPaceMin, seconds: isNaN(inputPaceSec) ? 0 : inputPaceSec })
    setDisplayedSpeed(paceToSpeed({ minutes: isNaN(inputPaceMin) ? 0 : inputPaceMin, seconds: isNaN(inputPaceSec) ? 0 : inputPaceSec }))
  }

  const handleConvertToPace = () => {
    setDisplayedSpeed(isNaN(inputSpeed) ? 0 : inputSpeed)
    setDisplayedPace(speedToPace(isNaN(inputSpeed) ? 0 : inputSpeed))
  }

  return (
    <Card shadow="sm" padding="xl" radius="md">
      <Title order={2} mb="lg">
        Speed ⇄ Pace Conversion
      </Title>

      <Grid mb="lg">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            value={inputSpeed}
            onChange={(event) => {
              if (event.currentTarget.value == '') {
                setInputSpeed(NaN)
              }
              setInputSpeed(roundToTwoDecimals(parseFloat(event.currentTarget.value)))}
            }
            label="Speed (km/h)"
            placeholder="12.0"
            type="number"
            step={0.1}
            min={0}
            max={30}
          />
          <Button fullWidth mt="sm" onClick={handleConvertToPace}>
            Convert to Pace →
          </Button>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Text size="sm" fw={500} mb="xs">
            Pace (min/km)
          </Text>
          <Box style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <TextInput
              value={inputPaceMin}
              onChange={(event) => {
                if (event.currentTarget.value == '') {
                  setInputPaceMin(NaN)
                }
                const v = parseInt(event.currentTarget.value)
                if (v >= 0 && v < 60) {
                  setInputPaceMin(v)
                }
              }}
              placeholder="5"
              type="number"
              min={0}
              max={59}
              style={{ width: '80px' }}
            />
            <Text>:</Text>
            <TextInput
              value={inputPaceSec}
              onChange={(event) => {
                if (event.currentTarget.value == '') {
                  setInputPaceSec(NaN)
                }
                const v = parseInt(event.currentTarget.value)
                if (v >= 0 && v < 60) {
                  setInputPaceSec(v)
                }
              }}
              placeholder="00"
              type="number"
              min={0}
              max={59}
              style={{ width: '80px' }}
            />
          </Box>
          <Button fullWidth mt="sm" onClick={handleConvertToSpeed}>
            ← Convert to Speed
          </Button>
        </Grid.Col>
      </Grid>

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
          Result
        </Text>
        <Text size="xl" fw={700} c="#1864ab">
          {displayedSpeed} km/h = {displayedPace.minutes}:{String(displayedPace.seconds).padStart(2, '0')} min/km
        </Text>
      </Box>
    </Card>
  );
}
