import React, { useState } from 'react';
import { FolderGit2, Plus, Star, ExternalLink, Code2 } from 'lucide-react';

export default function PortfolioPage({ portfolios = [], onAddPortfolio }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [tech, setTech] = useState('');
    const [demo, setDemo] = useState('');
    const [github, setGithub] = useState('');
    const [stars, setStars] = useState(0);

    const handleGithubBlur = async () => {
        if (!github) return;
        try {
            const match = github.match(/github\.com\/([^/]+)\/([^/]+)/);
            if (match) {
                const [, owner, repoName] = match;
                const res = await fetch(`https://api.github.com/repos/${owner}/${repoName.replace(/\.git$/, '')}`);
                if (res.ok) {
                    const data = await res.json();
                    setStars(data.stargazers_count || 0);
                    if (!desc) setDesc(data.description || '');
                    if (!tech && data.language) setTech(data.language);
                }
            }
        } catch (err) {
            console.warn('Gagal mengambil data dari GitHub:', err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPortfolio({
            id: Date.now(),
            title,
            description: desc,
            tech: tech.split(',').map(t => t.trim()),
            demo_url: demo,
            github_url: github,
            stars: stars || 0
        });
        setTitle('');
        setDesc('');
        setTech('');
        setDemo('');
        setGithub('');
        setStars(0);
        setIsModalOpen(false);
    };

    return (
        <section>
            <div className="portfolio-header-row">
                <div>
                    <div className="card-header-title">
                        <FolderGit2 style={{ color: 'var(--primary)' }} /> Showcase Portofolio Siswa
                    </div>
                    <p className="section-subtitle">Kumpulan karya aplikasi dan bukti proyek siswa PPLG.</p>
                </div>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} /> Tambah Portofolio
                </button>
            </div>

            <div className="portfolio-grid">
                {portfolios.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                        Belum ada karya portofolio yang dipublikasikan.
                    </div>
                ) : (
                    portfolios.map(item => (
                        <div key={item.id} className="portfolio-card">
                            <div className="portfolio-header-gradient">
                                <Code2 size={40} />
                            </div>
                            <div className="portfolio-content">
                                <div className="portfolio-title">{item.title}</div>
                                <div className="portfolio-desc">{item.description}</div>
                                <div className="tech-tags">
                                    {item.stars > 0 && <span className="tech-tag"><Star size={12} /> {item.stars}</span>}
                                    {(Array.isArray(item.tech) ? item.tech : [item.tech]).map((t, i) => (
                                        <span key={i} className="tech-tag">{t}</span>
                                    ))}
                                </div>
                                <div className="portfolio-links">
                                    {item.github_url && (
                                        <a href={item.github_url} target="_blank" rel="noreferrer" className="portfolio-btn btn-outline">
                                            <FolderGit2 size={14} /> GitHub
                                        </a>
                                    )}
                                    {item.demo_url && (
                                        <a href={item.demo_url} target="_blank" rel="noreferrer" className="portfolio-btn btn-solid">
                                            <ExternalLink size={14} /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-dialog">
                        <div className="modal-header">
                            <h2>Tambah Karya Portofolio</h2>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-form">
                            <input type="text" placeholder="Judul Proyek" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            <input type="url" placeholder="Link GitHub Repositori (Auto-fetch bintang)" value={github} onChange={(e) => setGithub(e.target.value)} onBlur={handleGithubBlur} />
                            <div className="form-grid form-grid-two">
                                <input type="text" placeholder="Tech Stack (pisahkan koma: React, Tailwind)" value={tech} onChange={(e) => setTech(e.target.value)} required />
                                <input type="url" placeholder="Link Live Demo" value={demo} onChange={(e) => setDemo(e.target.value)} />
                            </div>
                            <textarea rows="3" placeholder="Deskripsi fitur aplikasi..." value={desc} onChange={(e) => setDesc(e.target.value)} required />
                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Batal</button>
                                <button type="submit" className="btn-primary">Publikasikan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}