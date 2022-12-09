import React, { Component, useState } from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/js/bootstrap.js";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://127.0.0.1:8000/bd/v1/Asistencia/";
const urlReunion = "http://localhost:8000/bd/v1/Reunion/";
const urlAlumno = "http://localhost:8000/bd/v1/Alumno/";

class Asistencia extends Component {
  state = {
    result: '',
    data: [],
    dataReunion: [],
    dataAlumno: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: '',
      idReunion: '',
      idAlumno: '',
      accion: '',
      horaIngreso: '',
      horaSalida: '',
      fecha: '',
      diferencia: '',
    }
  }
  onChange = async e => {
    e.persist();
    await this.setState({ result: e.target.value });
    console.log(this.state.result);
  }

  peticionGet = () => {
    axios.get(url).then(response => {
      this.setState({ data: response.data });
      console.log(response.data);
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionGetReunion = () => {
    axios.get(urlReunion).then(response => {
      this.setState({ dataReunion: response.data });
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionGetAlumno = () => {
    axios.get(urlAlumno).then(response => {
      this.setState({ dataAlumno: response.data });
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
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }

  seleccionarAlumno = (asistencia) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: asistencia.id,
        idReunion: asistencia.idReunion,
        idAlumno: asistencia.idAlumno,
        accion: asistencia.accion,
        horaIngreso: asistencia.horaIngreso,
        horaSalida: asistencia.horaSalida,
        fecha: asistencia.fecha,
        diferencia: asistencia.diferencia,
      }
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
    this.peticionGetAlumno();
    this.peticionGetReunion();

  }

  render() {
    const { form } = this.state;
    return (
      <>
        <div className='container'>
          <div className="App">
            <h2>Asistencias</h2>
            <br />

            <div class="mb-3 row">
              <div class="col-sm-4">
                <input type="text" class="form-control" placeholder='Buscar' value={this.state.result} onChange={this.onChange} />
              </div>
              <div class="col-sm-4">
              </div>
              <div class="col-sm-4">
                <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Registro</button>
              </div>
            </div>
            <table className="table " class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>ID</th>
                  <th>idReunion</th>
                  <th>idAlumno</th>
                  <th>accion</th>
                  <th>horaIngreso</th>
                  <th>horaSalida</th>
                  <th>fecha</th>
                  <th>diferencia</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.data.filter(asistencia => asistencia.accion.toLowerCase()
                    .indexOf(this.state.result.toLowerCase()) > -1)
                    .map(asistencia => {
                      return (
                        <tr>
                          <td>
                            <button className="btn btn-primary" onClick={() => { this.seleccionarAlumno(asistencia); this.modalInsertar() }}>Actualizar</button>
                            <button className="btn btn-danger" onClick={() => { this.seleccionarAlumno(asistencia); this.setState({ modalEliminar: true }) }}>Eliminar</button>
                          </td>
                          <td>{asistencia.id}</td>
                          <td>{asistencia.idReunion}</td>
                          <td>{asistencia.idAlumno}</td>
                          <td>{asistencia.accion}</td>
                          <td>{asistencia.horaIngreso}</td>
                          <td>{asistencia.horaSalida}</td>
                          <td>{asistencia.fecha}</td>
                          <td>{asistencia.diferencia}</td>


                        </tr>
                      )
                    })}
              </tbody>
            </table>
            <div >
              <Modal className='ajustarmodal' isOpen={this.state.modalInsertar} >
                <ModalHeader style={{ display: 'block' }}>
                  <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">

                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly
                      onChange={this.handleChange} value={form ? form.id : this.state.data.length + 1} />
                    <br />

                    <label>idReunion</label>
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                      name="idReunion" id="idReunion" onChange={this.handleChange}>
                      {this.state.dataReunion.map(reunion => (
                        <option key={reunion.id} value={reunion.id}>{reunion.id}</option>))
                      }
                    </select>
                    <br />

                    <label>idAlumno</label>
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                      name="idAlumno" id="idAlumno" onChange={this.handleChange}>
                      {this.state.dataAlumno.map(alumno => (
                        <option key={alumno.id} value={alumno.id}>{alumno.id}</option>))
                      }
                    </select>
                    <br />

                    <label>accion</label>
                    <input className="form-control" type="text" name="accion" id="accion"
                      onChange={this.handleChange} value={form ? form.accion : ''} />
                    <br />

                    <label>horaIngreso</label>
                    <input className="form-control" type="text" name="horaIngreso" id="horaIngreso"
                      onChange={this.handleChange} value={form ? form.horaIngreso : ''} />
                    <br />

                    <label>horaSalida</label>
                    <input className="form-control" type="text" name="horaSalida" id="horaSalida"
                      onChange={this.handleChange} value={form ? form.horaSalida : ''} />
                    <br />

                    <label>fecha</label>
                    <input className="form-control" type="email" name="fecha" id="fecha"
                      onChange={this.handleChange} value={form ? form.fecha : ''} />
                    <br />

                    <label>diferencia</label>
                    <input className="form-control" type="text" name="diferencia" id="diferencia"
                      onChange={this.handleChange} value={form ? form.diferencia : ''} />
                    <br />
                  </div>
                </ModalBody>

                <ModalFooter className='ajustarmodal'>
                  {this.state.tipoModal === 'insertar' ?
                    <button className="btn btn-success" onClick={() => this.peticionPost()}>
                      Insertar
                    </button> : <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                      Actualizar
                    </button>
                  }
                  <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
              </Modal>
              <Modal className='ajustarmodal' isOpen={this.state.modalEliminar}>
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
export default Asistencia;