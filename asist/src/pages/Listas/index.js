import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Grid, Container, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

   
       
export default function UploadButtons() {
  return (
    <>
    <Typography variant="h5" sx={{ mb: 1 , marginLeft:20}}>
    Cargar Listas
    </Typography>
    <Stack sx={{ marginLeft:12}} direction="row" alignItems="center" spacing={5} >
      
      <Button variant="contained" component="label">
        Lista1
        <input accept="file/*" multiple type="file" name='file1' />
      </Button>
      <Button variant="contained" component="label">
        Lista2
        <input  accept="file/*" multiple type="file"  name='file2'/>
      </Button>
      <Button variant="contained" component="label">
        Lista3
        <input  accept="file/*" multiple type="file" name='file3'/>
      </Button>
    </Stack>
    <br></br>
    <Stack sx={{ marginLeft:70}} direction="row" spacing={10}>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Stack>
    </>
  );
}