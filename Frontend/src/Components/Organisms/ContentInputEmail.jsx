import ContentsInputs from '../Molecules/ContentsInputs'
import InputEmail from '../Molecules/InputEmail'

export default function ContentInputEmail({text, name, value, onChange}) {
  return (
    <ContentsInputs text={text}>
      <InputEmail name={name} value={value} onChange={onChange} />
    </ContentsInputs>
  )
}
