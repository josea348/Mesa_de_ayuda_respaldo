import ContentsInputs from '../Molecules/ContentsInputs'
import DivsSelectUser from '../Molecules/DivsSelectUser'

export default function ContentSelectUser({ text, name, value, onChange }) {
  return (
    <ContentsInputs text={text}>
      <DivsSelectUser name={name} value={value} onChange={onChange} />
    </ContentsInputs>
  )
}
