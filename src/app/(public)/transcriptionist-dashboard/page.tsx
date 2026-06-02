"use client";

import { Clock, FileText, DollarSign, CheckCircle, Search, Filter } from 'lucide-react';

export default function Dashboard() {
  // Mock data for the prototype
  const availableJobs = [
    { id: 'JOB-9821', duration: 45, tier: 'Human Reviewed', format: 'Legal', payout: 22.50, posted: '10 mins ago' },
    { id: 'JOB-9822', duration: 15, tier: 'Fully Human', format: 'General', payout: 15.00, posted: '25 mins ago' },
    { id: 'JOB-9823', duration: 120, tier: 'Human Reviewed', format: 'Legal', payout: 60.00, posted: '1 hour ago' },
    { id: 'JOB-9824', duration: 32, tier: 'Fully Human', format: 'Legal', payout: 32.00, posted: '2 hours ago' },
  ];

  return (
    <main style={{ padding: '2rem 0', animation: 'fadeInUp 0.8s ease-out forwards' }}>
      
      {/* Dashboard Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Job Board</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back! Here are the open jobs available to claim.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ background: 'var(--surface-color)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.8rem', borderRadius: '8px', color: '#10b981' }}>
              <DollarSign size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>This Week's Earnings</p>
              <h3 style={{ fontSize: '1.2rem' }}>$450.00</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', background: 'var(--surface-color)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(11, 17, 32, 0.8)', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <Search size={18} color="var(--text-muted)" />
          <input type="text" placeholder="Search by Job ID..." style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '100%' }} />
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer' }}>
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Jobs Table */}
      <div style={{ background: 'var(--surface-color)', backdropFilter: 'blur(20px)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(59, 152, 217, 0.05)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Job ID</th>
              <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Audio Length</th>
              <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Tier & Format</th>
              <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Est. Payout</th>
              <th style={{ padding: '1.5rem', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {availableJobs.map((job) => (
              <tr key={job.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(59, 152, 217, 0.05)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '1.5rem', fontWeight: 600 }}>{job.id}<br/><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>{job.posted}</span></td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} color="var(--primary-color)" />
                    {job.duration} Minutes
                  </div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <CheckCircle size={16} color="#10b981" />
                    {job.tier}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <FileText size={14} />
                    {job.format}
                  </div>
                </td>
                <td style={{ padding: '1.5rem', color: '#10b981', fontWeight: 600, fontSize: '1.1rem' }}>
                  ${job.payout.toFixed(2)}
                </td>
                <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                  <button style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' }}>
                    Claim Job
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </main>
  );
}
