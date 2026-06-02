import { Lock, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', animation: 'fadeInUp 0.8s ease-out forwards' }}>
      <div style={{ background: 'var(--surface-color)', backdropFilter: 'blur(20px)', padding: '3rem', borderRadius: '24px', border: '1px solid var(--border-color)', width: '100%', maxWidth: '450px', boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', background: 'rgba(59, 152, 217, 0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--primary-color)', marginBottom: '1rem' }}>
            <Lock size={32} />
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Secure Login</h1>
          <p style={{ color: 'var(--text-muted)' }}>Sign in to access the Transcriptionist Job Board or Admin Console.</p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Mail size={18} />
              </div>
              <input type="email" placeholder="you@example.com" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(11, 17, 32, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
              Password
              <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.8rem' }}>Forgot?</a>
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Lock size={18} />
              </div>
              <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(11, 17, 32, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none' }} />
            </div>
          </div>

          <Link href="/client-dashboard" style={{ marginTop: '1rem', textDecoration: 'none' }}>
            <button type="button" style={{ width: '100%', background: 'linear-gradient(135deg, var(--primary-color), var(--primary-hover))', color: 'white', padding: '1.2rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(59, 152, 217, 0.3)' }}>
              Sign In <ArrowRight size={20} />
            </button>
          </Link>
          
        </form>
      </div>
    </main>
  );
}
