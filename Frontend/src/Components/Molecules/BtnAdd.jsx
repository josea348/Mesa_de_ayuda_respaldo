import Button from "../Atom/Button";
import DivContent from "../Atom/DivContent";

export default function BtnAdd({className,onClick, text }) {
  return (
    <DivContent>
      <Button className={`m-3 my-4 px-4 py-2 rounded-lg font-medium transition duration-200 cursor-pointer ${className}`} variant="primary" onClick={onClick}>
        {text}
      </Button>
    </DivContent>
  )
}
