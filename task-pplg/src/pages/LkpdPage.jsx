import React, { useState } from 'react';
import { BookOpenText, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LkpdPage({ modules, onAddModule, onSubmitTask }) {
    const { profile } = useAuth();
    const isTeacher = profile?.role === 'teacher' || profile?.role === 'admin';

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isSubmitOpen, setIsSubmitOpen] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);

    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [materialUrl, setMaterialUrl] = useState('');
    const [desc, setDesc] = useState('');

    const [subUrl, setSubUrl] = useState('');
    const [subNotes, setSubNotes] = useState('');

    const handleCreateModule = (e) => {
        e.preventDefault();
        onAddModule({
            id: Date.now(),
            title,
            subject,
            material_url: materialUrl,
            description: desc
        });
        setTitle('');
        setSubject('');
        setMaterialUrl('');
        setDesc('');
        setIsCreateOpen(false);
    };

    const handleSubmitTask = (e) => {
        e.preventDefault();
        onSubmitTask({
            id: Date.now(),
            module_id: selectedModule.id,
            module_title: selectedModule.title,
            submission_url: subUrl,
            notes: subNotes,
            student_name: profile?.full_name || 'Siswa',
            status: 'Pending'
        });
        setSubUrl('');
        setSubNotes('');
        setIsSubmitOpen(false);
        alert('Tugas LKPD berhasil dikirimkan ke guru pembimbing!');
    };

    return (
        <section>
            <div className="page-header">
                <div>
                    <div className="card-header-title">
                        <BookOpenText style={{ color: 'var(--primary)' }} /> Modul LKPD Praktikum
                    </div>
                    <p className="section-subtitle">Pelajari materi praktikum dan kumpulkan hasil pengerjaanmu.</p>
                </div>
                {isTeacher && (
                    <button className="btn-primary" onClick={() => setIsCreateOpen(true)}>
                        <Plus size={18} /> Buat Modul Baru
                    </button>
                )}
            </div>

            <div className="lkpd-grid">
                {modules.map(m => (
                    <div key={m.id} className="lkpd-card">
                        <div>
                            <h3>{m.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 10px 0' }}>{m.subject}</p>
                            <p style={{ fontSize: '0.88rem', lineHeight: '1.5' }}>{m.description}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                            <a href={m.material_url} target="_blank" rel="noreferrer" className="btn-secondary" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}>
                                Buka Materi
                            </a>
                            <button
                                className="btn-primary"
                                style={{ flex: 1 }}
                                onClick={() => {
                                    setSelectedModule(m);
                                    setIsSubmitOpen(true);
                                }}
                            >
                                Kirim Tugas
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isCreateOpen && (
                <div className="modal-overlay">
                    <div className="modal-dialog">
                        <div className="modal-header">
                            <h2>Terbitkan Modul LKPD Baru</h2>
                            <button className="modal-close" onClick={() => setIsCreateOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleCreateModule} className="modal-form">
                            <input type="text" placeholder="Judul Modul (contoh: LKPD 3 - React State)" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            <input type="text" placeholder="Mata Pelajaran (contoh: Pemrograman Web)" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                            <input type="url" placeholder="Link Dokumen / Google Docs" value={materialUrl} onChange={(e) => setMaterialUrl(e.target.value)} required />
                            <textarea rows="3" placeholder="Instruksi pengerjaan praktikum..." value={desc} onChange={(e) => setDesc(e.target.value)} required />
                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setIsCreateOpen(false)}>Batal</button>
                                <button type="submit" className="btn-primary">Publikasikan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isSubmitOpen && selectedModule && (
                <div className="modal-overlay">
                    <div className="modal-dialog">
                        <div className="modal-header">
                            <h2>Kumpulkan Tugas: {selectedModule.title}</h2>
                            <button className="modal-close" onClick={() => setIsSubmitOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmitTask} className="modal-form">
                            <input type="url" placeholder="Link GitHub Repo / Live Demo / GDrive..." value={subUrl} onChange={(e) => setSubUrl(e.target.value)} required />
                            <textarea rows="3" placeholder="Catatan untuk guru..." value={subNotes} onChange={(e) => setSubNotes(e.target.value)} />
                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setIsSubmitOpen(false)}>Batal</button>
                                <button type="submit" className="btn-primary">Kirimkan ke Guru</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}