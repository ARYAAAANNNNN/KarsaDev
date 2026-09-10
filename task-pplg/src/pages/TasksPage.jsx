import React, { useState } from 'react';
import { Plus, Search, Trash2, Calendar, Tag, FolderGit2, ListChecks } from 'lucide-react';

export default function TasksPage({ tasks = [], onAddTask, onToggleTask, onDeleteTask, onUpdateStatus }) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [viewMode, setViewMode] = useState('list');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Web Development');
    const [priority, setPriority] = useState('Medium');
    const [deadline, setDeadline] = useState('');
    const [tags, setTags] = useState('');
    const [repo, setRepo] = useState('');

    const filteredTasks = tasks.filter(t => {
        const matchFilter = filter === 'all' ? true : (filter === 'completed' ? t.completed : !t.completed);
        const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
            (t.tags && t.tags.toLowerCase().includes(search.toLowerCase()));
        return matchFilter && matchSearch;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTask({
            id: Date.now(),
            title,
            category,
            priority,
            deadline,
            tags,
            repo,
            status: 'To Do',
            completed: false
        });
        setTitle('');
        setTags('');
        setRepo('');
        setIsModalOpen(false);
    };

    const kanbanStatuses = ['To Do', 'In Progress', 'In Review', 'Done'];

    return (
        <section>
            <div className="page-header">
                <div>
                    <div className="card-header-title">
                        <ListChecks style={{ color: 'var(--primary)' }} /> Tugas Praktikum Siswa
                    </div>
                    <p className="section-subtitle">Kelola tugas mandiri, prioritas, dan tenggat pengumpulan.</p>
                </div>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} /> Tambah Tugas Baru
                </button>
            </div>

            <div className="task-toolbar">
                <div className="search-box-wrapper">
                    <Search className="search-icon-inside" size={18} />
                    <input
                        type="text"
                        placeholder="Cari tugas atau stack..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="toolbar-actions">
                    <div className="view-toggle">
                        <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>List</button>
                        <button className={`view-btn ${viewMode === 'kanban' ? 'active' : ''}`} onClick={() => setViewMode('kanban')}>Kanban</button>
                    </div>
                    <div className="filter-group">
                        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Semua</button>
                        <button className={`filter-btn ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Aktif</button>
                        <button className={`filter-btn ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Selesai</button>
                    </div>
                </div>
            </div>

            {viewMode === 'list' ? (
                <div className="task-list">
                    {filteredTasks.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>Tidak ada tugas ditemukan.</div>
                    ) : (
                        filteredTasks.map(task => (
                            <div key={task.id} className={`task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => onToggleTask(task.id)}
                                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                    />
                                    <div>
                                        <div className="task-title" style={{ fontWeight: 600 }}>{task.title}</div>
                                        <div className="task-meta">
                                            <span className="badge badge-cat">{task.category}</span>
                                            <span><Calendar size={14} /> {task.deadline || 'Tanpa Deadline'}</span>
                                            {task.tags && <span className="badge"><Tag size={14} /> {task.tags}</span>}
                                            {task.repo && (
                                                <a href={task.repo} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                    <FolderGit2 size={14} /> Repo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button className="btn-action" onClick={() => onDeleteTask(task.id)} title="Hapus Tugas">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <div className="kanban-board">
                    {kanbanStatuses.map(status => {
                        const colTasks = filteredTasks.filter(t => t.status === status);
                        return (
                            <div
                                key={status}
                                className="kanban-column"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const taskId = Number(e.dataTransfer.getData('text'));
                                    onUpdateStatus(taskId, status);
                                }}
                            >
                                <div className="kanban-column-header">
                                    <span>{status}</span>
                                    <span className="badge">{colTasks.length}</span>
                                </div>
                                <div style={{ minHeight: '300px' }}>
                                    {colTasks.map(t => (
                                        <div
                                            key={t.id}
                                            className={`kanban-task-item priority-${t.priority}`}
                                            draggable
                                            onDragStart={(e) => e.dataTransfer.setData('text', String(t.id))}
                                        >
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px' }}>{t.title}</div>
                                            <span className="badge badge-cat">{t.category}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-dialog">
                        <div className="modal-header">
                            <h2>Tambah Tugas Praktikum</h2>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-form">
                            <input type="text" placeholder="Judul Tugas Praktikum" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            <div className="form-grid form-grid-three">
                                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile App">Mobile App</option>
                                    <option value="Basis Data">Basis Data</option>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                    <option value="Game Dev">Game Dev</option>
                                </select>
                                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <option value="High">Tinggi (Urgent)</option>
                                    <option value="Medium">Sedang</option>
                                    <option value="Low">Rendah</option>
                                </select>
                                <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                            </div>
                            <div className="form-grid form-grid-two">
                                <input type="text" placeholder="Tech Stack (contoh: React, Vite, Tailwind)" value={tags} onChange={(e) => setTags(e.target.value)} />
                                <input type="url" placeholder="Link GitHub Repo (Opsional)" value={repo} onChange={(e) => setRepo(e.target.value)} />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Batal</button>
                                <button type="submit" className="btn-primary">Simpan Tugas</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}