# Quick Reference

## Local Development

```bash
# Start database
npm run db:up

# Run migrations
npm run db:migrate

# Seed data
npm run db:seed

# Start dev server (localhost only)
npm run dev

# Start dev server (accessible from mobile on same WiFi)
npm run dev:mobile

# Open Prisma Studio (visual DB browser)
npm run db:studio
```

## Database

```bash
# Stop database
npm run db:down

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Push schema changes without migration
npm run db:push
```

## Production

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## Mobile Access

1. Run `npm run dev:mobile`
2. Find your IP: `ipconfig getifaddr en0` (Mac) or `ipconfig` (Windows)
3. Open `http://<YOUR-IP>:3000` on your phone's browser

## Common Issues

| Problem | Solution |
|---|---|
| Port 5433 in use | Change port in `docker-compose.yml` and `.env` |
| Can't connect from phone | Make sure phone and computer are on same WiFi |
| Prisma errors | Run `npx prisma generate` |
| Build fails | Check `DATABASE_URL` is set correctly |
