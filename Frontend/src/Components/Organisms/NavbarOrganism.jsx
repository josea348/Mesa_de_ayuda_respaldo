import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Nav from '../Atom/Nav'
import Image from '../Atom/Image'
import Input from '../Atom/Input'
import Button from '../Atom/Button'

export default function NavbarOrganism() {
  const idUser = localStorage.getItem('id');
  const { isAuthenticated, userId, listUserId } = useAuth();
  const navigate = useNavigate();

  console.log(userId);
  
  useEffect(() => {
    listUserId(idUser);
  }, [idUser, listUserId]);

  return (
    <>
      {isAuthenticated ? (
        <Nav className="w-full h-[100px] bg-green-300 text-white flex items-center justify-between px-8 shadow-lg fixed z-1">
          <Image src={`http://localhost:4001/img/${(userId || []).image}`} alt='img' className="w-18 h-18 rounded-full border-1 border-[#ccc] cursor-pointer" onClick={()=>navigate('/perfil')} />
          <Input type='text' className="w-[40%] text-xl p-1 text-black bg-white rounded-lg" />
          <Image src='./src/assets/logo-sena-naranja.d8b9a0f4.svg' className="w-18 rounded-full" />
        </Nav>
      ) : (
          <Nav className="w-full h-[100px] bg-green-300 text-white flex items-center justify-between px-8 shadow-lg fixed z-1">
            <Button className='cursor-pointer' onClick={()=>navigate('/login')} variant='third'>Iniciar Secion</Button>
            <Image src='./src/assets/logo-sena-naranja.d8b9a0f4.svg' className="w-18 rounded-full" />
          </Nav>
      )}
      
    </>
  )
}
