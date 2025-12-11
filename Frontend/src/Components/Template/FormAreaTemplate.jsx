import { useEffect, useState } from "react";
import DivContent from "../Atom/DivContent";
import TitleSecond from "../Atom/TitleSecond";
import Footer from "../Molecules/Footer";
import ContentInputNumber from "../Organisms/ContentInputNumber";
import ContentInputString from "../Organisms/ContentInputString";
import { useNavigate, useParams } from "react-router-dom";
import { useAreas } from "../../context/AreasContext";
import Formulario from "../Atom/Formulario";
import ContentInputTextarea from "../Organisms/ContentInputTextarea";

export default function FormAreaTemplate() {
  const [addAreaForm, setAddAreaForm] = useState({
    nombre: '',
    descripcion: '',
  });
  const { createArea, editArea, listAreaId, areaId } = useAreas();
  const navigate = useNavigate();
  const params = useParams();

  console.log(params);
  console.log(params.id);

  useEffect(() => {
    if (params.id) {
      listAreaId(params.id);
    }
  }, [params.id]);

  console.log(areaId);

  useEffect(() => {
    if (areaId && params.id) {
      setAddAreaForm({
        nombre: areaId.nombre || '',
        descripcion: areaId.descripcion || '',
      })
    }
  }, [areaId, params.id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAddAreaForm({ ...addAreaForm, [name]: name === "image" ? files[0] : value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = params.id
      ? await editArea(params.id, addAreaForm)
      : await createArea(addAreaForm);
    if (response.success) {
      navigate('/areas');
    }
  }

  const closeForm = () => {
    navigate('/areas');
  }

  return (
    <DivContent className="w-[60%] bg-white rounded-xl p-2 shadow-lg m-auto mt-4">
      <DivContent className="text-2xl font-bold absolute top-[6%] right-[24%] cursor-pointer" onClick={closeForm}>X</DivContent>
      <TitleSecond className="text-2xl font-bold mb-4 text-center">{params.id ? 'Actulizar' : 'Registro De'} Area</TitleSecond>
      <Formulario onSubmit={handleSubmit} className="space-y-4">
        <ContentInputString text='Nombre' placeholder="Ingrese su nombre" name="nombre" onChange={handleChange} value={addAreaForm.nombre} />
        <ContentInputTextarea text='Descripción' placeholder="Ingrese su descripción" name="descripcion" onChange={handleChange} value={addAreaForm.descripcion} />
        <Footer textSubmit={params.id ? 'Actualizar':'Registrar'} variant='primary' />
      </Formulario>
    </DivContent>
  )
}
