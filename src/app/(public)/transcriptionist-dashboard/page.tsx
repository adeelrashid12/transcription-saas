"use client";

import { Clock, FileText, DollarSign, CheckCircle, Search, Filter, LogOut, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const router = useRouter();
  const [worker, setWorker] = useState<any>(null);
  const [availableJobs, setAvailableJobs] = useState<any[]>([]);
  const [myJobs, setMyJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);

  const [deliveryUrl, setDeliveryUrl] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [isDelivering, setIsDelivering] = useState(false);

  useEffect(() => {
    const workerData = localStorage.getItem('worker');
    if (!workerData) {
      router.push('/login');
      return;
    }
    const parsedWorker = JSON.parse(workerData);
    setWorker(parsedWorker);
    
    const fetchJobs = async () => {
      // Fetch available pending jobs
      const { data: pending, error: pError } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
        
      if (!pError && pending) {
        setAvailableJobs(pending);
      }

      // Fetch my claimed jobs
      const { data: mine, error: mError } = await supabase
        .from('orders')
        .select('*')
        .eq('assigned_worker_id', parsedWorker.id)
        .order('created_at', { ascending: false });
        
      if (!mError && mine) {
        setMyJobs(mine);
      }
      
      // Fetch fresh worker profile to get updated earnings
      const { data: updatedWorker } = await supabase
        .from('workers')
        .select('*')
        .eq('id', parsedWorker.id)
        .single();
        
      if (updatedWorker) {
        setWorker(updatedWorker);
        localStorage.setItem('worker', JSON.stringify(updatedWorker));
      }
      
      setIsLoading(false);
    };

    fetchJobs();
  }, [router]);

  const handleClaim = async (jobId: string) => {
    setIsClaiming(jobId);
    try {
      const res = await fetch('/api/jobs/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_id: jobId, worker_id: worker.id })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Optimistically update UI
        const claimedJob = availableJobs.find(j => j.id === jobId);
        if (claimedJob) {
          setAvailableJobs(availableJobs.filter(j => j.id !== jobId));
          setMyJobs([{ ...claimedJob, status: 'in-progress' }, ...myJobs]);
        }
      } else {
        alert(data.error || 'Failed to claim job');
      }
    } catch (err) {
      alert('Error claiming job');
    } finally {
      setIsClaiming(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('worker');
    router.push('/login');
  };

  const handleDeliver = async () => {
    if (!deliveryUrl) {
      alert('Delivery URL is required.');
      return;
    }
    setIsDelivering(true);
    try {
      const res = await fetch('/api/jobs/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: selectedJob.id,
          worker_id: worker.id,
          delivery_url: deliveryUrl,
          delivery_notes: deliveryNotes
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Optimistic update
        setMyJobs(myJobs.map(j => j.id === selectedJob.id ? { ...j, status: 'In Review', delivery_url: deliveryUrl, delivery_notes: deliveryNotes } : j));
        
        setSelectedJob(null);
        setDeliveryUrl('');
        setDeliveryNotes('');
      } else {
        alert(data.error || 'Failed to deliver job');
      }
    } catch (err) {
      alert('Error delivering job');
    } finally {
      setIsDelivering(false);
    }
  };

  if (isLoading || !worker) {
    return <main style={{ padding: '4rem', textAlign: 'center' }}>Loading dashboard...</main>;
  }

  return (
    <main style={{ padding: '2rem 0', animation: 'fadeInUp 0.8s ease-out forwards' }}>
      
      {/* Dashboard Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Job Board</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back, {worker.name}! Here are the open jobs available to claim.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ background: 'var(--surface-color)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.8rem', borderRadius: '8px', color: '#10b981' }}>
              <DollarSign size={24} />
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>This Week's Earnings</p>
              <h3 style={{ fontSize: '1.2rem' }}>${parseFloat(worker.earnings || 0).toFixed(2)}</h3>
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
                <td style={{ padding: '1.5rem', fontWeight: 600 }}>{job.id.substring(0,8)}<br/><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>{new Date(job.created_at).toLocaleDateString()}</span></td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} color="var(--primary-color)" />
                    {job.audio_length_minutes || '?'} Minutes
                  </div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', textTransform: 'capitalize' }}>
                    <CheckCircle size={16} color="#10b981" />
                    {job.transcription_type}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    <FileText size={14} />
                    {job.transcript_format}
                  </div>
                </td>
                <td style={{ padding: '1.5rem', color: '#10b981', fontWeight: 600, fontSize: '1.1rem' }}>
                  ${(parseFloat(job.payout_amount) || 0).toFixed(2)}
                </td>
                <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                  <button 
                    onClick={() => handleClaim(job.id)}
                    disabled={isClaiming === job.id}
                    style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease', opacity: isClaiming === job.id ? 0.7 : 1 }}>
                    {isClaiming === job.id ? 'Claiming...' : 'Claim Job'}
                  </button>
                </td>
              </tr>
            ))}
            {availableJobs.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No pending jobs available right now. Check back later!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* My Active Jobs Section */}
      <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1.5rem' }}>My Active Jobs</h2>
      <div style={{ background: 'var(--surface-color)', backdropFilter: 'blur(20px)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(59, 152, 217, 0.05)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Job ID</th>
              <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Audio Length</th>
              <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '1.5rem', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {myJobs.map((job) => (
              <tr key={job.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1.5rem', fontWeight: 600 }}>{job.id.substring(0,8)}</td>
                <td style={{ padding: '1.5rem' }}>{job.audio_length_minutes || '?'} Minutes</td>
                <td style={{ padding: '1.5rem' }}>
                  <span style={{ 
                    padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, 
                    background: job.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : job.status === 'In Review' ? 'rgba(59, 152, 217, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                    color: job.status === 'Completed' ? '#10b981' : job.status === 'In Review' ? 'var(--primary-color)' : '#f59e0b' 
                  }}>
                    {job.status === 'Completed' ? 'Completed' : job.status === 'In Review' ? 'In Review' : 'In Progress'}
                  </span>
                </td>
                <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                  <button onClick={() => setSelectedJob(job)} style={{ background: 'transparent', color: 'white', border: '1px solid var(--border-color)', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer' }}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {myJobs.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  You haven't claimed any jobs yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--border-color)', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', animation: 'fadeInUp 0.3s ease-out' }}>
            <button onClick={() => setSelectedJob(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Job Details: {selectedJob.id.substring(0,8)}</h2>
            <span style={{ display: 'inline-block', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', marginBottom: '2rem' }}>
              Status: {selectedJob.status}
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              
              {/* Project Scope */}
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Project Scope</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Transcription Tier:</span> <br/> <strong style={{ textTransform: 'capitalize' }}>{selectedJob.transcription_type || 'Unknown'}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Worker Payout:</span> <br/> <strong style={{ color: '#10b981', fontSize: '1.2rem' }}>${(parseFloat(selectedJob.payout_amount) || 0).toFixed(2)}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Audio Length:</span> <br/> <strong>{selectedJob.audio_length_minutes ? `${selectedJob.audio_length_minutes} Minutes` : 'N/A'}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Number of Files:</span> <br/> <strong>{selectedJob.number_of_files || 1}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Turnaround Time:</span> <br/> <strong>{selectedJob.turnaround_time || 'Standard'}</strong></div>
                </div>
              </div>

              {/* Formatting Instructions */}
              <div style={{ gridColumn: '1 / -1', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Instructions & Formatting</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Delivery Format:</span> <br/> <strong style={{ textTransform: 'uppercase' }}>{selectedJob.transcript_format || 'PDF'}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Delivery Method:</span> <br/> <strong style={{ textTransform: 'capitalize' }}>{selectedJob.delivery_method || 'Email'}</strong></div>
                </div>
                
                {selectedJob.special_instructions && (
                  <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px' }}>
                    <span style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: 'bold' }}>Special Instructions:</span>
                    <p style={{ marginTop: '0.5rem', lineHeight: 1.5 }}>{selectedJob.special_instructions}</p>
                  </div>
                )}

                {selectedJob.spellings && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 'bold' }}>Specific Spellings Provided:</span>
                    <p style={{ marginTop: '0.5rem', lineHeight: 1.5 }}>{selectedJob.spellings}</p>
                  </div>
                )}
              </div>

            </div>

            {selectedJob.status !== 'Completed' && selectedJob.status !== 'In Review' && (
              <div style={{ marginTop: '2rem', background: 'rgba(59, 152, 217, 0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(59, 152, 217, 0.2)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Complete & Deliver Job</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Delivery Link URL (Google Doc, Dropbox, etc.) *</label>
                    <input 
                      type="url" 
                      placeholder="https://..." 
                      value={deliveryUrl}
                      onChange={(e) => setDeliveryUrl(e.target.value)}
                      style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white' }}
                      required 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Additional Notes to Client (Optional)</label>
                    <textarea 
                      placeholder="Any notes about the transcription..."
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', minHeight: '80px', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end', alignItems: 'center' }}>
              <button onClick={() => { setSelectedJob(null); setDeliveryUrl(''); setDeliveryNotes(''); }} style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border-color)', color: 'white', cursor: 'pointer' }}>Close Window</button>
              {selectedJob.status !== 'Completed' && selectedJob.status !== 'In Review' && (
                <button 
                  onClick={handleDeliver} 
                  disabled={isDelivering || !deliveryUrl}
                  style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', background: 'var(--primary-color)', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold', opacity: (isDelivering || !deliveryUrl) ? 0.5 : 1 }}>
                  {isDelivering ? 'Delivering...' : 'Submit Final Transcript'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
