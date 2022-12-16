import React, { Component } from 'react';
import './index.css';
import axios from "axios";
import Search from '../../components/Search';
import ValidacionPeriodo from '../../Validacion/Periodos/Periodos'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="http://127.0.0.1:8000/bd/v1/Periodo/";

class Periodos extends Component {

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
      Descripcion: ''
                    }
                    };

onChange = async e =>{
  e.persist();
  await this.setState({result: e.target.value});
  console.log(this.state.result);
}
peticionGet= () => {
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
  this.setState({ modalInsertar:false});
  this.peticionGet();
 // this.setState({modalInsertar: !this.state.modalInsertar});
}
seleccionarPeriodo=(periodo)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
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
   <div className='container'>
          <div className="App">
            <h2>Periodos</h2>
            <br />

            <div class="mb-3 row">
              <div class="col-sm-4">
                <input type="text" class="form-control" placeholder='Buscar Periodo' value={this.state.result} onChange={this.onChange} />
              </div>
              <div class="col-sm-4">
              </div>
              <div class="col-sm-4">
              <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.setState({ modalInsertar: true }) }}>Agregar Periodo</button>
              </div>
            </div>
   
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
                <ModalHeader style={{ display: 'block' }}>
                <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                <ValidacionPeriodo
                mod ={this.state.modalInsertar}
                mod2={this.modalInsertar}
                />
                </ModalBody>

                
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
  </div>
  </>
  );
}
}
export default Periodos;
