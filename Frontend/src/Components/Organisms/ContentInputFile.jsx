import ContentsInputs from '../Molecules/ContentsInputs'
import InputFile from '../Molecules/InputFile'

export default function ContentInputFile({text,placeholder,name,onChange}) {
  return (
    <ContentsInputs text={text}>
      <InputFile placeholder={placeholder} name={name} onChange={onChange} />
    </ContentsInputs>
  )
}
