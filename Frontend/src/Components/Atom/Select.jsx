export default function Select({ className, name, value, onChange, children }) {
  return (
    <select className={className} value={value} onChange={onChange} name={name}>
      {children}
    </select>
  )
}
