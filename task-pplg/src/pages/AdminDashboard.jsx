import SkillRadarChart from '../components/charts/SkillRadarChart';

export default function AdminDashboard() {
    return (
        <div>
            <div className="view-header">
                <h1>Greetings, System Admin!</h1>
                <p>Current date, June 25, 2024</p>
            </div>

            {/* 4 Counter Box Admin Sesuai Gambar 3 */}
            <div className="stats-cards-grid">
                <div className="stat-box">
                    <div className="stat-box-title">Siswa Aktif</div>
                    <div className="stat-box-value">2,345</div>
                </div>
                <div className="stat-box">
                    <div className="stat-box-title">Kursus Terbit</div>
                    <div className="stat-box-value">112</div>
                </div>
                <div className="stat-box">
                    <div className="stat-box-title">Instansi Lab Aktif</div>
                    <div className="stat-box-value">4,567</div>
                </div>
                <div className="stat-box">
                    <div className="stat-box-title">Jumlah Instruktur</div>
                    <div className="stat-box-value">318</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '20px', marginBottom: '24px' }}>
                <div className="card-panel">
                    <div className="card-panel-header">
                        <div>
                            <h3>Rata-rata Keterampilan Platform</h3>
                            <small style={{ color: 'var(--text-muted)' }}>Rata-rata Keterampilan Pari</small>
                        </div>
                    </div>
                    <SkillRadarChart />
                </div>

                <div className="card-panel">
                    <div className="card-panel-header">
                        <h3>Log Aktivitas Sistem & Tiket Dukungan</h3>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                        <div className="sprint-col">
                            <div className="sprint-col-title"><span>Tinjauan Konten</span></div>
                            <div className="sprint-card">
                                <div className="sprint-card-title">Permintaan Kursus</div>
                                <small style={{ color: 'var(--accent-cyan)' }}>New</small>
                            </div>
                        </div>
                        <div className="sprint-col">
                            <div className="sprint-col-title"><span>Tiket Pengguna</span></div>
                            <div className="sprint-card">
                                <div className="sprint-card-title">Laporan Tautan Rusak</div>
                                <small style={{ color: 'var(--accent-amber)' }}>Status</small>
                            </div>
                        </div>
                        <div className="sprint-col">
                            <div className="sprint-col-title"><span>Persetujuan</span></div>
                            <div className="sprint-card">
                                <div className="sprint-card-title">Persetujuan Kursus React</div>
                                <small style={{ color: 'var(--accent-purple)' }}>Status</small>
                            </div>
                        </div>
                        <div className="sprint-col">
                            <div className="sprint-col-title"><span>Diselesaikan</span></div>
                            <div className="sprint-card">
                                <div className="sprint-card-title">Lab Reset Sukses</div>
                                <small style={{ color: 'var(--accent-emerald)' }}>Done</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}