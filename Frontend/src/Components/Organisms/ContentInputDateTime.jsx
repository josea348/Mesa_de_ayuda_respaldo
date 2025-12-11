import ContentsInputs from '../Molecules/ContentsInputs'
import InputDateTime from '../Molecules/InputDateTime'

export default function ContentInputDateTime({ text, placeholder, value, name, onChange }) {
    return (
        <ContentsInputs text={text}>
            <InputDateTime placeholder={placeholder} value={value} name={name} onChange={onChange} />
        </ContentsInputs>
    )
}
