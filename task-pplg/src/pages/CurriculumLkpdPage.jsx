import React, { useState } from 'react';
import { Plus, Send, FileText, NotebookPen } from 'lucide-react';

export default function CurriculumLkpdPage({ modules = [], setModules }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isSubmitOpen, setIsSubmitOpen] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);

    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [materialUrl, setMaterialUrl] = useState('');

    const [submissionUrl, setSubmissionUrl] = useState('');
    const [submissionNotes, setSubmissionNotes] = useState('');

    const handleAddModule = (e) => {
        e.preventDefault();

        if (!title || !subject || !description || !materialUrl) return;

        setModules((prev) => [
            {
                id: Date.now(),
                title,
                subject,
                duration: duration || '90 menit',
                description,
                materialUrl,
                submissionType: 'Repo + Demo'
            },
            ...prev
        ]);

        setTitle('');
        setSubject('');
        setDuration('');
        setDescription('');
        setMaterialUrl('');
        setIsCreateOpen(false);
    };

    const handleSubmitTask = (e) => {
        e.preventDefault();
        if (!selectedModule) return;

        setSubmissionUrl('');
        setSubmissionNotes('');
        setIsSubmitOpen(false);
        alert(`Tugas ${selectedModule.title} berhasil dikirimkan untuk dinilai.`);
    };

    return (
        <section>
            <div className="page-header" style={{ marginBottom: '22px' }}>
                <div>
                    <div className="card-header-title" style={{ color: 'var(--text-main)' }}>
                        <NotebookPen style={{ color: 'var(--neon-purple)' }} /> Curriculum & LKPD
                    </div>
                    <p className="section-subtitle">Modul praktikum, materi pembelajaran, dan pengumpulan tugas yang terorganisir.</p>
                </div>
                <button className="btn-primary" onClick={() => setIsCreateOpen(true)}>
                    <Plus size={18} /> Buat Modul Baru
                </button>
            </div>

            <div className="lkpd-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '18px' }}>
                {modules.map((module) => (
                    <div key={module.id} className="card-panel-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--neon-cyan)', fontWeight: 700 }}>{module.subject}</span>
                                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{module.duration}</span>
                            </div>
                            <h3 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>{module.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.55', fontSize: '0.86rem' }}>{module.description}</p>
                        </div>

                        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
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
                                className="btn-primary"
                                style={{ flex: 1 }}
                                onClick={() => {
                                    setSelectedModule(module);
                                    setIsSubmitOpen(true);
                                }}
                            >
                                <Send size={14} /> Kirim Tugas
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isCreateOpen && (
                <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(4,6,18,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90 }}>
                    <div className="modal-dialog" style={{ width: '540px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '20px', boxShadow: '0 16px 50px rgba(0,0,0,0.45)' }}>
                        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h2 style={{ fontSize: '1.2rem' }}>Tambah Modul Baru</h2>
                            <button className="modal-close" onClick={() => setIsCreateOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.3rem', cursor: 'pointer' }}>×</button>
                        </div>

                        <form onSubmit={handleAddModule} className="modal-form" style={{ display: 'grid', gap: '12px' }}>
                            <input type="text" placeholder="Judul modul" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                                <input type="text" placeholder="Mata pelajaran" value={subject} onChange={(e) => setSubject(e.target.value)} required style={inputStyle} />
                                <input type="text" placeholder="Durasi (contoh: 90 menit)" value={duration} onChange={(e) => setDuration(e.target.value)} style={inputStyle} />
                            </div>
                            <input type="url" placeholder="Link materi / Google Docs" value={materialUrl} onChange={(e) => setMaterialUrl(e.target.value)} required style={inputStyle} />
                            <textarea rows="4" placeholder="Deskripsi instruksi kegiatan praktikum..." value={description} onChange={(e) => setDescription(e.target.value)} required style={textareaStyle} />

                            <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                                <button type="button" className="btn-secondary" onClick={() => setIsCreateOpen(false)}>Batal</button>
                                <button type="submit" className="btn-primary">Publikasikan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isSubmitOpen && selectedModule && (
                <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(4,6,18,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90 }}>
                    <div className="modal-dialog" style={{ width: '540px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '20px', boxShadow: '0 16px 50px rgba(0,0,0,0.45)' }}>
                        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h2 style={{ fontSize: '1.2rem' }}>Kumpulkan Tugas</h2>
                            <button className="modal-close" onClick={() => setIsSubmitOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.3rem', cursor: 'pointer' }}>×</button>
                        </div>

                        <div style={{ marginBottom: '12px', padding: '10px 12px', borderRadius: '10px', background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.16)', color: 'var(--text-main)' }}>
                            <strong>{selectedModule.title}</strong>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{selectedModule.submissionType}</div>
                        </div>

                        <form onSubmit={handleSubmitTask} className="modal-form" style={{ display: 'grid', gap: '12px' }}>
                            <input type="url" placeholder="Link GitHub Repo / Demo / Google Drive" value={submissionUrl} onChange={(e) => setSubmissionUrl(e.target.value)} required style={inputStyle} />
                            <textarea rows="4" placeholder="Catatan tambahan atau deskripsi hasil pengerjaan..." value={submissionNotes} onChange={(e) => setSubmissionNotes(e.target.value)} style={textareaStyle} />

                            <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                                <button type="button" className="btn-secondary" onClick={() => setIsSubmitOpen(false)}>Batal</button>
                                <button type="submit" className="btn-primary">Kirimkan</button>
                            </div>
                        </form>
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
    padding: '11px 14px',
    fontSize: '0.9rem'
};

const textareaStyle = {
    width: '100%',
    background: 'var(--bg-input)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '12px',
    color: 'var(--text-main)',
    padding: '11px 14px',
    fontSize: '0.9rem',
    resize: 'vertical'
};
