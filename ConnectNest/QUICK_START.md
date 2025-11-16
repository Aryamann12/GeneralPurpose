# 🚀 Quick Start Guide - ConnectNest

## ⚠️ CRITICAL FIRST STEP: Secure Your Credentials!

Your `configuration.txt` file contains **EXPOSED DATABASE CREDENTIALS**. Follow these steps immediately:

---

## Step 1: Create Environment Files

### Option A: Automated Setup (Recommended)

Run the PowerShell setup script:

```powershell
.\setup-environment.ps1
```

### Option B: Manual Setup

#### Create `server/.env`:
```env
PORT=4000
MONGODB_URI=mongodb+srv://aryamatomar:iSo9H2oZrdn6WlVV@jstraining.buufn0n.mongodb.net/?retryWrites=true&w=majority&appName=JSTraining
MONGODB_USERNAME=aryamatomar
MONGODB_PASSWORD=iSo9H2oZrdn6WlVV
MONGODB_HOST=jstraining.buufn0n.mongodb.net
```

#### Create `client/.env`:
```env
VITE_API_BASE_URL=http://localhost:4000
```

---

## Step 2: Delete configuration.txt

**IMMEDIATELY DELETE** the configuration file:

```powershell
Remove-Item configuration.txt
```

Or manually delete it from File Explorer.

---

## Step 3: Install Dependencies & Start Application

### Terminal 1 - Backend Server:
```powershell
cd server
npm install
npm run start:dev
```

You should see:
```
API listening on http://localhost:4000
```

### Terminal 2 - Frontend Client:
```powershell
cd client
npm install
npm run dev
```

You should see:
```
VITE ready in XXX ms
Local: http://localhost:5173/
```

---

## Step 4: Open Your Application

Open your browser and navigate to:
```
http://localhost:5173
```

You should see the **Items CRUD Demo** interface!

---

## 🧪 Test Your Setup

1. **Create an Item**: Fill in the "Name" field and click "Create"
2. **View Items**: Your created items should appear in the "All Items" section
3. **Update an Item**: Click "Edit" on any item, modify it, and click "Update"
4. **Delete an Item**: Click "Delete" on any item

---

## 🔒 IMPORTANT: Rotate Your Credentials

Since your credentials were exposed in plaintext, you should rotate them:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to **Database Access**
3. Either:
   - Delete user `aryamatomar` and create a new one, OR
   - Change the password for `aryamatomar`
4. Update your `server/.env` file with new credentials

---

## 🛠️ Troubleshooting

### Frontend can't connect to backend
- Ensure backend is running on port 4000
- Check `client/.env` has `VITE_API_BASE_URL=http://localhost:4000`
- Restart the Vite dev server after changing `.env`

### MongoDB connection errors
- Verify credentials in `server/.env`
- Check your MongoDB Atlas cluster is running
- Ensure your IP address is whitelisted in MongoDB Atlas

### Port already in use
- Backend: Change `PORT` in `server/.env`
- Frontend: Use `npm run dev -- --port 3000` to change port

---

## 📁 Project Structure

```
ConnectNest/
├── server/              # NestJS Backend API
│   ├── src/
│   │   ├── items/      # Items CRUD module
│   │   ├── tools/      # Tools module
│   │   └── main.ts     # Entry point
│   ├── .env            # Backend environment variables (DO NOT COMMIT)
│   └── package.json
├── client/              # Vite Frontend
│   ├── src/
│   │   ├── main.js     # Frontend logic
│   │   └── styles.css  # Styling
│   ├── .env            # Frontend environment variables (DO NOT COMMIT)
│   └── package.json
└── .gitignore          # Ignores .env and configuration.txt
```

---

## 🔐 Security Notes

Your application currently has these security issues:
- ❌ No authentication
- ❌ No rate limiting
- ❌ No security headers
- ❌ Dangerous DELETE ALL endpoints
- ❌ No input sanitization for NoSQL injection

**These should be addressed before production deployment!**

---

## 📚 API Endpoints

Once running, your API will be available at `http://localhost:4000`:

### Items
- `GET /items` - List all items
- `POST /items` - Create item `{ name, description? }`
- `GET /items/:id` - Get one item
- `PUT /items/:id` - Update item
- `DELETE /items/:id` - Delete one item
- `DELETE /items` - Delete all items

### Tools
- `GET /tools` - List all tools
- `POST /tools/batch` - Upsert array of tools
- `DELETE /tools` - Delete all tools

---

## ✅ Checklist

- [ ] Created `server/.env`
- [ ] Created `client/.env`
- [ ] Deleted `configuration.txt`
- [ ] Backend running on port 4000
- [ ] Frontend running on port 5173
- [ ] Can create/read/update/delete items
- [ ] Rotated MongoDB credentials
- [ ] Never commit credentials again!

---

**Need help?** Check the `SECURITY_SETUP_INSTRUCTIONS.md` for detailed security guidance.

