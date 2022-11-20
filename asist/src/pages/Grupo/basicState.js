const basicState = {
  result: '',
  data: [],
  dataAlumnos: [],
  dataGrupoAlumnos: [],
  modalInsertar: false,
  modalEliminar: false,
  modalAlumnos: false,
  modalEliminarAlumno: false,
  modalGrupoAlumnos: false,
  form: {
    id: '',
    nombre: '',
  },
  formGrupoAlumnos: {
    id: '',
    idGrupo: '',
    idAlumno: '',
  },
  formAlumnos: {
    nombre: ''
  }
}

export default basicState