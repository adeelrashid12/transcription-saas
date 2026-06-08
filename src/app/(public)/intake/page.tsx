"use client";

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, Check, UploadCloud } from 'lucide-react';

export default function IntakeForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);

  // Auto-scroll directly to the form container (skipping the header) instantly
  useEffect(() => {
    if (formRef.current) {
      const yOffset = -20; // 20px padding from the top of the screen
      const y = formRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
    }
  }, [step, isSubmitted]);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    name: '', date: '', email: '', phone: '', contactMethod: 'email', billingAddress: '',
    // Step 2
    tier: 'ai_only', type: 'legal', length: '', files: '1', formats: '', turnaround: '',
    // Step 3
    quality: '', speakers: '1', speakerNotes: '', missingPortions: '',
    // Step 4
    docFormat: 'word', deliveryMethod: 'email', confidentiality: 'standard', confidentialityNotes: '', protectiveOrders: '',
    // Step 5 (Legal)
    court: '', caseNumber: '', caption: '', judge: '', location: '', hearingDate: '', hearingType: '', appearances: '', spellings: '', exhibits: '', specialInstructions: '',
    // Step 6
    paymentAgreement: false, ownershipAgreement: false, clarificationAgreement: false, signature: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const nextStep = () => setStep(Math.min(step + 1, totalSteps));
  const prevStep = () => setStep(Math.max(step - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main style={{ padding: '8rem 0', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeInUp 0.8s ease-out forwards' }}>
        <div style={{ maxWidth: '600px', width: '100%', background: 'var(--surface-color)', padding: '4rem 3rem', borderRadius: '24px', border: '1px solid var(--border-color)', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <Check size={40} />
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Project Received!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem', lineHeight: 1.6 }}>
            Your transcription request has been securely submitted. Our team will review the details and reach out to you shortly.
          </p>
          <button onClick={() => window.location.href = '/'} style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '1.2rem 3rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>
            Return to Homepage
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: '4rem 0', animation: 'fadeInUp 0.8s ease-out forwards' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Transcription Intake Form</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Please provide the details of your project below. Our experts review every submission carefully.
        </p>
      </div>

      <div ref={formRef} style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--surface-color)', padding: '3rem', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        
        {/* Progress Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem' }}>
          {[...Array(totalSteps)].map((_, i) => (
            <div key={i} style={{ height: '6px', flex: 1, background: i < step ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)', borderRadius: '10px', transition: 'background 0.3s' }} />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* STEP 1: Contact & Billing */}
          {step === 1 && (
            <div className="form-step">
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Contact & Billing Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="mobile-col">
                <div className="input-group">
                  <label>Your Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>Date of Request</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>Telephone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>
              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label>Preferred Contact Method</label>
                <select name="contactMethod" value={formData.contactMethod} onChange={handleChange}>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </div>
              <div className="input-group">
                <label>Billing Address</label>
                <textarea name="billingAddress" value={formData.billingAddress} onChange={handleChange} rows={3} required></textarea>
              </div>
            </div>
          )}

          {/* STEP 2: Project Details */}
          {step === 2 && (
            <div className="form-step">
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Project Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="mobile-col">
                <div className="input-group">
                  <label>Transcription Tier</label>
                  <select name="tier" value={formData.tier} onChange={handleChange}>
                    <option value="free">Free Trial (First 30 Mins AI)</option>
                    <option value="ai_only">AI Only Transcription ($0.18/min)</option>
                    <option value="human">Fully Human Transcription ($3.50/min)</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Type of Audio</label>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="legal">Legal Proceeding</option>
                    <option value="interview">Interview</option>
                    <option value="conference">Conference / Meeting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="mobile-col">
                <div className="input-group">
                  <label>Audio/Video Length (Approx)</label>
                  <input type="text" name="length" placeholder="e.g. 2 hours 15 mins" value={formData.length} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Number of Files</label>
                  <input type="number" name="files" value={formData.files} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>File Format(s)</label>
                  <input type="text" name="formats" placeholder="e.g. MP3, MP4" value={formData.formats} onChange={handleChange} />
                </div>
              </div>
              <div className="input-group">
                <label>Turnaround Time Requested</label>
                <select name="turnaround" value={formData.turnaround} onChange={handleChange}>
                  <option value="standard">Standard (2-3 Weeks)</option>
                  <option value="expedited">Expedited (Extra Charge)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: Audio Quality Details */}
          {step === 3 && (
            <div className="form-step">
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Audio Quality Details</h2>
              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label>Audio Quality Description (Is there static? Echo?)</label>
                <textarea name="quality" value={formData.quality} onChange={handleChange} rows={2}></textarea>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="mobile-col">
                <div className="input-group">
                  <label>Number of Speakers</label>
                  <input type="number" name="speakers" value={formData.speakers} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Speaker Identification Notes</label>
                  <input type="text" name="speakerNotes" placeholder="If left blank, we will use SPEAKER 1, etc." value={formData.speakerNotes} onChange={handleChange} />
                </div>
              </div>
              <div className="input-group">
                <label>Any Portions Missing / Muted / Unintelligible?</label>
                <textarea name="missingPortions" value={formData.missingPortions} onChange={handleChange} rows={2}></textarea>
              </div>
            </div>
          )}

          {/* STEP 4: Delivery & Privacy */}
          {step === 4 && (
            <div className="form-step">
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Delivery & Privacy</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="mobile-col">
                <div className="input-group">
                  <label>Preferred Document Format</label>
                  <select name="docFormat" value={formData.docFormat} onChange={handleChange}>
                    <option value="word">Microsoft Word (.docx)</option>
                    <option value="pdf">PDF</option>
                    <option value="txt">Plain Text (.txt)</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Delivery Method</label>
                  <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleChange}>
                    <option value="email">Secure Email</option>
                    <option value="portal">Dashboard Portal</option>
                  </select>
                </div>
              </div>
              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label>Confidentiality Level</label>
                <select name="confidentiality" value={formData.confidentiality} onChange={handleChange}>
                  <option value="standard">Standard Business Confidentiality</option>
                  <option value="high">High (Strict NDA Required)</option>
                </select>
              </div>
              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label>Confidential Handling Instructions</label>
                <textarea name="confidentialityNotes" value={formData.confidentialityNotes} onChange={handleChange} rows={2}></textarea>
              </div>
              <div className="input-group">
                <label>Confidentiality or Protective Orders in Place</label>
                <textarea name="protectiveOrders" value={formData.protectiveOrders} onChange={handleChange} rows={2}></textarea>
              </div>
            </div>
          )}

          {/* STEP 5: Legal Information */}
          {step === 5 && (
            <div className="form-step">
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Legal Transcripts Only</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>If you have this information already prepared in a document, you can upload it at the bottom instead of typing it here.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="mobile-col">
                <div className="input-group">
                  <label>Court or Administrative Body</label>
                  <input type="text" name="court" value={formData.court} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Case Number</label>
                  <input type="text" name="caseNumber" value={formData.caseNumber} onChange={handleChange} />
                </div>
              </div>
              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label>Complete Case Caption</label>
                <textarea name="caption" value={formData.caption} onChange={handleChange} rows={2}></textarea>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="mobile-col">
                <div className="input-group">
                  <label>Judge / Hearing Officer</label>
                  <input type="text" name="judge" value={formData.judge} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Location of Hearing</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} />
                </div>
              </div>
              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label>Appearances</label>
                <textarea name="appearances" value={formData.appearances} onChange={handleChange} rows={3}></textarea>
              </div>
              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label>Spellings of Witnesses & Proper Names</label>
                <textarea name="spellings" value={formData.spellings} onChange={handleChange} rows={3}></textarea>
              </div>
              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label>Exhibits Introduced</label>
                <textarea name="exhibits" value={formData.exhibits} onChange={handleChange} rows={3}></textarea>
              </div>
              <div className="input-group" style={{ marginBottom: '2rem' }}>
                <label>Other Special Instructions</label>
                <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows={3}></textarea>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', border: '2px dashed var(--border-color)', borderRadius: '16px', padding: '2rem', textAlign: 'center', cursor: 'pointer' }}>
                <UploadCloud size={32} style={{ margin: '0 auto 1rem', color: 'var(--primary-color)' }} />
                <h4 style={{ marginBottom: '0.5rem' }}>Upload Notice of Appearance / Case Info</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>PDF or Word Document</p>
              </div>
            </div>
          )}

          {/* STEP 6: Final Agreement */}
          {step === 6 && (
            <div className="form-step">
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Final Agreement</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem', background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="ownershipAgreement" checked={formData.ownershipAgreement} onChange={handleCheckbox} required style={{ width: '20px', height: '20px' }} />
                  I confirm I am the owner of the files or have legal permission to request transcription.
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="clarificationAgreement" checked={formData.clarificationAgreement} onChange={handleCheckbox} required style={{ width: '20px', height: '20px' }} />
                  I understand transcription accuracy depends on audio quality, and I will provide clarifications for names/spellings as needed.
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="paymentAgreement" checked={formData.paymentAgreement} onChange={handleCheckbox} required style={{ width: '20px', height: '20px' }} />
                  I acknowledge all confidentiality requirements and understand payment is due upon receipt of invoice.
                </label>
              </div>

              <div className="input-group" style={{ marginBottom: '2rem' }}>
                <label>Digital Signature (Type your full name)</label>
                <input type="text" name="signature" value={formData.signature} onChange={handleChange} required style={{ fontFamily: '"Brush Script MT", cursive', fontSize: '1.5rem', padding: '1.5rem' }} />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
            {step > 1 ? (
              <button type="button" onClick={prevStep} style={{ background: 'transparent', color: 'white', border: '1px solid var(--border-color)', padding: '1rem 2rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                <ArrowLeft size={20} /> Back
              </button>
            ) : <div />}
            
            {step < totalSteps ? (
              <button type="button" onClick={nextStep} style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                Next <ArrowRight size={20} />
              </button>
            ) : (
              <button type="submit" style={{ background: '#10b981', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                <Check size={20} /> Submit Intake Form
              </button>
            )}
          </div>

        </form>
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
        }
        .input-group input, .input-group select, .input-group textarea {
          background: rgba(11, 17, 32, 0.8);
          border: 1px solid var(--border-color);
          color: white;
          padding: 1rem;
          border-radius: 12px;
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.2s ease;
        }
        .input-group input:focus, .input-group select:focus, .input-group textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(59, 152, 217, 0.2);
        }
        .form-step {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
