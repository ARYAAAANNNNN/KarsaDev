import { useState } from 'react';
import { ShieldAlert, Megaphone } from 'lucide-react';

export default function AdminPanelPage({ users, onUpdateRole, onBroadcast }) {
    const [announcementInput, setAnnouncementInput] = useState('');

    const handleBroadcast = (e) => {
        e.preventDefault();
        onBroadcast(announcementInput);
        setAnnouncementInput('');
        alert('Pengumuman global berhasil disiarkan!');
    };

    return (
        <section>
            <div className="page-header">
                <div>
                    <div className="card-header-title">
                        <ShieldAlert style={{ color: 'var(--danger)' }} /> Panel Kontrol Administrator
                    </div>
                    <p className="section-subtitle">Kelola hak akses pengguna dan siarkan pengumuman global.</p>
                </div>
            </div>

            <div className="glass-card" style={{ marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Megaphone size={18} style={{ color: 'var(--accent-cyan)' }} /> Siaran Pengumuman Global
                </h3>
                <form onSubmit={handleBroadcast} style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Tulis pesan pengumuman..."
                        value={announcementInput}
                        onChange={(e) => setAnnouncementInput(e.target.value)}
                        required
                        style={{ margin: 0 }}
                    />
                    <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>Kirim Pesan</button>
                </form>
            </div>

            <div className="glass-card">
                <h3 style={{ marginBottom: '14px' }}>Manajemen Hak Akses Akun</h3>
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nama Pengguna</th>
                                <th>Email</th>
                                <th>Role Saat Ini</th>
                                <th>Ubah Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td><strong>{u.full_name}</strong></td>
                                    <td>{u.email}</td>
                                    <td><span className="brand-badge">{u.role}</span></td>
                                    <td>
                                        <select
                                            value={u.role}
                                            onChange={(e) => onUpdateRole(u.id, e.target.value)}
                                            style={{ padding: '4px 8px' }}
                                        >
                                            <option value="student">Siswa</option>
                                            <option value="teacher">Guru</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}