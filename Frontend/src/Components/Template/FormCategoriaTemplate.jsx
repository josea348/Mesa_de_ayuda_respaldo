import { useEffect, useState } from "react";
import DivContent from "../Atom/DivContent";
import TitleSecond from "../Atom/TitleSecond";
import Footer from "../Molecules/Footer";
import ContentInputString from "../Organisms/ContentInputString";
import { useNavigate, useParams } from "react-router-dom";
import Formulario from "../Atom/Formulario";
import ContentInputTextarea from "../Organisms/ContentInputTextarea";
import { useCategorias } from "../../context/CategoriasContext";

export default function FormCategoriaTemplate() {
  const [addCategoriaForm, setAddCategoriaForm] = useState({
    nombre: '',
    descripcion: '',
  });
  const { createCategoria, editCategoria, listCategoriaId, categoriaId } = useCategorias();
  const navigate = useNavigate();
  const params = useParams();

  console.log(params);
  console.log(params.id);

  useEffect(() => {
    if (params.id) {
      listCategoriaId(params.id);
    }
  }, [params.id]);

  console.log(categoriaId);

  useEffect(() => {
    if (categoriaId && params.id) {
      setAddCategoriaForm({
        nombre: categoriaId.nombre || '',
        descripcion: categoriaId.descripcion || '',
      })
    }
  }, [categoriaId, params.id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAddCategoriaForm({ ...addCategoriaForm, [name]: name === "image" ? files[0] : value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = params.id
      ? await editCategoria(params.id, addCategoriaForm)
      : await createCategoria(addCategoriaForm);
    if (response.success) {
      navigate('/categorias');
    }
  }

  const closeForm = () => {
    navigate('/categorias');
  }

  return (
    <DivContent className="w-[60%] bg-white rounded-xl p-2 shadow-lg m-auto mt-4">
      <DivContent className="text-2xl font-bold absolute top-[6%] right-[24%] cursor-pointer" onClick={closeForm}>X</DivContent>
      <TitleSecond className="text-2xl font-bold mb-4 text-center">{params.id ? 'Actulizar' : 'Registro De'} Categorias</TitleSecond>
      <Formulario onSubmit={handleSubmit} className="space-y-4">
        <ContentInputString text='Nombre' placeholder="Ingrese su nombre" name="nombre" onChange={handleChange} value={addCategoriaForm.nombre} />
        <ContentInputTextarea text='Descripción' placeholder="Ingrese su descripción" name="descripcion" onChange={handleChange} value={addCategoriaForm.descripcion} />
        <Footer textSubmit={params.id ? 'Actualizar' : 'Registrar'} variant='primary' />
      </Formulario>
    </DivContent>
  )
}
