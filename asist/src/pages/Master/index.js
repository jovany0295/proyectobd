import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import Search from '../../components/Search';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { margin } from '@mui/system';

const url="http://127.0.0.1:8000/bd/v1/Maestro/";

class Master extends Component {
state={
  result:'',
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    apellidoP: '',
    apellidoM: '',
    nombre: '',
    RFC: '',
  }
}
onChange = async e =>{
  e.persist();
  await this.setState({result: e.target.value});
  console.log(this.state.result);
}

peticionGet=()=>{
  let token = sessionStorage.getItem("token")
axios.get(url, {
  headers: {
      'Authorization': 'Bearer ' + token
}}).then(response=>{
  this.setState({data: response.data});
  console.log(response.data);

}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=()=>{
  let token = sessionStorage.getItem("token")
  delete this.state.form.id;
 axios.post(url,this.state.form,{
  headers: {
      'Authorization': 'Bearer ' + token
}}).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut=()=>{
  let token = sessionStorage.getItem("token")

  axios.put(url+this.state.form.id + '/', this.state.form,{
    headers: {
        'Authorization': 'Bearer ' + token
  }}).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}

peticionDelete=()=>{
  let token = sessionStorage.getItem("token")
  axios.delete(url+this.state.form.id,{
    headers: {
        'Authorization': 'Bearer ' + token
  }}).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarMaestro=(maestro)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
        id: maestro.id,
        apellidoM:maestro.apellidoM,
        apellidoP: maestro.apellidoP,
        nombre: maestro.nombre,
        RFC: maestro.RFC,
    }
  })
}




handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
console.log(this.state.form);
}

  componentDidMount() {
    this.peticionGet();
  }
  render(){
    const {form}=this.state;
  return (
    <> 
    <div className='container'>
     <div className="App">
    <h2>Maestros</h2>
    <br />
  <div class="mb-3 row">
    <div class="col-sm-4">
    <input type="text" class="form-control" placeholder='Buscar Docente' value= {this.state.result} onChange={this.onChange}/>
    </div>
    <div class="col-sm-4">
    </div>
    <div class="col-sm-4">
    <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Maestro</button>
    </div>
    </div>
    <table className="table" class="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Apellido P</th>
          <th>ApellidoM</th>
          <th>Nombre</th>
          <th>RFC</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.filter(maestro => maestro.nombre.toLowerCase()
        .indexOf(this.state.result.toLowerCase()) > -1)
        .map(maestro=>{
          return(
            <tr>
          <td>{maestro.id}</td>
          <td>{maestro.apellidoP}</td>
          <td>{maestro.apellidoM}</td>
          <td>{maestro.nombre}</td>
          <td>{maestro.RFC}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarMaestro(maestro); this.modalInsertar()}}>Actualizar</button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarMaestro(maestro); this.setState({modalEliminar: true})}}>Eliminar</button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    <Modal className='ajustarmodal' isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly 
                    onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="nombre">ApellidoP</label>
                    <input className="form-control" type="text" name="apellidoP" id="apellidoP"
                     onChange={this.handleChange} value={form?form.apellidoP: ''}/>
                    <br />
                    <label htmlFor="nombre">ApellidoM</label>
                    <input className="form-control" type="text" name="apellidoM" id="apellidoM"
                     onChange={this.handleChange} value={form?form.apellidoM: ''}/>
                    <br />
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="nombre" id="nombre"
                     onChange={this.handleChange} value={form?form.nombre: ''}/>
                    <br />
                    <label htmlFor="nombre">RFC</label>
                    <input className="form-control" type="text" name="RFC" id="RFC"
                     onChange={this.handleChange} value={form?form.RFC: ''}/>
                    <br />
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal==='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal className='ajustarmodal' isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar {form && form.id}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>

  </div>
  </>
  );
}
}
export default Master;
