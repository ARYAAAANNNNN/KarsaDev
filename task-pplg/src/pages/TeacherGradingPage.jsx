import { useMemo, useState } from 'react';
import { CheckSquare, ExternalLink } from 'lucide-react';
import TeacherGradingModal from '../components/teacher/TeacherGradingModal';

export default function TeacherGradingPage({ submissions = [], onGradeSubmission }) {
    const [selectedSub, setSelectedSub] = useState(null);
    const [subjectFilter, setSubjectFilter] = useState('Semua');
    const [classFilter, setClassFilter] = useState('Semua');

    const subjectOptions = useMemo(() => ['Semua', ...new Set(submissions.map((sub) => sub.subject).filter(Boolean))], [submissions]);
    const classOptions = useMemo(() => ['Semua', ...new Set(submissions.map((sub) => sub.class_group).filter(Boolean))], [submissions]);

    const filteredSubmissions = useMemo(() => {
        return submissions.filter((submission) => {
            const matchesSubject = subjectFilter === 'Semua' || submission.subject === subjectFilter;
            const matchesClass = classFilter === 'Semua' || submission.class_group === classFilter;
            return matchesSubject && matchesClass;
        });
    }, [classFilter, subjectFilter, submissions]);

    const handleSaveGrade = ({ submissionId, score, feedback }) => {
        onGradeSubmission?.(submissionId, score, feedback);
        setSelectedSub(null);
    };

    return (
        <section>
            <div className="page-header" style={{ marginBottom: '18px' }}>
                <div>
                    <div className="card-header-title">
                        <CheckSquare style={{ color: 'var(--success)' }} /> Ruang Evaluasi & Penilaian Guru
                    </div>
                    <p className="section-subtitle">Antrian pengumpulan tugas LKPD siswa berdasarkan mata pelajaran dan kelas.</p>
                </div>
            </div>

            <div className="card-panel-box" style={{ marginBottom: '18px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <select value={subjectFilter} onChange={(event) => setSubjectFilter(event.target.value)} style={selectStyle}>
                    {subjectOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <select value={classFilter} onChange={(event) => setClassFilter(event.target.value)} style={selectStyle}>
                    {classOptions.map((option) => (
                        <option key={option} value={option}>{option || 'Semua Kelas'}</option>
                    ))}
                </select>
            </div>

            <div className="glass-card">
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nama Siswa</th>
                                <th>Mapel</th>
                                <th>Kelas</th>
                                <th>Modul LKPD</th>
                                <th>Hasil Kerja</th>
                                <th>Status / Nilai</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubmissions.length === 0 ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center' }}>Belum ada tugas siswa yang cocok dengan filter saat ini.</td></tr>
                            ) : (
                                filteredSubmissions.map((sub) => (
                                    <tr key={sub.id}>
                                        <td><strong>{sub.student_name}</strong></td>
                                        <td>{sub.subject || '-'}</td>
                                        <td>{sub.class_group || '-'}</td>
                                        <td>{sub.module_title}</td>
                                        <td>
                                            <a href={sub.github_url || '#'} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                Buka Link <ExternalLink size={14} />
                                            </a>
                                        </td>
                                        <td>
                                            <span className={`lkpd-status ${sub.status === 'Graded' || sub.score !== undefined ? 'status-graded' : 'status-pending'}`}>
                                                {sub.status === 'Graded' || sub.score !== undefined ? `Nilai: ${sub.score}` : 'Pending'}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn-primary btn-sm"
                                                onClick={() => setSelectedSub(sub)}
                                            >
                                                {sub.status === 'Graded' ? 'Review' : 'Beri Nilai'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <TeacherGradingModal
                submission={selectedSub}
                onClose={() => setSelectedSub(null)}
                onSave={handleSaveGrade}
            />
        </section>
    );
}

const selectStyle = {
    minWidth: '180px',
    background: 'var(--bg-input)',
    color: 'var(--text-main)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '10px',
    padding: '9px 12px',
    fontSize: '0.85rem',
};
