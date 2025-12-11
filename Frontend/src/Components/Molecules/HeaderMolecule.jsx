import { useAuth } from '../../context/AuthContext';
import Aside from '../Atom/Aside'
import ListDesOrden from '../Atom/ListDesOrden'

export default function HeaderMolecule({ children }) {
  const { active } = useAuth();

  return (
    <Aside className={`${active ? 'w-[150px] sm:w-[195px] lg:w-[240px]' :'w-[50px]'} h-full border-r-2 border-green-500 bg-gray-100 p-2 fixed z-1`}>
      <ListDesOrden className="space-y-2">
        {children}
      </ListDesOrden>
    </Aside>
  )
}
