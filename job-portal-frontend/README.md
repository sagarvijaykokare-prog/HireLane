# HireLane – Job Portal Frontend (Next.js, JavaScript)

Next.js 14 (App Router) · React · Tailwind CSS · Axios · Context API · Lucide icons.
Talks **only** to your API Gateway (`http://localhost:8080`).

## Run
```bash
npm install
cp .env.local.example .env.local     # Windows: copy .env.local.example .env.local
npm run dev                          # http://localhost:3000
# production check:  npm run build && npm start
```
Start Eureka → Auth/Job/Application/Profile services → API Gateway first.

## CORS (you will probably need this)
The browser calls `localhost:8080` from `localhost:3000`. Allow that origin in the **API Gateway**
(`spring.cloud.gateway.server.webmvc.globalcors` or a `CorsConfigurationSource` bean in the gateway's
Spring Security config), allowing methods GET/POST/PUT/DELETE/OPTIONS and the `Authorization` + `Content-Type` headers.

## Structure
```
src/app/(public)/   home, about, jobs, jobs/[id], login, register
src/app/dashboard/  user area  (overview, jobs, applications, profile)
src/app/admin/      admin area (overview, jobs, jobs/new, jobs/[id]/edit, applications)
src/components/     common, layout, jobs, profile, dashboard
src/context/        AuthContext (token, user, roles)
src/services/       api.js (axios + interceptors) + one file per backend service
src/config/         endpoints.js (ALL paths + JWT claim names), constants.js (enum values)
src/utils/          jwt, validators, format
```

## Backend contract used (from your code) 
| Feature | Gateway path |
|---|---|
| Login `{email,password}` → `{accessToken}` | `POST /api/auth/login` |
| Register `{email,password}` → `{message}` | `POST /api/auth/register` |
| Jobs | `/api/job` (GET, POST), `/api/job/{id}` (GET, PUT, DELETE) |
| Applications | `/api/application`, `/api/application/{id}` |
| Profile | `/api/profile` (GET, POST, PUT, DELETE) + `?userId=` |

> Your task text said `/api/jobs`, `/api/applications`, `/api/profiles`, but your gateway routes are
> **singular** (`/api/job/**`, `/api/application/**`, `/api/profile/**`). The app follows the gateway config.
> If your controllers differ, edit `src/config/endpoints.js` only.

## ⚠️ Things I could NOT verify – please confirm
1. **JWT claims.** I haven't seen your token. `src/config/endpoints.js → JWT_CLAIMS` lists claim names tried for roles
   (`authorities`, `roles`, `role`, `scope`, `scp`) and user id (`userId`, `user_id`, `uid`, `id`, `sub`).
   Decode a real token at jwt.io and adjust. Roles may be strings, space-separated, or `{authority}` objects.
2. **Numeric user id.** Applications need `applicantId` and profiles need `userId`. If your token has no numeric id claim,
   `user.userId` is `null`: applying will show an error, and profile calls send no `userId`. Add a `userId` claim in Auth Service.
3. **Job response fields.** Assumed to match `JobCreateDto` plus `id`. Lists may be a plain array or a Spring `Page` (`content`).
4. **Enum values** (employment type, work mode, job status, application status) are guesses in `src/config/constants.js`.
5. **Update application status:** assumed `PUT /api/application/{id}` with body `{ "status": "ACCEPTED" }`.
   Change in `applicationService.js` if different.
6. **"My applications":** frontend sends `?applicantId=` and also filters client-side. A normal user must NOT be able to
   list everyone's applications — the backend must enforce this.
7. **Public job listing:** `GET /api/job` is called without special handling. If the gateway requires a JWT for it, logged-out
   visitors will see "Jobs could not be loaded"; permit GET on `/api/job/**` in the gateway security config.
8. **`/api/admin/**`** is routed to Auth Service but no contract was shared, so no screen uses it.
9. Error messages are read from `message`, `error`, a plain string, or a field-validation map.

## Security notes (required before production)
- **Profile `userId` parameter is not security.** Anyone can send another id. The backend must read the user from the
  JWT (`sub`/claim via `@AuthenticationPrincipal`/`Jwt`) and ignore client-supplied ids. After that change, delete the
  `params` in `src/services/profileService.js` — nothing else changes. Same applies to `applicantId` on applications.
- **Authorization lives in the backend.** `ProtectedRoute` and hidden buttons are UX only. Gateway/services must enforce
  `ROLE_ADMIN` on job POST/PUT/DELETE, application PUT, and all-applications GET.
- **Token storage:** the JWT is kept in `localStorage` (simple, but readable by any XSS). For production, prefer an
  httpOnly cookie set by the backend.
- 401 responses clear the token and send the user to `/login`; 403 shows a "no permission" message.

## Auth flow
Login → store `accessToken` → decode roles from the JWT → `ROLE_ADMIN` → `/admin`, otherwise `/dashboard`.
`/dashboard/*` needs a login; `/admin/*` needs `ROLE_ADMIN`; `/`, `/jobs`, `/about`, `/login`, `/register` are public.
Expired tokens are detected on load and on every 401.
