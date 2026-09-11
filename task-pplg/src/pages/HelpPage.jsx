import { FileText, HelpCircle, BookOpenText, CheckCircle2 } from 'lucide-react';

const guideSteps = [
    {
        title: '1. Siapkan repositori',
        text: 'Pastikan repo GitHub sudah dibuat, bersih, dan dapat diakses publik agar guru bisa mengecek hasil pengerjaan.'
    },
    {
        title: '2. Upload demo atau dokumentasi',
        text: 'Tambahkan live demo, screenshot, atau tampilan aplikasi yang dapat dipahami dengan cepat oleh guru pembimbing.'
    },
    {
        title: '3. Kirim link tugas',
        text: 'Gunakan modal pengumpulan di halaman Curriculum untuk mengirim link repo, demo, dan catatan pengerjaan.'
    },
    {
        title: '4. Verifikasi sebelum submit',
        text: 'Pastikan semua file penting sudah lengkap, README jelas, dan aplikasi dapat dibuka dengan lancar.'
    }
];

const faqs = [
    {
        question: 'Bagaimana cara mengirim LKPD jika saya punya repo dan demo terpisah?',
        answer: 'Gunakan tombol “Kirim Tugas” pada modul terkait. Lengkapi link repo dan link demo, lalu cantumkan catatan singkat.'
    },
    {
        question: 'Apakah saya bisa menambahkan proyek baru ke showcase?',
        answer: 'Ya, gunakan tombol “Tambah Proyek” di halaman Projects. Isi judul, kategori, deskripsi, tech stack, dan link demo.'
    },
    {
        question: 'Bagaimana jika saya mengalami error saat fetch API?',
        answer: 'Cek batasan CORS, proxy Vite, dan pastikan endpoint backend sudah aktif. Catat kendala Anda di halaman Labs untuk referensi.'
    },
    {
        question: 'Apakah task kanban bisa diubah status?',
        answer: 'Ya, di halaman Practice Tasks Anda bisa beralih ke mode Kanban lalu drag and drop kartu tugas ke kolom yang sesuai.'
    }
];

export default function HelpPage() {
    return (
        <section>
            <div className="page-header" style={{ marginBottom: '22px' }}>
                <div>
                    <div className="card-header-title" style={{ color: 'var(--text-main)' }}>
                        <HelpCircle style={{ color: 'var(--neon-magenta)' }} /> Help & Guide
                    </div>
                    <p className="section-subtitle">Panduan teknis pengumpulan LKPD, FAQ, dan langkah cepat untuk memanfaatkan KarsaDev.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div className="card-panel-box">
                    <div className="panel-header-row" style={{ marginBottom: '14px' }}>
                        <div>
                            <h3>Panduan Pengumpulan LKPD</h3>
                            <small>Langkah-langkah praktikum</small>
                        </div>
                        <FileText size={18} style={{ color: 'var(--neon-cyan)' }} />
                    </div>

                    <div style={{ display: 'grid', gap: '12px' }}>
                        {guideSteps.map((step) => (
                            <div key={step.title} style={{ background: 'var(--bg-card-inner)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '12px' }}>
                                <div style={{ fontWeight: 800, marginBottom: '6px' }}>{step.title}</div>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.5', fontSize: '0.85rem' }}>{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card-panel-box">
                    <div className="panel-header-row" style={{ marginBottom: '14px' }}>
                        <div>
                            <h3>FAQ Teknis</h3>
                            <small>Pertanyaan yang sering muncul</small>
                        </div>
                        <BookOpenText size={18} style={{ color: 'var(--neon-purple)' }} />
                    </div>

                    <div style={{ display: 'grid', gap: '10px' }}>
                        {faqs.map((faq) => (
                            <div key={faq.question} style={{ background: 'var(--bg-card-inner)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                    <CheckCircle2 size={14} style={{ color: 'var(--neon-cyan)' }} />
                                    <strong style={{ fontSize: '0.86rem' }}>{faq.question}</strong>
                                </div>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.5', fontSize: '0.82rem' }}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
