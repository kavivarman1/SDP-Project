import * as React from 'react';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';

const series = [
  {
    label: 'January',
    data: [50, 80, 70, 60],
  },
  {
    label: 'February',
    data: [65, 75, 85, 90],
  },
];

export default function BarAnimation() {
  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        height={300}
        series={series}
      />
    </Box>
  );
}