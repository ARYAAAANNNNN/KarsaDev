import React, { useMemo, useState } from 'react';
import { Plus, Search, CalendarDays, FolderGit2, Trash2, ListChecks } from 'lucide-react';

const kanbanStatuses = ['To Do', 'In Progress', 'Review', 'Done'];

export default function PracticeTasksPage({ tasks = [], setTasks }) {
    const [search, setSearch] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [viewMode, setViewMode] = useState('list');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Frontend');
    const [priority, setPriority] = useState('Medium');
    const [deadline, setDeadline] = useState('');
    const [tags, setTags] = useState('');
    const [repo, setRepo] = useState('');

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch =
                task.title.toLowerCase().includes(search.toLowerCase()) ||
                (task.tags || '').toLowerCase().includes(search.toLowerCase()) ||
                task.category.toLowerCase().includes(search.toLowerCase());

            const matchesPriority = priorityFilter === 'all' ? true : task.priority.toLowerCase() === priorityFilter;

            return matchesSearch && matchesPriority;
        });
    }, [tasks, search, priorityFilter]);

    const toggleTask = (taskId) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (taskId) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
    };

    const addTask = (e) => {
        e.preventDefault();
        if (!title || !deadline) return;

        setTasks((prev) => [
            {
                id: Date.now(),
                title,
                category,
                priority,
                status: 'To Do',
                deadline,
                tags,
                repo,
                completed: false
            },
            ...prev
        ]);

        setTitle('');
        setCategory('Frontend');
        setPriority('Medium');
        setDeadline('');
        setTags('');
        setRepo('');
        setIsModalOpen(false);
    };

    const updateStatus = (taskId, status) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === taskId ? { ...task, status } : task))
        );
    };

    return (
        <section>
            <div className="page-header" style={{ marginBottom: '20px' }}>
                <div>
                    <div className="card-header-title" style={{ color: 'var(--text-main)' }}>
                        <ListChecks style={{ color: 'var(--neon-purple)' }} /> Practice Tasks
                    </div>
                    <p className="section-subtitle">Kelola tugas praktikum dengan board kanban, daftar tugas, dan filter prioritas.</p>
                </div>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} /> Tambah Tugas
                </button>
            </div>

            <div className="task-toolbar" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '430px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari tugas atau stack..."
                        style={{
                            width: '100%',
                            background: 'var(--bg-input)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '12px',
                            color: 'var(--text-main)',
                            padding: '10px 14px 10px 38px',
                            fontSize: '0.9rem'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
                        <button
                            className={`btn-secondary ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                            style={{ borderRadius: 0, border: 'none', background: viewMode === 'list' ? 'rgba(168,85,247,0.12)' : 'transparent' }}
                        >
                            List
                        </button>
                        <button
                            className={`btn-secondary ${viewMode === 'kanban' ? 'active' : ''}`}
                            onClick={() => setViewMode('kanban')}
                            style={{ borderRadius: 0, border: 'none', background: viewMode === 'kanban' ? 'rgba(168,85,247,0.12)' : 'transparent' }}
                        >
                            Kanban
                        </button>
                    </div>

                    <div style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
                        {['all', 'high', 'medium', 'low'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setPriorityFilter(filter)}
                                style={{
                                    border: 'none',
                                    background: priorityFilter === filter ? 'rgba(168,85,247,0.12)' : 'transparent',
                                    color: priorityFilter === filter ? '#fff' : 'var(--text-muted)',
                                    padding: '8px 12px',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {filter === 'all' ? 'Semua' : filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {viewMode === 'list' ? (
                <div className="task-list" style={{ display: 'grid', gap: '12px' }}>
                    {filteredTasks.length === 0 ? (
                        <div className="card-panel-box" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                            Tidak ada tugas yang cocok dengan filter saat ini.
                        </div>
                    ) : (
                        filteredTasks.map((task) => (
                            <div key={task.id} className="card-panel-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', padding: '16px 18px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                                    <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 800, marginBottom: '4px', textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.7 : 1 }}>{task.title}</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', color: 'var(--text-muted)', fontSize: '0.76rem' }}>
                                            <span style={{ background: 'rgba(99,102,241,0.12)', borderRadius: '999px', padding: '4px 8px', color: '#a5b4fc' }}>{task.category}</span>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CalendarDays size={12} /> {task.deadline}</span>
                                            {task.tags && <span>{task.tags}</span>}
                                            {task.repo && (
                                                <a href={task.repo} target="_blank" rel="noreferrer" style={{ color: 'var(--neon-cyan)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                    <FolderGit2 size={12} /> Repo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span
                                        style={{
                                            background:
                                                task.priority === 'High'
                                                    ? 'rgba(239,68,68,0.14)'
                                                    : task.priority === 'Medium'
                                                        ? 'rgba(59,130,246,0.14)'
                                                        : 'rgba(16,185,129,0.14)',
                                            borderRadius: '999px',
                                            padding: '5px 9px',
                                            color:
                                                task.priority === 'High'
                                                    ? '#fca5a5'
                                                    : task.priority === 'Medium'
                                                        ? '#93c5fd'
                                                        : '#86efac',
                                            fontSize: '0.72rem',
                                            fontWeight: 700
                                        }}
                                    >
                                        {task.priority}
                                    </span>
                                    <button onClick={() => deleteTask(task.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <div className="kanban-board" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '14px' }}>
                    {kanbanStatuses.map((status) => {
                        const columnTasks = filteredTasks.filter((task) => task.status === status);

                        return (
                            <div key={status} className="card-panel-box" style={{ minHeight: '300px', padding: '14px' }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const taskId = Number(e.dataTransfer.getData('text')); updateStatus(taskId, status); }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', color: 'var(--text-muted)', fontWeight: 700 }}>
                                    <span>{status}</span>
                                    <span style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '999px', padding: '4px 8px', fontSize: '0.72rem' }}>{columnTasks.length}</span>
                                </div>

                                <div style={{ display: 'grid', gap: '10px' }}>
                                    {columnTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            draggable
                                            onDragStart={(e) => e.dataTransfer.setData('text', String(task.id))}
                                            style={{
                                                background: 'var(--bg-card-inner)',
                                                borderRadius: '12px',
                                                border: '1px solid var(--border-subtle)',
                                                padding: '12px',
                                                cursor: 'grab'
                                            }}
                                        >
                                            <div style={{ fontWeight: 800, marginBottom: '6px' }}>{task.title}</div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                                                <span style={{ background: 'rgba(99,102,241,0.12)', borderRadius: '999px', padding: '4px 8px', color: '#a5b4fc', fontSize: '0.68rem' }}>{task.category}</span>
                                                <span style={{ background: 'rgba(16,185,129,0.12)', borderRadius: '999px', padding: '4px 8px', color: '#86efac', fontSize: '0.68rem' }}>{task.priority}</span>
                                            </div>
                                            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{task.deadline}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {isModalOpen && (
                <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(4,6,18,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90 }}>
                    <div className="modal-dialog" style={{ width: '560px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '20px', boxShadow: '0 16px 50px rgba(0,0,0,0.45)' }}>
                        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h2 style={{ fontSize: '1.2rem' }}>Tambah Tugas Praktikum</h2>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.3rem', cursor: 'pointer' }}>×</button>
                        </div>

                        <form onSubmit={addTask} className="modal-form" style={{ display: 'grid', gap: '12px' }}>
                            <input type="text" placeholder="Judul tugas" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px' }}>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Testing">Testing</option>
                                    <option value="DevOps">DevOps</option>
                                </select>
                                <select value={priority} onChange={(e) => setPriority(e.target.value)} style={inputStyle}>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                                <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required style={inputStyle} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
                                <input type="text" placeholder="Tech stack" value={tags} onChange={(e) => setTags(e.target.value)} style={inputStyle} />
                                <input type="url" placeholder="Link repo" value={repo} onChange={(e) => setRepo(e.target.value)} style={inputStyle} />
                            </div>

                            <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
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

const inputStyle = {
    width: '100%',
    background: 'var(--bg-input)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '12px',
    color: 'var(--text-main)',
    padding: '11px 14px',
    fontSize: '0.9rem'
};
