export default function Formulario({className, onSubmit, children }) {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  )
}
