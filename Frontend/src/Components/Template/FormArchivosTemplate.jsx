import { useEffect, useState } from 'react'
import DivContent from '../Atom/DivContent'
import TitleSecond from '../Atom/TitleSecond'
import Formulario from '../Atom/Formulario'
import ContentInputString from '../Organisms/ContentInputString'
import ContentInputFile from '../Organisms/ContentInputFile'
import Footer from '../Molecules/Footer'
import { useArchivoAdjunto } from './../../context/ArchivosAdjuntosContext';
import { useNavigate, useParams } from 'react-router-dom'

export default function FormArchivosTemplate() {
  const params = useParams();
  const [dataArchivoForm, setDataArchivoForm] = useState({
    ticketId: params.id,
    nombreArchivo: '',
    archivo: null
  });
  const { createArchivo, editArchivo, listArchivoId, archivoId } = useArchivoAdjunto();
  const navigate = useNavigate();

  console.log(params);
  console.log(params.id);
  console.log(params.ids);

  useEffect(() => {
    if (params.ids) {
      listArchivoId(params.ids);
    }
  }, [params.ids]);

  useEffect(() => {
    if (archivoId && params.ids) {
      setDataArchivoForm({

        
        nombreArchivo: archivoId.nombre_archivo || '',
        archivo: null,
      })
    }
  }, [archivoId, params.ids]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setDataArchivoForm({ ...dataArchivoForm, [name]: name === "archivo" ? files[0] : value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in dataArchivoForm) {
      formData.append(key, dataArchivoForm[key]);
    }

    const response = params.ids
      ? await editArchivo(params.ids, formData)
      : await createArchivo(formData);
    if (response.success) {
      navigate('/archivos');
    }
  }

  const closeForm = () => {
    navigate('/archivos');
  }

  return (
    <DivContent className="w-[60%] bg-white rounded-xl p-2 shadow-lg m-auto mt-4">
      <DivContent className="text-2xl font-bold absolute top-[6%] right-[24%] cursor-pointer" onClick={closeForm}>X</DivContent>
      <TitleSecond className="text-2xl font-bold mb-4 text-center">{params.id ? 'Actualizar' : 'Registro De'} Ambiente</TitleSecond>

      <Formulario onSubmit={handleSubmit} className="space-y-4">
        <ContentInputString text='Nombre del archivo' name='nombreArchivo' placeholder="Ingrese el nombre del archivo" onChange={handleChange} value={dataArchivoForm.nombreArchivo} />
        <ContentInputFile text='Archivo' name='archivo' onChange={handleChange} value={dataArchivoForm.archivo} />
        <Footer textSubmit={params.ids ? 'Actualizar' : 'Registrar'} variant='primary' />
      </Formulario>

    </DivContent>
  )
}
