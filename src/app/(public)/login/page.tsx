"use client";

import { Lock, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/worker-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        localStorage.setItem('worker', JSON.stringify(data.worker));
        router.push('/transcriptionist-dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

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

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)', textAlign: 'center' }}>{error}</div>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Mail size={18} />
              </div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(11, 17, 32, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none' }} />
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
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(11, 17, 32, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none' }} />
            </div>
          </div>

          <button type="submit" disabled={isLoading} style={{ marginTop: '1rem', width: '100%', background: 'linear-gradient(135deg, var(--primary-color), var(--primary-hover))', color: 'white', padding: '1.2rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(59, 152, 217, 0.3)', opacity: isLoading ? 0.7 : 1 }}>
            {isLoading ? 'Signing In...' : <>Sign In <ArrowRight size={20} /></>}
          </button>
          
        </form>
      </div>
    </main>
  );
}
