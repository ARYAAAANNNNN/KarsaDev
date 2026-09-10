import React from 'react';
import { Search, Bell, Mail, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Header({ profile, preferences, onOpenAuth }) {
    const { user, logout } = useAuth();
    const roleLabel = profile?.role === 'teacher' ? 'Teacher' : profile?.role === 'admin' ? 'Admin' : 'Student';
    const initials = (profile?.full_name || 'SK')
        .split(' ')
        .map((word) => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <header className="app-topbar">
            <div className="topbar-search-box">
                <input type="text" placeholder="Search Courses, Labs, Projects..." />
                <Search size={16} className="search-icon-right" />
            </div>

            <div className="topbar-actions-right">
                <button className="topbar-icon-btn" title="Notifikasi">
                    <Bell size={18} />
                    {preferences?.notifications && <span className="badge-counter">3</span>}
                </button>

                <button className="topbar-icon-btn" title="Pesan Masuk">
                    <Mail size={18} />
                </button>

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