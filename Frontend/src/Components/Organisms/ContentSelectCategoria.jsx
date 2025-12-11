import ContentsInputs from '../Molecules/ContentsInputs'
import DivsSelectCategoria from '../Molecules/DivsSelectCategoria'

export default function ContentSelectCategoria({ text, name, value, onChange }) {
  return (
    <ContentsInputs text={text}>
      <DivsSelectCategoria name={name} value={value} onChange={onChange} />
    </ContentsInputs>
  )
}
