import { useState } from 'react';
import DivContent from '../Atom/DivContent'
import Title from '../Atom/Title';
import ListOrColumnBtn from '../Molecules/ListOrColumnBtn';
import CardNotificacionOrganismo from '../Organisms/CardNotificacionOrganismo'

export default function CardNotificacion({ notificacion }) {
  const [isGridActive, setIsGridActive] = useState(true);

  const handleToggleGrid = () => {
    setIsGridActive(true);
  }

  const handleToggleList = () => {
    setIsGridActive(false);
  }
  return (
    <DivContent>
      <Title className={'text-center text-2xl font-bold mb-10'}>Notificaciones</Title>
      <ListOrColumnBtn grid={isGridActive} list={!isGridActive} onClickGrid={handleToggleGrid} onClickList={handleToggleList} />
      <DivContent className={`${isGridActive ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} grid p-2 gap-4`}>
        <CardNotificacionOrganismo notificacion={notificacion} isGridActive={isGridActive} />
      </DivContent>
    </DivContent>
  )
}
