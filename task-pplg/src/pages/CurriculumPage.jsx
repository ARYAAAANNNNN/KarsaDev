import { useMemo, useState } from 'react';
import { FileText, Plus, Send, NotebookPen } from 'lucide-react';
import { curriculumFilterTabs, curriculumModules } from '../data/curriculumData';

const initialSubmissionState = {
  githubUrl: '',
  liveDemoUrl: '',
  notes: '',
};

export default function CurriculumPage({ modules = curriculumModules, onSubmitSubmission }) {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [selectedModule, setSelectedModule] = useState(null);
  const [submissionForm, setSubmissionForm] = useState(initialSubmissionState);

  const filteredModules = useMemo(() => {
    if (activeFilter === 'Semua') return modules;
    return modules.filter((module) => module.subject === activeFilter || module.subject === mapLegacySubject(activeFilter));
  }, [activeFilter, modules]);

  const handleOpenSubmitModal = (module) => {
    setSelectedModule(module);
    setSubmissionForm(initialSubmissionState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedModule || !submissionForm.githubUrl.trim()) {
      return;
    }

    const payload = {
      id: Date.now(),
      module_id: selectedModule.id,
      module_title: selectedModule.title,
      subject: selectedModule.subject,
      class_group: selectedModule.classGroup,
      github_url: submissionForm.githubUrl.trim(),
      live_demo_url: submissionForm.liveDemoUrl.trim(),
      notes: submissionForm.notes.trim(),
      status: 'Pending',
      submitted_at: new Date().toISOString(),
    };

    if (onSubmitSubmission) {
      onSubmitSubmission(payload);
    }

    setSelectedModule(null);
    setSubmissionForm(initialSubmissionState);
  };

  return (
    <section>
      <div className="page-header" style={{ marginBottom: '22px' }}>
        <div>
          <div className="card-header-title" style={{ color: 'var(--text-main)' }}>
            <NotebookPen style={{ color: 'var(--neon-purple)' }} /> Curriculum & LKPD
          </div>
          <p className="section-subtitle">Modul LKPD resmi, alur pengumpulan tugas, dan penilaian terpadu.</p>
        </div>
        <button className="btn-primary" type="button">
          <Plus size={18} /> Buat Modul Baru
        </button>
      </div>

      <div className="card-panel-box" style={{ marginBottom: '18px', padding: '14px 16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {curriculumFilterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`btn-secondary ${activeFilter === tab ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab)}
              style={{
                borderRadius: '999px',
                padding: '8px 12px',
                background: activeFilter === tab ? 'rgba(168,85,247,0.12)' : 'transparent',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="curriculum-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '18px' }}>
        {filteredModules.map((module) => (
          <div key={module.id} className="curriculum-card card-panel-box" style={{ display: 'flex', flexDirection: 'column', minHeight: '260px', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--neon-cyan)' }}>{module.subject}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{module.duration}</span>
            </div>

            <div>
              <h3 style={{ fontSize: '1.06rem', marginBottom: '8px' }}>{module.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.55', fontSize: '0.85rem', marginBottom: '10px' }}>
                {module.description}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', color: 'var(--text-muted)', fontSize: '0.74rem' }}>
              <span>{module.teacher}</span>
              <span>•</span>
              <span>{module.classGroup}</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <a
                href={module.materialUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ flex: 1, textAlign: 'center', textDecoration: 'none', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}
              >
                <FileText size={14} /> Materi
              </a>
              <button
                type="button"
                className="btn-primary"
                onClick={() => handleOpenSubmitModal(module)}
                style={{ flex: 1 }}
              >
                <Send size={14} /> Kumpulkan Tugas
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedModule && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(4,6,18,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="modal-dialog" style={{ width: '580px', maxWidth: '92vw', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '22px', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pengiriman Tugas</div>
                <h2 style={{ fontSize: '1.2rem' }}>{selectedModule.title}</h2>
              </div>
              <button type="button" className="modal-close" onClick={() => setSelectedModule(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.4rem', cursor: 'pointer' }}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form" style={{ display: 'grid', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
                  URL Repositori GitHub <span style={{ color: '#fda4af' }}>*</span>
                </label>
                <input
                  type="url"
                  value={submissionForm.githubUrl}
                  onChange={(event) => setSubmissionForm((prev) => ({ ...prev, githubUrl: event.target.value }))}
                  required
                  placeholder="https://github.com/username/repository"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
                  URL Live Demo / Vercel (Opsional)
                </label>
                <input
                  type="url"
                  value={submissionForm.liveDemoUrl}
                  onChange={(event) => setSubmissionForm((prev) => ({ ...prev, liveDemoUrl: event.target.value }))}
                  placeholder="https://your-project.vercel.app"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
                  Catatan Teknis & Kendala
                </label>
                <textarea
                  rows="4"
                  value={submissionForm.notes}
                  onChange={(event) => setSubmissionForm((prev) => ({ ...prev, notes: event.target.value }))}
                  placeholder="Jelaskan fitur yang dibuat, kendala yang dihadapi, dan status pengerjaan saat ini..."
                  style={textareaStyle}
                />
              </div>

              <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button type="button" className="btn-secondary" onClick={() => setSelectedModule(null)}>
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  Simpan Pengumpulan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function mapLegacySubject(subject) {
  const map = {
    'Kecerdasan Buatan (AI)': 'Kecerdasan Buatan (AI)',
    'Laravel': 'Pemrograman Web (Laravel)',
    'Analisis Sistem': 'Analisis Sistem',
    'QA & Docs': 'QA & Docs',
    'KIK': 'KIK',
  };

  return map[subject] || subject;
}

const inputStyle = {
  width: '100%',
  background: 'var(--bg-input)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '12px',
  color: 'var(--text-main)',
  padding: '11px 14px',
  fontSize: '0.9rem',
};

const textareaStyle = {
  width: '100%',
  background: 'var(--bg-input)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '12px',
  color: 'var(--text-main)',
  padding: '11px 14px',
  fontSize: '0.9rem',
  resize: 'vertical',
};
