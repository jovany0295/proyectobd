import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import '../../../src/App/App.css';
import axios from "axios";
import "bootstrap/dist/js/bootstrap.js";

class LoginModal extends React.Component {
  constructor(props, context){
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
        show: false
    }
}

handleShow() {
    console.log(this.state)
    this.setState({ show: true })
}
handleClose(){
    this.setState({ show: false })
}
render() {

    return (
       <div>
          <Modal show={this.state.show} onHide={this.handleClose}>
             <Modal.Header closeButton>
               <Modal.Title>Modal Heading</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly 
                    />
                    <br />
                    <label htmlFor="nombre">ApellidoP</label>
                    <input className="form-control" type="text" name="apellidoP" id="apellidoP"
                    />
                    <br />
                    <label htmlFor="nombre">ApellidoM</label>
                    <input className="form-control" type="text" name="apellidoM" id="apellidoM"
                     />
                    <br />
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="nombre" id="nombre"
                    />
                    <br />
                    <label htmlFor="nombre">RFC</label>
                    <input className="form-control" type="text" name="RFC" id="RFC"
                     />
                    <br />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  {this.state.tipoModal==='insertar'?
                    <button className="btn btn-success" >
                    Insertar
                  </button>: <button className="btn btn-primary" >
                    Actualizar
                  </button>
                  } 
                    <button className="btn btn-danger" >Cancelar</button>
                </Modal.Footer>

          </Modal>
        </div>
    )
  }
}
export default LoginModal