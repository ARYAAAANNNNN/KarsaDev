import { useEffect, useState } from 'react';
import { Award, ExternalLink } from 'lucide-react';

export default function TeacherGradingModal({ submission, onClose, onSave }) {
  const [score, setScore] = useState(submission?.score ?? '');
  const [feedback, setFeedback] = useState(submission?.feedback ?? '');

  useEffect(() => {
    setScore(submission?.score ?? '');
    setFeedback(submission?.feedback ?? '');
  }, [submission]);

  if (!submission) return null;

  const handleSave = (event) => {
    event.preventDefault();

    const numericScore = Number(score);
    if (Number.isNaN(numericScore) || numericScore < 0 || numericScore > 100) {
      return;
    }

    onSave({
      submissionId: submission.id,
      score: numericScore,
      feedback: feedback.trim(),
    });
  };

  return (
    <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(4,6,18,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 120 }}>
      <div className="modal-dialog" style={{ width: '560px', maxWidth: '92vw', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '22px', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Review Tugas</div>
            <h2 style={{ fontSize: '1.15rem' }}>{submission.student_name}</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.4rem', cursor: 'pointer' }}>
            ×
          </button>
        </div>

        <div style={{ display: 'grid', gap: '10px', marginBottom: '16px', padding: '12px 14px', borderRadius: '12px', background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.15)' }}>
          <div style={{ fontWeight: 700 }}>{submission.module_title}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{submission.subject}</div>
          <a href={submission.github_url} target="_blank" rel="noreferrer" style={{ color: 'var(--neon-cyan)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            GitHub Repository <ExternalLink size={14} />
          </a>
          {submission.live_demo_url && (
            <a href={submission.live_demo_url} target="_blank" rel="noreferrer" style={{ color: 'var(--neon-cyan)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Live Demo <ExternalLink size={14} />
            </a>
          )}
          {submission.notes && (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.5' }}>
              <strong style={{ color: 'var(--text-main)' }}>Catatan teknis:</strong> {submission.notes}
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="modal-form" style={{ display: 'grid', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
              Nilai (0-100)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={score}
              onChange={(event) => setScore(event.target.value)}
              placeholder="Masukkan skor 0 - 100"
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
              Feedback
            </label>
            <textarea
              rows="4"
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              placeholder="Tuliskan feedback konstruktif untuk siswa..."
              style={textareaStyle}
            />
          </div>

          <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Award size={16} /> Simpan Nilai
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  background: 'var(--bg-input)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '12px',
  color: 'var(--text-main)',
  padding: '11px 14px',
  fontSize: '0.9rem',
};

const textareaStyle = {
  width: '100%',
  background: 'var(--bg-input)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '12px',
  color: 'var(--text-main)',
  padding: '11px 14px',
  fontSize: '0.9rem',
  resize: 'vertical',
};
