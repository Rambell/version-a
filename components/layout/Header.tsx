import TopBar from './Topbar'
import Navbar from './Navbar'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <TopBar />
      <Navbar />
    </header>
  )
}