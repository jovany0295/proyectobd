import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/js/bootstrap.js";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ValidacionMaterias from '../../Validacion/Clases/Clases'
import Grupo from '../Grupo';
import Materias from '../Materias';
import Search from '../../components/Search';

const url = "http://127.0.0.1:8000/bd/v1/Clase/";
const urlCarrera = "http://127.0.0.1:8000/bd/v1/Carrera/";
const urlMaestro = "http://127.0.0.1:8000/bd/v1/Maestro/";
const urlPeriodo = "http://127.0.0.1:8000/bd/v1/Periodo/";
const urlMateria = "http://127.0.0.1:8000/bd/v1/Materia/";
const urlGrupo = "http://127.0.0.1:8000/bd/v1/Grupo/";

class Clasess extends Component {
 
  constructor(props) {
    super(props);
  //this.handleChangeclase = this.handleChangeclase.bind(this);
  this.state = {
    result: '',
    data: [],
    dataCarrera: [],
    dataMaestro: [],
    dataPeriodo: [],
    dataMateria: [],
    dataGrupo: [],
    modalInsertar: false,
    modalEliminar: false,
               }
               
  this.state.form ={
     id: '',
      nombre: '',
      horario: '',
      idCarrera: '',
      idMaestro: '',
      idPeriodo: '',
      idGrupo: '',
      idMateria: '',
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
  peticionGetMaestro = () => {
    axios.get(urlMaestro).then(response => {
      this.setState({ dataMaestro: response.data });
    }).catch(error => {
      console.log(error.message);
    })
  }
  peticionGetPeriodo = () => {
    axios.get(urlPeriodo).then(response => {
      this.setState({ dataPeriodo: response.data });
    }).catch(error => {
      console.log(error.message);
    })
  }
  peticionGetGrupo = () => {
    axios.get(urlGrupo).then(response => {
      this.setState({ dataGrupo: response.data });
    }).catch(error => {
      console.log(error.message);
    })
  }
  peticionGetMateria = () => {
    axios.get(urlMateria).then(response => {
      this.setState({ dataMateria: response.data });
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
  seleccionarAlumno = (clase) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: clase.id,
        nombre: clase.nombre,
        horario: clase.horario,
        idCarrera: clase.idCarrera,
        idMaestro: clase.idMaestro,
        idPeriodo: clase.idPeriodo,
        idGrupo: clase.idGrupo,
        idMateria: clase.idMateria,
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
    this.peticionGetCarrera();
    this.peticionGetMaestro();
    this.peticionGetPeriodo();
    this.peticionGetGrupo();
    this.peticionGetMateria();
  }
  render() {
    const { form } = this.state;
    return (
      <>
        <div className='container'>
          <div className="App">
            <h2>Clases</h2>
            <br />
            <div class="mb-3 row">
              <div class="col-sm-4">
                <input type="text" class="form-control" placeholder='Buscar Clase' value={this.state.result} onChange={this.onChange} />
              </div>
              <div class="col-sm-4">
              </div>
              <div class="col-sm-4">
                <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' });this.setState({ modalInsertar: true })  }}>Agregar Nueva Clase</button>
              </div>
            </div>
            <br /><br />
            <table className="table " class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Horario</th>
                  <th>Carrera</th>
                  <th>Maestro</th>
                  <th>Periodo</th>
                  <th>Grupo</th>
                  <th>Materia</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.filter(clase => clase.nombre.toLowerCase()
                  .indexOf(this.state.result.toLowerCase()) > -1)
                  .map(clase => {
                    return (
                      <tr>
                        <td>{clase.id}</td>
                        <td>{clase.nombre}</td>
                        <td>{clase.horario}</td>
                        <td>{clase.idCarrera}</td>
                        <td>{clase.idMaestro}</td>
                        <td>{clase.idPeriodo}</td>
                        <td>{clase.idGrupo}</td>
                        <td>{clase.idMateria}</td>
                        <td>
                          <button className="btn btn-primary" onClick={() => { this.seleccionarAlumno(clase); this.modalInsertar() }}>Actualizar</button>
                          {"   "}
                          <button className="btn btn-danger" onClick={() => { this.seleccionarAlumno(clase); this.setState({ modalEliminar: true }) }}>Eliminar</button>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
            <Modal className='ajustarmodal' isOpen={this.state.modalInsertar}>

              <ModalBody>
                <div >
                <ValidacionMaterias 
                  mod={this.modalInsertar}
                  carrerastate={this.state.dataCarrera}
                  maestrostate={this.state.dataMaestro}
                  periodostate={this.state.dataPeriodo}
                  grupostate={this.state.dataGrupo}
                  materiastate={this.state.dataMateria}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                {this.state.tipoModal == 'insertar' ?
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
                Estás seguro que deseas eliminar al alumno de la clase: <br />{form && form.nombre}
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
              </ModalFooter>
            </Modal>
          </div>
        </div>

      </>
    );
  }
}
export default Clasess;