import DivContent from '../Atom/DivContent'
import Link from '../Atom/Link'
import LabelInputCheckbox from '../Molecules/LabelInputCheckbox'

export default function ContenctLabeInputCheckbox() {
  return (
    <DivContent className="flex justify-between items-center text-sm">
      <LabelInputCheckbox />
      <Link href="#" className="text-blue-600 hover:underline">
        Forgot password?
      </Link>
    </DivContent>
  )
}
