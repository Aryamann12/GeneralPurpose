# 🔒 Security Setup Instructions

## ⚠️ CRITICAL: Secure Your Credentials NOW!

### Step 1: Create Environment Files

#### Server Environment File
Create `server/.env` with the following content:

```env
PORT=4000
MONGODB_URI=mongodb+srv://aryamatomar:iSo9H2oZrdn6WlVV@jstraining.buufn0n.mongodb.net/?retryWrites=true&w=majority&appName=JSTraining
MONGODB_USERNAME=aryamatomar
MONGODB_PASSWORD=iSo9H2oZrdn6WlVV
MONGODB_HOST=jstraining.buufn0n.mongodb.net
```

#### Client Environment File
Create `client/.env` with the following content:

```env
VITE_API_BASE_URL=http://localhost:4000
```

### Step 2: Delete configuration.txt

**IMMEDIATELY** delete the `configuration.txt` file as it contains exposed credentials:

```bash
# From the project root
del configuration.txt
```

### Step 3: Rotate Your MongoDB Credentials

Since your credentials were exposed in plaintext, you should:

1. Go to MongoDB Atlas (https://cloud.mongodb.com/)
2. Navigate to Database Access
3. Delete the user `aryamatomar` or change the password
4. Create a new user with a new strong password
5. Update your `server/.env` file with the new credentials

### Step 4: Check Git History

If you've already committed `configuration.txt` to git:

```bash
# Check if it's in git
git log --all --full-history -- configuration.txt

# If it exists in history, you MUST rotate credentials immediately
# Consider using git-filter-repo or BFG Repo-Cleaner to remove it
```

### Step 5: Start Your Application

#### Terminal 1 - Start Backend:
```bash
cd server
npm install
npm run start:dev
```

#### Terminal 2 - Start Frontend:
```bash
cd client
npm install
npm run dev
```

The frontend should now be accessible at `http://localhost:5173` (Vite default port)

---

## 📋 Security Checklist

- [ ] Created `server/.env` file
- [ ] Created `client/.env` file
- [ ] Deleted `configuration.txt`
- [ ] Verified `.gitignore` includes `configuration.txt` and `.env` files
- [ ] Rotated MongoDB credentials (if file was committed to git)
- [ ] Never commit credentials to version control again
- [ ] Use `.env.example` files as templates for team members

---

## 🛡️ Additional Security Recommendations

Your application currently has several security vulnerabilities:

1. **No Authentication** - All endpoints are public
2. **No Rate Limiting** - Vulnerable to DoS attacks
3. **No Security Headers** - Missing Helmet.js
4. **Dangerous DELETE ALL endpoints** - Can wipe entire database
5. **No Request Size Limits** - Vulnerable to large payload attacks

Consider implementing these security measures before deploying to production.

