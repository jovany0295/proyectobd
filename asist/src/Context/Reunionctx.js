import React, { Component, useState, createContextcontext } from 'react';

const Reunionctx = React.createContext();

//export const Providerctx = Reunionctx.Provider;
//export const ConsumerReunion= Reunionctx.Consumer;

class Providerctx extends Component {

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

  setId = (id) => {
    this.setState((prevState) => ({ id }));
  }
  setDetalle = (detalle) => {
    this.setState((prevState) => ({ detalle }));
  }
  setResult = (result) => {
    this.setState((prevState) => ({ result }));
  }
  setModalinsertar = (modalInsertar) => {
    this.setState((prevState) => ({ modalInsertar }));
  }
  render() {
    const { children } = this.props;
    const { id } = this.state;
    const { setId } = this;
    const { result } = this.state;
    const { setResult } = this;
    const { modalInsertar } = this.state;
    const { setModalinsertar } = this;
    return (
      <Reunionctx.Provider
        value={{
            result, setResult,
            id, setId,
            modalInsertar, setModalinsertar,

        }}
      >
        { children }
      </Reunionctx.Provider>
    )
  }
}


export {Reunionctx, Providerctx };



