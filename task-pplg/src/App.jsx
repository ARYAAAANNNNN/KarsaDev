import { useEffect, useState } from 'react';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import AuthModal from './components/auth/AuthModal';
import { useAuth } from './context/AuthContext';

import StudentDashboard from './pages/StudentDashboard';
import CoursesPage from './pages/CoursesPage';
import CurriculumPage from './pages/CurriculumPage';
import ProjectsShowcasePage from './pages/ProjectsShowcasePage';
import LabsDevLogPage from './pages/LabsDevLogPage';
import PracticeTasksPage from './pages/PracticeTasksPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CommunityPage from './pages/CommunityPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import TeacherGradingPage from './pages/TeacherGradingPage';
import AdminPanelPage from './pages/AdminPanelPage';
import { defaultStudentCompetencies } from './data/curriculumData';

const initialTasks = [
  {
    id: 1,
    title: 'React Hooks Refactor',
    category: 'Frontend',
    priority: 'High',
    status: 'To Do',
    deadline: '2026-09-12',
    tags: 'React, Hooks',
    repo: 'https://github.com/example/react-hooks-refactor',
    completed: false,
  },
  {
    id: 2,
    title: 'API Integration',
    category: 'Frontend',
    priority: 'Medium',
    status: 'In Progress',
    deadline: '2026-09-15',
    tags: 'Fetch, Supabase',
    repo: 'https://github.com/example/api-integration',
    completed: false,
  },
  {
    id: 3,
    title: 'Unit Test Coverage',
    category: 'Testing',
    priority: 'Low',
    status: 'Review',
    deadline: '2026-09-18',
    tags: 'Vitest, Testing',
    repo: 'https://github.com/example/unit-test',
    completed: false,
  },
  {
    id: 4,
    title: 'CI/CD Pipeline Setup',
    category: 'DevOps',
    priority: 'High',
    status: 'Done',
    deadline: '2026-09-10',
    tags: 'GitHub Actions',
    repo: 'https://github.com/example/cicd-setup',
    completed: true,
  },
];

const initialModules = [
  {
    id: 1,
    title: 'LKPD 01 - Pengenalan React Component',
    subject: 'Pemrograman Web',
    duration: '90 menit',
    description: 'Membuat component statis, memahami props, dan merapikan layout halaman dengan komponen reusable.',
    materialUrl: 'https://example.com/lkpd/react-component',
    submissionType: 'GitHub Repo',
  },
  {
    id: 2,
    title: 'LKPD 02 - State & Event Handling',
    subject: 'Pemrograman Web',
    duration: '120 menit',
    description: 'Mengenal state, event handler, dan interaksi dasar pada form atau tombol di React.',
    materialUrl: 'https://example.com/lkpd/react-state',
    submissionType: 'Demo / Live App',
  },
  {
    id: 3,
    title: 'LKPD 03 - Firebase Auth Integration',
    subject: 'Fullstack App',
    duration: '150 menit',
    description: 'Mengintegrasikan autentikasi pengguna, protected route, dan penyimpanan state session.',
    materialUrl: 'https://example.com/lkpd/firebase-auth',
    submissionType: 'Repo + Demo',
  },
];

const initialProjects = [
  {
    id: 1,
    title: 'SkillSync',
    category: 'Web App',
    description: 'Platform manajemen skill siswa dengan progress tracker, project showcase, dan dashboard mentor.',
    tech: ['React', 'Supabase', 'CSS'],
    demoUrl: 'https://example.com/skillsync',
    githubUrl: 'https://github.com/example/skillsync',
    stars: 28,
  },
  {
    id: 2,
    title: 'CodeCollab',
    category: 'Platform',
    description: 'Aplikasi kolaborasi code dan tugas kelompok berbasis real-time dengan fitur komentar dan review.',
    tech: ['React', 'Node.js', 'Socket.IO'],
    demoUrl: 'https://example.com/codecollab',
    githubUrl: 'https://github.com/example/codecollab',
    stars: 15,
  },
  {
    id: 3,
    title: 'DevFlow',
    category: 'Tooling',
    description: 'Dashboard kerja proyek dengan board task, release log, dan dokumentasi sprint untuk tim.',
    tech: ['Vite', 'React', 'Git'],
    demoUrl: 'https://example.com/devflow',
    githubUrl: 'https://github.com/example/devflow',
    stars: 32,
  },
];

const initialLogs = [
  {
    id: 1,
    title: 'CORS Error saat Fetch API',
    category: 'Frontend',
    date: '2026-09-08',
    description: 'Request dari Vite dev server gagal saat mengakses endpoint backend lokal karena header akses tidak diizinkan.',
    solution: 'Mengaktifkan proxy Vite dan memastikan server backend menambahkan Access-Control-Allow-Origin.',
    snippet: 'server.proxy = { "/api": { target: "http://localhost:3000", changeOrigin: true } }',
  },
  {
    id: 2,
    title: 'State tidak terupdate setelah submit',
    category: 'React',
    date: '2026-09-06',
    description: 'Tombol submit berhasil, tetapi daftar data masih menampilkan state lama karena state tidak di-reset.',
    solution: 'Menggunakan callback functional state update dan mengisi kembali form setelah penambahan data.',
    snippet: 'setTasks((prev) => [{ ...newItem }, ...prev]);\nsetTitle("");',
  },
];

const initialDiscussions = [
  {
    id: 1,
    author: 'Sarah C.',
    title: 'React state update tidak berjalan di form modal',
    excerpt: 'Saya sudah cek event handler, tapi data baru tidak muncul sampai reload. Ada yang punya solusi?',
    replies: 12,
    likes: 18,
    tag: 'React',
  },
  {
    id: 2,
    author: 'Dimas',
    title: 'Supabase auth session hilang saat refresh',
    excerpt: 'Setelah login, session hilang saat pindah halaman. Apakah ada cara persist session di Vite?',
    replies: 8,
    likes: 14,
    tag: 'Supabase',
  },
  {
    id: 3,
    author: 'Rafli',
    title: 'CORS dari local dev server',
    excerpt: 'Saya sudah menyiapkan proxy, tetapi request masih ditolak oleh backend. Mohon bantuannya.',
    replies: 6,
    likes: 11,
    tag: 'API',
  },
];

const initialUsers = [
  { id: 1, full_name: 'Sarah Chen', email: 'sarah.chen@school.id', role: 'student' },
  { id: 2, full_name: 'Budi Hartono', email: 'budi.hartono@school.id', role: 'teacher' },
  { id: 3, full_name: 'Rina Admin', email: 'rina.admin@school.id', role: 'admin' },
];

const initialSubmissions = [
  {
    id: 1,
    student_name: 'Sarah Chen',
    module_title: 'LKPD AI 01 - Pengenalan Prompt Engineering',
    subject: 'Kecerdasan Buatan (AI)',
    class_group: 'XII PPLG 1',
    github_url: 'https://github.com/example/react-component',
    live_demo_url: 'https://example.com/demo-ai',
    notes: 'Sudah selesai dan sudah ditest pada local dev.',
    score: undefined,
    feedback: '',
    status: 'Pending',
  },
  {
    id: 2,
    student_name: 'Dimas',
    module_title: 'LKPD Laravel 02 - CRUD & Blade Template',
    subject: 'Pemrograman Web (Laravel)',
    class_group: 'XII PPLG 1',
    github_url: 'https://example.com/demo-state',
    live_demo_url: 'https://example.com/laravel-demo',
    notes: 'Form sudah bisa menambah item dan reset state.',
    score: 92,
    feedback: 'Bagus, penjelasan cukup jelas.',
    status: 'Graded',
  },
];

export default function App() {
  const [currentView, setView] = useState('dashboard');
  const { profile, setProfile } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialView, setAuthInitialView] = useState('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [preferences, setPreferences] = useState(() => {
    const savedTheme = localStorage.getItem('karsadev-theme');
    return {
      darkMode: savedTheme ? savedTheme === 'dark' : true,
      notifications: true,
      emailAlerts: true,
      compactView: false,
    };
  });
  const [tasks, setTasks] = useState(initialTasks);
  const [modules, setModules] = useState(initialModules);
  const [projects, setProjects] = useState(initialProjects);
  const [logs, setLogs] = useState(initialLogs);
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [users, setUsers] = useState(initialUsers);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [studentCompetencies, setStudentCompetencies] = useState(defaultStudentCompetencies);

  useEffect(() => {
    const theme = preferences.darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('karsadev-theme', theme);
  }, [preferences.darkMode]);

  const updateProfile = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (role) => {
    setProfile((prev) => ({ ...prev, role }));
    setUsers((prev) =>
      prev.map((user) =>
        user.id === 1 ? { ...user, role } : user
      )
    );
  };

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmitSubmission = (payload) => {
    setSubmissions((prev) => [{
      id: payload.id,
      student_name: profile.full_name || 'Siswa Praktikan',
      module_title: payload.module_title,
      subject: payload.subject,
      class_group: payload.class_group,
      github_url: payload.github_url,
      live_demo_url: payload.live_demo_url,
      notes: payload.notes,
      score: undefined,
      feedback: '',
      status: 'Pending',
    }, ...prev]);
  };

  const handleGradeSubmission = (submissionId, score, feedback) => {
    setSubmissions((prev) =>
      prev.map((submission) =>
        submission.id === submissionId
          ? { ...submission, score, feedback, status: 'Graded' }
          : submission
      )
    );

    setStudentCompetencies((prev) => {
      const next = [...prev];
      const subject = submissions.find((submission) => submission.id === submissionId)?.subject;

      if (!subject) return prev;

      if (subject.includes('AI')) next[0] = Math.min(100, Math.round((next[0] + score) / 2));
      if (subject.includes('Analisis') || subject.includes('Sistem')) next[1] = Math.min(100, Math.round((next[1] + score) / 2));
      if (subject.includes('Laravel')) next[2] = Math.min(100, Math.round((next[2] + score) / 2));
      if (subject.includes('QA') || subject.includes('Docs')) next[3] = Math.min(100, Math.round((next[3] + score) / 2));
      if (subject.includes('React') || subject.includes('Frontend')) next[4] = Math.min(100, Math.round((next[4] + score) / 2));
      if (subject.includes('Docs') || subject.includes('Git')) next[5] = Math.min(100, Math.round((next[5] + score) / 2));

      return next;
    });

    setProfile((prev) => ({
      ...prev,
      xp: (prev.xp ?? 0) + Math.round(score * 0.7),
    }));
  };

  const handleUpdateUserRole = (userId, role) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, role } : user))
    );

    if (userId === 1) {
      handleRoleChange(role);
    }
  };

  const handleBroadcast = (message) => {
    if (!message.trim()) return;

    setDiscussions((prev) => [
      {
        id: Date.now(),
        author: 'Admin',
        title: 'Pengumuman Global',
        excerpt: message,
        replies: 0,
        likes: 0,
        tag: 'Announcement',
      },
      ...prev,
    ]);
  };

  const renderPage = () => {
    switch (currentView) {
      case 'dashboard':
        return <StudentDashboard tasks={tasks} projects={projects} profile={profile} />;
      case 'courses':
        return <CoursesPage />;
      case 'curriculum':
        return <CurriculumPage modules={modules} setModules={setModules} onSubmitSubmission={handleSubmitSubmission} />;
      case 'projects':
        return <ProjectsShowcasePage projects={projects} setProjects={setProjects} />;
      case 'labs':
        return <LabsDevLogPage logs={logs} setLogs={setLogs} />;
      case 'practice':
        return <PracticeTasksPage tasks={tasks} setTasks={setTasks} />;
      case 'analytics':
        return <AnalyticsPage tasks={tasks} competencyScores={studentCompetencies} />;
      case 'community':
        return <CommunityPage discussions={discussions} setDiscussions={setDiscussions} profile={profile} />;
      case 'settings':
        return (
          <SettingsPage
            profile={profile}
            preferences={preferences}
            onProfileChange={updateProfile}
            onTogglePreference={togglePreference}
            onRoleChange={handleRoleChange}
          />
        );
      case 'help':
        return <HelpPage />;
      case 'grading':
        return <TeacherGradingPage submissions={submissions} onGradeSubmission={handleGradeSubmission} />;
      case 'admin':
        return (
          <AdminPanelPage
            users={users}
            onUpdateRole={handleUpdateUserRole}
            onBroadcast={handleBroadcast}
          />
        );
      default:
        return <StudentDashboard tasks={tasks} projects={projects} profile={profile} />;
    }
  };

  const openAuthModal = (view = 'login') => {
    setAuthInitialView(view);
    setIsAuthModalOpen(true);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="app-container">
        <Sidebar currentView={currentView} setView={setView} role={profile.role} className="desktop-sidebar" />
        <div className="main-wrapper">
          <Header
            profile={profile}
            preferences={preferences}
            onOpenAuth={openAuthModal}
            onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
          />
          <main className="content-canvas">{renderPage()}</main>
        </div>
      </div>

      <div
        className={`mobile-sidebar-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
        aria-label="Close mobile menu"
      />

      <Sidebar
        currentView={currentView}
        setView={(view) => {
          setView(view);
          closeMobileMenu();
        }}
        role={profile.role}
        className={`mobile-sidebar-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        mobileDrawer
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={closeMobileMenu}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authInitialView}
        onLoginSuccess={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
