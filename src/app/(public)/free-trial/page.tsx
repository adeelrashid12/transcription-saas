"use client";

import { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, Lock, User, Phone } from 'lucide-react';
import Link from 'next/link';

export default function FreeTrial() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/free-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSuccess(true);
        // In a real app, this would log them in and redirect to /client-dashboard
        setTimeout(() => {
          window.location.href = '/client-dashboard';
        }, 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main style={{ padding: '8rem 0', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInUp 0.8s ease-out forwards' }}>
        <div style={{ maxWidth: '600px', width: '100%', background: 'var(--surface-color)', padding: '4rem 3rem', borderRadius: '24px', border: '1px solid var(--border-color)', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <CheckCircle2 size={40} />
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Account Created!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem', lineHeight: 1.6 }}>
            Your 30 free minutes have been added to your account. Redirecting you to the dashboard securely...
          </p>
          <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
        </div>
        <style jsx>{`
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}</style>
      </main>
    );
  }

  return (
    <main style={{ padding: '4rem 0', animation: 'fadeInUp 0.8s ease-out forwards' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        
        {/* Left Side: Value Proposition */}
        <div style={{ paddingRight: '2rem' }}>
          <div style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            No Credit Card Required
          </div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>Get Your First 30 Minutes Free.</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem', lineHeight: 1.6 }}>
            Experience the speed and accuracy of our AI transcription engine completely risk-free. See why 10,000+ professionals trust us with their audio.
          </p>
          
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem' }}>
              <div style={{ background: 'var(--surface-color)', padding: '0.5rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <CheckCircle2 size={24} color="var(--primary-color)" />
              </div>
              <div>
                <strong style={{ display: 'block' }}>Instant AI Delivery</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Transcripts returned in minutes.</span>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem' }}>
              <div style={{ background: 'var(--surface-color)', padding: '0.5rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <ShieldCheck size={24} color="var(--primary-color)" />
              </div>
              <div>
                <strong style={{ display: 'block' }}>100% Secure & Private</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Bank-level encryption for all files.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Side: Lead Capture Form */}
        <div style={{ background: 'var(--surface-color)', padding: '3rem', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--primary-color), #10b981)' }} />
          
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', textAlign: 'center' }}>Create Your Free Account</h2>
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2.5rem' }}>Claim your 30 free minutes immediately.</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div className="input-group">
              <label><User size={16} /> Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
            </div>

            <div className="input-group">
              <label><Mail size={16} /> Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
            </div>

            <div className="input-group">
              <label><Phone size={16} /> Phone Number (Optional)</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(555) 000-0000" />
            </div>

            <div className="input-group">
              <label><Lock size={16} /> Create Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required minLength={8} />
            </div>

            <button type="submit" disabled={isSubmitting} style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '1.2rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.2s' }}>
              {isSubmitting ? 'Creating Account...' : 'Start Free Trial'} <ArrowRight size={20} />
            </button>

            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
              Already have an account? <Link href="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Log In</Link>
            </p>

          </form>
        </div>

      </div>

      <style jsx>{`
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .input-group label {
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .input-group input {
          background: rgba(11, 17, 32, 0.8);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          padding: 1rem 1.2rem;
          border-radius: 12px;
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.2s ease;
        }
        .input-group input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(59, 152, 217, 0.2);
        }
      `}</style>
    </main>
  );
}
