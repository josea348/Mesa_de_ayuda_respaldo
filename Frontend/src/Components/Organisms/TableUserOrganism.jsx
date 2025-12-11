import DivContent from "../Atom/DivContent";
import TableBody from "../Atom/TableBody";
import TableColumn from "../Atom/TableColumn";
import TableColumnTitle from "../Atom/TableColumnTitle";
import TableContent from "../Atom/TableContent";
import TableUserHead from "../Molecules/TableUserHead";

export default function TableUserOrganism({ children }) {
  return (
    <DivContent className='overflow-y-auto'>
      <TableContent className='w-full'>
        <TableUserHead className='bg-white rounded-lg'>
          <TableColumnTitle className={'border-r-2 border-gray-100 p-2 rounded-l-lg'}>Identificación</TableColumnTitle>
          <TableColumnTitle className={'border-r-2 border-gray-100 p-2'}>Nombre</TableColumnTitle>
          <TableColumnTitle className={'border-r-2 border-gray-100 p-2'}>Imagen</TableColumnTitle>
          <TableColumnTitle className={'border-r-2 border-gray-100 p-2'}>Telefono</TableColumnTitle>
          <TableColumnTitle className={'border-r-2 border-gray-100 p-2'}>Email</TableColumnTitle>
          <TableColumnTitle className={'border-r-2 border-gray-100 p-2'}>Rol</TableColumnTitle>
          <TableColumnTitle className={'p-2 rounded-r-lg'}>Acción</TableColumnTitle>
        </TableUserHead>
        <TableBody>
          {children}
        </TableBody>
      </TableContent>
    </DivContent>
  )
}
