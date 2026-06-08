"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if worker is logged in
    const worker = localStorage.getItem('worker');
    setIsLoggedIn(!!worker);
  }, [pathname]);

  return (
    <header className="header" style={{ position: 'relative' }}>
      {/* Desktop Logo */}
      <div className="hide-mobile">
        <Link href="/">
          <img src="/logo.png" alt="Zoom Transcription Services" style={{ height: '80px', objectFit: 'contain', margin: '-10px 0' }} />
        </Link>
      </div>

      {/* Mobile Top Bar */}
      <div className="hide-desktop" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link href="/">
          <img src="/logo.png" alt="Zoom Transcription Services" style={{ height: '60px', objectFit: 'contain', margin: '0' }} />
        </Link>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem' }}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className={`nav-links ${isOpen ? 'mobile-open' : 'mobile-closed'}`}>
        <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link href="/services" onClick={() => setIsOpen(false)}>Services</Link>
        <Link href="/pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
        
        {isLoggedIn ? (
          <>
            <Link href="/transcriptionist-dashboard" className="login-btn" onClick={() => setIsOpen(false)} style={{ whiteSpace: 'nowrap' }}>Dashboard</Link>
            <button 
              onClick={() => {
                localStorage.removeItem('worker');
                window.location.href = '/login';
              }} 
              className="login-btn" 
              style={{ whiteSpace: 'nowrap', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', marginLeft: '1.5rem' }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="login-btn" onClick={() => setIsOpen(false)} style={{ whiteSpace: 'nowrap' }}>Log In</Link>
        )}
      </nav>

    </header>
  );
}
