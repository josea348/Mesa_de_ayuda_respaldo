import ContentsInputs from '../Molecules/ContentsInputs'
import InputPassworLogin from './../Molecules/InputPassworLogin';

export default function ContentInputPasswordLogin({text,placeholder,name,value,onChange,children}) {
  return (
    <ContentsInputs text={text}>
      <InputPassworLogin placeholder={placeholder} name={name} value={value} onChange={onChange} >{children}</InputPassworLogin>
    </ContentsInputs>
  )
}
