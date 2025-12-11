import NavbarOrganism from '../Organisms/NavbarOrganism'
import Sidebar from '../Organisms/Sidebar'

export default function NavigationTemplate({children}) {
  return (
    <>
      <NavbarOrganism />
      <>
        <Sidebar>{children}</Sidebar>
      </>
    </>
  )
}
