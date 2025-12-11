import { useEffect, useState } from 'react'
import DivContent from '../Atom/DivContent';
import HeaderMolecule from '../Molecules/HeaderMolecule';
import Image from '../Atom/Image';
import List from '../Atom/List';
import Label from '../Atom/Label';

import HomeIcon from '../../Icons/HomeIcon';
import CalendarIcon from '../../Icons/CalendarIcon';
import MapIcon from '../../Icons/MapIcon';
import BuildingIcon from '../../Icons/BuildingIcon';
import BellIcon from '../../Icons/BellIcon';
import LogoutIcon from '../../Icons/LogoutIcon';
import { LogbookIcon } from '../../Icons/LogbookIcon';
import { UserIcon } from '../../Icons/UserIcon';

import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ children }) {
  // const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, listUserId, userId, logout, active, setActive } = useAuth();
  const idUser = localStorage.getItem('id');

  console.log(idUser);
  console.log(userId);

  const inicio = () => {
    navigate('/dashboard');
  }
  const areas =()=>{
    navigate('/areas');
  }
  const ambientes =()=>{
    navigate('/ambientes');
  }
  const equipos =()=>{
    navigate('/equipos');
  }
  const bitacoras =()=>{
    navigate('/bitacoras');
  }
  const reserva =()=>{
    navigate('/reservas');
  }
  const notificacion =()=>{
    navigate('/notificaciones');
  }
  const categorias = () => {
    navigate('/categorias');
  }
  const encuesta =()=>{
    navigate('/encuestas');
  }
  const perfil =()=>{
    navigate('/perfil');
  }
  const archivos =()=>{
    navigate('/archivos');
  }

  useEffect(() => {
    listUserId(idUser);
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <DivContent className="w-full h-[calc(100vh-100px)] flex flex-1 absolute top-[100px]">
          <HeaderMolecule active={active}>
            <Image
              src='./src/assets/control.png'
              className={`w-6.5 absolute cursor-pointer -right-3 top-9 border-dark-purple border-2 rounded-full ${!active && "rotate-180"}`}
              onClick={() => setActive(!active)}
            />
            <List className="hover:bg-green-400 p-1 border-b-2 border-green-400 rounded cursor-pointer flex flex-row gap-2" onClick={inicio}><HomeIcon /> {active ? <Label>Inicio</Label> : <></>}</List>
            <List className="hover:bg-green-400 p-1 border-b-2 border-green-400 rounded cursor-pointer flex flex-row gap-2" onClick={bitacoras}><LogbookIcon /> {active ? <Label>Bitacotas</Label> : <></>}</List>
            <List className="hover:bg-green-400 p-1 border-b-2 border-green-400 rounded cursor-pointer flex flex-row gap-2" onClick={areas}><MapIcon /> {active ? <Label>Areas</Label> : <></>}</List>
            <List className="hover:bg-green-400 p-1 border-b-2 border-green-400 rounded cursor-pointer flex flex-row gap-2" onClick={ambientes}><BuildingIcon /> {active ? <Label>Ambientes</Label> : <></>}</List>
            <List className="hover:bg-green-400 p-1 border-b-2 border-green-400 rounded cursor-pointer flex flex-row gap-2" onClick={equipos}><BuildingIcon /> {active ? <Label>Equipos</Label> : <></>}</List>
            <List className="hover:bg-green-400 p-1 border-b-2 border-green-400 rounded cursor-pointer flex flex-row gap-2" onClick={reserva}><CalendarIcon /> {active ? <Label>Reservas</Label> : <></>}</List>
            <List className="hover:bg-green-400 p-1 border-b-2 border-green-400 rounded cursor-pointer flex flex-row gap-2" onClick={notificacion}><BellIcon /> {active ? <Label>Notificación</Label> : <></>}</List>
            <List className="hover:bg-green-400 p-1 border-b-2 border-green-400 rounded cursor-pointer flex flex-row gap-2" onClick={archivos}><BellIcon /> {active ? <Label>Archivos</Label> : <></>}</List>
            {(userId || '').rol === 'Administrador' ? (
              <>
                <List className="hover:bg-green-400 p-1 border-b-2 border-green-400 rounded cursor-pointer flex flex-row gap-2" onClick={categorias}><LogbookIcon /> {active ? <Label>Categorías</Label> : <></>}</List>
                <List className="hover:bg-green-400 p-1 border-b-2 border-green-400 rounded cursor-pointer flex flex-row gap-2" onClick={encuesta}><BellIcon /> {active ? <Label>Encuestas</Label> : <></>}</List>
              </>
            ) : (<></>)}
            <List className="hover:bg-green-400 p-1 border-b-2 border-green-400 rounded cursor-pointer flex flex-row gap-2" onClick={perfil}><UserIcon /> {active ? <Label>Perfil</Label> : <></>}</List>
            <List className="hover:bg-green-400 p-1 border-b-2 border-green-400 rounded cursor-pointer flex flex-row gap-2" onClick={logout}><LogoutIcon /> {active ? <Label>Cerrar Seción</Label> : <></>}</List>
          </HeaderMolecule>
          <DivContent className={`${active ? 'w-[calc(100%-150px)] sm:w-[calc(100%-195px)] lg:w-[calc(100%-240px)]' : 'w-[calc(100%-60px)]'} p-4 bg-white overflow-y-auto absolute right-0`}>
            {children}
          </DivContent>
        </DivContent>
      ) : (
        <DivContent className="w-full h-[calc(100vh-100px)] flex flex-1 absolute top-[100px]">
          <DivContent className={`w-100% p-4 bg-white overflow-y-auto m-auto`}>
            {children}
          </DivContent>
        </DivContent>
      )}
    </>
  )
}
