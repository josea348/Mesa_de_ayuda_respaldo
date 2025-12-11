import ContentsInputs from '../Molecules/ContentsInputs'
import InputEmailLogin from '../Molecules/InputEmailLogin'

export default function ContentInputEmailLogin({text, placeholder, name, value, onChange, children}) {
  return (
    <ContentsInputs text={text}>
      <InputEmailLogin placeholder={placeholder} name={name} value={value} onChange={onChange}>{children}</InputEmailLogin>
    </ContentsInputs>
  )
}
