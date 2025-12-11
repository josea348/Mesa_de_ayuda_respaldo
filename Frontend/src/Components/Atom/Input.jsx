export default function Input({ type, value, name, className, placeholder, onChange }) {
  return (
    <input type={type} value={value} name={name} className={className} placeholder={placeholder} onChange={onChange} />
  )
}
