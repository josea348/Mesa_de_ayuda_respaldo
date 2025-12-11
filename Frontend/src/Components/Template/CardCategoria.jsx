import DivContent from '../Atom/DivContent'
import Title from '../Atom/Title'
import BtnAdd from '../Molecules/BtnAdd'
import CardCategoriaOrganism from './../Organisms/CardCategoriaOrganism';
import { useNavigate } from 'react-router-dom'

export default function CardCategoria() {
  const navigate = useNavigate();

  const AddCategoria = () => {
    navigate('/add-categoria');
  }

  return (
    <>
      <DivContent>
        <Title className={'text-center text-2xl font-bold mb-10'}>Categorias</Title>
        <BtnAdd text='Agregar Categoria' onClick={AddCategoria} />
        <DivContent className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 gap-4'>
          <CardCategoriaOrganism />
        </DivContent>
      </DivContent>
    </>
  )
}
