"use client";

import { TrendingUp, Users, FileCheck, Settings, LayoutDashboard, Briefcase, UserCircle, CreditCard, Bell, Search, BarChart3, LogOut, CheckCircle, Clock, AlertTriangle, ArrowRight, ShieldCheck, Mail, DollarSign, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Dashboard');

  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [assigningWorkerId, setAssigningWorkerId] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  
  const [payoutAmount, setPayoutAmount] = useState('');
  const [isUpdatingPayout, setIsUpdatingPayout] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [approveSuccess, setApproveSuccess] = useState(false);

  const [isAddingWorker, setIsAddingWorker] = useState(false);
  const [newWorker, setNewWorker] = useState({ name: '', email: '' });
  const [isSubmittingWorker, setIsSubmittingWorker] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: leads } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
        const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        const { data: workersData } = await supabase.from('workers').select('*').order('created_at', { ascending: false });
        
        if (leads) setCustomers(leads);
        if (orders) setAllJobs(orders);
        if (workersData) setWorkers(workersData);
      } catch (error) {
        console.error("Error fetching admin data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingWorker(true);
    try {
      const res = await fetch('/api/admin/workers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWorker)
      });
      if (res.ok) {
        const { data: workersData } = await supabase.from('workers').select('*').order('created_at', { ascending: false });
        if (workersData) setWorkers(workersData);
        setIsAddingWorker(false);
        setNewWorker({ name: '', email: '' });
      } else {
        alert('Failed to add worker');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingWorker(false);
    }
  };

  const handleRemoveWorker = async (workerId: string) => {
    if (!confirm('Are you sure you want to remove this worker?')) return;
    try {
      const res = await fetch('/api/admin/workers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ worker_id: workerId })
      });
      if (res.ok) {
        setWorkers(workers.filter(w => w.id !== workerId));
      } else {
        alert('Failed to remove worker');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssignJob = async () => {
    if (!assigningWorkerId || !selectedJob) return;
    setIsAssigning(true);
    try {
      const res = await fetch('/api/admin/jobs/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_id: selectedJob.id, worker_id: assigningWorkerId })
      });
      if (res.ok) {
        // Refresh jobs
        const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (orders) setAllJobs(orders);
        setSelectedJob(null);
        setAssigningWorkerId('');
      } else {
        alert('Failed to assign job');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAssigning(false);
    }
  };

  const handleUpdatePayout = async () => {
    if (!selectedJob || !payoutAmount) return;
    setIsUpdatingPayout(true);
    try {
      const res = await fetch('/api/admin/jobs/update-payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_id: selectedJob.id, payout_amount: payoutAmount })
      });
      if (res.ok) {
        const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (orders) setAllJobs(orders);
        setSelectedJob({ ...selectedJob, payout_amount: parseFloat(payoutAmount) });
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      } else {
        alert('Failed to update payout');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdatingPayout(false);
    }
  };

  const handleApproveJob = async () => {
    if (!selectedJob) return;
    setIsApproving(true);
    try {
      const res = await fetch('/api/admin/jobs/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_id: selectedJob.id })
      });
      if (res.ok) {
        setApproveSuccess(true);
        setTimeout(async () => {
          setApproveSuccess(false);
          // Refresh jobs and workers
          const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
          const { data: workersData } = await supabase.from('workers').select('*').order('created_at', { ascending: false });
          if (orders) setAllJobs(orders);
          if (workersData) setWorkers(workersData);
          setSelectedJob({ ...selectedJob, status: 'Completed' });
        }, 2000);
      } else {
        alert('Failed to approve job');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsApproving(false);
    }
  };

  const sidebarItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Job Manager', icon: <Briefcase size={20} /> },
    { name: 'Workers', icon: <UserCircle size={20} /> },
    { name: 'Customers', icon: <Users size={20} /> },
    { name: 'Finances', icon: <CreditCard size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', margin: '-2rem', marginTop: 0, background: 'var(--bg-color)', color: 'var(--text-main)' }}>
      
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ width: '280px', background: 'var(--surface-color)', borderRight: '1px solid var(--border-color)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', height: '100vh', position: 'fixed', top: 0 }}>
        <div style={{ marginBottom: '2rem', padding: '0 0.5rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Admin Portal</p>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {sidebarItems.map((item) => (
            <button 
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', 
                borderRadius: '12px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500,
                background: activeTab === item.name ? 'rgba(59, 152, 217, 0.1)' : 'transparent',
                color: activeTab === item.name ? 'var(--primary-color)' : 'var(--text-muted)',
                border: 'none', transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
              onMouseOver={(e) => { if (activeTab !== item.name) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'white'; } }}
              onMouseOut={(e) => { if (activeTab !== item.name) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; } }}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => router.push('/admin-login')}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px', cursor: 'pointer', background: 'transparent', color: '#ef4444', border: 'none', fontWeight: 500 }}>
          <LogOut size={20} /> Secure Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main" style={{ flex: 1, padding: '2rem 3rem', marginLeft: '280px', minHeight: '100vh' }}>
        
        {/* Top Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{activeTab}</h1>
            <p style={{ color: 'var(--text-muted)' }}>Welcome back! Here is your platform overview.</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="text" placeholder="Search system..." style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'white', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '8px', fontSize: '0.9rem', width: '250px' }} />
            </div>
            <button style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'white', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Bell size={20} />
            </button>
          </div>
        </header>

        {activeTab === 'Dashboard' && (
          <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Monthly Revenue</p>
                    <h3 style={{ fontSize: '2rem' }}>$12,450</h3>
                  </div>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.8rem', borderRadius: '8px', color: '#10b981' }}>
                    <TrendingUp size={24} />
                  </div>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#10b981' }}>+15% vs last month</p>
              </div>

              <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Active Workers</p>
                    <h3 style={{ fontSize: '2rem' }}>24</h3>
                  </div>
                  <div style={{ background: 'rgba(59, 152, 217, 0.1)', padding: '0.8rem', borderRadius: '8px', color: 'var(--primary-color)' }}>
                    <Users size={24} />
                  </div>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>4 currently online</p>
              </div>

              <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Jobs Completed</p>
                    <h3 style={{ fontSize: '2rem' }}>842</h3>
                  </div>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.8rem', borderRadius: '8px', color: '#10b981' }}>
                    <FileCheck size={24} />
                  </div>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>99.2% success rate</p>
              </div>
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Activity</h2>
            <div style={{ background: 'var(--surface-color)', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <CheckCircle color="#10b981" size={20} />
                <div>
                  <p style={{ fontWeight: 500 }}>JOB-9824 Completed</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Deepgram API finished automated transcription.</p>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--text-muted)' }}>10 mins ago</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <Clock color="#f59e0b" size={20} />
                <div>
                  <p style={{ fontWeight: 500 }}>New Job Queued: JOB-9825</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>lawfirm@example.com requested Fully Human tier.</p>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--text-muted)' }}>45 mins ago</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <AlertTriangle color="#ef4444" size={20} />
                <div>
                  <p style={{ fontWeight: 500 }}>JOB-9822 Failed</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Audio file corrupt or unsupported format.</p>
                </div>
                <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--text-muted)' }}>2 hours ago</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Job Manager' && (
          <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>Global Job Queue</h2>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <select style={{ background: 'var(--surface-color)', color: 'white', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                  <option>All Statuses</option>
                  <option>Completed</option>
                  <option>In Progress</option>
                  <option>Queued</option>
                </select>
              </div>
            </div>
            
            <div style={{ background: 'var(--surface-color)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(59, 152, 217, 0.05)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Job Details</th>
                    <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Tier</th>
                    <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Status</th>
                    <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Assigned To</th>
                    <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Worker Payout</th>
                    <th style={{ padding: '1.5rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allJobs.map((job) => (
                    <tr key={job.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1.5rem', fontWeight: 600 }}>{job.id.substring(0,8)}...<br/><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>{job.client_email}</span></td>
                      <td style={{ padding: '1.5rem', textTransform: 'capitalize' }}>{job.transcription_type || 'Unknown'}</td>
                      <td style={{ padding: '1.5rem' }}>
                        <span style={{ 
                          padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize',
                          background: job.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : job.status === 'Failed' ? 'rgba(239, 68, 68, 0.1)' : job.status === 'In Review' ? 'rgba(59, 152, 217, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: job.status === 'Completed' ? '#10b981' : job.status === 'Failed' ? '#ef4444' : job.status === 'In Review' ? 'var(--primary-color)' : '#f59e0b'
                        }}>{job.status}</span>
                      </td>
                      <td style={{ padding: '1.5rem', color: job.assigned_worker_id ? 'var(--text-main)' : '#ef4444' }}>
                        {job.assigned_worker_id ? (workers.find(w => w.id === job.assigned_worker_id)?.name || 'Unknown Worker') : 'Unassigned'}
                      </td>
                      <td style={{ padding: '1.5rem', color: '#10b981', fontWeight: 600 }}>${parseFloat(job.payout_amount || 0).toFixed(2)}</td>
                      <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                        <button onClick={() => { setSelectedJob(job); setPayoutAmount(job.payout_amount?.toString() || ''); }} style={{ background: 'transparent', color: 'white', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Workers' && (
          <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>Freelance Workforce</h2>
              <button onClick={() => setIsAddingWorker(true)} style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>+ Add New Worker</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {workers.map((w, i) => (
                <div key={i} style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>{w.name ? w.name.charAt(0) : '?'}</div>
                      <div>
                        <h3 style={{ fontSize: '1.1rem' }}>{w.name}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{w.email}</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: 'auto', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Paid</p>
                      <p style={{ fontWeight: 'bold', color: '#10b981' }}>${w.earnings || '0.00'}</p>
                    </div>
                    <button onClick={() => handleRemoveWorker(w.id)} style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '0.4rem 1rem', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}>Remove Worker</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Customers' && (
          <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Client Directory</h2>
            <div style={{ background: 'var(--surface-color)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(59, 152, 217, 0.05)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Customer Name</th>
                    <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Email Address</th>
                    <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Active Jobs</th>
                    <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Lifetime Spend</th>
                    <th style={{ padding: '1.5rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1.5rem', fontWeight: 600 }}>{c.name}</td>
                      <td style={{ padding: '1.5rem', color: 'var(--text-muted)' }}>{c.email}</td>
                      <td style={{ padding: '1.5rem' }}><span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.8rem', borderRadius: '20px', color: 'var(--text-muted)' }}>0 Jobs</span></td>
                      <td style={{ padding: '1.5rem', color: '#10b981', fontWeight: 600 }}>--</td>
                      <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                        <button style={{ background: 'transparent', color: 'white', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>View History</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Finances' && (
          <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Financial Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <DollarSign size={32} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Available to Payout</p>
                <h3 style={{ fontSize: '2.5rem', color: '#10b981' }}>$4,250.00</h3>
              </div>
              <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <TrendingUp size={32} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Pending Clearance</p>
                <h3 style={{ fontSize: '2.5rem' }}>$1,840.50</h3>
              </div>
              <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <CreditCard size={32} color="#f59e0b" style={{ margin: '0 auto 1rem' }} />
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Worker Payouts Owed</p>
                <h3 style={{ fontSize: '2.5rem', color: '#f59e0b' }}>$840.00</h3>
              </div>
            </div>

            <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem' }}>Recent Stripe Transactions</h3>
                <button style={{ color: 'var(--primary-color)', background: 'transparent', border: 'none', cursor: 'pointer' }}>View in Stripe</button>
              </div>
              {/* Dummy Transaction List */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <div><p style={{ fontWeight: 'bold' }}>Payment Received (lawfirm@example.com)</p><p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>pi_3N9Xk...</p></div>
                <p style={{ color: '#10b981', fontWeight: 'bold' }}>+$150.00</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <div><p style={{ fontWeight: 'bold' }}>Payment Received (podcast@media.com)</p><p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>pi_8N2Xz...</p></div>
                <p style={{ color: '#10b981', fontWeight: 'bold' }}>+$12.50</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0' }}>
                <div><p style={{ fontWeight: 'bold' }}>Worker Payout (Sarah J.)</p><p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>po_1L9Xa...</p></div>
                <p style={{ color: '#ef4444', fontWeight: 'bold' }}>-$75.00</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>System Settings</h2>
            
            <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldCheck color="var(--primary-color)" /> Administrator Credentials</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Admin Email</label>
                  <input type="text" defaultValue="admin@zoomtranscription.com" style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Update Password</label>
                  <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white' }} />
                </div>
              </div>
              <button style={{ marginTop: '2rem', background: 'var(--primary-color)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer' }}>Save Credentials</button>
            </div>

            <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Settings color="var(--primary-color)" /> API Integrations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Stripe Secret Key (sk_live_...)</label>
                  <input type="password" defaultValue="sk_live_1234567890abcdef" style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Deepgram API Key (For AI Transcription)</label>
                  <input type="password" defaultValue="dg_1234567890abcdef" style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Supabase Database URL</label>
                  <input type="text" defaultValue="https://xyz.supabase.co" style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white' }} />
                </div>
              </div>
              <button style={{ marginTop: '2rem', background: 'var(--primary-color)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', cursor: 'pointer' }}>Update API Keys</button>
            </div>
          </div>
        )}

        {/* Job Details Modal */}
        {selectedJob && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--border-color)', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', animation: 'fadeInUp 0.3s ease-out' }}>
              <button onClick={() => setSelectedJob(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
              
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Job Details: {selectedJob.id.substring(0,8)}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ display: 'inline-block', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize', background: 'rgba(59, 152, 217, 0.1)', color: 'var(--primary-color)' }}>
                  Status: {selectedJob.status}
                </span>
                {selectedJob.status === 'In Review' && (
                  <button 
                    onClick={handleApproveJob}
                    disabled={isApproving || approveSuccess}
                    style={{ padding: '0.4rem 1rem', background: approveSuccess ? 'transparent' : '#10b981', color: approveSuccess ? '#10b981' : 'white', border: approveSuccess ? '2px solid #10b981' : 'none', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', opacity: (isApproving || approveSuccess) ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem', animation: isApproving ? 'pulse 2s infinite' : 'none', transition: 'all 0.2s ease' }}
                  >
                    <CheckCircle size={16} /> {isApproving ? 'Approving...' : approveSuccess ? '✓ Approved & Paid!' : 'Approve & Pay Worker'}
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                
                {/* Client Details */}
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Client Contact</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Name:</span> <br/> <strong>{selectedJob.client_name || 'N/A'}</strong></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Email:</span> <br/> <strong>{selectedJob.client_email}</strong></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Phone:</span> <br/> <strong>{selectedJob.client_phone || 'N/A'}</strong></div>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Preferred Method:</span> <br/> <strong style={{ textTransform: 'capitalize' }}>{selectedJob.contact_method || 'Email'}</strong></div>
                  </div>
                </div>

                {/* Worker Payout Configuration */}
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#10b981' }}>Set Worker Payout</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>Enter the amount you want to pay a freelancer for completing this job. This will be shown on the Job Board.</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>$</span>
                        <input 
                          type="number" 
                          placeholder="0.00" 
                          value={payoutAmount}
                          onChange={(e) => setPayoutAmount(e.target.value)}
                          style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', fontSize: '1.1rem' }}
                        />
                      </div>
                      <button 
                        onClick={handleUpdatePayout}
                        disabled={isUpdatingPayout || !payoutAmount}
                        style={{ padding: '0 1.5rem', background: saveSuccess ? 'transparent' : '#10b981', color: saveSuccess ? '#10b981' : 'white', border: saveSuccess ? '2px solid #10b981' : 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', opacity: (isUpdatingPayout || !payoutAmount) ? 0.7 : 1, transition: 'all 0.2s ease' }}
                      >
                        {isUpdatingPayout ? 'Saving...' : saveSuccess ? '✓ Saved!' : 'Save'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Project Scope */}
                <div style={{ gridColumn: '1 / -1', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Project Scope</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div><span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Transcription Tier:</span> <br/> <strong style={{ textTransform: 'capitalize' }}>{selectedJob.transcription_type || 'Unknown'}</strong></div>
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

              {(selectedJob.status === 'Completed' || selectedJob.status === 'In Review') && selectedJob.delivery_url && (
                <div style={{ marginTop: '2rem', background: 'rgba(16, 185, 129, 0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#10b981' }}>{selectedJob.status === 'In Review' ? 'Delivered Work (Needs Approval)' : 'Completed Delivery'}</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Final Transcript Link:</span> <br/>
                      <a href={selectedJob.delivery_url?.startsWith('http') ? selectedJob.delivery_url : `https://${selectedJob.delivery_url}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'underline', wordBreak: 'break-all' }}>{selectedJob.delivery_url}</a>
                    </div>
                    {selectedJob.delivery_notes && (
                      <div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Worker Notes:</span> <br/>
                        <p style={{ marginTop: '0.5rem', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>{selectedJob.delivery_notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                {selectedJob.status === 'pending' && (
                  <>
                    <select 
                      value={assigningWorkerId} 
                      onChange={(e) => setAssigningWorkerId(e.target.value)}
                      style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', padding: '0.8rem', borderRadius: '8px', minWidth: '200px' }}
                    >
                      <option value="">-- Select Worker --</option>
                      {workers.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                    </select>
                    <button 
                      onClick={handleAssignJob}
                      disabled={!assigningWorkerId || isAssigning}
                      style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', background: 'var(--primary-color)', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold', opacity: (!assigningWorkerId || isAssigning) ? 0.5 : 1 }}
                    >
                      {isAssigning ? 'Assigning...' : 'Assign Worker'}
                    </button>
                  </>
                )}
                <button onClick={() => setSelectedJob(null)} style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border-color)', color: 'white', cursor: 'pointer' }}>Close Window</button>
              </div>

            </div>
          </div>
        )}

        {/* Add Worker Modal */}
        {isAddingWorker && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--border-color)', width: '100%', maxWidth: '500px', position: 'relative', animation: 'fadeInUp 0.3s ease-out' }}>
              <button onClick={() => setIsAddingWorker(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
              
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Add New Worker</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Invite a new freelance transcriptionist to the platform.</p>

              <form onSubmit={handleAddWorker} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Full Name</label>
                  <input type="text" value={newWorker.name} onChange={(e) => setNewWorker({...newWorker, name: e.target.value})} required style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'white', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email Address</label>
                  <input type="email" value={newWorker.email} onChange={(e) => setNewWorker({...newWorker, email: e.target.value})} required style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'white', fontSize: '1rem' }} />
                </div>
                <button type="submit" disabled={isSubmittingWorker} style={{ marginTop: '1rem', background: 'var(--primary-color)', color: 'white', border: 'none', padding: '1rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', opacity: isSubmittingWorker ? 0.7 : 1 }}>
                  {isSubmittingWorker ? 'Adding...' : 'Send Invitation'}
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
