import { Check, X, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
  return (
    <main style={{ padding: '4rem 0', animation: 'fadeInUp 0.8s ease-out forwards' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Simple, Transparent Pricing</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Pay only for the exact audio minutes you upload. No hidden fees, no subscriptions required.</p>
      </div>

      {/* Free Trial Banner */}
      <div className="mobile-pad" style={{ background: 'var(--primary-color)', borderRadius: '24px', padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ flex: '1 1 400px', color: 'white' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Try it completely free.</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Get your first 30 minutes of extremely accurate AI transcription on us. No credit card required.</p>
        </div>
        <Link href="/free-trial">
          <button style={{ background: 'white', color: 'var(--primary-color)', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
            Start Free Trial
          </button>
        </Link>
      </div>

      {/* Pricing Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
        
        {/* Tier 1 - Free */}
        <div style={{ background: 'var(--surface-color)', padding: '3rem 2rem', borderRadius: '24px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Free Tier</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Perfect for testing our accuracy.</p>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>$0</span>
            <span style={{ color: 'var(--text-muted)' }}> / first 30 mins</span>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem', flex: 1 }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Check size={20} color="#10b981" /> 30 Minutes Free</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Check size={20} color="#10b981" /> AI Transcription</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Check size={20} color="#10b981" /> Instant Delivery</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}><X size={20} /> Human Grammar Review</li>
          </ul>

          <Link href="/free-trial" style={{ width: '100%' }}>
            <button style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'white', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Start Free Trial</button>
          </Link>
        </div>

        {/* Tier 2 - AI Only */}
        <div style={{ background: 'var(--surface-color)', padding: '3rem 2rem', borderRadius: '24px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>AI Only Tier</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>For clean audio and instant results.</p>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>$0.18</span>
            <span style={{ color: 'var(--text-muted)' }}> / audio minute</span>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem', flex: 1 }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Check size={20} color="#10b981" /> Delivery within minutes</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Check size={20} color="#10b981" /> Speaker Identification</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Check size={20} color="#10b981" /> Basic Timestamps</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}><X size={20} /> Human Grammar Review</li>
          </ul>

          <Link href="/intake" style={{ width: '100%' }}>
            <button style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'white', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Select AI Tier</button>
          </Link>
        </div>

        {/* Tier 3 - Fully Human */}
        <div style={{ background: 'var(--surface-color)', padding: '3rem 2rem', borderRadius: '24px', border: '2px solid var(--primary-color)', position: 'relative', display: 'flex', flexDirection: 'column', transform: 'scale(1.05)', zIndex: 10, boxShadow: '0 20px 40px -10px rgba(59, 152, 217, 0.3)' }}>
          <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary-color)', color: 'white', padding: '0.4rem 1.5rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>RECOMMENDED</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Fully Human Tier</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>For difficult audio and strict compliance.</p>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>$3.50</span>
            <span style={{ color: 'var(--text-muted)' }}> / audio minute</span>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem', flex: 1 }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Check size={20} color="#10b981" /> Standard Delivery</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Check size={20} color="#10b981" /> Courtroom Certified Quality</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Check size={20} color="#10b981" /> Handles Heavy Accents</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Check size={20} color="#10b981" /> Perfect Grammar & Punctuation</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><Check size={20} color="#10b981" /> Strict Legal Formatting</li>
          </ul>

          <Link href="/intake" style={{ width: '100%' }}>
            <button style={{ width: '100%', padding: '1rem', background: 'var(--primary-color)', border: 'none', color: 'white', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Select Human Tier</button>
          </Link>
        </div>

      </div>

      {/* Enterprise Block */}
      <div className="mobile-pad" style={{ background: 'linear-gradient(45deg, var(--surface-color), rgba(59, 152, 217, 0.1))', borderRadius: '24px', padding: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-color)', marginBottom: '6rem', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Enterprise & High Volume</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>Processing more than 10,000 minutes per month? We offer dedicated account managers, custom API integration, and discounted volume pricing.</p>
        </div>
        <button style={{ background: 'white', color: 'black', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
          Contact Sales
        </button>
      </div>

      {/* FAQs */}
      <div>
        <h2 style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          
          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <HelpCircle size={24} color="var(--primary-color)" style={{ flexShrink: 0 }} />
              <h3 style={{ fontSize: '1.2rem' }}>Are there any setup fees?</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', marginLeft: '2.5rem', lineHeight: 1.6 }}>Absolutely not. You simply pay for the audio minutes you upload on a pay-as-you-go basis.</p>
          </div>

          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <HelpCircle size={24} color="var(--primary-color)" style={{ flexShrink: 0 }} />
              <h3 style={{ fontSize: '1.2rem' }}>Is my data secure?</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', marginLeft: '2.5rem', lineHeight: 1.6 }}>Yes. We use 256-bit encryption for all file transfers and storage. Human reviewers are bound by strict NDAs.</p>
          </div>

          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <HelpCircle size={24} color="var(--primary-color)" style={{ flexShrink: 0 }} />
              <h3 style={{ fontSize: '1.2rem' }}>What if my audio quality is terrible?</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', marginLeft: '2.5rem', lineHeight: 1.6 }}>If you have heavy static or overlapping speakers, you must select the 'Fully Human' tier so our experts can manually isolate the voices.</p>
          </div>

          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <HelpCircle size={24} color="var(--primary-color)" style={{ flexShrink: 0 }} />
              <h3 style={{ fontSize: '1.2rem' }}>Do you offer refunds?</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', marginLeft: '2.5rem', lineHeight: 1.6 }}>If the transcript does not meet our 99% accuracy guarantee (for Human tiers), we will re-transcribe it completely free of charge.</p>
          </div>

        </div>
      </div>

    </main>
  );
}
