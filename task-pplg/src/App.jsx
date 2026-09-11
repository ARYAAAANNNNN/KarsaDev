import { useEffect, useState } from 'react';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import AuthModal from './components/auth/AuthModal';
import { useAuth } from './context/AuthContext';

import StudentDashboard from './pages/StudentDashboard';
import CoursesPage from './pages/CoursesPage';
import CurriculumLkpdPage from './pages/CurriculumLkpdPage';
import ProjectsShowcasePage from './pages/ProjectsShowcasePage';
import LabsDevLogPage from './pages/LabsDevLogPage';
import PracticeTasksPage from './pages/PracticeTasksPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CommunityPage from './pages/CommunityPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import TeacherGradingPage from './pages/TeacherGradingPage';
import AdminPanelPage from './pages/AdminPanelPage';

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
    module_title: 'LKPD 01 - Pengenalan React Component',
    submission_url: 'https://github.com/example/react-component',
    notes: 'Sudah selesai dan sudah ditest pada local dev.',
    score: undefined,
    feedback: '',
  },
  {
    id: 2,
    student_name: 'Dimas',
    module_title: 'LKPD 02 - State & Event Handling',
    submission_url: 'https://example.com/demo-state',
    notes: 'Form sudah bisa menambah item dan reset state.',
    score: 92,
    feedback: 'Bagus, penjelasan cukup jelas.',
  },
];

export default function App() {
  const [currentView, setView] = useState('dashboard');
  const { profile, setProfile } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialView, setAuthInitialView] = useState('login');
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

  const handleGradeSubmission = (submissionId, score, feedback) => {
    setSubmissions((prev) =>
      prev.map((submission) =>
        submission.id === submissionId
          ? { ...submission, score, feedback }
          : submission
      )
    );
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
        return <CurriculumLkpdPage modules={modules} setModules={setModules} />;
      case 'projects':
        return <ProjectsShowcasePage projects={projects} setProjects={setProjects} />;
      case 'labs':
        return <LabsDevLogPage logs={logs} setLogs={setLogs} />;
      case 'practice':
        return <PracticeTasksPage tasks={tasks} setTasks={setTasks} />;
      case 'analytics':
        return <AnalyticsPage tasks={tasks} />;
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

  return (
    <>
      <div className="app-container">
        <Sidebar currentView={currentView} setView={setView} role={profile.role} />
        <div className="main-wrapper">
          <Header profile={profile} preferences={preferences} onOpenAuth={openAuthModal} />
          <main className="content-canvas">{renderPage()}</main>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authInitialView}
        onLoginSuccess={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
