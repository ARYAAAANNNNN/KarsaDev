import React from 'react';
import { UserCog, ShieldCheck, Bell, MoonStar, Lock } from 'lucide-react';

export default function SettingsPage({ profile, preferences, onProfileChange, onTogglePreference, onRoleChange }) {
    const role = profile?.role || 'student';

    return (
        <section>
            <div className="page-header" style={{ marginBottom: '22px' }}>
                <div>
                    <div className="card-header-title" style={{ color: 'var(--text-main)' }}>
                        <UserCog style={{ color: 'var(--neon-cyan)' }} /> Settings
                    </div>
                    <p className="section-subtitle">Atur profil, preferensi, dan peran pengguna pada platform KarsaDev.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: '18px' }}>
                <div className="card-panel-box">
                    <div className="panel-header-row" style={{ marginBottom: '16px' }}>
                        <div>
                            <h3>Profile</h3>
                            <small>Informasi akun utama</small>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gap: '14px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                            <div>
                                <label style={labelStyle}>Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={profile?.full_name || ''}
                                    onChange={(e) => onProfileChange('full_name', e.target.value)}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Email</label>
                                <input
                                    type="email"
                                    value={profile?.email || ''}
                                    onChange={(e) => onProfileChange('email', e.target.value)}
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>NISN / NIP</label>
                            <input
                                type="text"
                                value={profile?.nisn || ''}
                                onChange={(e) => onProfileChange('nisn', e.target.value)}
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Bio Singkat</label>
                            <textarea
                                rows="4"
                                value={profile?.bio || ''}
                                onChange={(e) => onProfileChange('bio', e.target.value)}
                                style={textareaStyle}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div className="card-panel-box">
                        <div className="panel-header-row" style={{ marginBottom: '12px' }}>
                            <div>
                                <h3>Role Switcher</h3>
                                <small>Peran aktif akun</small>
                            </div>
                            <ShieldCheck size={18} style={{ color: 'var(--neon-purple)' }} />
                        </div>

                        <div style={{ display: 'grid', gap: '10px' }}>
                            {['student', 'teacher', 'admin'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => onRoleChange(item)}
                                    style={{
                                        background: role === item ? 'rgba(168,85,247,0.12)' : 'transparent',
                                        border: role === item ? '1px solid var(--neon-purple)' : '1px solid var(--border-subtle)',
                                        borderRadius: '12px',
                                        color: 'var(--text-main)',
                                        padding: '10px 12px',
                                        textAlign: 'left',
                                        fontWeight: 700,
                                        cursor: 'pointer'
                                    }}
                                >
                                    {item === 'student' ? 'Student' : item === 'teacher' ? 'Teacher' : 'Admin'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="card-panel-box">
                        <div className="panel-header-row" style={{ marginBottom: '12px' }}>
                            <div>
                                <h3>Preferences</h3>
                                <small>Pengaturan tampilan dan notifikasi</small>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '12px' }}>
                            <div style={prefItemStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Bell size={16} style={{ color: 'var(--neon-cyan)' }} />
                                    <span>Notifikasi tugas</span>
                                </div>
                                <button onClick={() => onTogglePreference('notifications')} style={{ ...toggleStyle, background: preferences?.notifications ? 'var(--neon-purple)' : 'rgba(255,255,255,0.08)' }}>
                                    <span style={{ transform: preferences?.notifications ? 'translateX(18px)' : 'translateX(0)', ...toggleDotStyle }} />
                                </button>
                            </div>

                            <div style={prefItemStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <MoonStar size={16} style={{ color: 'var(--neon-magenta)' }} />
                                    <span>Dark mode</span>
                                </div>
                                <button onClick={() => onTogglePreference('darkMode')} style={{ ...toggleStyle, background: preferences?.darkMode ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.08)' }}>
                                    <span style={{ transform: preferences?.darkMode ? 'translateX(18px)' : 'translateX(0)', ...toggleDotStyle }} />
                                </button>
                            </div>

                            <div style={prefItemStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Lock size={16} style={{ color: '#fbbf24' }} />
                                    <span>Privasi akun</span>
                                </div>
                                <button style={{ border: '1px solid var(--border-subtle)', background: 'transparent', borderRadius: '10px', padding: '8px 10px', color: 'var(--text-main)', cursor: 'pointer' }}>Manage</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const inputStyle = {
    width: '100%',
    background: 'var(--bg-input)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '12px',
    color: 'var(--text-main)',
    padding: '11px 12px',
    fontSize: '0.9rem'
};

const textareaStyle = {
    width: '100%',
    background: 'var(--bg-input)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '12px',
    color: 'var(--text-main)',
    padding: '11px 12px',
    fontSize: '0.9rem',
    resize: 'vertical'
};

const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    marginBottom: '6px'
};

const prefItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    background: 'var(--bg-card-inner)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '12px',
    padding: '12px'
};

const toggleStyle = {
    width: '42px',
    height: '24px',
    borderRadius: '999px',
    border: '1px solid var(--border-subtle)',
    position: 'relative',
    padding: '2px',
    cursor: 'pointer'
};

const toggleDotStyle = {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: '#fff',
    transition: 'all 0.2s ease'
};
