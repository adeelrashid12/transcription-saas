"use client";

import { useState } from 'react';
import { UploadCloud, FileText, Download, Clock, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main style={{ padding: '4rem 0', animation: 'fadeInUp 0.8s ease-out forwards', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Header & Balance */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Client Portal</h1>
            <p style={{ color: 'var(--text-muted)' }}>Welcome back, John! Here is your transcription overview.</p>
          </div>
          
          <div style={{ background: 'var(--surface-color)', padding: '1.5rem 2rem', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '1rem', borderRadius: '50%' }}>
              <Clock size={32} />
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Available Balance</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>30 <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>Free Minutes</span></p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border-color)', marginBottom: '3rem' }}>
          <button 
            onClick={() => setActiveTab("overview")}
            style={{ background: 'none', border: 'none', color: activeTab === "overview" ? 'var(--primary-color)' : 'var(--text-muted)', paddingBottom: '1rem', borderBottom: activeTab === "overview" ? '2px solid var(--primary-color)' : '2px solid transparent', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
          >
            Overview & Upload
          </button>
          <button 
            onClick={() => setActiveTab("history")}
            style={{ background: 'none', border: 'none', color: activeTab === "history" ? 'var(--primary-color)' : 'var(--text-muted)', paddingBottom: '1rem', borderBottom: activeTab === "history" ? '2px solid var(--primary-color)' : '2px solid transparent', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
          >
            Order History
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Quick Upload */}
            <div style={{ background: 'var(--surface-color)', padding: '3rem 2rem', borderRadius: '24px', border: '1px dashed var(--primary-color)', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
              <UploadCloud size={48} color="var(--primary-color)" style={{ margin: '0 auto 1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Upload New File</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Drag and drop your audio or video file here to use your free minutes instantly.</p>
              <button style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
                Select File
              </button>
            </div>

            {/* Premium Upsell */}
            <div style={{ background: 'linear-gradient(145deg, var(--surface-color) 0%, rgba(59, 152, 217, 0.1) 100%)', padding: '3rem 2rem', borderRadius: '24px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap color="#fbbf24" size={24} /> Need Courtroom Accuracy?
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
                Your free minutes are valid for our automated AI tier. If you are uploading legal documents that require absolute 99% accuracy and human review, upgrade to our premium tiers.
              </p>
              <Link href="/intake" style={{ background: 'white', color: 'black', textDecoration: 'none', padding: '1rem 2rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold', display: 'inline-block', textAlign: 'center', alignSelf: 'flex-start' }}>
                Order Human Transcript
              </Link>
            </div>

          </div>
        ) : (
          <div style={{ background: 'var(--surface-color)', borderRadius: '24px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)' }}>
                <tr>
                  <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>File Name</th>
                  <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Date</th>
                  <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Status</th>
                  <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <FileText size={20} color="var(--primary-color)" />
                      <span>Q3_Earnings_Call.mp3</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem', color: 'var(--text-muted)' }}>Oct 24, 2026</td>
                  <td style={{ padding: '1.5rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                      <CheckCircle2 size={16} /> Completed
                    </span>
                  </td>
                  <td style={{ padding: '1.5rem' }}>
                    <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <Download size={16} /> Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <FileText size={20} color="var(--primary-color)" />
                      <span>Deposition_Smith_v_Jones.mp4</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem', color: 'var(--text-muted)' }}>Oct 20, 2026</td>
                  <td style={{ padding: '1.5rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                      <CheckCircle2 size={16} /> Completed
                    </span>
                  </td>
                  <td style={{ padding: '1.5rem' }}>
                    <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <Download size={16} /> Download
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </main>
  );
}
