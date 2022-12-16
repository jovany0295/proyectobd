import React, { Component, useContext, useState } from "react";
import ReactDOM from "react-dom";
//import React, { Component } from 'react';
import * as Yup from "yup";
import { Formik, Field, FastField, Form, errors, ErrorMessage } from "formik";
//import { materiaSchema } from '../../validacion/materiavalidacion';
import ValidacionMaterias from '../../Validacion/Materias/Materias'
import './index.css';
import axios from "axios";
import Search from '../../components/Search';
import { Modal, ModalBody, ModalFooter, ModalHeader, Badge } from 'reactstrap';

const url = "http://127.0.0.1:8000/bd/v1/Materia/";

class Materias2 extends Component {
  
  constructor(props) {
    super(props);
    //this.handleChangeclase = this.handleChangeclase.bind(this);
    this.state = {
      result: '',
      data: [],
      modalInsertar: false,
      modalEliminar: false, 
                 }
    this.state.form ={
      id: '',
      Nombre: '',
      descripcion: ''
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
  seleccionarMateria = (materia) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: materia.id,
        nombre: materia.nombre,
        descripcion: materia.descripcion
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
  }

  render() {
    const { form } = this.state;
    return (
              <div className="container">
              <div className="row mb-5">
                <div className="col-lg-12 text-center">
                  <h1 className="mt-5">Materias</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
     
            <h2>Materias</h2>
            <br />

            <div class="mb-3 row">
              <div class="col-sm-4">
                <input type="text" class="form-control" placeholder='Buscar Materia' value={this.state.result} onChange={this.onChange} />
              </div>
              <div class="col-sm-4">
              </div>
              <div class="col-sm-4">
                <button className="btn btn-success" type="submit" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.setState({ modalInsertar: true }) }}>Agregar Materia</button>
              </div>
            </div>
            <table className="table" class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.filter(materia => materia.nombre.toLowerCase()
                  .indexOf(this.state.result.toLowerCase()) > -1)
                  .map(materia => {
                    return (
                      <tr>
                        <td>{materia.id}</td>
                        <td>{materia.nombre}</td>
                        <td>{materia.descripcion}</td>
                        <td>
                          <button className="btn btn-primary" onClick={() => { this.seleccionarMateria(materia); this.modalInsertar() }}>Actualizar</button>
                          {"   "}
                          <button className="btn btn-danger" onClick={() => { this.seleccionarMateria(materia); this.setState({ modalEliminar: true }) }}>Eliminar</button>
                        </td>
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
                  <ValidacionMaterias 
                  mod={this.modalInsertar}
                  />
                </ModalBody>

              </Modal>
              <Modal className='ajustarmodal' isOpen={this.state.modalEliminar}>
                <ModalBody>
                  Estás seguro que deseas eliminar la materia{form && form.nombre}
                </ModalBody>
                <ModalFooter>
                  <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                  <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                </ModalFooter>
              </Modal>
            </div>

       </div>
      </div>
      </div>
    );
  }
}
export default Materias2;

