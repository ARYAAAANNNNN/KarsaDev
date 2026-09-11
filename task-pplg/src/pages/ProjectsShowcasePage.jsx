import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, FolderGit2, Plus, Star, Code2 } from 'lucide-react';

const initialProjects = [
    {
        id: 1,
        title: 'SkillSync',
        category: 'Web App',
        description: 'Platform manajemen skill siswa dengan progress tracker, project showcase, dan dashboard mentor.',
        tech: ['React', 'Supabase', 'CSS'],
        demoUrl: 'https://example.com/skillsync',
        githubUrl: 'https://github.com/example/skillsync',
        stars: 28
    },
    {
        id: 2,
        title: 'CodeCollab',
        category: 'Platform',
        description: 'Aplikasi kolaborasi code dan tugas kelompok berbasis real-time dengan fitur komentar dan review.',
        tech: ['React', 'Node.js', 'Socket.IO'],
        demoUrl: 'https://example.com/codecollab',
        githubUrl: 'https://github.com/example/codecollab',
        stars: 15
    },
    {
        id: 3,
        title: 'DevFlow',
        category: 'Tooling',
        description: 'Dashboard kerja proyek dengan board task, release log, dan dokumentasi sprint untuk tim.',
        tech: ['Vite', 'React', 'Git'],
        demoUrl: 'https://example.com/devflow',
        githubUrl: 'https://github.com/example/devflow',
        stars: 32
    }
];

export default function ProjectsShowcasePage({ projects = initialProjects, setProjects }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTag, setActiveTag] = useState('All');
    const [search, setSearch] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Web App');
    const [description, setDescription] = useState('');
    const [tech, setTech] = useState('');
    const [demoUrl, setDemoUrl] = useState('');
    const [githubUrl, setGithubUrl] = useState('');

    useEffect(() => {
        if (!setProjects) return;

        const fetchGithubProjects = async () => {
            try {
                const response = await fetch('https://api.github.com/search/repositories?q=react+OR+vite+OR+supabase&per_page=6');
                if (!response.ok) throw new Error('GitHub API failed');

                const data = await response.json();
                const githubProjects = data.items.slice(0, 6).map((item, index) => ({
                    id: `github-${index + 1}`,
                    title: item.name,
                    category: 'Open Source',
                    description: item.description || 'Repository publik dari GitHub untuk dipelajari dan dikembangkan.',
                    tech: ['GitHub', item.language || 'Open Source'],
                    demoUrl: '',
                    githubUrl: item.html_url,
                    stars: item.stargazers_count || 0
                }));

                setProjects((prev) => {
                    const previous = prev || initialProjects;
                    const merged = [...previous];
                    githubProjects.forEach((project) => {
                        if (!merged.some((item) => item.title === project.title)) {
                            merged.push(project);
                        }
                    });
                    return merged;
                });
            } catch (error) {
                console.error('Unable to fetch GitHub projects:', error);
            }
        };

        fetchGithubProjects();
    }, [setProjects]);

    const allTechTags = useMemo(() => ['All', ...new Set((projects || []).flatMap((project) => project.tech || []))], [projects]);

    const filteredProjects = useMemo(() => {
        return (projects || []).filter((project) => {
            const matchesSearch =
                project.title.toLowerCase().includes(search.toLowerCase()) ||
                (project.description || '').toLowerCase().includes(search.toLowerCase()) ||
                (project.tech || []).join(' ').toLowerCase().includes(search.toLowerCase());

            const matchesTag = activeTag === 'All' ? true : (project.tech || []).includes(activeTag);
            return matchesSearch && matchesTag;
        });
    }, [activeTag, projects, search]);

    const projectCount = filteredProjects.length;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !tech) return;

        const newProject = {
            id: Date.now(),
            title,
            category,
            description,
            tech: tech.split(',').map((item) => item.trim()).filter(Boolean),
            demoUrl,
            githubUrl,
            stars: 0
        };

        setProjects((prev) => [newProject, ...prev]);
        setTitle('');
        setCategory('Web App');
        setDescription('');
        setTech('');
        setDemoUrl('');
        setGithubUrl('');
        setIsModalOpen(false);
    };

    return (
        <section>
            <div className="page-header" style={{ marginBottom: '22px' }}>
                <div>
                    <div className="card-header-title" style={{ color: 'var(--text-main)' }}>
                        <Code2 style={{ color: 'var(--neon-cyan)' }} /> Projects Showcase
                    </div>
                    <p className="section-subtitle">Galeri portofolio proyek siswa, demo produk, dan kontribusi tim.</p>
                </div>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} /> Tambah Proyek
                </button>
            </div>

            <div className="card-panel-box" style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Proyek Dipublikasikan</div>
                    <strong style={{ fontSize: '1.3rem' }}>{projectCount}</strong>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari proyek / teknologi..."
                        style={{
                            minWidth: '230px',
                            maxWidth: '320px',
                            background: 'var(--bg-input)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '12px',
                            color: 'var(--text-main)',
                            padding: '10px 12px',
                            fontSize: '0.88rem',
                            flex: 1
                        }}
                    />
                </div>
            </div>

            <div className="projects-filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
                {allTechTags.map((tag) => (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => setActiveTag(tag)}
                        className={`btn-secondary ${activeTag === tag ? 'active' : ''}`}
                        style={{ borderRadius: '999px', padding: '7px 10px', background: activeTag === tag ? 'rgba(168,85,247,0.12)' : 'transparent' }}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className="projects-grid portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '18px' }}>
                {filteredProjects.map((project) => (
                    <div key={project.id} className="project-card card-panel-box" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div className="project-cover" style={{
                            height: '120px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(56,189,248,0.12))',
                            border: '1px solid rgba(255,255,255,0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 900,
                            fontSize: '1.2rem',
                            color: 'var(--text-main)'
                        }}>
                            {project.title}
                        </div>

                        <div className="project-meta-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                            <div className="project-category-badge" style={{
                                fontSize: '0.72rem',
                                background: 'rgba(56,189,248,0.12)',
                                border: '1px solid rgba(56,189,248,0.35)',
                                color: '#7dd3fc',
                                borderRadius: '999px',
                                padding: '5px 8px'
                            }}>
                                {project.category}
                            </div>
                            <div className="project-stars" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                <Star size={14} style={{ color: '#fbbf24' }} /> {project.stars}
                            </div>
                        </div>

                        <div>
                            <h3 className="project-title" style={{ fontSize: '1.08rem', marginBottom: '6px' }}>{project.title}</h3>
                            <p className="project-desc" style={{ color: 'var(--text-muted)', lineHeight: '1.55', fontSize: '0.85rem' }}>{project.description}</p>
                        </div>

                        <div className="tech-tags project-tech-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {(project.tech || []).map((item, index) => (
                                <span key={`${project.id}-${index}`} style={{
                                    background: 'rgba(168,85,247,0.12)',
                                    border: '1px solid rgba(168,85,247,0.18)',
                                    color: '#d8b4fe',
                                    borderRadius: '999px',
                                    padding: '4px 8px',
                                    fontSize: '0.68rem'
                                }}>
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="project-actions" style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary" style={{ flex: 1, textAlign: 'center', textDecoration: 'none', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                                    <FolderGit2 size={14} /> GitHub
                                </a>
                            )}
                            {project.demoUrl && (
                                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ flex: 1, textAlign: 'center', textDecoration: 'none', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                                    <ExternalLink size={14} /> Demo
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(4,6,18,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90 }}>
                    <div className="modal-dialog" style={{ width: '560px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '20px', boxShadow: '0 16px 50px rgba(0,0,0,0.45)' }}>
                        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h2 style={{ fontSize: '1.2rem' }}>Tambah Proyek Baru</h2>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.3rem', cursor: 'pointer' }}>×</button>
                        </div>

                        <form onSubmit={handleSubmit} className="modal-form" style={{ display: 'grid', gap: '12px' }}>
                            <input type="text" placeholder="Judul proyek" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
                                    <option value="Web App">Web App</option>
                                    <option value="Platform">Platform</option>
                                    <option value="Tooling">Tooling</option>
                                    <option value="Mobile">Mobile</option>
                                </select>
                                <input type="text" placeholder="Tech stack (pisahkan koma)" value={tech} onChange={(e) => setTech(e.target.value)} required style={inputStyle} />
                            </div>
                            <textarea rows="4" placeholder="Deskripsi proyek dan fitur utama..." value={description} onChange={(e) => setDescription(e.target.value)} required style={textareaStyle} />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                                <input type="url" placeholder="Link GitHub" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} style={inputStyle} />
                                <input type="url" placeholder="Link Demo" value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} style={inputStyle} />
                            </div>

                            <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
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
