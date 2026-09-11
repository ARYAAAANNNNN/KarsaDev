import { useState } from 'react';
import { UserCog, ShieldCheck, Bell, MoonStar, Lock } from 'lucide-react';

export default function SettingsPage({ profile, preferences, onProfileChange, onTogglePreference, onRoleChange }) {
    const role = profile?.role || 'student';
    const [pendingRole, setPendingRole] = useState(null);
    const [pinInput, setPinInput] = useState('');
    const [pinError, setPinError] = useState('');
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);

    const openRoleAuthorization = (targetRole) => {
        if (targetRole === 'student') {
            setPinError('');
            onRoleChange('student');
            return;
        }

        if (role === targetRole) {
            return;
        }

        setPendingRole(targetRole);
        setPinInput('');
        setPinError('');
        setIsPinModalOpen(true);
    };

    const handlePinSubmit = () => {
        if (!pendingRole) return;

        const expectedPin = pendingRole === 'teacher' ? 'GURU2026' : 'ADMIN2026';

        if (pinInput.trim() !== expectedPin) {
            setPinError('PIN tidak valid. Akses role ditolak.');
            return;
        }

        onRoleChange(pendingRole);
        setPinInput('');
        setPinError('');
        setPendingRole(null);
        setIsPinModalOpen(false);
    };

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
                                    onClick={() => openRoleAuthorization(item)}
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

            {isPinModalOpen && (
                <div style={modalOverlayStyle} onClick={() => setIsPinModalOpen(false)}>
                    <div style={modalBoxStyle} onClick={(e) => e.stopPropagation()}>
                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Authorization required</div>
                            <h3 style={{ color: 'var(--text-main)', marginTop: '6px' }}>Verifikasi PIN {pendingRole === 'teacher' ? 'Guru' : 'Admin'}</h3>
                        </div>

                        <label style={labelStyle}>PIN {pendingRole === 'teacher' ? 'Guru' : 'Admin'}</label>
                        <input
                            type="password"
                            value={pinInput}
                            onChange={(e) => setPinInput(e.target.value)}
                            placeholder={pendingRole === 'teacher' ? 'GURU2026' : 'ADMIN2026'}
                            style={{ ...inputStyle, marginBottom: '10px' }}
                        />

                        {pinError && (
                            <div style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '10px' }}>{pinError}</div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                            <button
                                onClick={() => {
                                    setIsPinModalOpen(false);
                                    setPendingRole(null);
                                    setPinInput('');
                                    setPinError('');
                                }}
                                style={secondaryButtonStyle}
                            >
                                Batal
                            </button>
                            <button onClick={handlePinSubmit} style={primaryButtonStyle}>Verifikasi</button>
                        </div>
                    </div>
                </div>
            )}
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

const modalOverlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(2, 6, 23, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1200,
    padding: '20px'
};

const modalBoxStyle = {
    width: '100%',
    maxWidth: '420px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '18px',
    padding: '22px 20px',
    boxShadow: '0 22px 60px rgba(15, 23, 42, 0.4)'
};

const primaryButtonStyle = {
    border: 'none',
    background: 'linear-gradient(135deg, var(--neon-magenta), var(--neon-purple))',
    color: 'white',
    fontWeight: 700,
    borderRadius: '10px',
    padding: '10px 14px',
    cursor: 'pointer'
};

const secondaryButtonStyle = {
    border: '1px solid var(--border-subtle)',
    background: 'transparent',
    color: 'var(--text-main)',
    borderRadius: '10px',
    padding: '10px 14px',
    cursor: 'pointer'
};
