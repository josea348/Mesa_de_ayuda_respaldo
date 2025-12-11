import ContentsInputs from '../Molecules/ContentsInputs'
import InputTextarea from '../Molecules/InputTextarea'

export default function ContentInputTextarea({ text, placeholder, name, value, onChange, children, className }) {
  return (
    <ContentsInputs text={text} className={className}>
      <InputTextarea placeholder={placeholder} name={name} value={value} onChange={onChange}>{children}</InputTextarea>
    </ContentsInputs>
  )
}
  