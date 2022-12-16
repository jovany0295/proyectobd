import React, { Component, useState } from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/js/bootstrap.js";
import { Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Search from '../../components/Search';
import ValidacionAlumnos from '../../Validacion/Alumnos/Alumnos';


const url = "http://127.0.0.1:8000/bd/v1/Alumno/";
const urlCarrera = "http://127.0.0.1:8000/bd/v1/Carrera/";

class Alumnos extends Component {

  constructor(props) {
    super(props);
    //this.handleChangeclase = this.handleChangeclase.bind(this);
    this.state = {
      result: '',
      data: [],
      dataCarrera: [],
      modalInsertar: false,
      modalEliminar: false,
  }
  this.state.form ={
    id: '',
    apellidoP: '',
    apellidoM: '',
    nombre: '',
    semestre: '',
    CURP: '',
    correo: '',
    id_carrera: '',
  }
  };
  
  onChange = async e => {
    e.persist();
    await this.setState({ result: e.target.value });
    console.log(this.state.result);
  }

  peticionGet = () => {
    axios.get(url).then(response => {
      this.setState({ data: response.data });
    }).catch(error => {
      console.log(error.message);
    })
  }
  peticionGetCarrera = () => {
    axios.get(urlCarrera).then(response => {
      this.setState({ dataCarrera: response.data });

    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionPost = async () => {
    delete this.state.form.id;
    await axios.post(url, this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionPut = () => {
    axios.put(url + this.state.form.id + '/', this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    })
  }

  peticionDelete = () => {
    axios.delete(url + this.state.form.id).then(response => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    })
  }

  modalInsertar = () => {
    this.setState({ modalInsertar:false});
    this.peticionGet();
  }

  seleccionarAlumno = (alumno) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: alumno.id,
        apellidoP: alumno.apellidoP,
        apellidoM: alumno.apellidoM,
        nombre: alumno.nombre,
        CURP: alumno.CURP,
        semestre: alumno.semestre,
        correo: alumno.correo,
        id_carrera: alumno.id_carrera,
      }
    })
  }
  changeBackgroundToYellow = () => {
    this.setState({
      backgroundColor: 'yellow'
    })
  }
  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }

  componentDidMount() {
    this.peticionGet();
    this.peticionGetCarrera();
  }

  render() {
    const { form } = this.state;
    return (
      <>
        <div className='container'>
          <div className="App">
            <h2>Alumnos</h2>
            <br />

            <div class="mb-3 row">
              <div class="col-md-4">
                <input type="text" class="form-control" placeholder='Buscar Alumno' value={this.state.result} onChange={this.onChange} />
              </div>
              <div class="col-md-4">
              </div>
              <div class="col-md-4">
                <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' });  this.setState({ modalInsertar: true })   }}>Agregar Alumno</button>
              </div>
            </div>
            <table className="table " class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>ID</th>
                  <th>Apellido P</th>
                  <th>ApellidoM</th>
                  <th>Nombre</th>
                  <th>semestre</th>
                  <th>CURP</th>
                  <th>carrera</th>
                  <th>correo</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.data.filter(alumno => alumno.nombre.toLowerCase()
                    .indexOf(this.state.result.toLowerCase()) > -1)
                    .map(alumno => {
                      return (
                        <tr>
                          <td>
                            <button className="btn btn-primary" onClick={() => { this.seleccionarAlumno(alumno); this.modalInsertar() }}>Actualizar</button>
                            {"   "}
                            <button className="btn btn-danger" onClick={() => { this.seleccionarAlumno(alumno); this.setState({ modalEliminar: true }) }}>Eliminar</button>
                          </td>
                          <td>{alumno.id}</td>
                          <td>{alumno.apellidoP}</td>
                          <td>{alumno.apellidoM}</td>
                          <td>{alumno.nombre}</td>
                          <td>{alumno.semestre}</td>
                          <td>{alumno.CURP}</td>
                          <td>{alumno.carrera}</td>
                          <td>{alumno.correo}</td>
                          
                        </tr>
                      )
                    })}
              </tbody>
            </table>
            <div >
              <Modal className='ajustarmodal modal-dialog modal-lg' isOpen={this.state.modalInsertar} >
                <ModalHeader style={{ display: 'block' }}>
                  <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>           
                  <h3 id="titulo"></h3>
                </ModalHeader>
                <ModalBody>
                      <div class="col-md-6">
                        
                      </div>
                      <ValidacionAlumnos 
                      datacarrera ={this.state.dataCarrera}
                      mod={this.modalInsertar()}
                      />
                      
                   
                </ModalBody>

                
              </Modal>
              <Modal isOpen={this.state.modalEliminar}>
                <ModalBody>
                  Estás seguro que deseas eliminar al alumno{form && form.nombre}
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                  <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Alumnos;