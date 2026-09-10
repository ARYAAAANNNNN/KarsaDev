import React from 'react';
import {
    Terminal,
    ListTodo,
    BarChart3,
    Briefcase,
    BookOpenText,
    Code2,
    CheckSquare,
    ShieldAlert,
    Moon,
    Sun,
    LogIn,
    LogOut,
    UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ currentView, setView, isDark, toggleTheme, onOpenAuth }) {
    const { user, profile, logout, setProfile } = useAuth();
    const role = profile?.role || 'student';

    return (
        <header>
            <div className="nav-container">
                <div className="brand">
                    <Terminal size={22} />
                    <span>KarsaDev</span>
                    <span className="brand-badge">{role.toUpperCase()}</span>
                </div>

                <nav className="nav-menu">
                    <button
                        className={`nav-btn ${currentView === 'tasks' ? 'active' : ''}`}
                        onClick={() => setView('tasks')}
                    >
                        <ListTodo size={18} /> Tugas
                    </button>

                    <button
                        className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setView('dashboard')}
                    >
                        <BarChart3 size={18} /> Dashboard
                    </button>

                    <button
                        className={`nav-btn ${currentView === 'portfolio' ? 'active' : ''}`}
                        onClick={() => setView('portfolio')}
                    >
                        <Briefcase size={18} /> Showcase
                    </button>

                    <button
                        className={`nav-btn ${currentView === 'lkpd' ? 'active' : ''}`}
                        onClick={() => setView('lkpd')}
                    >
                        <BookOpenText size={18} /> Modul LKPD
                    </button>

                    <button
                        className={`nav-btn ${currentView === 'devlog' ? 'active' : ''}`}
                        onClick={() => setView('devlog')}
                    >
                        <Code2 size={18} /> Dev Log
                    </button>

                    {(role === 'teacher' || role === 'admin') && (
                        <button
                            className={`nav-btn ${currentView === 'grading' ? 'active' : ''}`}
                            onClick={() => setView('grading')}
                        >
                            <CheckSquare size={18} /> Evaluasi Siswa
                        </button>
                    )}

                    {role === 'admin' && (
                        <button
                            className={`nav-btn ${currentView === 'admin' ? 'active' : ''}`}
                            onClick={() => setView('admin')}
                        >
                            <ShieldAlert size={18} /> Admin Panel
                        </button>
                    )}

                    <button className="theme-btn" onClick={toggleTheme} title="Ubah Tema">
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <div className="role-switcher" title="Simulasi Akses Peran">
                        <UserCheck size={16} />
                        <select
                            value={role}
                            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        >
                            <option value="student">Siswa</option>
                            <option value="teacher">Guru</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="auth-box">
                        {user ? (
                            <div className="user-profile-menu">
                                <span className="user-name">{profile?.full_name}</span>
                                <button className="btn-action" onClick={logout} title="Keluar">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <button className="btn-primary btn-sm" onClick={onOpenAuth}>
                                <LogIn size={16} /> Masuk / Daftar
                            </button>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}