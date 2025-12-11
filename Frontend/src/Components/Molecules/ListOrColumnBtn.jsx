import DivContent from '../Atom/DivContent'
import Button from '../Atom/Button'

import { FaListUl } from 'react-icons/fa'
import { GrGrid } from 'react-icons/gr'

export default function ListOrColumnBtn({ grid, list, onClickGrid, onClickList}) {
  return (
    <DivContent className='flex rounded-lg border-2 border-black w-fit m-2 mb-5'>
      <Button className={`${grid ? 'bg-gray-300' : 'bg-white'} rounded-l-lg rounded-none text-xl border-r-1 border-black p-2`} onClick={onClickGrid}>
        <GrGrid />
      </Button>
      <Button className={`${list ? 'bg-gray-300' : 'bg-white'} rounded-r-lg rounded-none text-xl border-l-1 border-black p-2`} onClick={onClickList}>
        <FaListUl />
      </Button>
    </DivContent>
  )
}
