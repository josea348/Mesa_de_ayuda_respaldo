import DivContent from "../Atom/DivContent";
import TitleSecond from "../Atom/TitleSecond";
import ContentInputString from "../Organisms/ContentInputString";
import Footer from "../Molecules/Footer";
import ContentInputNumber from "../Organisms/ContentInputNumber";

export default function FormEditUsersAdminModel({ isOpen, onClose }) {
  if (!isOpen) return null;
 
  return (
    <DivContent className="fixed inset-0 flex items-center justify-center bg-black/50 z-1 overflow-auto pt-10 p-4">
      <DivContent className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <TitleSecond className="text-2xl font-bold mb-4 text-center">Registro De Usuarios</TitleSecond>

        {/* <DivContent className="space-y-4 grid grid-cols-2 gap-4"> */}
        <DivContent className="space-y-4">
          <ContentInputNumber text='Identificacion' placeholder="Enter your id" />
          <ContentInputString text='Nombre' placeholder="Enter your name" />
          <ContentInputString text='Telefono' placeholder="Enter your phone" />
          <ContentInputString text='Email' placeholder="Enter your email" />
          <ContentInputString text='Rol' placeholder="Enter your rol" />
        </DivContent>

        <Footer onClose={onClose} textClose='Cerrar' textSubmit='Registrar' />
      </DivContent>
    </DivContent>
  )
}
