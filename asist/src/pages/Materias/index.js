import React, { Component } from "react";
import ReactDOM from "react-dom";
//import React, { Component } from 'react';
import * as Yup from "yup";
import { Formik, Field, FastField, Form, errors, ErrorMessage } from "formik";
//import { materiaSchema } from '../../validacion/materiavalidacion';
import './index.css';
import axios from "axios";
import Search from '../../components/Search';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://127.0.0.1:8000/bd/v1/Materia/";

function validateNombre(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi ,"Sólo caracteres latinos.") {
    error = 'Invalid nombre solo latinos';
  }
  return error;
}
function validateDescripcion(value) {
  let error;
  if (!value) {
    error = 'Required descr';
  } else if (/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi ,"Sólo caracteres latinos.") {
    error = 'Invalid solo latinos';
  }
  return error;
}

export const materiaSchema = Yup.object().shape({
    
  nombre: Yup.string()
    
    .required("Campo Requeridoo")
    .min(3, "Mínimo 5 caracteres")
    .max(25, "Máximo 25 caracteres")
    .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi ,"Sólo caracteres latinos.")
    .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Nombre Completo'),
    
  
  descripcion: Yup.string()
    .required("Campo Requerido")
    .matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi ,"Sólo caracteres latinos.")
    .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Nombre Completo'),
});

 
class Materias extends Component {
  state = {
    result: '',
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: '',
      Nombre: '',
      descripcion: ''
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
                  <h1 className="mt-5">Login Form</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
            <Formik
            initialValues={{
              
              nombre: '',
              descripcion: '',
             
            }}
            validationSchema={materiaSchema}
            onSubmit={values  => {
              // same shape as initial values
              console.log(values);
              
            }
            }
          >
           {({errors, touched}) => (
            <Form>  
      
        <div className='container'>
          <div className="App">
            <h2>Materias</h2>
            <br />

            <div class="mb-3 row">
              <div class="col-sm-4">
                <input type="text" class="form-control" placeholder='Buscar Materia' value={this.state.result} onChange={this.onChange} />
              </div>
              <div class="col-sm-4">
              </div>
              <div class="col-sm-4">
                <button className="btn btn-success" type="submit" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Materia</button>
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
           
            <Modal className='ajustarmodal' isOpen={this.state.modalInsertar}>
              <ModalHeader style={{ display: 'block' }}>
                <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
              </ModalHeader>
              <ModalBody>
                <div className="form-group">
                  <label htmlFor="id">ID</label>
                  <input className="form-control" type="text" name="id" id="id" readOnly
                    onChange={this.handleChange} value={form ? form.id : this.state.data.length + 1} />
                  <br />
                  <label htmlFor="nombre">Nombre</label>
                  <br />
                  <Field type="text" name="nombre" placeholder="Nombre" id="nombre" validate={this.validateNombre}
                    onChange={this.handleChange} value={form ? form.nombre : ''}  />
                    {errors.nombre && touched.nombre && 
                      <div>{errors.nombre}</div>}
                    <br />
                 
                  
                  <label htmlFor="descripcion">Descripcion</label>
                  <Field className="form-control" type="text" name="descripcion" placeholder="Nombre del Docente" id="descripcion" validate={this.validateDescripcion}
                     value={form ? form.descripcion : ''} onChange={this.handleChange} />
                    {errors.descripcion && touched.descripcion &&
                        <div>{errors.descripcion}</div>}
                    
                  <br />
                </div>
              </ModalBody>

              <ModalFooter>
                {this.state.tipoModal === 'insertar' ?
                  <button type="submit" className="btn btn-primary btn-block" onClick={() => this.peticionPost()}>
                   Insertar
                  </button> : <button type="submit" className="btn btn-primary btn-block" onClick={() => this.peticionPut()}>
                  
                  </button>
                }
                <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
              </ModalFooter>
            </Modal>
           
           
            <Modal isOpen={this.state.modalEliminar}>
              <ModalBody>
                Estás seguro que deseas eliminar: {form && form.nombre}
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
              </ModalFooter>
            </Modal>
            
          </div>
        </div>
       
        
      </Form>
        )}
       </Formik>
       </div>
        </div>
      </div>
    );
  }
}
export default Materias;
const rootElement = document.getElementById("root");
ReactDOM.render(<Materias/>, rootElement);