import { useEffect } from 'react';
import DivContent from '../Atom/DivContent'
import CardCategoriaMolecule from '../Molecules/CardCategoriaMolecule';
import EditDeleteButton from '../Molecules/EditDeleteButton';
import Texto from '../Atom/Texto';
import { useCategorias } from '../../context/CategoriasContext';
import { useNavigate } from 'react-router-dom';

export default function CardCategoriaOrganism() {
  const { categorias, listCategorias, removeCategoria } = useCategorias();
  const navigate = useNavigate();

  console.log(listCategorias);

  useEffect(() => {
    listCategorias();
  }, []);

  const updateArea = (id) => {
    navigate(`/edit-categoria/${id}`);
  }

  if (!categorias) {
    return <Texto>Cargando información de las categorias...</Texto>;
  }

  return (
    <>
      {(categorias || []).map((items) => (
        <DivContent className='flex flex-col gap-2 p-3 rounded-lg bg-gray-50 shadow-md' key={items.id}>
          <CardCategoriaMolecule
            nombre={items.nombre}
            descripcion={items.descripcion}
            register={items.fecha_registro}
            update={items.fecha_actualizacion}
          />
          <DivContent className='flex flex-row gap-2'>
            <EditDeleteButton
              edit={() => updateArea(items.id)}
              deletes={() => removeCategoria(items.id)}
            />
          </DivContent>
        </DivContent>
      ))}
    </>
  )
}
