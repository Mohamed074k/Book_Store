
# 📚 Book_Store  

This project is a simple **Vue 3 + Vite** application with a **JSON Server** backend for fake REST API.  

---

## 🚀 Recommended IDE Setup  
- [VSCode](https://code.visualstudio.com/)  
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur)  

---

## ⚙️ Project Setup  

### Install dependencies
```sh
npm install
```

---

## 🖥️ Development  

### Run Vue app
```sh
npm run dev
```

### Build for production
```sh
npm run build
```

---

## 🌐 JSON Server Setup  

### Install JSON Server  
Global installation:
```sh
npm install -g json-server
```

Or inside the project:
```sh
npm install json-server --save-dev
```

---

### Create Database File  
In the project root, create a file called **`db.json`**:  
```json
{
  "books": [
    { "id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald" },
    { "id": 2, "title": "1984", "author": "George Orwell" },
    { "id": 3, "title": "To Kill a Mockingbird", "author": "Harper Lee" }
  ],
  "users": [
    { "id": 1, "name": "Mohamed", "email": "mohamed@example.com" },
    { "id": 2, "name": "Sara", "email": "sara@example.com" }
  ]
}
```

---

### Run JSON Server  
```sh
json-server --watch db.json --port 3000
```

- API endpoint: `http://localhost:3000/books`  
- Example:  
  - Get all books → `GET /books`  
  - Get single book → `GET /books/1`  
  - Get all users → `GET /users`  

---

## 📌 Package.json Scripts  

You can add JSON Server as a script inside **`package.json`**:  
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "json-server": "json-server --watch db.json --port 3000"
}
```

Run JSON Server with:
```sh
npm run json-server
```

---

## 🔗 Using JSON Server in Vue  

Example API setup using **Axios**:  

```js
// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000"
});

export default api;
```

Example in a component:  
```vue
<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";

const books = ref([]);

onMounted(async () => {
  const res = await api.get("/books");
  books.value = res.data;
});
</script>

<template>
  <div>
    <h1>Books</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.title }} - {{ book.author }}
      </li>
    </ul>
  </div>
</template>
```

---

## ⚡ Run Both Vue & JSON Server  
Open **two terminals**:  
- Terminal 1 → `npm run dev` (Vue app)  
- Terminal 2 → `npm run json-server` (API server)  
