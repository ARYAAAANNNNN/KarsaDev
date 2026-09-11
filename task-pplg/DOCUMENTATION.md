# Dokumentasi Proyek KarsaDev

## 1. Deskripsi Proyek

KarsaDev adalah aplikasi dashboard pembelajaran berbasis web yang dirancang untuk mendukung aktivitas belajar, pengelolaan tugas, portofolio siswa, serta proses penilaian LKPD. Aplikasi ini berfokus pada alur pembelajaran produktif jurusan PPLG, mulai dari distribusi modul LKPD, pengumpulan tugas, review guru, hingga analisis kompetensi siswa.

Aplikasi ini dibuat dengan React + Vite untuk frontend dan Express + SQLite untuk backend API.

---

## 2. Tujuan Aplikasi

Aplikasi ini bertujuan untuk:
- mengelola modul LKPD berdasarkan mapel dan kelas
- memudahkan siswa mengumpulkan tugas melalui link GitHub atau live demo
- memfasilitasi guru dalam menilai tugas dan memberikan feedback
- menampilkan kompetensi siswa dalam bentuk radar chart
- menyimpan data dalam database lokal untuk kebutuhan demo dan pengembangan lebih lanjut

---

## 3. Struktur Proyek

```bash
task-pplg/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── charts/
│   │   ├── common/
│   │   ├── resume/
│   │   └── teacher/
│   ├── context/
│   ├── data/
│   ├── lib/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── database/
│   └── karsadev.db
├── public/
├── server.js
├── README.md
├── README-API.md
├── DOCUMENTATION.md
├── package.json
├── vite.config.js
├── eslint.config.js
└── index.html
```

---

## 4. Teknologi yang Digunakan

### Frontend
- React 19
- Vite
- JavaScript JSX
- Chart.js + react-chartjs-2
- Lucide React

### Backend
- Node.js
- Express
- SQLite (better-sqlite3)
- CORS

---

## 5. Alur Kerja Sistem

### Alur utama
1. Guru mendistribusikan LKPD berdasarkan mapel dan kelas.
2. Siswa mengerjakan tugas dan mengumpulkan hasil melalui link GitHub atau live demo.
3. Guru meninjau pekerjaan siswa, memberi nilai, dan memberikan feedback.
4. Sistem otomatis memperbarui radar kompetensi dan XP siswa.
5. Hasil akhir digunakan untuk portfolio dan rekap wali kelas.

### Diagram singkat

```text
GURU -> DISTRIBUSI LKPD
   ↓
SISWA -> PENGERJAAN & PENGUMPULAN
   ↓
GURU -> REVIEW, NILAI, FEEDBACK
   ↓
SISTEM -> UPDATE RADAR KOMPETENSI & XP
   ↓
PORTOFOLIO & REKAP WALI KELAS
```

---

## 6. Fitur Utama

### 6.1 Dashboard Siswa
- menampilkan ringkasan tugas
- progress belajar
- proyek yang dikerjakan
- statistik kompetensi

### 6.2 Curriculum & LKPD
- daftar modul berdasarkan mata pelajaran
- filter mapel
- form pengumpulan tugas
- link GitHub dan demo yang bisa di-submit

### 6.3 Teacher Grading
- daftar tugas siswa yang masuk
- filter berdasarkan mapel dan kelas
- proses grading dengan skor dan feedback
- status pending/graded

### 6.4 Analytics
- radar chart kompetensi siswa
- rata-rata nilai
- progress belajar
- skill breakdown

### 6.5 Portofolio & Showcase
- menampilkan proyek yang pernah dibuat
- integrasi teknologi dan demo project

---

## 7. API Backend

API dibuat di file [server.js](server.js).

### Endpoint API

#### Health check
- `GET /api/health`

#### Modul LKPD
- `GET /api/modules`
- `POST /api/modules`

#### Pengumpulan tugas siswa
- `GET /api/submissions`
- `POST /api/submissions`
- `PUT /api/submissions/:id/grade`

#### Analytics
- `GET /api/analytics`

### Contoh response health check

```json
{
  "status": "ok",
  "message": "KarsaDev API is running"
}
```

---

## 8. Cara Menjalankan Proyek

### 8.1 Install dependency

```bash
npm install
```

### 8.2 Jalankan frontend Vite

```bash
npm run dev
```

### 8.3 Jalankan backend API

```bash
npm run start:api
```

### 8.4 Akses aplikasi

- Frontend: `http://localhost:5173`
- API: `http://localhost:4000`

---

## 9. Database

Database lokal disimpan pada folder:

```bash
database/karsadev.db
```

Tabel utama yang dibuat:
- `modules`
- `submissions`

---

## 10. Catatan Pengembangan

- Aplikasi masih dalam tahap pengembangan berbasis demo.
- Data yang tampil di frontend dapat diintegrasikan lebih lanjut ke API.
- Untuk production, disarankan mengganti SQLite dengan PostgreSQL atau Supabase.
- Data kompetensi dan grading masih dapat diperluas sesuai kebutuhan sekolah atau pembelajaran.

---

## 11. Kesimpulan

KarsaDev merupakan aplikasi manajemen pembelajaran yang membantu proses belajar mengajar menjadi lebih terstruktur. Dengan alur distribusi LKPD, pengumpulan tugas, review guru, dan analisis kompetensi, aplikasi ini sudah mencerminkan kebutuhan pembelajaran produktif di jurusan PPLG.
