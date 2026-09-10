import React, { useState } from 'react';
import { Code2, Plus, TerminalSquare, Bug, Sparkles } from 'lucide-react';

export default function LabsDevLogPage({ logs = [], setLogs }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Frontend');
    const [description, setDescription] = useState('');
    const [solution, setSolution] = useState('');
    const [snippet, setSnippet] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !category || !description || !solution) return;

        setLogs((prev) => [
            {
                id: Date.now(),
                title,
                category,
                date: new Date().toISOString().split('T')[0],
                description,
                solution,
                snippet
            },
            ...prev
        ]);

        setTitle('');
        setCategory('Frontend');
        setDescription('');
        setSolution('');
        setSnippet('');
        setIsModalOpen(false);
    };

    return (
        <section>
            <div className="page-header" style={{ marginBottom: '22px' }}>
                <div>
                    <div className="card-header-title" style={{ color: 'var(--text-main)' }}>
                        <Code2 style={{ color: 'var(--neon-magenta)' }} /> Labs & DevLog
                    </div>
                    <p className="section-subtitle">Catatan bug, solusi perbaikan, dan snippet kode yang bisa dipakai ulang di lab.</p>
                </div>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} /> Tambah Log Baru
                </button>
            </div>

            <div className="devlog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px' }}>
                {logs.map((log) => (
                    <div key={log.id} className="card-panel-box" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.02rem', marginBottom: '6px' }}>{log.title}</h3>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: 'rgba(232,44,139,0.12)',
                                    border: '1px solid rgba(232,44,139,0.3)',
                                    color: '#f9a8d4',
                                    borderRadius: '999px',
                                    padding: '5px 9px',
                                    fontSize: '0.72rem',
                                    fontWeight: 700
                                }}>
                                    <Bug size={12} /> {log.category}
                                </span>
                            </div>
                            <small style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{log.date}</small>
                        </div>

                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.86rem' }}>{log.description}</p>

                        <div style={{ background: 'rgba(56,189,248,0.07)', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.16)', padding: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--neon-cyan)', fontWeight: 700, marginBottom: '8px' }}>
                                <Sparkles size={14} /> Solusi
                            </div>
                            <p style={{ color: 'var(--text-main)', lineHeight: '1.5', fontSize: '0.84rem' }}>{log.solution}</p>
                        </div>

                        {log.snippet && (
                            <div style={{ background: '#090d1c', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '12px', overflowX: 'auto' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', marginBottom: '10px', fontSize: '0.75rem' }}>
                                    <TerminalSquare size={14} /> Snippet
                                </div>
                                <pre style={{ color: '#dbeafe', fontSize: '0.76rem', lineHeight: '1.6', fontFamily: 'JetBrains Mono, monospace', whiteSpace: 'pre-wrap' }}><code>{log.snippet}</code></pre>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(4,6,18,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90 }}>
                    <div className="modal-dialog" style={{ width: '560px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '20px', boxShadow: '0 16px 50px rgba(0,0,0,0.45)' }}>
                        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h2 style={{ fontSize: '1.2rem' }}>Catat Kendala & Solusi</h2>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.3rem', cursor: 'pointer' }}>×</button>
                        </div>

                        <form onSubmit={handleSubmit} className="modal-form" style={{ display: 'grid', gap: '12px' }}>
                            <input type="text" placeholder="Judul kendala / error" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
                            <input type="text" placeholder="Kategori (React, API, CSS, Supabase, dll)" value={category} onChange={(e) => setCategory(e.target.value)} required style={inputStyle} />
                            <textarea rows="3" placeholder="Deskripsi masalah dan penyebab..." value={description} onChange={(e) => setDescription(e.target.value)} required style={textareaStyle} />
                            <textarea rows="3" placeholder="Solusi yang berhasil dipakai..." value={solution} onChange={(e) => setSolution(e.target.value)} required style={textareaStyle} />
                            <textarea rows="4" placeholder="Snippet kode (opsional)" value={snippet} onChange={(e) => setSnippet(e.target.value)} style={textareaStyle} />

                            <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Batal</button>
                                <button type="submit" className="btn-primary">Simpan Log</button>
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
