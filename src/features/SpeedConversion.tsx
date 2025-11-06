import { Card, Title, Grid, TextInput, Box, Text } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Pace } from "../types/types";
import * as utils from "../utils/utils";

export function SpeedConversion() {
  const { t } = useTranslation("features");
  const { t: tCommon } = useTranslation("common");

  const [inputSpeed, setInputSpeed] = useState<number>(12);
  const [inputPaceMin, setInputPaceMin] = useState<number>(5);
  const [inputPaceSec, setInputPaceSec] = useState<number>(0);

  const [displayedSpeed, setDisplayedSpeed] = useState<number>(12);
  const [displayedPace, setDisplayedPace] = useState<Pace>({
    minutes: 5,
    seconds: 0,
  });
  
  const [isLastInputUpdatedPace, setIsLastInputUpdatedPace] =
  useState<boolean>(false);
  
  const speedToPace = useCallback((speed: number) => {
    return utils.speedToPace(speed);
  }, []);
  
  const roundToTwoDecimals = useCallback((a: number) => {
    return utils.roundToTwoDecimals(a);
  }, []);

  const paceToSpeed = useCallback(
    ({ minutes, seconds }: Pace) => {
      if (minutes == 0 && seconds == 0) return 0;
      return roundToTwoDecimals(60 / (minutes + seconds / 60));
    },
    [roundToTwoDecimals]
  );

  useEffect(() => {
    if (isLastInputUpdatedPace) {
      setDisplayedPace({
        minutes: isNaN(inputPaceMin) ? 0 : inputPaceMin,
        seconds: isNaN(inputPaceSec) ? 0 : inputPaceSec,
      });
      setDisplayedSpeed(
        paceToSpeed({
          minutes: isNaN(inputPaceMin) ? 0 : inputPaceMin,
          seconds: isNaN(inputPaceSec) ? 0 : inputPaceSec,
        })
      );
    } else {
      setDisplayedSpeed(isNaN(inputSpeed) ? 0 : inputSpeed);
      setDisplayedPace(speedToPace(isNaN(inputSpeed) ? 0 : inputSpeed));
    }
  }, [inputSpeed, inputPaceMin, inputPaceSec, isLastInputUpdatedPace, paceToSpeed, speedToPace]);

  return (
    <Card shadow="sm" padding="xl" radius="md">
      <Title order={2} mb="lg">
        {t("speedConversion.title")}
      </Title>

      <Grid mb="lg">
        <Grid.Col span={{ base: 12, md: 6 }} style={{ borderLeft: `4px solid ${!isLastInputUpdatedPace ? "#1971c2" : "#ccc"}`, paddingLeft: "1rem" }}>
          <Box style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
            <Text size="sm" fw={500}>
              {tCommon("labels.speed")}
            </Text>
          </Box>
          <TextInput
            value={inputSpeed}
            onFocus={() => setIsLastInputUpdatedPace(false)}
            onChange={(event) => {
              setIsLastInputUpdatedPace(false);
              if (event.currentTarget.value == "") {
                setInputSpeed(NaN);
              } else {
                const v = roundToTwoDecimals(parseFloat(event.currentTarget.value));
                if (v >= 0 && v < 100) setInputSpeed(v);
              }
            }}
            placeholder="12.0"
            type="number"
            step={0.1}
            min={0}
            max={30}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }} style={{ borderLeft: `4px solid ${isLastInputUpdatedPace ? "#1971c2" : "#ccc"}`, paddingLeft: "1rem" }}>
          <Box style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
            <Text size="sm" fw={500}>
              {tCommon("labels.pace")}
            </Text>
          </Box>
          <Box style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <TextInput
              value={inputPaceMin}
              onFocus={() => setIsLastInputUpdatedPace(true)}
              onChange={(event) => {
                setIsLastInputUpdatedPace(true);
                if (event.currentTarget.value == "") {
                  setInputPaceMin(NaN);
                } else {
                  const v = parseInt(event.currentTarget.value);
                  if (v >= 0 && v < 60) {
                    setInputPaceMin(v);
                  }
                }
              }}
              placeholder="5"
              type="number"
              min={0}
              max={59}
              style={{ width: "80px" }}
            />
            <Text>:</Text>
            <TextInput
              value={inputPaceSec}
              onFocus={() => setIsLastInputUpdatedPace(true)}
              onChange={(event) => {
                setIsLastInputUpdatedPace(true);
                if (event.currentTarget.value == "") {
                  setInputPaceSec(NaN);
                } else {
                  const v = parseInt(event.currentTarget.value);
                  if (v >= 0 && v < 60) {
                    setInputPaceSec(v);
                  }
                }
              }}
              placeholder="00"
              type="number"
              min={0}
              max={59}
              style={{ width: "80px" }}
            />
          </Box>
        </Grid.Col>
      </Grid>

      <Box
        style={{
          backgroundColor: "#e7f5ff",
          border: "1px solid #a5d8ff",
          borderRadius: "4px",
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        <Text size="xs" fw={600} tt="uppercase" c="#1971c2" mb="xs">
          {tCommon("labels.result")}
        </Text>
        <Text size="xl" fw={700} c="#1864ab">
          {displayedSpeed} {tCommon("units.kmh")} {tCommon("formatting.equals")} {displayedPace.minutes}:
          {String(displayedPace.seconds).padStart(2, "0")} {tCommon("units.minkm")}
        </Text>
      </Box>
    </Card>
  );
}
