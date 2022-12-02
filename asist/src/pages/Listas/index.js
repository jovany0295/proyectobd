
import React, { memo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container, styled, Button, Alert, AlertTitle, Snackbar, Stack, Checkbox,
  Table, TableBody, TableContainer, TableFooter, TableHead, TableRow, TablePagination, Paper
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import OpenFile from './ReadCSV';
import SendIcon from '@mui/icons-material/Send';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";

function ListInvitations() {
  //params from the previous page
  const { idPlacementTest } = useParams();
  const urlAlumno = "http://127.0.0.1:8000/bd/v1/Alumno/";

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "black",
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const [listParticipants, setListParticipants] = useState([]);

  //open modal to insert or update
  const [openModal, setOpenModal] = useState(false);
  //state for updated information
  const [alertVisible, setAlertVisible] = useState(false);

  //pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(-1);

  //spinner
  const [loading, setLoading] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState("");

  //items selected
  const [selected, setSelected] = useState([]);

  //PT selected
  const [selectedPT, setSelectedPT] = useState("");

  //catch an error
  const [showError, setShowError] = React.useState({
    open: false,
    message: ''
  });

  //fill the data

  // //if ocurred an insert, update, delete => show an alert
  useEffect(() => {
    if (alertVisible === true) {
      setTimeout(() => { setAlertVisible(false); }, 3000);

      //return data updated
      getData();
    }
  }, [alertVisible]);




  //return list from csv
  const getData = async () => {
    try {
      listParticipants.forEach(function (e, index) {
        if (typeof e === "object") {
          e["index"] = index
        }
      });

      setListParticipants(listParticipants);
      setLoading(false);
    }
    catch (ex) {
      setShowError({ open: true, message: ex })
    }
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  //open modal to insert a new participant
  const selectInsert = () => {
    setSelectedIndex("");
    setOpenModal(true);
    setAlertVisible(false);
  }
  const insertar = () => {
    let axiosArray = []
    for (let i = 0; i < selected.length; i++) {
      let newPromise = axios.post(urlAlumno,selected[i])
      axiosArray.push(newPromise)
      console.log(axiosArray)
    }      
    axios
      .all(axiosArray)
      .then(axios.spread((...responses) => {
        responses.forEach(res => console.log('Success'))
        console.log('submitted all axios calls');
      }))
      .catch(error => { })
  }

  const closeSnack = () => {
    setShowError({ open: false, message: "" });
  };


  const readFile = (file, idPlacementTest) => {

    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;

      if (OpenFile.readCSV(text.replace(/\r/g, ''), 7) !== null) {

        const listTemp = OpenFile.readCSV(text.replace(/\r/g, ''), 7);

        setListParticipants(listTemp);
      } else {

      }
    };

    reader.readAsText(file, 'ISO-8859-1'); // enable accents
  };



  // --- checkBox
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = listParticipants.map((item) => item);
      setSelected(newSelected);
      return;
    }
    else
      setSelected([]);
  };


  function ShowAlert() {
    return (
      <div className="alignToLeft">
        <Alert severity="success" sx={{ marginTop: "10px", marginBottom: "20px", width: "350px" }} onClose={() => setAlertVisible(false)} >
          <AlertTitle> Success </AlertTitle>
          <strong> The information has been updated </strong>
        </Alert>
      </div>
    )
  }

  //if checkbox is selected
  const isSelected = (item) => selected.indexOf(item) !== -1;



  function PrintRows(props) {

    const { item, i, setOpenModal, setSelectedIndex, selected, setSelected, isSelected } = props;

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    }));


    const handleCheckBox = (event, item) => {
      const selectedIndex = selected.indexOf(item);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, item);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);

    };

    const isItemSelected = isSelected(item)

    item.semestre = parseInt(item.semestre, 10)
    item.id_carrera = parseInt(item.id_carrera, 10)
    return (
      <React.Fragment key={item.index}>

        <StyledTableRow hover
          onClick={(event) => handleCheckBox(event, item)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}

          selected={isItemSelected}
        >

          <TableCell padding="checkbox" component="th" scope="row" align="right" width="5%">
            <Checkbox
              color="primary"
              checked={isItemSelected}
              inputProps={{
                "aria-labelledby": i
              }}
            />
          </TableCell>

          <TableCell component="th" scope="row" align="right" width="5%"> {i + 1} </TableCell>
          <TableCell component="th" align="center" width="30%" style={{ textAlign: "center" }}> {item.nombre} </TableCell>
          <TableCell component="th" align="center" width="10%" style={{ textAlign: "center" }}> {item.apellidoP} </TableCell>
          <TableCell component="th" align="center" width="10%" style={{ textAlign: "center" }}> {item.apellidoM} </TableCell>
          <TableCell component="th" align="center" width="10%" style={{ textAlign: "center" }}> {item.semestre} </TableCell>
          <TableCell component="th" align="center" width="30%" style={{ textAlign: "center" }}> {item.CURP} </TableCell>
          <TableCell component="th" align="center" width="50%" style={{ textAlign: "center" }}> {item.correo} </TableCell>
          <TableCell component="th" align="center" width="50%" style={{ textAlign: "center" }}> {item.id_carrera} </TableCell>

        </StyledTableRow>
      </React.Fragment>
    );
  }


  function EmptyRow() {
    return (
      <TableRow>
        <StyledTableCell colSpan={6} align="center" style={{ fontSize: 30, color: '#d1d1d1', backgroundColor: '#fff' }}>
          Vacio        </StyledTableCell>
      </TableRow>
    );
  }


  return (
    <>
      <Container className="align-middle mt-48">
        <div class="position-relative">
          <div class="position-absolute top-0 start-0">
            <input type="text" class="form-control" placeholder='Buscar Alumno' />
          </div>
          <div class="position-absolute top-0 start-50 translate-middle">
            <h2>Listado</h2>
          </div>
          <div class="position-absolute top-0 end-0">
            <button className="btn btn-success">Agregar Alumno</button>
          </div>
        </div>
        <br></br>
        <br></br>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={showError.open}
          onClose={closeSnack}
          message={showError.message}
          style={{ marginBottom: "5%", zIndex: "1000" }}
        />

        <div className="spinner">
          <FadeLoader color="#202020" loading={loading} height={18} width={6} radius={2} margin={2} speedMultiplier="1" />
        </div>

        {alertVisible === true ? <ShowAlert /> : null}

        <h1 style={{ textAlign: "center", marginBottom: "20px" }}> {selectedPT.name} </h1>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table collapsible table" >
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    color="info"
                    indeterminate={selected.length > 0 && selected.length < listParticipants.length}
                    checked={listParticipants.length > 0 && selected.length === listParticipants.length}
                    onChange={handleSelectAllClick}
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell width="5%" align="left"> ID </StyledTableCell>
                <StyledTableCell align="right" width="10%" style={{ textAlign: "center" }}> Full Name </StyledTableCell>
                <StyledTableCell align="right" width="10%" style={{ textAlign: "center" }}> ApellidoP </StyledTableCell>
                <StyledTableCell align="right" width="10%" style={{ textAlign: "center" }}> ApellidoM </StyledTableCell>
                <StyledTableCell align="right" width="5%" style={{ textAlign: "center" }}> semestre </StyledTableCell>
                <StyledTableCell align="right" width="20%" style={{ textAlign: "center" }}> CURP </StyledTableCell>
                <StyledTableCell align="right" width="30%" > correo </StyledTableCell>
                <StyledTableCell align="right" width="30%" > id_carrera </StyledTableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0 ? listParticipants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : listParticipants).map((item, i) => (
                <PrintRows key={i} {...{ item, i, setOpenModal, setSelectedIndex, selected, setSelected, isSelected }} />
              ))}

              {listParticipants.length === 0 ? <EmptyRow /> : null}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[3, 6, 12, { label: "All", value: -1 }]}
                  count={listParticipants.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <Stack direction="row" alignItems="right" spacing={3} style={{ marginLeft: "60%" }}>


          <Button
            startIcon={<FileUploadIcon />}
            variant="contained"
            component="label"
            style={{ backgroundColor: "#111827", color: "white", marginTop: "15px", marginBottom: "20px", width: 200 }} >
            Import file
            <input hidden accept=".csv" type="file" onChange={(e) => readFile(e.target.files[0], idPlacementTest)} />
          </Button>



          <Button onClick={() => insertar()}
            startIcon={<PersonAddIcon />}
            variant="contained"
            style={{ backgroundColor: "#111827", color: "white", marginTop: "15px", marginBottom: "20px", width: 220 }} >
            Insertar
          </Button>


        </Stack>

      </Container>
    </>
  );
}

export default memo(ListInvitations);

