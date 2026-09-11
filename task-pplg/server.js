import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databaseDir = path.join(__dirname, 'database');
if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true });
}

const db = new Database(path.join(databaseDir, 'karsadev.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS modules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    teacher TEXT,
    class_group TEXT,
    duration TEXT,
    description TEXT,
    material_url TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_name TEXT NOT NULL,
    module_title TEXT NOT NULL,
    subject TEXT NOT NULL,
    class_group TEXT,
    github_url TEXT,
    live_demo_url TEXT,
    notes TEXT,
    score INTEGER,
    feedback TEXT,
    status TEXT DEFAULT 'Pending',
    submitted_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

const seedModules = () => {
  const existingCount = db.prepare('SELECT COUNT(*) AS total FROM modules').get().total;

  if (existingCount > 0) return;

  const modules = [
    {
      title: 'LKPD AI 01 - Pengenalan Prompt Engineering',
      subject: 'Kecerdasan Buatan (AI)',
      teacher: 'Wanda Kurniawan',
      class_group: 'XII PPLG 1',
      duration: '90 menit',
      description: 'Mengenal dasar prompt engineering, struktur instruksi, dan teknik prompting yang efektif untuk menghasilkan jawaban AI yang relevan.',
      material_url: 'https://example.com/lkpd/ai-01',
    },
    {
      title: 'LKPD Laravel 02 - CRUD & Blade Template',
      subject: 'Pemrograman Web (Laravel)',
      teacher: 'Didin Saharudin, M.Kom.',
      class_group: 'XII PPLG 1',
      duration: '150 menit',
      description: 'Menyusun fitur CRUD sederhana menggunakan controller, model, migration, dan tampilan Blade.',
      material_url: 'https://example.com/lkpd/laravel-crud',
    },
    {
      title: 'SRS - Analisis Kebutuhan Sistem',
      subject: 'Analisis Sistem',
      teacher: 'Diah Pungki Octaviani, S.Pd.',
      class_group: 'XII PPLG 2',
      duration: '90 menit',
      description: 'Membuat dokumen kebutuhan sistem, tujuan aplikasi, dan ruang lingkup fungsi yang harus menjadi acuan pengembangan.',
      material_url: 'https://example.com/lkpd/srs',
    },
  ];

  const insertModule = db.prepare(`
    INSERT INTO modules (title, subject, teacher, class_group, duration, description, material_url)
    VALUES (@title, @subject, @teacher, @class_group, @duration, @description, @material_url)
  `);

  const tx = db.transaction((items) => {
    for (const item of items) insertModule.run(item);
  });

  tx(modules);
};

seedModules();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'KarsaDev API is running' });
});

app.get('/api/modules', (req, res) => {
  const rows = db.prepare('SELECT * FROM modules ORDER BY id DESC').all();
  res.json(rows);
});

app.post('/api/modules', (req, res) => {
  const { title, subject, teacher, class_group, duration, description, material_url } = req.body;

  if (!title || !subject) {
    return res.status(400).json({ error: 'title dan subject wajib diisi' });
  }

  const result = db.prepare(`
    INSERT INTO modules (title, subject, teacher, class_group, duration, description, material_url)
    VALUES (@title, @subject, @teacher, @class_group, @duration, @description, @material_url)
  `).run({
    title,
    subject,
    teacher: teacher || 'Guru',
    class_group: class_group || 'Umum',
    duration: duration || '90 menit',
    description: description || '',
    material_url: material_url || '',
  });

  const created = db.prepare('SELECT * FROM modules WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

app.get('/api/submissions', (req, res) => {
  const rows = db.prepare('SELECT * FROM submissions ORDER BY id DESC').all();
  res.json(rows);
});

app.post('/api/submissions', (req, res) => {
  const {
    student_name,
    module_title,
    subject,
    class_group,
    github_url,
    live_demo_url,
    notes,
  } = req.body;

  if (!student_name || !module_title || !subject) {
    return res.status(400).json({ error: 'student_name, module_title, dan subject wajib diisi' });
  }

  const result = db.prepare(`
    INSERT INTO submissions (student_name, module_title, subject, class_group, github_url, live_demo_url, notes, status)
    VALUES (@student_name, @module_title, @subject, @class_group, @github_url, @live_demo_url, @notes, @status)
  `).run({
    student_name,
    module_title,
    subject,
    class_group: class_group || 'Umum',
    github_url: github_url || '',
    live_demo_url: live_demo_url || '',
    notes: notes || '',
    status: 'Pending',
  });

  const created = db.prepare('SELECT * FROM submissions WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

app.put('/api/submissions/:id/grade', (req, res) => {
  const { id } = req.params;
  const { score, feedback } = req.body;

  if (score === undefined || Number(score) < 0 || Number(score) > 100) {
    return res.status(400).json({ error: 'score harus berupa angka 0-100' });
  }

  const updated = db.prepare(`
    UPDATE submissions
    SET score = @score,
        feedback = @feedback,
        status = 'Graded'
    WHERE id = @id
  `).run({
    id: Number(id),
    score: Number(score),
    feedback: feedback || '',
  });

  if (updated.changes === 0) {
    return res.status(404).json({ error: 'submission tidak ditemukan' });
  }

  const submission = db.prepare('SELECT * FROM submissions WHERE id = ?').get(Number(id));
  res.json(submission);
});

app.get('/api/analytics', (req, res) => {
  const submissions = db.prepare('SELECT * FROM submissions WHERE score IS NOT NULL').all();

  if (!submissions.length) {
    return res.json({
      totalSubmissions: 0,
      averageScore: 0,
      gradedCount: 0,
      pendingCount: 0,
      topSubject: null,
    });
  }

  const total = submissions.reduce((sum, item) => sum + Number(item.score), 0);
  const averageScore = Math.round(total / submissions.length);
  const pendingCount = db.prepare("SELECT COUNT(*) AS total FROM submissions WHERE status = 'Pending'").get().total;
  const gradedCount = db.prepare("SELECT COUNT(*) AS total FROM submissions WHERE status = 'Graded'").get().total;

  const subjectMap = {};
  submissions.forEach((item) => {
    subjectMap[item.subject] = (subjectMap[item.subject] || 0) + 1;
  });

  const topSubject = Object.entries(subjectMap).sort((a, b) => b[1] - a[1])[0];

  res.json({
    totalSubmissions: submissions.length,
    averageScore,
    gradedCount,
    pendingCount,
    topSubject: topSubject ? { subject: topSubject[0], count: topSubject[1] } : null,
  });
});

app.listen(PORT, () => {
  console.log(`KarsaDev API running at http://localhost:${PORT}`);
});
