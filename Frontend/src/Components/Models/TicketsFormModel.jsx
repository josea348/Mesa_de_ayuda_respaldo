import DivContent from '../Atom/DivContent'
import ContentInputString from './../Organisms/ContentInputString';
import TitleSecond from './../Atom/TitleSecond';
import Footer from './../Molecules/Footer';
import ContentSelect from '../Organisms/ContentSelect';
import ContentInputNumber from './../Organisms/ContentInputNumber';

export default function TicketsFormModel({isOpen, onClose}) {
  if (!isOpen) return null;
    
  return (
    <DivContent className="fixed inset-0 flex items-center justify-center bg-black/50 z-1 overflow-auto pt-70 p-4">
      <DivContent className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <TitleSecond className="text-2xl font-bold mb-4 text-center">Registro De Tickets</TitleSecond>

        {/* <DivContent className="space-y-4 grid grid-cols-2 gap-4"> */}
        <DivContent className="space-y-4">
          <ContentInputString text='titulo' placeholder="Enter your titulo" />
          <ContentInputString text='descripcion' placeholder="Enter your descripcion" />
          <ContentInputNumber text='categoria' placeholder="Enter your categoria" />
          <ContentSelect text='categoria' />
          <ContentInputString text='prioridad' placeholder="Enter your prioridad" />
          <ContentInputString text='estado' placeholder="Enter your estado" />
          <ContentInputString text='solicitante' placeholder="Enter your solicitante" />
          <ContentInputString text='asignado' placeholder="Enter your asignado" />
        </DivContent>

        <Footer onClose={onClose} textClose='Cerrar' textSubmit='Registrar' />
      </DivContent>
    </DivContent>
  )
}
