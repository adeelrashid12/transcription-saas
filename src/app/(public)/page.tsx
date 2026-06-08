"use client";

import { UploadCloud, FileText, Zap, ShieldCheck, ArrowRight, Settings2, CheckCircle2, Clock, MessageSquare, Building2, Scale, GraduationCap, Star } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [tier, setTier] = useState("ai");

  const handleCheckout = () => {
    if (tier === "free") {
      router.push("/free-trial");
    } else if (tier === "ai") {
      // Typically routes to Stripe Checkout
      alert("Routing to Stripe Checkout for Upfront Payment...");
    } else {
      router.push("/intake");
    }
  };

  const getButtonText = () => {
    if (tier === "free") return "Start Free Trial";
    if (tier === "ai") return "Proceed to Checkout";
    return "Proceed to Intake Form";
  };

  return (
    <main>
      <section className="hero" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(59, 152, 217, 0.1)', color: 'var(--primary-color)', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Trusted by 10,000+ Professionals
        </div>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>Professional Transcription,<br/>Delivered Instantly.</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>Upload your audio or video file and receive highly accurate, perfectly formatted transcripts designed specifically for legal professionals and enterprises.</p>
      </section>

      <section className="main-content">
        <div className="upload-card">
          <div className="dropzone">
            <div className="upload-icon">
              <UploadCloud size={64} />
            </div>
            <div className="upload-text">Drag & drop your media file here</div>
            <div className="upload-subtext">Supports MP3, WAV, MP4, MOV (Up to 2GB)</div>
          </div>
        </div>

        <div className="config-panel">
          <div className="option-group">
            <label className="option-label">
              <FileText size={18} />
              Document Formatting
            </label>
            <select defaultValue="legal">
              <option value="legal">Legal (Numbered Lines & Timestamps)</option>
              <option value="general">General (Clean Paragraphs)</option>
            </select>
          </div>
          
          <div className="option-group">
            <label className="option-label">
              <Settings2 size={18} />
              Service Tier
            </label>
            <select value={tier} onChange={(e) => setTier(e.target.value)}>
              <option value="free">Free Trial (First 30 Mins AI)</option>
              <option value="ai">AI Only Transcription ($0.18/min)</option>
              <option value="manual">Fully Human Transcription ($3.50/min)</option>
            </select>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            {getButtonText()} <ArrowRight size={20} />
          </button>
          
          <div className="price-estimate">
            <span>Estimated Total:</span>
            <span className="price-highlight">
              {tier === "free" ? "$0.00" : tier === "ai" ? "$0.18/min" : "$3.50/min"}
            </span>
          </div>
        </div>
      </section>

      <section className="features-row" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
        <div className="feature">
          <div className="feature-icon">
            <Zap size={24} />
          </div>
          <div className="feature-text">
            <h3>Lightning Fast</h3>
            <p>AI transcripts within minutes based on file length. Human review available within two weeks.</p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <ShieldCheck size={24} />
          </div>
          <div className="feature-text">
            <h3>Secure & Confidential</h3>
            <p>End-to-end bank-level encryption. We are 100% compliant with industry standards.</p>
          </div>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <FileText size={24} />
          </div>
          <div className="feature-text">
            <h3>Courtroom Ready</h3>
            <p>Perfectly formatted legal documents with line numbers and precise timestamps.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>How It Works</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Get your transcripts back in three simple steps.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          
          <div className="mobile-card" style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-20px', left: '2.5rem', background: 'var(--primary-color)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>1</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '1rem' }}>Upload Audio/Video</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Simply drag and drop your media files into our secure portal. We support over 20 different audio and video file formats.</p>
          </div>

          <div className="mobile-card" style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-20px', left: '2.5rem', background: 'var(--primary-color)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>2</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '1rem' }}>Select Format</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Choose the tier you need. Need it now? Choose AI. Need courtroom-perfect precision? Choose our verified human experts.</p>
          </div>

          <div className="mobile-card" style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-20px', left: '2.5rem', background: 'var(--primary-color)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>3</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', marginTop: '1rem' }}>Download Transcript</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>We will automatically email you a secure link to download your completed, perfectly formatted document as soon as it is ready.</p>
          </div>

        </div>
      </section>

      <section style={{ padding: '5rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Built for Professionals</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Specialized formatting depending on your industry.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          
          <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
            <Scale size={48} style={{ color: 'var(--primary-color)', margin: '0 auto 1.5rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Legal</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Depositions & Court Hearings</p>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
            <Building2 size={48} style={{ color: 'var(--primary-color)', margin: '0 auto 1.5rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Business</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Board Meetings & Earnings Calls</p>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
            <GraduationCap size={48} style={{ color: 'var(--primary-color)', margin: '0 auto 1.5rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Academic</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Lectures & Research Interviews</p>
          </div>

        </div>
      </section>

      <section style={{ padding: '5rem 0', borderTop: '1px solid var(--border-color)', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>What Our Clients Say</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', color: '#fbbf24', marginBottom: '1rem' }}>
              <Star fill="#fbbf24" size={18} /><Star fill="#fbbf24" size={18} /><Star fill="#fbbf24" size={18} /><Star fill="#fbbf24" size={18} /><Star fill="#fbbf24" size={18} />
            </div>
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>"The turnaround time is incredible. We use the AI tier for internal meetings and the Fully Human tier for our official court filings. Flawless every time."</p>
            <div>
              <p style={{ fontWeight: 'bold' }}>Jonathan Davis, Esq.</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Partner at Davis & Co. Law</p>
            </div>
          </div>

          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', color: '#fbbf24', marginBottom: '1rem' }}>
              <Star fill="#fbbf24" size={18} /><Star fill="#fbbf24" size={18} /><Star fill="#fbbf24" size={18} /><Star fill="#fbbf24" size={18} /><Star fill="#fbbf24" size={18} />
            </div>
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>"The easiest upload process I have ever used. Not having to create an account just to transcribe an interview file is a massive time saver for our journalists."</p>
            <div>
              <p style={{ fontWeight: 'bold' }}>Sarah Jenkins</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Senior Editor, TechMedia</p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
