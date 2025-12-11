import ContentsInputs from '../Molecules/ContentsInputs'
import InputDate from '../Molecules/InputDate'

export default function ContentInputDate({text, placeholder}) {
  return (
    <ContentsInputs text={text}>
      <InputDate placeholder={placeholder} />
    </ContentsInputs>
  )
}
