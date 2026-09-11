# KarsaDev API

API backend sederhana untuk aplikasi KarsaDev menggunakan Express + SQLite.

## Jalankan server

```bash
node server.js
```

Server akan berjalan di:

```bash
http://localhost:4000
```

## Endpoint

### Health check

```bash
GET /api/health
```

### Modul LKPD

```bash
GET /api/modules
POST /api/modules
```

### Submission siswa

```bash
GET /api/submissions
POST /api/submissions
PUT /api/submissions/:id/grade
```

### Analytics

```bash
GET /api/analytics
```

## Contoh payload

### POST /api/modules

```json
{
  "title": "LKPD AI 01",
  "subject": "Kecerdasan Buatan (AI)",
  "teacher": "Wanda Kurniawan",
  "class_group": "XII PPLG 1",
  "duration": "90 menit",
  "description": "Mengenal prompt engineering",
  "material_url": "https://example.com/lkpd/ai-01"
}
```

### POST /api/submissions

```json
{
  "student_name": "Sarah Chen",
  "module_title": "LKPD AI 01",
  "subject": "Kecerdasan Buatan (AI)",
  "class_group": "XII PPLG 1",
  "github_url": "https://github.com/example/project",
  "live_demo_url": "https://example.com/demo",
  "notes": "Project sudah selesai"
}
```

### PUT /api/submissions/:id/grade

```json
{
  "score": 92,
  "feedback": "Bagus, tugas sudah sesuai kriteria."
}
```
