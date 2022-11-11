import React, { Component } from 'react';
import './index.css';
import axios from "axios";
import Search from '../../components/Search';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="http://127.0.0.1:8000/bd/v1/Periodo/";

class Periodos extends Component {
state={
  result:'',
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    Descripcion: ''
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
seleccionarPeriodo=(periodo)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
        id: periodo.id,
        Descripcion:periodo.Descripcion  
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
    <Search  className='search' placeholder='Buscar Periodo' value= {this.state.result} onChange={this.onChange}/>
    <br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Periodo</button>
  <br /><br />
    <table className="table" class="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Descripcion</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.filter(periodo => periodo.Descripcion.toLowerCase()
        .indexOf(this.state.result.toLowerCase()) > -1)
        .map(periodo=>{
          return(
            <tr>
          <td>{periodo.id}</td>
          <td>{periodo.Descripcion}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarPeriodo(periodo); this.modalInsertar()}}>Actualizar</button>
                <button className="btn btn-danger" onClick={()=>{this.seleccionarPeriodo(periodo); this.setState({modalEliminar: true})}}>Eliminar</button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    <Modal className='ajustarmodal' isOpen={this.state.modalInsertar}>
                
                <ModalBody>
                  <div className="form-group">
                    <label >ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly 
                    onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                    <br />
                    <label >Descripcion</label>
                    <input className="form-control" type="text" name="Descripcion" id="Descripcion"
                    onChange={this.handleChange} value={form?form.Descripcion: ''}/>
                    <br />
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal==='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: 
                  <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
                  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
      </Modal>
      <Modal className='ajustarmodal' isOpen={this.state.modalEliminar}>
          <ModalBody>
               Estás seguro que deseas eliminar: {form && form.nombre}
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
export default Periodos;
