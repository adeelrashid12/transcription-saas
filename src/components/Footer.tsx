"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer" style={{ borderTop: '1px solid var(--border-color)', marginTop: '4rem', background: 'var(--bg-color)' }}>
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
        <div className="footer-grid">
          
          {/* Brand Column */}
          <div className="footer-col">
            <img src="/logo.png" alt="Zoom Transcription Services" style={{ height: '90px', objectFit: 'contain', marginBottom: '1.5rem', marginLeft: '-10px' }} />
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Professional transcription delivered with absolute accuracy. Built specifically for the rigorous demands of legal professionals and enterprises.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#fff' }}>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/free-trial">Free Trial</Link></li>
            </ul>
          </div>



          {/* Contact */}
          <div className="footer-col">
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: '#fff' }}>Contact Us</h4>
            <ul className="footer-links contact-links">
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <Mail size={16} /> support@zoomtranscription.com
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <Phone size={16} /> 1-800-555-0198
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <MapPin size={16} /> New York, NY
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '3rem', paddingTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Zoom Transcription Services. All rights reserved.
        </div>
      </div>

      <style jsx>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 3rem;
        }
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .footer-links :global(a) {
          color: #fff !important;
          text-decoration: none !important;
          transition: color 0.2s ease;
        }
        .footer-links :global(a:visited) {
          color: #fff !important;
        }
        .footer-links :global(a:hover) {
          color: var(--primary-color) !important;
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .contact-links li {
            justify-content: center;
          }
          .footer-col img {
            margin: 0 auto 1.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
