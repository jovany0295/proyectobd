import { useState, useEffect, useRef } from "react";

import React, { Component } from 'react';
import { Modal } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.js";
// import './ModalData.css';
import {  Master } from "../../pages/Master/index";

export default function ModalData(props){
    console.log(props, ' props');
    
    return(
      
        <div className="modal">
            <Modal className='ajustarmodal' show={props.isOpen} onHide={props.close}>
                <Modal.Header closeButton>
                  <Modal.Title>{props.tituloModal}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                      <div style={{ display: (props.tipo != 'insertar' ? 'block' : 'none') }}>
                          <label htmlFor="id">ID</label>
                          <input className="form-control" type="text" name="id" id="id" readOnly 
                           onChange={props.handleChange}
                           value={props.formData.id === null ? "" : props.formData.id}
                         />

                      </div>

                      <br />
                      <label htmlFor="nombre">ApellidoP</label>
                      <input className="form-control" type="text" name="apellidoP" id="apellidoP"
                       onChange={props.handleChange}
                       value={props.formData.apellidoP === null ? "" : props.formData.apellidoP}
                      />
                      <br />
                      <label htmlFor="nombre">ApellidoM</label>
                      <input className="form-control" type="text" name="apellidoM" id="apellidoM"
                       onChange={props.handleChange}
                       value={props.formData.apellidoM === null ? "" : props.formData.apellidoM}
                      />
                      <br />
                      <label htmlFor="nombre">Nombre</label>
                      <input className="form-control" type="text" name="nombre" id="nombre"
                        onChange={props.handleChange}
                        value={props.formData.nombre === null ? "" : props.formData.nombre}
                      />
                      <br />
                      <label htmlFor="nombre">RFC</label>
                      <input className="form-control" type="text" name="RFC" id="RFC"
                       onChange={props.handleChange}
                       value={props.formData.RFC === null ? "" : props.formData.RFC}
                      />
                      <br />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={props.endpoint} className="btn btn-success" >
                      Insertar
                    </button>
                    <button className="btn btn-danger" onClick={props.close} >Cancelar</button>
                </Modal.Footer>
            </Modal>
        </div>     
    )
}