import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';


const columns = [
  
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nombre', headerName: 'nombre', width: 150 },
  { field: 'apellido', headerName: 'apellido', width: 150 },
  { field: 'fecha', headerName: 'fecha', width: 150 },
  { field: 'duracion', headerName: 'duracion', width: 150 },
  { field: 'asistencia', headerName: 'asistencia', width: 150 },
 
];

const rows = [
  { id: 1, apellido: 'Snow', nombre: 'Jon',fecha:'20/04/22',duracion:'50 Min', asistencia:'asistio'},
  { id: 2, apellido: 'Lannister', nombre: 'Cersei',fecha:'20/04/22',duracion:'50 Min', asistencia:'asistio'},
  { id: 3, apellido: 'Lannister', nombre: 'Jaime',fecha:'20/04/22',duracion:'50 Min', asistencia:'asistio'},
  { id: 4, apellido: 'Stark', nombre: 'Arya',fecha:'20/04/22',duracion:'50 Min', asistencia:'asistio'},
  { id: 5, apellido: 'Targaryen', nombre: 'Daenerys',fecha:'20/04/22',duracion:'50 Min', asistencia:'asistio'},
  { id: 6, apellido: 'Melisandre', nombre: null ,fecha:'20/04/22',duracion:'50 Min', asistencia:'asistio'},
  { id: 7, apellido: 'Clifford', nombre: 'Ferrara',fecha:'20/04/22' ,duracion:'50 Min', asistencia:'Falto'},
  { id: 8, apellido: 'Frances', nombre: 'Rossini' ,fecha:'20/04/22',duracion:'50 Min', asistencia:'asistio'},
  { id: 9, apellido: 'Roxie', nombre: 'Harvey' ,fecha:'20/04/22',duracion:'50 Min', asistencia:'asistio'},
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '95%', marginLeft:60 }}>
      <Typography variant="h5" sx={{ mb: 1 , marginLeft:2}}>
        Lista
        </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <Button variant="contained" disableElevation>
  Asignar
</Button>
    </div>
  );
}
