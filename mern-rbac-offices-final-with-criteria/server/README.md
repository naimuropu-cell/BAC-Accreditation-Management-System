# RBAC Offices Server

## Quick Start
```bash
cp .env.example .env
npm install
npm run dev
```

Create a MongoDB database (local or Atlas) and set `MONGODB_URI` in `.env`.

### Hardcoded Users (for demo)
- Admin: username=`admin`, password=`admin`, role=`ADMIN`
- IT Office: username=`IT Office`, password=`IT Office`, role=`IT`
- Proctorial Office: username=`Proctorial Office`, password=`Proctorial Office`, role=`PROCTORIAL`
