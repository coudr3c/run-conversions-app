import { Box, Button, Grid, Text, TextInput, Title } from '@mantine/core';
import { useCallback, useState } from 'react';
import type { Pace, Time } from '../../types/types';
import * as utils from '../../utils/utils';

interface RaceTimeProps {
  distance: number;
}

export function RaceTime({ distance }: RaceTimeProps) {
  const [inputPaceMin, setInputPaceMin] = useState<number>(5);
  const [inputPaceSec, setInputPaceSec] = useState<number>(0);
  const [inputSpeed, setInputSpeed] = useState<number>(12);
  const [isLastInputUpdatedPace, setIsLastInputUpdatedPace] = useState<boolean>(false)

  const [displayedPaceMin, setDisplayedPaceMin] = useState<number>(5);
  const [displayedPaceSec, setDisplayedPaceSec] = useState<number>(0);
  const [displayedSpeed, setDisplayedSpeed] = useState<number>(12);
  const [displayedTime, setDisplayedTime] = useState<Time>({ hours: 0, minutes: 25, seconds: 0 });

  const roundToTwoDecimals = useCallback((a: number) => {
    return utils.roundToTwoDecimals(a)
  }, [])

  const paceMinSecToBase10 = useCallback((pace: Pace) => {
    return utils.paceMinSecToBase10(pace)
  }, [])

  const timeBase10ToMinSec = useCallback((time: number) => {
    return utils.timeBase10ToMinSec(time)
  }, [])

  const speedToPace = useCallback((speed: number) => {
    return utils.speedToPace(speed)
  }, [])

  const paceToSpeed = useCallback(({ minutes, seconds }: Pace) => {
    if (minutes == 0 && seconds == 0) return 0
    return roundToTwoDecimals(60 / (minutes + seconds / 60))
  }, [roundToTwoDecimals])

  const handleCalculate = () => {
    let paceMin, paceSec, speed

    if (isLastInputUpdatedPace) {

        paceMin = isNaN(inputPaceMin) ? 0 : inputPaceMin
        paceSec = isNaN(inputPaceSec) ? 0 : inputPaceSec
        speed = paceToSpeed({ minutes: paceMin, seconds: paceSec })
    } else {
        speed = isNaN(inputSpeed) ? 0 : inputSpeed
        const pace = speedToPace(speed)
        paceMin = pace.minutes
        paceSec = pace.seconds
    }

    setDisplayedPaceMin(paceMin)
    setDisplayedPaceSec(paceSec)
    setDisplayedSpeed(speed)

    // Calculate time based on pace and distance
    const paceBase10 = paceMinSecToBase10({ minutes: paceMin, seconds: paceSec })
    const totalTimeBase10 = paceBase10 * distance
    const time = timeBase10ToMinSec(totalTimeBase10)
    setDisplayedTime(time)
  }

  return (
    <>
      <Title order={3} size="h4" mb="xs">
        Calculate Race Time
      </Title>
      <Text size="sm" c="dimmed" mb="md">
        Enter your target pace or speed to calculate finish time
      </Text>

      <Grid mb="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Text size="sm" fw={500} mb="xs">
            Target Pace (min/km)
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
                    setIsLastInputUpdatedPace(true)
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
                    setIsLastInputUpdatedPace(true)
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
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            value={inputSpeed}
            onChange={(event) => {
              if (event.currentTarget.value == '') {
                setInputSpeed(NaN)
              }
              setIsLastInputUpdatedPace(false)
              setInputSpeed(roundToTwoDecimals(parseFloat(event.currentTarget.value)))
            }}
            label="OR Target Speed (km/h)"
            placeholder="12.0"
            type="number"
            step={0.1}
          />
        </Grid.Col>
      </Grid>

      <Button mt="sm" onClick={handleCalculate}>Calculate Finish Time</Button>

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
          Estimated Finish Time
        </Text>
        <Text size="xl" fw={700} c="#1864ab">
          {displayedTime.hours}:{String(displayedTime.minutes).padStart(2, '0')}:{String(displayedTime.seconds).padStart(2, '0')}
        </Text>
        <Text size="sm" c="#1971c2" mt="xs">
          At {displayedPaceMin}:{String(displayedPaceSec).padStart(2, '0')} min/km ({displayedSpeed} km/h) for {distance} km
        </Text>
      </Box>
    </>
  );
}