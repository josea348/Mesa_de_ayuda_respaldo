export default function List({className, onClick, children}) {
  return (
    <li className={className} onClick={onClick}>
      {children}
    </li>
  );
}
