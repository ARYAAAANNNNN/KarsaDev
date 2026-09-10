import React, { useState } from 'react';
import { Code2, Plus } from 'lucide-react';

export default function DevLogPage({ logs, onAddLog }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [desc, setDesc] = useState('');
    const [solution, setSolution] = useState('');
    const [snippet, setSnippet] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddLog({
            id: Date.now(),
            title,
            category,
            date: new Date().toISOString().split('T')[0],
            description: desc,
            solution,
            snippet
        });
        setTitle('');
        setCategory('');
        setDesc('');
        setSolution('');
        setSnippet('');
        setIsModalOpen(false);
    };

    return (
        <section>
            <div className="page-header">
                <div>
                    <div className="card-header-title">
                        <Code2 style={{ color: 'var(--primary)' }} /> Dev Log & Code Snippets
                    </div>
                    <p className="section-subtitle">Catatan kendala bug koding, solusi, dan snippet reusable.</p>
                </div>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} /> Tambah Log Baru
                </button>
            </div>

            <div className="devlog-grid">
                {logs.map(log => (
                    <div key={log.id} className="devlog-card">
                        <div className="devlog-header">
                            <div>
                                <h3>{log.title}</h3>
                                <span className="log-badge">{log.category}</span>
                            </div>
                            <small style={{ color: 'var(--text-muted)' }}>{log.date}</small>
                        </div>
                        <p className="devlog-desc">{log.description}</p>
                        <div className="devlog-solution">
                            <strong>Solusi:</strong>
                            <p>{log.solution}</p>
                        </div>
                        {log.snippet && (
                            <div className="snippet-box">
                                <pre><code>{log.snippet}</code></pre>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-dialog">
                        <div className="modal-header">
                            <h2>Dokumentasikan Kendala & Snippet</h2>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-form">
                            <input type="text" placeholder="Masalah / Error (contoh: CORS Error saat Fetch)" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            <input type="text" placeholder="Kategori (contoh: React, Supabase, CSS)" value={category} onChange={(e) => setCategory(e.target.value)} required />
                            <textarea rows="2" placeholder="Gejala & penyebab kendala..." value={desc} onChange={(e) => setDesc(e.target.value)} required />
                            <textarea rows="2" placeholder="Solusi perbaikan..." value={solution} onChange={(e) => setSolution(e.target.value)} required />
                            <textarea rows="3" placeholder="Snippet kode solusi..." value={snippet} onChange={(e) => setSnippet(e.target.value)} />
                            <div className="modal-actions">
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