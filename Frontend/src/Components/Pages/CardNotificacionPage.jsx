import CardNotificacion from '../Template/CardNotificacion'

export default function CardNotificacionPage() {
  const notificaciones = [
    {
      titulo: "Jase",
      comentario: "y13",
    },
    {
      titulo: "Ana",
      comentario: "y15",
    }
  ]

  return (
    <CardNotificacion notificacion={notificaciones} />
  )
}
