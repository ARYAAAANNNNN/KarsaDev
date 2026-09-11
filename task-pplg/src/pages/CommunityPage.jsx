import { useMemo, useState } from 'react';
import { MessageSquareText, Megaphone, ArrowUpRight, Users, Sparkles, Plus, ThumbsUp } from 'lucide-react';

const announcements = [
    {
        id: 1,
        title: 'Pengumuman Praktikum Minggu Ini',
        body: 'Semua siswa diwajibkan mengumpulkan LKPD 03 sebelum hari Sabtu pukul 23:59. Pastikan repo demo sudah aktif dan dokumentasi jelas.'
    },
    {
        id: 2,
        title: 'Workshop GitHub Actions',
        body: 'Pada Jumat depan, akan diadakan sesi singkat tentang CI/CD untuk aplikasi React dan deployment otomatis.'
    }
];

export default function CommunityPage({ discussions = [], setDiscussions, profile }) {
    const [selectedThreadId, setSelectedThreadId] = useState(discussions[0]?.id || null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTag, setActiveTag] = useState('All');
    const [newTitle, setNewTitle] = useState('');
    const [newTag, setNewTag] = useState('React');
    const [newExcerpt, setNewExcerpt] = useState('');

    const availableTags = useMemo(
        () => ['All', ...new Set(discussions.map((discussion) => discussion.tag || 'General'))],
        [discussions]
    );

    const filteredDiscussions = useMemo(() => {
        if (activeTag === 'All') return discussions;
        return discussions.filter((discussion) => discussion.tag === activeTag);
    }, [activeTag, discussions]);

    const selectedThread = filteredDiscussions.find((item) => item.id === selectedThreadId) || filteredDiscussions[0] || null;

    const handleCreateThread = (e) => {
        e.preventDefault();

        if (!newTitle.trim() || !newExcerpt.trim()) return;

        const newThread = {
            id: Date.now(),
            author: profile?.full_name || 'Anda',
            title: newTitle.trim(),
            excerpt: newExcerpt.trim(),
            replies: 0,
            likes: 0,
            tag: newTag
        };

        setDiscussions((prev) => [newThread, ...prev]);
        setSelectedThreadId(newThread.id);
        setActiveTag('All');
        setNewTitle('');
        setNewTag('React');
        setNewExcerpt('');
        setIsModalOpen(false);
    };

    const handleLike = (threadId) => {
        setDiscussions((prev) =>
            prev.map((discussion) =>
                discussion.id === threadId
                    ? { ...discussion, likes: (discussion.likes || 0) + 1 }
                    : discussion
            )
        );
    };

    return (
        <section>
            <div className="page-header" style={{ marginBottom: '22px' }}>
                <div>
                    <div className="card-header-title" style={{ color: 'var(--text-main)' }}>
                        <Users style={{ color: 'var(--neon-cyan)' }} /> Community
                    </div>
                    <p className="section-subtitle">Forum diskusi bug koding, tanya jawab, dan pengumuman dari guru pembimbing.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '18px' }}>
                <div className="card-panel-box">
                    <div className="panel-header-row" style={{ marginBottom: '16px' }}>
                        <div>
                            <h3>Forum Diskusi Error Koding</h3>
                            <small>Diskusi kolaboratif antar siswa</small>
                        </div>
                        <button
                            className="btn-primary"
                            onClick={() => setIsModalOpen(true)}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                            <MessageSquareText size={14} /> New Thread
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                        {availableTags.map((tag) => (
                            <button
                                key={tag}
                                className={`btn-secondary ${activeTag === tag ? 'active' : ''}`}
                                onClick={() => setActiveTag(tag)}
                                style={{
                                    borderRadius: '999px',
                                    padding: '7px 10px',
                                    background: activeTag === tag ? 'rgba(168,85,247,0.12)' : 'transparent'
                                }}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gap: '12px' }}>
                        {filteredDiscussions.map((item) => (
                            <div key={item.id} className="community-thread-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div className="community-thread-avatar">{item.author.charAt(0)}</div>
                                        <span style={{ fontWeight: 700 }}>{item.author}</span>
                                    </div>
                                    <span className="community-tag">{item.tag}</span>
                                </div>

                                <div style={{ fontWeight: 800, fontSize: '0.96rem' }}>{item.title}</div>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.55', fontSize: '0.84rem' }}>{item.excerpt}</p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                                        <span>{item.replies} replies</span>
                                        <button
                                            type="button"
                                            onClick={() => handleLike(item.id)}
                                            style={{
                                                border: 'none',
                                                background: 'transparent',
                                                color: 'var(--neon-cyan)',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                cursor: 'pointer',
                                                padding: 0
                                            }}
                                        >
                                            <ThumbsUp size={14} /> {item.likes || 0}
                                        </button>
                                    </div>
                                    <button
                                        className="community-thread-button"
                                        onClick={() => setSelectedThreadId(item.id)}
                                    >
                                        View thread <ArrowUpRight size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div className="card-panel-box">
                        <div className="panel-header-row" style={{ marginBottom: '12px' }}>
                            <div>
                                <h3>Guru Announcement</h3>
                                <small>Informasi penting</small>
                            </div>
                            <Megaphone size={18} style={{ color: 'var(--neon-magenta)' }} />
                        </div>

                        <div style={{ display: 'grid', gap: '12px' }}>
                            {announcements.map((item) => (
                                <div key={item.id} style={{ background: 'rgba(232,44,139,0.05)', border: '1px solid rgba(232,44,139,0.18)', borderRadius: '12px', padding: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--neon-magenta)', fontWeight: 800, marginBottom: '6px' }}>
                                        <Sparkles size={14} /> {item.title}
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.55', fontSize: '0.83rem' }}>{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card-panel-box">
                        <div className="panel-header-row" style={{ marginBottom: '12px' }}>
                            <div>
                                <h3>Selected Thread</h3>
                                <small>Status diskusi aktif</small>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '12px' }}>
                            {selectedThread ? (
                                <div style={{ background: 'var(--bg-card-inner)', borderRadius: '12px', border: '1px solid var(--border-subtle)', padding: '14px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <span className="community-tag" style={{ margin: 0 }}>{selectedThread.tag}</span>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{selectedThread.replies} replies</span>
                                    </div>
                                    <div style={{ fontWeight: 800, marginBottom: '8px' }}>{selectedThread.title}</div>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.55', fontSize: '0.84rem' }}>{selectedThread.excerpt}</p>
                                </div>
                            ) : (
                                <div style={{ color: 'var(--text-muted)' }}>Belum ada thread pada filter ini.</div>
                            )}
                        </div>
                    </div>

                    <div className="card-panel-box">
                        <div className="panel-header-row" style={{ marginBottom: '12px' }}>
                            <div>
                                <h3>Community Stats</h3>
                                <small>Aktivitas terkini</small>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card-inner)', borderRadius: '10px', padding: '10px 12px' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Thread aktif</span>
                                <strong>{discussions.length}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card-inner)', borderRadius: '10px', padding: '10px 12px' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Siswa online</span>
                                <strong>48</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card-inner)', borderRadius: '10px', padding: '10px 12px' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Solved today</span>
                                <strong>19</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-dialog" style={{ width: '520px' }}>
                        <div className="modal-header">
                            <h2>Buat Thread Baru</h2>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
                        </div>

                        <form onSubmit={handleCreateThread} className="modal-form">
                            <input
                                type="text"
                                placeholder="Judul topik diskusi"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                required
                            />

                            <div className="form-grid form-grid-two">
                                <select value={newTag} onChange={(e) => setNewTag(e.target.value)}>
                                    <option value="React">React</option>
                                    <option value="Supabase">Supabase</option>
                                    <option value="API">API</option>
                                    <option value="CSS">CSS</option>
                                </select>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '11px 14px', color: 'var(--text-muted)' }}>
                                    <Plus size={14} />
                                    <span>Thread baru</span>
                                </div>
                            </div>

                            <textarea
                                rows="4"
                                placeholder="Deskripsikan masalah atau pertanyaan Anda..."
                                value={newExcerpt}
                                onChange={(e) => setNewExcerpt(e.target.value)}
                                required
                            />

                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                                    Batal
                                </button>
                                <button type="submit" className="btn-primary">
                                    Publikasikan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
