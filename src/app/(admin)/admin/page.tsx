"use client";

import { TrendingUp, Users, FileCheck, Settings, LayoutDashboard, Briefcase, UserCircle, CreditCard, Bell, Search, BarChart3, LogOut, CheckCircle, Clock, AlertTriangle, ArrowRight, ShieldCheck, Mail, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Dashboard');

  const allJobs = [
    { id: 'JOB-9825', customer: 'lawfirm@example.com', tier: 'Fully Human', status: 'In Progress', worker: 'Sarah J.', revenue: 150.00, date: 'Oct 24' },
    { id: 'JOB-9824', customer: 'podcast@media.com', tier: 'AI Instant', status: 'Completed', worker: 'Deepgram API', revenue: 12.50, date: 'Oct 24' },
    { id: 'JOB-9823', customer: 'smith.legal@law.com', tier: 'Human Reviewed', status: 'Queued', worker: 'Unassigned', revenue: 65.00, date: 'Oct 23' },
    { id: 'JOB-9822', customer: 'marketing@corp.com', tier: 'AI Instant', status: 'Failed', worker: 'Deepgram API', revenue: 0.00, date: 'Oct 23' },
    { id: 'JOB-9821', customer: 'dr.jones@clinic.com', tier: 'Fully Human', status: 'Completed', worker: 'Michael T.', revenue: 85.00, date: 'Oct 22' },
  ];

  const workers = [
    { name: 'Sarah Jenkins', email: 'sarah.j@gmail.com', status: 'Online', rating: '4.9', earnings: '$3,450' },
    { name: 'Michael Thomas', email: 'm.thomas@yahoo.com', status: 'Offline', rating: '4.7', earnings: '$1,200' },
    { name: 'Elena Rodriguez', email: 'elena.r@gmail.com', status: 'In Job', rating: '5.0', earnings: '$4,100' },
    { name: 'David Smith', email: 'david.s@hotmail.com', status: 'Online', rating: '4.8', earnings: '$850' },
  ];

  const customers = [
    { name: 'Davis Law Firm', email: 'admin@davislaw.com', totalSpent: '$4,500', activeJobs: 2 },
    { name: 'TechMedia Podcast', email: 'hello@techmedia.com', totalSpent: '$850', activeJobs: 0 },
    { name: 'City Hospital', email: 'records@cityhospital.org', totalSpent: '$12,400', activeJobs: 5 },
  ];

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
                    <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Revenue</th>
                    <th style={{ padding: '1.5rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allJobs.map((job) => (
                    <tr key={job.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1.5rem', fontWeight: 600 }}>{job.id}<br/><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>{job.customer}</span></td>
                      <td style={{ padding: '1.5rem' }}>{job.tier}</td>
                      <td style={{ padding: '1.5rem' }}>
                        <span style={{ 
                          padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600,
                          background: job.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : job.status === 'Failed' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 152, 217, 0.1)',
                          color: job.status === 'Completed' ? '#10b981' : job.status === 'Failed' ? '#ef4444' : 'var(--primary-color)'
                        }}>{job.status}</span>
                      </td>
                      <td style={{ padding: '1.5rem', color: job.worker === 'Unassigned' ? '#ef4444' : 'inherit' }}>{job.worker}</td>
                      <td style={{ padding: '1.5rem', color: '#10b981', fontWeight: 600 }}>${job.revenue.toFixed(2)}</td>
                      <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                        <button style={{ background: 'transparent', color: 'white', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Manage</button>
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
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Freelance Workforce</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {workers.map((w, i) => (
                <div key={i} style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>{w.name.charAt(0)}</div>
                      <div>
                        <h3 style={{ fontSize: '1.1rem' }}>{w.name}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{w.email}</p>
                      </div>
                    </div>
                    <span style={{ background: w.status === 'Online' ? 'rgba(16, 185, 129, 0.1)' : w.status === 'Offline' ? 'rgba(255,255,255,0.1)' : 'rgba(245, 158, 11, 0.1)', color: w.status === 'Online' ? '#10b981' : w.status === 'Offline' ? 'var(--text-muted)' : '#f59e0b', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', height: 'fit-content' }}>{w.status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: 'auto' }}>
                    <div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rating</p>
                      <p style={{ fontWeight: 'bold', color: '#fbbf24' }}>★ {w.rating}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Paid</p>
                      <p style={{ fontWeight: 'bold', color: '#10b981' }}>{w.earnings}</p>
                    </div>
                    <button style={{ background: 'transparent', color: 'white', border: '1px solid var(--border-color)', padding: '0.4rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Profile</button>
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
                      <td style={{ padding: '1.5rem' }}><span style={{ background: c.activeJobs > 0 ? 'rgba(59, 152, 217, 0.1)' : 'rgba(255,255,255,0.05)', padding: '0.3rem 0.8rem', borderRadius: '20px', color: c.activeJobs > 0 ? 'var(--primary-color)' : 'var(--text-muted)' }}>{c.activeJobs} Jobs</span></td>
                      <td style={{ padding: '1.5rem', color: '#10b981', fontWeight: 600 }}>{c.totalSpent}</td>
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

      </main>
    </div>
  );
}
