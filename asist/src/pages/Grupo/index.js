import React, { useState, useEffect, Component } from 'react'
import './App.css'
import axios from "axios"
import basicState from './basicState'
import "bootstrap/dist/css/bootstrap.min.css"
import Search from '../../components/Search'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import apiRequests from '../../hooks/useRequests'

const Grupo = () => {

  const { groups } = apiRequests()
  console.log( 'grupos', groups )
  const url = `${process.env.REACT_APP_API_HOST}/v1/Grupo/`
  const urlAlumnos = `${process.env.REACT_APP_API_HOST}/v1/Alumno/`
  const urlGrupoAlumnos = `${process.env.REACT_APP_API_HOST}/v1/Grupo_has_Alumnos/`
  const [state, setState] = useState(basicState)

  const onChange = async e => {
    e.persist();
    await this.setState({ result: e.target.value });
    console.log(this.state.result);
  }
  const peticionGet = () => {
    axios.get(url).then(response => {
      this.setState({ data: response.data });
    }).catch(error => {
      console.log(error.message);
    })
  }
  const peticionGetAlumnos = () => {
    axios.get(urlAlumnos).then(response => {
      this.setState({ dataAlumnos: response.data });
    }).catch(error => {
      console.log(error.message);
    })
  }

  const peticionGetGrupoAlumnos = () => {
    axios.get(urlGrupoAlumnos).then(response => {
      this.setState({ dataGrupoAlumnos: response.data });
      console.log(response.data)
    }).catch(error => {
      console.log(error.message);
    })
  }
  const peticionPost = async () => {
    delete this.state.form.id;
    await axios.post(url, this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    }).catch(error => {
      console.log(error.message);
    })
  }
  const peticionPostGrupoAlumnos = async () => {
    delete this.state.form.id;
    await axios.post(urlGrupoAlumnos, this.state.formGrupoAlumnos).then(response => {
      //console.log(this.state.formGrupoAlumnos)
      this.modalGrupoAlumnos();
      this.peticionGetGrupoAlumnos();
    }).catch(error => {
      console.log(error.message);
    })
  }
  const peticionPut = () => {
    axios.put(url + this.state.form.id + '/', this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    })
  }
  const peticionDelete = () => {
    axios.delete(url + this.state.form.id).then(response => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    })
  }
  const peticionDeleteAlumnos = () => {
    axios.delete(urlGrupoAlumnos + this.state.formAlumnos.id).then(response => {
      this.setState({ modalEliminarAlumno: false });
      this.peticionGetGrupoAlumnos();
    })
  }
  const modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }
  const modalAlumnos = () => {
    this.setState({ modalAlumnos: !this.state.modalAlumnos });
  }
  const seleccionarGrupo = (grupo) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: grupo.id,
        nombre: grupo.nombre,
      }
    })
  }
  const seleccionarAlumno = (alumno) => {
    this.setState({
      tipoModal: 'actualizar',
      formAlumnos: {
        id: alumno.id,
      }
    })
  }
  const VerAlumnos = (grupo) => {
    this.setState({
      tipoModal: 'Ver',
      formAlumnos: {
        nombre: grupo.nombre,
      }
    })
  }
  const handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }
  const handleChange2 = async e => {
    e.persist();
    await this.setState({
      formGrupoAlumnos: {
        ...this.state.formGrupoAlumnos,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.formGrupoAlumnos);
  }
  const handleChange3 = async e => {
    e.persist();
    await this.setState({
      formAlumnos: {
        ...this.state.formAlumnos,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.formAlumnos);
  }

  return (
    <>
      <div className='container'>
        <div className="App">
          <h2>Grupos</h2>
          <br />
          <div class="mb-3 row">
            <div class="col-sm-4">
              <input type="text" class="form-control" placeholder='Buscar Grupo' value={state.result} onChange={onChange} />
            </div>
            <div class="col-sm-4">
              <button className="btn btn-danger" onClick={() => { setState({ ...basicState, modalGrupoAlumnos: true }) }}>Asignar</button>
            </div>
            <div class="col-sm-4">
              <button className="btn btn-success" onClick={() => { setState({ form: null, tipoModal: 'insertar' }); modalInsertar() }}>Agregar Grupo</button>
            </div>
          </div>
          <table className="table" class="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {state.data.filter(grupo => grupo.nombre.toLowerCase()
                .indexOf(state.result.toLowerCase()) > -1)
                .map(grupo => {
                  return (

                    <tr>
                      <td>{grupo.id}</td>
                      <td>{grupo.nombre}</td>
                      <td>
                        <button className="btn btn-primary" onClick={() => { seleccionarGrupo(grupo); modalInsertar() }}>Actualizar</button>
                        <button className="btn btn-danger" onClick={() => { seleccionarGrupo(grupo); setState({ modalEliminar: true }) }}>Eliminar</button>
                        <button className="btn btn-secondary" onClick={() => { VerAlumnos(grupo); setState({ modalAlumnos: true }) }}>Lista de alumnos</button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>

        <Modal className='ajustarmodal' isOpen={state.modalInsertar}>

          <ModalHeader style={{ display: 'block' }}>
            <h5 class="modal-title" id="exampleModalLongTitle">Grupo</h5>
          </ModalHeader>

          <ModalBody>
            <div className="form-group">

              <label htmlFor="id">ID</label>
              <input className="form-control" type="text" name="id" id="id" readOnly
                onChange={handleChange} value={state.form ? state.form.id : state.data.length + 1} />
              <br />

              <label htmlFor="nombre">Nombre</label>
              <input className="form-control" type="text" name="nombre" id="nombre"
                onChange={handleChange} value={state.form ? state.form.nombre : ''} />
              <br />

            </div>
          </ModalBody>

          <ModalFooter>
            {
              state.tipoModal === 'insertar' ?
                <button className="btn btn-success" onClick={() => peticionPost()}>
                  Insertar
                </button> :
                <button className="btn btn-primary" onClick={() => peticionPut()}>
                  Actualizar
                </button>
            }
            <button className="btn btn-danger" onClick={() => modalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal className='ajustarmodal' isOpen={state.modalEliminar}>
          <ModalBody>
            ¿Estás seguro que deseas eliminar este grupo?
            <br />{state.form && state.form.nombre}
          </ModalBody>

          <ModalFooter>
            <button className="btn btn-danger" onClick={() => peticionDelete()}>Confirmar</button>
            <button className="btn btn-secundary" onClick={() => setState({ modalEliminar: false })}>Salir</button>
          </ModalFooter>

        </Modal>

        <Modal isOpen={state.modalEliminarAlumno}>
          <ModalBody>
            Estás seguro que deseas eliminar este alumno del grupo?{state.formAlumnos && state.formAlumnos.id}
          </ModalBody>

          <ModalFooter>
            <button className="btn btn-danger" onClick={() => { peticionDeleteAlumnos() }}>Sí</button>
            <button className="btn btn-secundary" onClick={() => { setState({ modalEliminarAlumno: false }) }}>No</button>
          </ModalFooter>
        </Modal>

        <Modal className='ajustarmodal' isOpen={state.modalGrupoAlumnos} >
          <ModalHeader style={{ display: 'block' }}>
            <h5 class="modal-title" id="exampleModalLongTitle">Asignar alumno a grupo</h5>
          </ModalHeader>

          <ModalBody>
            <div className="form-group">
              <label htmlFor="idGrupo">Grupo</label>
              <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                name="idGrupo" id="idGrupo" onChange={handleChange2} defaultValue="">
                  {
                    groups.map( g => (
                      <option key={g.id} value={g.id} >{g.nombre}</option>
                    ))
                  }
              </select>
              <br />
              <label htmlFor="idAlumno">Alumno</label>
              <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                name="idAlumno" id="idAlumno" onChange={handleChange2} value="">
                {state.dataAlumnos.map(Alumnos => (
                  <option key={Alumnos.id} value={Alumnos.id} >{Alumnos.nombre}</option>))
                }
              </select>
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={() => peticionPostGrupoAlumnos()}> Asignar </button>
            <button className="btn btn-danger" onClick={() => setState({ ...state, modalGrupoAlumnos: !state.modalGrupoAlumnos })}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal className='ajustarmodal' fullscreen="sm"
          size="lg" isOpen={state.modalAlumnos}>
          <ModalHeader style={{ display: 'block' }}>
            <h5 class="modal-title" id="exampleModalLongTitle">Alumnos en este grupo</h5>
          </ModalHeader>
          <ModalBody>
            <table className="table " class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Grupo</th>
                  <th>Nombre</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {state.dataGrupoAlumnos.filter(p => state.formAlumnos.nombre === (p.grupo))
                  .map(alumno => {
                    return (
                      <tr onChange={handleChange3}>
                        <td>{state.formAlumnos.nombre}</td>
                        <td>{alumno.alumno}</td>
                        <td> <button className="btn btn-danger" onClick={() => { seleccionarAlumno(alumno); setState({ modalEliminarAlumno: true }); modalAlumnos() }}>Eliminar</button>
                        </td>
                      </tr>
                    )
                  })}

              </tbody>

            </table>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => modalAlumnos()}>OK</button>
          </ModalFooter>
        </Modal>
      </div>


    </>
  );
}

export default Grupo
