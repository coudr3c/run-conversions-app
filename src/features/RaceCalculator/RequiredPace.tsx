import { Box, Text, TextInput, Title } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Pace, Time } from "../../types/types";
import * as utils from "../../utils/utils";

interface RequiredPaceProps {
  distance: number;
}

export function RequiredPace({ distance }: RequiredPaceProps) {
  const { t } = useTranslation("features");
  const { t: tCommon } = useTranslation("common");

  const [inputH, setInputH] = useState<number>(0);
  const [inputM, setInputM] = useState<number>(25);
  const [inputS, setInputS] = useState<number>(0);

  const [displayedH, setDisplayedH] = useState<number>(0);
  const [displayedM, setDisplayedM] = useState<number>(25);
  const [displayedS, setDisplayedS] = useState<number>(0);

  const [displayedPace, setDisplayedPace] = useState<Pace>({
    minutes: 5,
    seconds: 0,
  });
  const [displayedSpeed, setDisplayedSpeed] = useState<number>(12);

  const [displayedDistance, setDisplayedDistance] = useState<number>(distance);
  
  const roundToTwoDecimals = useCallback((a: number) => {
    return utils.roundToTwoDecimals(a);
  }, []);
  
  const timeMinSecToBase10 = useCallback((time: Time) => {
    return utils.timeMinSecToBase10(time);
  }, []);
  
  const paceBase10ToMinSec = useCallback((pace: number) => {
    return utils.paceBase10ToMinSec(pace);
  }, []);
  
  useEffect(() => {
    setDisplayedDistance(distance);
    const h = isNaN(inputH) ? 0 : inputH;
    const m = isNaN(inputM) ? 0 : inputM;
    const s = isNaN(inputS) ? 0 : inputS;

    setDisplayedH(h);
    setDisplayedM(m);
    setDisplayedS(s);

    // Convert time to base10 minutes
    const totalTimeBase10 = timeMinSecToBase10({
      hours: h,
      minutes: m,
      seconds: s,
    });

    if (distance > 0) {
      // Calculate pace (time per km)
      const paceBase10 = totalTimeBase10 / distance;
      const pace = paceBase10ToMinSec(paceBase10);
      setDisplayedPace(pace);
    } else {
      setDisplayedPace({minutes: 0, seconds: 0})
    }

    // Calculate speed (km/h)
    if (totalTimeBase10 === 0) {
      setDisplayedSpeed(0);
    } else {
      const speed = roundToTwoDecimals((distance * 60) / totalTimeBase10);
      setDisplayedSpeed(speed);
    }
  }, [distance, inputH, inputM, inputS, timeMinSecToBase10, paceBase10ToMinSec, roundToTwoDecimals]);
  
  return (
    <>
      <Title order={3} size="h4" mb="xs">
        {t("requiredPace.title")}
      </Title>
      <Text size="sm" c="dimmed" mb="md">
        {t("requiredPace.description")}
      </Text>

      <Box style={{ maxWidth: "300px" }}>
        <Text size="sm" fw={500} mb="xs">
          {tCommon("labels.target_time")}
        </Text>
        <Box style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <TextInput
            value={inputH}
            onChange={(event) => {
              if (event.currentTarget.value == "") {
                setInputH(NaN);
              }
              const v = parseInt(event.currentTarget.value);
              if (v >= 0) {
                setInputH(v);
              }
            }}
            placeholder="0"
            type="number"
            min={0}
            style={{ width: "80px" }}
          />
          <Text>:</Text>
          <TextInput
            value={inputM}
            onChange={(event) => {
              if (event.currentTarget.value == "") {
                setInputM(NaN);
              }
              const v = parseInt(event.currentTarget.value);
              if (v >= 0 && v < 60) {
                setInputM(v);
              }
            }}
            placeholder="25"
            type="number"
            min={0}
            max={59}
            style={{ width: "80px" }}
          />
          <Text>:</Text>
          <TextInput
            value={inputS}
            onChange={(event) => {
              if (event.currentTarget.value == "") {
                setInputS(NaN);
              }
              const v = parseInt(event.currentTarget.value);
              if (v >= 0 && v < 60) {
                setInputS(v);
              }
            }}
            placeholder="00"
            type="number"
            min={0}
            max={59}
            style={{ width: "80px" }}
          />
        </Box>
      </Box>

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
          {t("requiredPace.result_label")}
        </Text>
        <Text size="xl" fw={700} c="#1864ab">
          {displayedPace.minutes}:
          {String(Math.floor(displayedPace.seconds)).padStart(2, "0")} {tCommon("units.minkm")} (
          {displayedSpeed} {tCommon("units.kmh")})
        </Text>
        <Text size="sm" c="#1971c2" mt="xs">
          {t("requiredPace.to_finish")} {displayedDistance} {tCommon("units.km")} {tCommon("formatting.in")} {displayedH}:
          {String(displayedM).padStart(2, "0")}:
          {String(displayedS).padStart(2, "0")}
        </Text>
      </Box>
    </>
  );
}
