import React, { useState } from 'react';
import { CheckSquare, ExternalLink, Award } from 'lucide-react';

export default function TeacherGradingPage({ submissions, onGradeSubmission }) {
    const [selectedSub, setSelectedSub] = useState(null);
    const [score, setScore] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSaveGrade = (e) => {
        e.preventDefault();
        onGradeSubmission(selectedSub.id, Number(score), feedback);
        setSelectedSub(null);
        setScore('');
        setFeedback('');
        alert('Penilaian berhasil disimpan!');
    };

    return (
        <section>
            <div className="page-header">
                <div>
                    <div className="card-header-title">
                        <CheckSquare style={{ color: 'var(--success)' }} /> Ruang Evaluasi & Penilaian Guru
                    </div>
                    <p className="section-subtitle">Daftar tugas praktikum yang dikumpulkan siswa untuk dinilai.</p>
                </div>
            </div>

            <div className="glass-card">
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nama Siswa</th>
                                <th>Modul LKPD</th>
                                <th>Hasil Kerja</th>
                                <th>Catatan</th>
                                <th>Status / Nilai</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.length === 0 ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center' }}>Belum ada tugas siswa yang dikumpulkan.</td></tr>
                            ) : (
                                submissions.map(sub => (
                                    <tr key={sub.id}>
                                        <td><strong>{sub.student_name}</strong></td>
                                        <td>{sub.module_title}</td>
                                        <td>
                                            <a href={sub.submission_url} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                Buka Link <ExternalLink size={14} />
                                            </a>
                                        </td>
                                        <td>{sub.notes || '-'}</td>
                                        <td>
                                            <span className={`lkpd-status ${sub.score !== undefined ? 'status-graded' : 'status-pending'}`}>
                                                {sub.score !== undefined ? `Nilai: ${sub.score}` : 'Pending'}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn-primary btn-sm"
                                                onClick={() => {
                                                    setSelectedSub(sub);
                                                    setScore(sub.score || '');
                                                    setFeedback(sub.feedback || '');
                                                }}
                                            >
                                                Beri Nilai
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedSub && (
                <div className="modal-overlay">
                    <div className="modal-dialog">
                        <div className="modal-header">
                            <div className="card-header-title">
                                <Award style={{ color: 'var(--success)' }} /> Penilaian Tugas: {selectedSub.student_name}
                            </div>
                            <button className="modal-close" onClick={() => setSelectedSub(null)}>×</button>
                        </div>
                        <form onSubmit={handleSaveGrade} className="modal-form">
                            <input
                                type="number"
                                min="0"
                                max="100"
                                placeholder="Skor Nilai (0 - 100)"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                required
                            />
                            <textarea
                                rows="3"
                                placeholder="Masukan atau evaluasi guru..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setSelectedSub(null)}>Batal</button>
                                <button type="submit" className="btn-primary">Simpan Penilaian</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}