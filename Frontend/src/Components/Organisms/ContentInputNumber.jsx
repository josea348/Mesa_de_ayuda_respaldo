import ContentsInputs from '../Molecules/ContentsInputs'
import InputNumber from '../Molecules/InputNumber'

export default function ContentInputNumber({ text, placeholder, name, onChange, value }) {
  return (
    <ContentsInputs text={text}>
      <InputNumber placeholder={placeholder} name={name} onChange={onChange} value={value} />
    </ContentsInputs>
  )
}
