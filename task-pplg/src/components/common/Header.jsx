import { useEffect, useRef, useState } from 'react';
import { Search, Bell, Mail, ChevronDown, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const notifications = [
    { id: 1, title: 'Tugas "API Integration" butuh revisi', time: '5 menit lalu', type: 'assignment' },
    { id: 2, title: 'Nilai LKPD 02 sudah dipublikasikan', time: '1 jam lalu', type: 'grade' },
    { id: 3, title: 'Deadline proyek SkillSync dalam 2 hari', time: 'Hari ini', type: 'deadline' },
];

const messages = [
    { id: 1, sender: 'Pak Didi', subject: 'Feedback proyek frontend', preview: 'Saran utama: rapikan layout responsive dan perbaiki spacing.', time: '09:15' },
    { id: 2, sender: 'Admin KarsaDev', subject: 'Pengumuman kelas', preview: 'Jadwal mentor session akan dimulai hari Senin pukul 10.00.', time: 'Kemarin' },
    { id: 3, sender: 'Sarah', subject: 'Review grup proyek', preview: 'Saya sudah upload file revisi, silakan cek hasil pengerjaan.', time: 'Kemarin' },
];

export default function Header({ profile, preferences, onOpenAuth, onToggleMobileMenu }) {
    const { user, logout } = useAuth();
    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);

    const roleLabel = profile?.role === 'teacher' ? 'Teacher' : profile?.role === 'admin' ? 'Admin' : 'Student';
    const initials = (profile?.full_name || 'SK')
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="app-topbar">
            <div className="topbar-left-mobile-group">
                <button
                    type="button"
                    className="mobile-menu-toggle"
                    aria-label="Open mobile navigation"
                    onClick={onToggleMobileMenu}
                >
                    <Menu size={20} />
                </button>

                <div className="header-brand">
                    <div className="brand-logo-box">
                        <img src="/logo-kd.svg" alt="KarsaDev Logo" />
                    </div>
                    <span className="brand-title">KarsaDev</span>
                </div>

                <div className="topbar-search-box">
                    <input type="text" placeholder="Search Courses, Labs, Projects..." />
                    <Search size={16} className="search-icon-right" />
                </div>
            </div>

            <div className="topbar-actions-right" ref={menuRef}>
                <div className="topbar-menu-wrap">
                    <button
                        className={`topbar-icon-btn ${openMenu === 'notifications' ? 'active' : ''}`}
                        title="Notifikasi"
                        onClick={() => setOpenMenu(openMenu === 'notifications' ? null : 'notifications')}
                    >
                        <Bell size={18} />
                        {preferences?.notifications && <span className="badge-counter">3</span>}
                    </button>

                    {openMenu === 'notifications' && (
                        <div className="topbar-dropdown-panel">
                            <div className="topbar-dropdown-header">
                                <strong>Notifikasi</strong>
                                <span>Baru</span>
                            </div>
                            <div className="topbar-dropdown-list">
                                {notifications.map((item) => (
                                    <div key={item.id} className="dropdown-item">
                                        <div className={`dot-indicator ${item.type}`} />
                                        <div className="dropdown-item-copy">
                                            <strong>{item.title}</strong>
                                            <small>{item.time}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="topbar-menu-wrap">
                    <button
                        className={`topbar-icon-btn ${openMenu === 'messages' ? 'active' : ''}`}
                        title="Pesan Masuk"
                        onClick={() => setOpenMenu(openMenu === 'messages' ? null : 'messages')}
                    >
                        <Mail size={18} />
                        <span className="badge-counter mail-badge">2</span>
                    </button>

                    {openMenu === 'messages' && (
                        <div className="topbar-dropdown-panel">
                            <div className="topbar-dropdown-header">
                                <strong>Pesan</strong>
                                <span>2 baru</span>
                            </div>
                            <div className="topbar-dropdown-list">
                                {messages.map((item) => (
                                    <div key={item.id} className="dropdown-item message-item">
                                        <div className="message-avatar">{item.sender.charAt(0)}</div>
                                        <div className="dropdown-item-copy">
                                            <div className="message-headline">
                                                <strong>{item.sender}</strong>
                                                <small>{item.time}</small>
                                            </div>
                                            <span>{item.subject}</span>
                                            <small>{item.preview}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {user ? (
                    <>
                        <div className="topbar-profile-pill">
                            <div className="profile-avatar-circle">{initials}</div>
                            <div className="profile-meta-text">
                                <small>{roleLabel}</small>
                                <strong>{profile?.full_name || 'Sarah Chen'}</strong>
                            </div>
                            <ChevronDown size={14} color="var(--text-muted)" />
                        </div>
                        <button className="topbar-icon-btn" title="Keluar" onClick={logout}>
                            <LogOut size={18} />
                        </button>
                    </>
                ) : (
                    <button className="btn-primary btn-sm" onClick={() => onOpenAuth?.('login')}>
                        Masuk / Daftar
                    </button>
                )}
            </div>
        </header>
    );
}