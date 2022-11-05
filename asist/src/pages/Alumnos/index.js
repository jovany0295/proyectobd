import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DataGrid } from '@mui/x-data-grid';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';


const ariaLabel = { 'aria-label': 'description' };

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 50,
  p: 3,
  display: 'flex', flexWrap: 'wrap',
  width: 500,
        maxWidth: '100%',
  
};

export default function BasicModal() {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    
    
    
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nombre, setName] = React.useState('');
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <div>
        <Button sx={{ marginLeft:70}}   onClick={handleOpen} variant="contained" disableElevation>
      Agregar alumno
    </Button>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box  component="form"
      sx={ style
      }
      noValidate
      autoComplete="off">
     
     <div>
       
       
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Nombre</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
           
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            label="Amount"
          />
        </FormControl>
     
        <FormControl fullWidth sx={{ m: 1,width: '25ch' }}>
          <InputLabel htmlFor="outlined-adornment-amount">Apellido Paterno</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            label="Amount"
            size="small"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1,width: '25ch'  }}>
          <InputLabel htmlFor="outlined-adornment-amount">Apellido Materno</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
       
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            label="Amount"
            size="small"
          />
        </FormControl>
        
      </div>
      
      
        </Box>
      </Modal>
      <div  style={{ height: 400, width: '100%' }}>
      <DataGrid sx={{ marginLeft:8}} 
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
      
    </div>
  );
}
