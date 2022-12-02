import React, { Component } from 'react';
import './index.css';
import axios from "axios";
import Search from '../../components/Search';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ValidacionReunion from '../../Validacion/Reunion/Reunion';

const url = "http://127.0.0.1:8000/bd/v1/Reunion/";
const urlClase = "http://127.0.0.1:8000/bd/v1/Clase/";

class Reunion extends Component {
  state = {
    result: '',
    data: [],
    dataClase: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: '',
      cantidad_alumnos: '',
      detalle: '',
      idclase: '',
      fecha: '',
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
  peticionGetClase = () => {
    axios.get(urlClase).then(response => {
      this.setState({ dataClase: response.data });
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
  seleccionarReunion = (reunion) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: reunion.id,
        cantidad_alumnos: reunion.cantidad_alumnos,
        detalle: reunion.detalle,
        idclase: reunion.idclase,
       // fecha:reunion.fecha
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
    this.peticionGetClase();
  }
  render() {
    const { form } = this.state;
    return (
      <>
        <div className='container'>
          <div className="App">
            <h2>Reuniones</h2>
            <br />

            <div class="mb-3 row">
              <div class="col-sm-4">
                <input type="text" class="form-control" placeholder='Buscar Reunion' value={this.state.result} onChange={this.onChange} />
              </div>
              <div class="col-sm-4">
              </div>
              <div class="col-sm-4">
                <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Reunion</button>
              </div>
            </div>
            <table className="table" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Total Alumnos</th>
                  <th>Clase</th>
                  <th>Nombre Reunion</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.filter(reunion => reunion.detalle.toLowerCase()
                  .indexOf(this.state.result.toLowerCase()) > -1)
                  .map(reunion => {
                    return (
                      <tr>
                        <td>{reunion.id}</td>
                        <td>{reunion.cantidad_alumnos}</td>
                        <td>{reunion.detalle}</td>
                        <td>{reunion.idclase}</td>
                        <td>{reunion.fecha}</td>

                        <td>
                          <button className="btn btn-primary" onClick={() => { this.seleccionarReunion(reunion); this.modalInsertar() }}>Actualizar</button>
                          {"   "}
                          <button className="btn btn-danger" onClick={() => { this.seleccionarReunion(reunion); this.setState({ modalEliminar: true }) }}>Eliminar</button>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
            <Modal className='ajustarmodal' isOpen={this.state.modalInsertar}>
              <ModalHeader style={{ display: 'block' }}>
                <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
              </ModalHeader>
              <ModalBody>
               <ValidacionReunion/> 
              </ModalBody>

              
            </Modal>
            <Modal isOpen={this.state.modalEliminar}>
              <ModalBody>
                Estás seguro que deseas eliminar: {form && form.id}
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
export default Reunion;
