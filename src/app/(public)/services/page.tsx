import { FileText, ShieldCheck, Globe, Zap, UserCheck, Stethoscope, Scale, Building2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  return (
    <main style={{ padding: '4rem 0', animation: 'fadeInUp 0.8s ease-out forwards' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our Transcription Services</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>From lightning-fast AI to courtroom-certified human experts, we have a specialized transcription solution for your exact needs.</p>
      </div>

      {/* The 3 Core Tiers */}
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Our Core Tiers</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
        
        <div style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ background: 'rgba(59, 152, 217, 0.1)', color: 'var(--primary-color)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Zap size={28} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Instant AI Engine</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>Powered by advanced neural networks, our AI delivers highly accurate transcripts in minutes. Perfect for internal meetings, personal notes, and podcasts.</p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--primary-color)" /> &gt;95% Accuracy Rate</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--primary-color)" /> Delivery within minutes</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--primary-color)" /> Automatic Speaker Detection</li>
          </ul>
        </div>

        <div style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--primary-color)', position: 'relative', boxShadow: '0 10px 30px -10px rgba(59, 152, 217, 0.2)' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary-color)', color: 'white', padding: '0.2rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>MOST POPULAR</div>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <UserCheck size={28} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Human Reviewed</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>The perfect balance. Our AI generates the base transcript, and our certified human workers review and correct it for absolute perfection.</p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#10b981" /> 99% Verified Accuracy</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#10b981" /> Two-Week Delivery (Expedited available)</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#10b981" /> Grammar & Punctuation Polish</li>
          </ul>
        </div>

        <div style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <ShieldCheck size={28} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Fully Human (Premium)</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>For files with heavy accents, background noise, or strict legal terminology. Transcribed entirely by domain-expert humans.</p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#f59e0b" /> 99.9% Flawless Accuracy</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#f59e0b" /> Complex Audio Handling</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#f59e0b" /> Three-Week Delivery (Expedited available)</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={16} color="#f59e0b" /> Courtroom Certified</li>
          </ul>
        </div>

      </div>

      {/* Industry Solutions */}
      <div style={{ background: 'var(--surface-color)', borderRadius: '24px', padding: '4rem', marginBottom: '6rem', border: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center' }}>Industry-Specific Formatting</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
          
          <div>
            <Scale size={32} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '1rem' }}>Legal Transcription</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>We format depositions, court hearings, and arbitrations with precise line numbering, Q&A formatting, and sworn certifications ready for court filing.</p>
          </div>

          <div>
            <Building2 size={32} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '1rem' }}>Corporate & Financial</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>From quarterly earnings calls to focus groups. We offer strict NDAs and enterprise-grade confidentiality agreements for all your files.</p>
          </div>

          <div>
            <Globe size={32} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '1rem' }}>Global Translation</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Need it in Spanish, French, or Mandarin? Our AI and Human experts can accurately translate transcripts across 40+ languages.</p>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to get started?</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>No account required. Upload your file and get your transcript in minutes.</p>
        <Link href="/">
          <button style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '1.2rem 2.5rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
            Upload Media Now
          </button>
        </Link>
      </div>

    </main>
  );
}
