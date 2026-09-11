import {
    LayoutDashboard,
    Tv2,
    BookOpen,
    FolderGit2,
    FlaskConical,
    Trophy,
    BarChart2,
    Users,
    Settings,
    HelpCircle,
    CheckCheck,
    Shield
} from 'lucide-react';

export default function Sidebar({ currentView, setView, role }) {
    const isTeacherOrAdmin = role === 'teacher' || role === 'admin';
    const isAdmin = role === 'admin';

    return (
        <aside className="app-sidebar">
            <div>
                <div className="sidebar-brand" onClick={() => setView('dashboard')}>
                    <div className="brand-logo-box">
                        <img src="/logo-kd.svg" alt="KarsaDev Logo" />
                    </div>
                    <span className="brand-title">KarsaDev</span>
                </div>

                <nav className="sidebar-menu-top">
                    <button
                        className={`sidebar-btn ${currentView === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setView('dashboard')}
                    >
                        <LayoutDashboard size={18} /> Dashboard
                    </button>

                    <button
                        className={`sidebar-btn ${currentView === 'courses' ? 'active' : ''}`}
                        onClick={() => setView('courses')}
                    >
                        <Tv2 size={18} /> My Courses
                    </button>

                    <button
                        className={`sidebar-btn ${currentView === 'curriculum' ? 'active' : ''}`}
                        onClick={() => setView('curriculum')}
                    >
                        <BookOpen size={18} /> Curriculum
                    </button>

                    <button
                        className={`sidebar-btn ${currentView === 'projects' ? 'active' : ''}`}
                        onClick={() => setView('projects')}
                    >
                        <FolderGit2 size={18} /> Projects
                    </button>

                    <button
                        className={`sidebar-btn ${currentView === 'labs' ? 'active' : ''}`}
                        onClick={() => setView('labs')}
                    >
                        <FlaskConical size={18} /> Labs
                    </button>

                    <button
                        className={`sidebar-btn ${currentView === 'practice' ? 'active' : ''}`}
                        onClick={() => setView('practice')}
                    >
                        <Trophy size={18} /> Practice
                    </button>

                    <button
                        className={`sidebar-btn ${currentView === 'analytics' ? 'active' : ''}`}
                        onClick={() => setView('analytics')}
                    >
                        <BarChart2 size={18} /> Analytics
                    </button>

                    {isTeacherOrAdmin && (
                        <button
                            className={`sidebar-btn ${currentView === 'grading' ? 'active' : ''}`}
                            onClick={() => setView('grading')}
                        >
                            <CheckCheck size={18} /> Grading
                        </button>
                    )}

                    {isAdmin && (
                        <button
                            className={`sidebar-btn ${currentView === 'admin' ? 'active' : ''}`}
                            onClick={() => setView('admin')}
                        >
                            <Shield size={18} /> Admin Panel
                        </button>
                    )}
                </nav>
            </div>

            <div className="sidebar-menu-bottom">
                <button
                    className={`sidebar-btn ${currentView === 'community' ? 'active' : ''}`}
                    onClick={() => setView('community')}
                >
                    <Users size={18} /> community
                </button>

                <button
                    className={`sidebar-btn ${currentView === 'settings' ? 'active' : ''}`}
                    onClick={() => setView('settings')}
                >
                    <Settings size={18} /> Settings
                </button>

                <button
                    className={`sidebar-btn ${currentView === 'help' ? 'active' : ''}`}
                    onClick={() => setView('help')}
                >
                    <HelpCircle size={18} /> Help
                </button>
            </div>
        </aside>
    );
}