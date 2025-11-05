import { Box, Text } from '@mantine/core';

export function Header() {
  return (
    <Box
      style={{
        background: 'linear-gradient(135deg, #228be6 0%, #1971c2 100%)',
        color: 'white',
        padding: '1.5rem 2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Text size="xl" fw={700} mb="xs">
        Running Conversions & Calculators
      </Text>
      <Text size="sm" opacity={0.9}>
        Tools for runners: pace conversion, VMA calculator, race planning, and heart rate zones
      </Text>
    </Box>
  );
}
