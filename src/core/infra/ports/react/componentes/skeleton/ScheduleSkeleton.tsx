// ScheduleSkeleton.tsx
import React from 'react';
import { Box, Card, CardContent, Skeleton } from '@mui/material';

const daysOfWeek = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];

const ScheduleSkeleton: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>

      {daysOfWeek.map((day) => (
        <Card key={day} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Skeleton variant="text" width="20%" height={30} />
            <Box sx={{ display: 'flex', gap: 2, mb: 1, alignItems: 'center' }}>
              <Skeleton variant="rounded" width={130} height={56} />
              <Skeleton variant="rounded" width={130} height={56} />
              <Skeleton variant="rounded" width={85} height={36} />
            </Box>
            <Skeleton variant="text" width="20%" height={56} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ScheduleSkeleton;
