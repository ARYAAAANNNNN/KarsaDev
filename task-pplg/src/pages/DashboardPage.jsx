import React, { useState } from 'react';
import { ListChecks, CheckCircle2, Clock, TrendingUp, ShieldCheck, FileText, Sparkles, ExternalLink } from 'lucide-react';
import SkillRadarChart from '../components/charts/SkillRadarChart';
import TaskStatusChart from '../components/charts/TaskStatusChart';
import ResumeModal from '../components/resume/ResumeModal';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage({ tasks = [], portfolios = [] }) {
    const { profile } = useAuth();
    const [aiTab, setAiTab] = useState('summary');
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const xp = completed * 120;
    const level = Math.max(1, Math.floor(completed / 3) + 1);
    const readiness = Math.min(100, Math.round((completed / Math.max(total, 1)) * 100 + portfolios.length * 5));

    const getAiInsight = () => {
        if (aiTab === 'next') {
            return 'Fokus selesaikan tugas kategori Web Development dengan tenggat terdekat guna menjaga performa praktikum tetap konsisten.';
        }
        if (aiTab === 'pkl') {
            return `Tingkat kesiapan PKL mencapai ${readiness}%. Perbanyak proyek Showcase dan pastikan dokumen tugas LKPD terdokumentasi dengan rapi.`;
        }
        return `Dari ${total} total tugas, Anda telah menyelesaikan ${completed} tugas praktikum. Terus tingkatkan kualitas koding Anda!`;
    };

    return (
        <section>
            <div className="stats-grid">
                <div className="stat-card">
                    <div>
                        <h3>Total Tugas</h3>
                        <p>{total}</p>
                    </div>
                    <div className="stat-icon-wrapper"><ListChecks size={24} /></div>
                </div>
                <div className="stat-card">
                    <div>
                        <h3>Selesai</h3>
                        <p style={{ color: 'var(--success)' }}>{completed}</p>
                    </div>
                    <div className="stat-icon-wrapper stat-success"><CheckCircle2 size={24} /></div>
                </div>
                <div className="stat-card">
                    <div>
                        <h3>Sedang Berjalan</h3>
                        <p style={{ color: 'var(--warning)' }}>{active}</p>
                    </div>
                    <div className="stat-icon-wrapper stat-warning"><Clock size={24} /></div>
                </div>
                <div className="stat-card">
                    <div>
                        <h3>Kesiapan Magang</h3>
                        <p style={{ color: 'var(--accent-cyan)' }}>{readiness}%</p>
                    </div>
                    <div className="stat-icon-wrapper stat-rate"><TrendingUp size={24} /></div>
                </div>
            </div>

            <div className="dashboard-toolbar">
                <div className="glass-card xp-card">
                    <div className="xp-header">
                        <div>
                            <div className="card-header-title">
                                <ShieldCheck style={{ color: 'var(--success)' }} /> Kesiapan Industri & XP Level
                            </div>
                            <p className="section-subtitle">Level dinamis dihitung berdasarkan tugas yang selesai.</p>
                        </div>
                        <span className="xp-badge">Level {level} Builder</span>
                    </div>

                    <div className="xp-level-row">
                        <div><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Level:</span> <strong>{level}</strong></div>
                        <div className="xp-score">{xp} XP</div>
                    </div>

                    <div className="xp-progress">
                        <div className="xp-progress-bar">
                            <span style={{ width: `${(completed % 3) * 33.3}%` }}></span>
                        </div>
                        <small style={{ color: 'var(--text-muted)' }}>Tingkat Kesiapan PKL: {readiness}%</small>
                    </div>
                </div>

                <button className="btn-primary" onClick={() => setIsResumeOpen(true)}>
                    <FileText size={18} /> Export Resume PDF
                </button>
            </div>

            <div className="glass-card ai-card">
                <div className="ai-header">
                    <div className="card-header-title">
                        <Sparkles style={{ color: 'var(--primary)' }} /> Asisten Belajar Mandiri
                    </div>
                    <a href="https://gemini.google.com" target="_blank" rel="noreferrer" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                        <ExternalLink size={14} /> Buka Gemini
                    </a>
                </div>
                <div className="ai-actions">
                    <button className={`ai-action-btn ${aiTab === 'summary' ? 'active' : ''}`} onClick={() => setAiTab('summary')}>Ringkas Progres</button>
                    <button className={`ai-action-btn ${aiTab === 'next' ? 'active' : ''}`} onClick={() => setAiTab('next')}>Rekomendasi Tugas</button>
                    <button className={`ai-action-btn ${aiTab === 'pkl' ? 'active' : ''}`} onClick={() => setAiTab('pkl')}>Tips PKL</button>
                </div>
                <div className="ai-insight">{getAiInsight()}</div>
            </div>

            <div className="charts-grid">
                <div className="glass-card chart-card">
                    <div className="card-header-title">Sebaran Kompetensi Kejuruan</div>
                    <SkillRadarChart />
                </div>
                <div className="glass-card chart-card">
                    <div className="card-header-title">Status Tugas Praktikum</div>
                    <TaskStatusChart completed={completed} pending={active} />
                </div>
            </div>

            <ResumeModal
                isOpen={isResumeOpen}
                onClose={() => setIsResumeOpen(false)}
                tasks={tasks}
                portfolios={portfolios}
                profile={profile}
            />
        </section>
    );
}