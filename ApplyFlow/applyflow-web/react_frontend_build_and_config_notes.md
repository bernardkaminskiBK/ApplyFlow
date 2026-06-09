# React Frontend Build and Configuration Notes

## 1. Development vs Preview

During development, the frontend usually runs with a development server:

```powershell
npm run dev
```

In this mode, Vite/React serves the application dynamically and can use development-specific configuration.

After building the project, the production files are generated into the `dist` folder:

```powershell
npm run build
```

The built version can be tested locally with:

```powershell
npm run preview
```

If the application works in development mode but not in preview mode, the problem is often related to configuration, API URLs, environment variables, CORS, or HTTP/HTTPS differences.

---

## 2. Important Difference

Development mode:

```text
React Dev Server
    ↓
API URL from development config
    ↓
.NET API
```

Preview / production build:

```text
Built React files
    ↓
API URL baked into build/config
    ↓
.NET API
```

This means that the frontend build must know the correct API address.

---

## 3. API Base URL

When the .NET API runs in Docker and exposes port `8080`, the frontend should call:

```text
http://localhost:8080
```

Example API URL:

```text
http://localhost:8080/api/companies
```

Swagger:

```text
http://localhost:8080/swagger
```

---

## 4. Environment / Config File

If the frontend uses a config file or environment variable for the API base URL, make sure it points to the Docker API address:

```text
http://localhost:8080
```

Example:

```env
VITE_API_BASE_URL=http://localhost:8080
```

In Vite, environment variables used by the frontend usually need the `VITE_` prefix.

Example usage:

```ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

---

## 5. Rebuilding After Config Changes

If the API URL or environment configuration changes, rebuild the frontend:

```powershell
npm run build
```

Then test the production build:

```powershell
npm run preview
```

The production build may still use an old value if it was built before the config change.

---

## 6. Docker + API + Frontend Flow

Final working flow:

```text
Browser
    ↓
React Frontend
    ↓
.NET API running in Docker
    ↓
Entity Framework Core
    ↓
SQL Server running in Docker
```

The frontend calls the API through the host machine:

```text
http://localhost:8080
```

The API calls SQL Server through the Docker network:

```text
Server=sqlserver,1433
```

---

## 7. Useful Commands

Install dependencies:

```powershell
npm install
```

Run frontend in development mode:

```powershell
npm run dev
```

Build frontend:

```powershell
npm run build
```

Preview production build:

```powershell
npm run preview
```

Start Docker backend:

```powershell
docker compose up --build
```

Start Docker backend in detached mode:

```powershell
docker compose up --build -d
```

Stop Docker backend:

```powershell
docker compose down
```

---

## 8. Common Problems

## Development Works, Preview Does Not

Possible causes:

- API URL is different in production build
- Environment variable was changed but frontend was not rebuilt
- CORS is blocking the request
- Frontend is calling the wrong port
- Frontend is calling HTTPS while API runs on HTTP
- API container is not running
- Docker port mapping is missing or incorrect

---

## API URL Is Wrong

Check the frontend configuration.

Expected API URL:

```text
http://localhost:8080
```

Not:

```text
https://localhost:xxxx
```

and not:

```text
http://sqlserver:1433
```

`sqlserver:1433` is only for container-to-container communication, not for the browser.

---

## CORS Error

If the browser blocks the request because of CORS, the .NET API must allow the frontend origin.

Example development origins:

```text
http://localhost:5173
http://localhost:4173
```

Typical Vite ports:

```text
5173 = dev server
4173 = preview server
```

---

## 9. Summary

Development mode and preview mode can behave differently because the preview mode uses the production build.

When changing frontend API configuration:

```text
Change config
    ↓
npm run build
    ↓
npm run preview
    ↓
test browser
```

The working API address for the frontend is:

```text
http://localhost:8080
```

The working SQL Server address for the .NET API container is:

```text
Server=sqlserver,1433
```
