import React, { useMemo, useState } from 'react';
import { BookOpenText, ChevronRight, Clock3, Search, Sparkles } from 'lucide-react';

const initialCourses = [
    {
        id: 1,
        title: 'Pemrograman Web',
        mentor: 'Pak Didin',
        lessons: 16,
        completed: 11,
        progress: 72,
        next: 'React Hooks Refactor',
        tag: 'Frontend'
    },
    {
        id: 2,
        title: 'Basis Data',
        mentor: 'Bu Winda',
        lessons: 12,
        completed: 9,
        progress: 75,
        next: 'SQL Query Optimization',
        tag: 'Database'
    },
    {
        id: 3,
        title: 'UI/UX Design',
        mentor: 'Pak Raka',
        lessons: 10,
        completed: 7,
        progress: 70,
        next: 'Wireframe Slicing',
        tag: 'Design'
    },
    {
        id: 4,
        title: 'Mobile App',
        mentor: 'Pak Wanda',
        lessons: 14,
        completed: 10,
        progress: 71,
        next: 'Navigation & State',
        tag: 'Mobile'
    },
    {
        id: 5,
        title: 'DevOps & Git',
        mentor: 'Pak Rafi',
        lessons: 9,
        completed: 8,
        progress: 89,
        next: 'CI/CD Pipeline Setup',
        tag: 'DevOps'
    },
    {
        id: 6,
        title: 'Project Based Learning',
        mentor: 'Tim KarsaDev',
        lessons: 11,
        completed: 6,
        progress: 55,
        next: 'Sprint Review & Demo',
        tag: 'Capstone'
    }
];

export default function CoursesPage() {
    const [courses] = useState(initialCourses);
    const [query, setQuery] = useState('');

    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            const term = query.toLowerCase();
            return (
                course.title.toLowerCase().includes(term) ||
                course.mentor.toLowerCase().includes(term) ||
                course.tag.toLowerCase().includes(term)
            );
        });
    }, [courses, query]);

    return (
        <section>
            <div className="page-header" style={{ marginBottom: '20px' }}>
                <div>
                    <div className="card-header-title" style={{ color: 'var(--text-main)' }}>
                        <BookOpenText style={{ color: 'var(--neon-cyan)' }} /> My Courses
                    </div>
                    <p className="section-subtitle">Daftar mapel kejuruan PPLG yang sedang dijalani dan progres materi aktif.</p>
                </div>
            </div>

            <div
                className="card-panel-box"
                style={{
                    marginBottom: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px'
                }}
            >
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari mapel, mentor, atau bidang..."
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
                <button
                    className="btn-secondary"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <Sparkles size={16} /> Recommended
                </button>
            </div>

            <div className="course-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '18px' }}>
                {filteredCourses.map((course) => (
                    <div
                        key={course.id}
                        className="card-panel-box"
                        style={{
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '14px'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span
                                style={{
                                    background: 'rgba(56, 189, 248, 0.12)',
                                    border: '1px solid rgba(56, 189, 248, 0.35)',
                                    color: '#7dd3fc',
                                    borderRadius: '999px',
                                    padding: '6px 10px',
                                    fontSize: '0.72rem',
                                    fontWeight: 700
                                }}
                            >
                                {course.tag}
                            </span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
                                {course.completed}/{course.lessons} materi
                            </span>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>{course.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Mentor: {course.mentor}</p>
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Progress</span>
                                <strong style={{ fontSize: '0.8rem' }}>{course.progress}%</strong>
                            </div>
                            <div
                                style={{
                                    width: '100%',
                                    height: '10px',
                                    background: 'rgba(255,255,255,0.06)',
                                    borderRadius: '999px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(255,255,255,0.06)'
                                }}
                            >
                                <div
                                    style={{
                                        width: `${course.progress}%`,
                                        height: '100%',
                                        borderRadius: '999px',
                                        background: 'linear-gradient(90deg, #a855f7 0%, #38bdf8 100%)'
                                    }}
                                />
                            </div>
                        </div>

                        <div
                            style={{
                                background: 'rgba(168, 85, 247, 0.08)',
                                border: '1px solid rgba(168, 85, 247, 0.18)',
                                borderRadius: '12px',
                                padding: '10px 12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '8px'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                                <Clock3 size={14} style={{ color: 'var(--neon-purple)' }} />
                                <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{course.next}</span>
                            </div>
                            <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
