import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AutoGrid() {
  return (
    <Box sx={{ flexGrow: 5 , marginLeft:10}}>
      <Grid container spacing={2 }>
        <Grid xs={4}>
          <Item>Alumnos</Item>
        </Grid>
        <Grid xs={4}>
          <Item>xs=6</Item>
        </Grid>
        <Grid xs={4}>
          <Item>xs</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
