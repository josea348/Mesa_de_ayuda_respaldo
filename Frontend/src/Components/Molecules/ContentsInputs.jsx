import DivContent from "../Atom/DivContent";
import Label from "../Atom/Label";

export default function ContentsInputs({ text, children, className }) {
  return (
    <DivContent className={`flex flex-col ${className}`}>
      <Label className="text-sm font-medium mb-1">{text}</Label>
      {children}
    </DivContent>
  )
}
