import Input from "../Atom/Input";
import Label from "../Atom/Label";

export default function LabelInputCheckbox() {
  return (
    <Label className="flex items-center gap-2">
      <Input type="checkbox" className="accent-blue-600" />
      Remember me
    </Label>
  )
}
