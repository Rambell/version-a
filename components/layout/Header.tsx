'use client'

import TopBar from './Topbar'
import Navbar from './Navbar'
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  return (
    <header role="banner" aria-label="Encabezado principal" className="sticky top-0 z-50 bg-white shadow-sm">
      <TopBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
    </header>
  )
} 