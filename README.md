# TaskFlow – Task Management App

Aplikasi To-Do List sederhana yang dibangun menggunakan **React** dan **TypeScript** sebagai bagian dari _technical test_ Front-End Developer.

---

## 📋 Fitur

- ✅ Menampilkan daftar task dari API
- ➕ Menambahkan task baru
- 🔄 Update status task (done / undone)
- 🗑️ Menghapus task
- 🔍 Filter task: **All** / **Pending** / **Completed**
- 📊 Statistik ringkasan + progress bar

---

## 🛠️ Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) – build tool
- CSS Modules – scoped styling
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) – mock REST API

---

## 🚀 Cara Menjalankan

### Prasyarat

Pastikan sudah terinstall di komputer:

- [Node.js](https://nodejs.org/) versi **18** atau lebih baru
- npm (sudah termasuk bersama Node.js)

Cek versi dengan perintah berikut:

```bash
node -v
npm -v
```

---

### Langkah-langkah

**1. Clone repository**

```bash
git clone https://github.com/janubiyyy/To-Do-List.git
```

**2. Masuk ke folder project**

```bash
cd To-Do-List
```

**3. Install dependencies**

```bash
npm install
```

**4. Jalankan development server**

```bash
npm run dev
```

**5. Buka di browser**

```
http://localhost:5173
```

---

## 📁 Struktur Folder

```
src/
├── types/
│   └── task.types.ts          # Type & interface definitions
├── services/
│   └── taskService.ts         # API calls (JSONPlaceholder)
├── hooks/
│   └── useTasks.ts            # Custom hook – state & logic
└── components/
    ├── AddTaskForm/            # Form tambah task baru
    ├── FilterBar/              # Tab filter (All / Pending / Completed)
    ├── StatsBar/               # Ringkasan statistik & progress
    ├── TaskItem/               # Komponen item task individual
    ├── TaskList/               # Daftar task + skeleton + empty state
    └── Toast/                  # Notifikasi error
```

---

## 🔗 API

Menggunakan [JSONPlaceholder](https://jsonplaceholder.typicode.com/todos) sebagai mock API.

| Method | Endpoint               | Keterangan         |
|--------|------------------------|--------------------|
| GET    | `/todos?_limit=10`     | Ambil daftar task  |
| POST   | `/todos`               | Tambah task baru   |
| PATCH  | `/todos/:id`           | Update status task |
| DELETE | `/todos/:id`           | Hapus task         |

> **Catatan:** JSONPlaceholder adalah mock API, sehingga perubahan data (POST/PATCH/DELETE) tidak benar-benar tersimpan di server. State dikelola secara lokal dengan _optimistic update_.

---

Made with ❤️ by **Tasya Khaerani Janubiya**
