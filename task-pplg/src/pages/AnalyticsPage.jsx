import { BarChart3, Printer, Trophy } from 'lucide-react';
import SkillRadarChart from '../components/charts/SkillRadarChart';

export default function AnalyticsPage({ tasks = [], competencyScores = [82, 76, 80, 74, 88, 79] }) {
    const completedTasks = tasks.filter((task) => task.completed || task.status === 'Done').length;
    const totalTasks = tasks.length || 1;
    const completionRate = Math.round((completedTasks / totalTasks) * 100);
    const totalXp = tasks.reduce((sum, task) => sum + (task.completed || task.status === 'Done' ? 140 : 80), 0);
    const level = Math.floor(totalXp / 500) + 1;
    const nextLevelProgress = Math.min(100, ((totalXp % 500) / 500) * 100);

    const skillRows = [
        { label: 'AI & Prompting', value: competencyScores[0] ?? 0, xp: 760 },
        { label: 'System Analysis', value: competencyScores[1] ?? 0, xp: 610 },
        { label: 'Backend (Laravel)', value: competencyScores[2] ?? 0, xp: 540 },
        { label: 'QA & Testing', value: competencyScores[3] ?? 0, xp: 680 },
        { label: 'Frontend (React)', value: competencyScores[4] ?? 0, xp: 500 },
        { label: 'Git & Documentation', value: competencyScores[5] ?? 0, xp: 640 }
    ];

    const avgScore = Math.round(skillRows.reduce((sum, item) => sum + item.value, 0) / skillRows.length);

    const handlePrintResume = () => {
        window.print();
    };

    return (
        <section>
            <div className="page-header" style={{ marginBottom: '20px' }}>
                <div>
                    <div className="card-header-title" style={{ color: 'var(--text-main)' }}>
                        <BarChart3 style={{ color: 'var(--neon-cyan)' }} /> Analytics & Resume
                    </div>
                    <p className="section-subtitle">Pantau kompetensi, progress XP, dan siapkan resume profil siswa.</p>
                </div>
                <button className="btn-primary" onClick={handlePrintResume}>
                    <Printer size={18} /> Cetak Resume PDF
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '18px', marginBottom: '18px' }}>
                <div className="card-panel-box">
                    <div className="panel-header-row" style={{ marginBottom: '16px' }}>
                        <div>
                            <h3>Competency Radar Chart</h3>
                            <small>Profil kemampuan siswa secara keseluruhan</small>
                        </div>
                    </div>
                    <SkillRadarChart scores={competencyScores} />
                </div>

                <div className="card-panel-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <div className="panel-header-row" style={{ marginBottom: '10px' }}>
                            <div>
                                <h3>XP Leveling</h3>
                                <small>Progress pengalaman</small>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #a855f7, #38bdf8)' }}>
                                    <Trophy size={20} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Level</div>
                                    <strong style={{ fontSize: '1.2rem' }}>{level}</strong>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total XP</div>
                                <strong style={{ fontSize: '1.1rem' }}>{totalXp}</strong>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Progress to next level</span>
                            <strong style={{ fontSize: '0.8rem' }}>{nextLevelProgress.toFixed(0)}%</strong>
                        </div>
                        <div style={{ height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{ width: `${nextLevelProgress}%`, height: '100%', borderRadius: '999px', background: 'linear-gradient(90deg, #a855f7 0%, #38bdf8 100%)' }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-panel-box">
                <div className="panel-header-row" style={{ marginBottom: '14px' }}>
                    <div>
                        <h3>Skill Score Breakdown</h3>
                        <small>Performa kemampuan kejuruan siswa</small>
                    </div>
                </div>

                <div style={{ display: 'grid', gap: '12px' }}>
                    {skillRows.map((row) => (
                        <div key={row.label}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.82rem' }}>
                                <span>{row.label}</span>
                                <span style={{ color: 'var(--text-muted)' }}>{row.value}% · {row.xp} XP</span>
                            </div>
                            <div style={{ width: '100%', height: '10px', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                <div style={{ width: `${row.value}%`, height: '100%', borderRadius: '999px', background: 'linear-gradient(90deg, #38bdf8 0%, #a855f7 100%)' }} />
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '18px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px' }}>
                    <div style={{ background: 'rgba(168,85,247,0.08)', borderRadius: '12px', border: '1px solid rgba(168,85,247,0.18)', padding: '12px' }}>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Average Score</div>
                        <strong style={{ fontSize: '1.3rem' }}>{avgScore}%</strong>
                    </div>
                    <div style={{ background: 'rgba(56,189,248,0.08)', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.18)', padding: '12px' }}>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Task Completion</div>
                        <strong style={{ fontSize: '1.3rem' }}>{completionRate}%</strong>
                    </div>
                    <div style={{ background: 'rgba(232,44,139,0.08)', borderRadius: '12px', border: '1px solid rgba(232,44,139,0.18)', padding: '12px' }}>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Focus Area</div>
                        <strong style={{ fontSize: '1.05rem' }}>DevOps</strong>
                    </div>
                </div>
            </div>
        </section>
    );
}
