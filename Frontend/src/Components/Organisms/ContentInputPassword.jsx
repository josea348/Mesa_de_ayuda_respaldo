import ContentsInputs from '../Molecules/ContentsInputs'
import InputPassword from '../Molecules/InputPassword'

export default function ContentInputPassword({ text, name, onChange, value }) {
  return (
    <ContentsInputs text={text}>
      <InputPassword name={name} onChange={onChange} value={value} />
    </ContentsInputs>
  )
}
