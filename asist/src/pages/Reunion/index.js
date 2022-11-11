import React, { Component } from 'react';
import './index.css';
import axios from "axios";
import Search from '../../components/Search';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="http://127.0.0.1:8000/bd/v1/Reunion/";

class Reunion extends Component {
state={
  result:'',
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id:'',
    cantidad_alumnos:'',
    detalle:'',
    idclase:'',
    
  }
}
onChange = async e =>{
  e.persist();
  await this.setState({result: e.target.value});
  console.log(this.state.result);
}
peticionGet=()=>{
axios.get(url).then(response=>{
  this.setState({data: response.data});
  console.log(response.data);
}).catch(error=>{
  console.log(error.message);
})
}
peticionPost=async()=>{
  delete this.state.form.id;
 await axios.post(url,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}
peticionPut=()=>{
  axios.put(url+this.state.form.id + '/', this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}
peticionDelete=()=>{
  axios.delete(url+this.state.form.id).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}
modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}
seleccionarReunion=(reunion)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
        id:reunion.id,
        cantidad_alumnos:reunion.cantidad_alumnos,
        detalle:reunion.detalle, 
        idclase:reunion.idclase 
        
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
    <div className="App container">
    <Search  className='search'  placeholder='Buscar Reunion' value= {this.state.result} onChange={this.onChange}/>
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Reunion</button>
  <br /><br />
    <table className="table" class="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>TotalAlumnos</th>
          <th>Clase</th>
          <th>NombreReunion</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.filter(reunion => reunion.clase.toLowerCase()
        .indexOf(this.state.result.toLowerCase()) > -1)
        .map(reunion=>{
          return(
            <tr>
          <td>{reunion.id}</td>
          <td>{reunion.cantidad_alumnos}</td>
          <td>{reunion.detalle}</td>
          <td>{reunion.idclase}</td>
          
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarReunion(reunion); this.modalInsertar()}}>Actualizar</button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarReunion(reunion); this.setState({modalEliminar: true})}}>Eliminar</button>
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
                    <label htmlFor="Cantidad de alumnos">Total</label>
                    <input className="form-control" type="text" name="totalalumno" id="totalalumno"
                    onChange={this.handleChange} value={form?form.totalalumno: ''}/>
                    <br />
                    <label htmlFor="detalle">Nombre Reunion</label>
                    <input className="form-control" type="text" name="detalle" id="detalle"
                    onChange={this.handleChange} value={form?form.nombrereunion: ''}/>
                    <br />
                    <label htmlFor="clase">Clase</label>
                    <input className="form-control" type="text" name="clase" id="clase"
                    onChange={this.handleChange} value={form?form.clase: ''}/>
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
      <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
               Estás seguro que deseas eliminar: {form && form.nombrereunion}
          </ModalBody>
          <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
          </ModalFooter>
      </Modal>
  </div>
  </>
  );
}
}
export default Reunion;
