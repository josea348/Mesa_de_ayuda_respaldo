import ContentsInputs from '../Molecules/ContentsInputs'
import InputString from '../Molecules/InputString'

export default function ContentInputString({text, placeholder, name, value, onChange}) {
  return (
    <ContentsInputs text={text}>
      <InputString placeholder={placeholder} name={name} value={value} onChange={onChange} />
    </ContentsInputs>
  )
}
  