# Client area API (for the Calagopus panel extension)

The website's login, register and dashboard talk to ONE base URL (`VITE_API_URL`,
for example `https://panel.dravexhost.xyz/api/client`). All calls use JSON and a
**cookie session** (`credentials: "include"`), so the extension should set an
`HttpOnly; Secure; SameSite=Lax` cookie on login and send CORS headers allowing the
website origin with credentials (or serve both under one domain through a reverse proxy).

Errors: reply with a non-2xx status and `{ "error": "Readable message" }`. The site shows that message.

| Method | Path             | Body                              | Success reply                      |
| ------ | ---------------- | --------------------------------- | ---------------------------------- |
| GET    | `/me`            |                                   | `User` (401 when signed out)       |
| POST   | `/auth/login`    | `{ email, password }`             | `User`                             |
| POST   | `/auth/register` | `{ username, email, password }`   | `User` (and signs the user in)     |
| POST   | `/auth/logout`   |                                   | 204                                |
| POST   | `/auth/forgot`   | `{ email }`                       | 204 (always, to not reveal emails) |
| PATCH  | `/me`            | `{ username?, email?, discord? }` | `User`                             |
| POST   | `/me/password`   | `{ current, next }`               | 204                                |
| GET    | `/services`      |                                   | `Service[]`                        |
| GET    | `/invoices`      |                                   | `Invoice[]`                        |
| GET    | `/tickets`       |                                   | `Ticket[]`                         |
| POST   | `/tickets`       | `{ subject, category, message }`  | `Ticket`                           |

## Shapes (see `src/lib/api.ts`)

```ts
User     { id, username, email, discord?, createdAt }
Service  { id, name, game: "minecraft"|"rust"|"fivem"|"hytale"|"nodejs"|"v2ray"|"other",
           plan, status: "active"|"pending"|"suspended"|"cancelled",
           price /* LKR per month */, nextDue? /* ISO date */, panelUrl? /* link to this server in the panel */ }
Invoice  { id, number, description, date, due, amount /* LKR */, status: "paid"|"unpaid"|"overdue"|"cancelled" }
Ticket   { id, subject, category, status: "open"|"answered"|"closed", updated, message? }
```

Server side the extension must: hash passwords properly (argon2/bcrypt), rate-limit
`/auth/*`, validate every field, and only ever return the signed-in user's own data.
