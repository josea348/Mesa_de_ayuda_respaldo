export default function Texto({className, children, onClick}) {
  return (
    <p className={className} onClick={onClick}>
      {children}
    </p>
  )
}
