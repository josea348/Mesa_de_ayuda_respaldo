import Title from '../Atom/Title';
import BtnAdd from '../Molecules/BtnAdd';
import DivContent from '../Atom/DivContent';
import CardArchivosAdjuntosOrganism from '../Organisms/CardArchivosAdjuntosOrganism';

export default function CardArchivosAdjuntos() {
  return (
    <>
      <Title className={'text-center text-2xl font-bold mb-10'}>Archivos</Title>
      <DivContent className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 gap-4'>
        <CardArchivosAdjuntosOrganism />
      </DivContent>
    </>
  )
}
