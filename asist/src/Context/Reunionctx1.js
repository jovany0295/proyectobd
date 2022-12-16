import React, { useState, createContext } from 'react'

const ReunionContext = createContext()

function GlobalProvider ( {children} ){

  const [ result, setResult ]                = useState( '' )
  const [ data, setData ]                    = useState( [] )
  const [ dataclase, setDataclase ]          = useState( [] )
  const [ modalInsertar, setModalinsertar ]  = useState( false )
  const [ modalEliminar, setModaleliminar ]  = useState( false )
  const [ form, setForm ] = useState( {
            id: '',
            cantidad_alumnos: '',
            detalle: '',
            idclase: '',
            fecha: '',
        } )

  const setId = (newid) => {
          setForm((currentUser) => ({
            ...currentUser,
            id: newid
          }));
  };
  const setCantidad_alumnos = (newcantal) => {
    setForm((currentUser) => ({
      ...currentUser,
      cantidad_alumnos: newcantal
    }));
  };
    const setDetalle = (newdetalle) => {
      setForm((currentUser) => ({
        ...currentUser,
        detalle: newdetalle
      }));
    };
     const setIdclase = (newidclase) => {
        setForm((currentUser) => ({
          ...currentUser,
          idclase: newidclase
        }));
      };
     const setFecha = (newfecha) => {
          setForm((currentUser) => ({
            ...currentUser,
            fecha: newfecha
          }));
        };


  return(
    <ReunionContext.Provider value={{
      result, setResult,
      data, setData,
      dataclase, setDataclase,
      modalInsertar, setModalinsertar,
      modalEliminar, setModaleliminar,
      form, setId,
      form, setCantidad_alumnos,
      form, setDetalle,
      form, setIdclase,
      form, setFecha

    }}>
      { children }
    </ReunionContext.Provider>
  )
}

export { ReunionContext, GlobalProvider }