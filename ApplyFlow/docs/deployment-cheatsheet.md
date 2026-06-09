# ApplyFlow Docker + Hetzner Quick Deployment Cheat Sheet

## 1. Connect to VPS

```bash
ssh root@<SERVER_IP>
```

or via PuTTY.

---

## 2. Verify Docker Installation

```bash
docker --version

docker compose version
```

---

## 3. Clone Repository

First time:

```bash
git clone <REPOSITORY_URL>

cd ApplyFlow/ApplyFlow
```

Update existing deployment:

```bash
git pull
```

---

## 4. Start Application

Build and start:

```bash
docker compose up --build -d
```

Start existing containers:

```bash
docker compose up -d
```

Stop containers:

```bash
docker compose down
```

Remove containers and volumes:

```bash
docker compose down -v
```

---

## 5. Verify Running Containers

```bash
docker ps
```

Expected:

```text
applyflow-web
applyflow-api
applyflow-sqlserver
```

---

## 6. View Logs

API logs:

```bash
docker logs applyflow-api
```

Live API logs:

```bash
docker logs -f applyflow-api
```

Compose logs:

```bash
docker compose logs api
```

---

## 7. SQL Server Access

Open SQL console:

```bash
docker exec -it applyflow-sqlserver \
/opt/mssql-tools18/bin/sqlcmd \
-S localhost \
-U sa \
-P "Your_Strong_Password123!" \
-C
```

Useful SQL commands:

```sql
SELECT name FROM sys.databases;
GO
```

```sql
USE ApplyFlowDb;
GO
```

```sql
SELECT name FROM sys.tables;
GO
```

Exit:

```sql
QUIT
```

---

## 8. Common Docker Commands

List containers:

```bash
docker ps
```

List all containers:

```bash
docker ps -a
```

List images:

```bash
docker images
```

Restart API:

```bash
docker restart applyflow-api
```

Restart everything:

```bash
docker compose restart
```

---

## 9. Application URLs

Frontend:

```text
http://<SERVER_IP>:3000
```

Swagger:

```text
http://<SERVER_IP>:8080/swagger
```

API:

```text
http://<SERVER_IP>:8080/api
```

---

## 10. Deployment Workflow

Local machine:

```bash
git add .
git commit -m "Some changes"
git push
```

Server:

```bash
git pull

docker compose up --build -d
```

Verify:

```bash
docker ps
```

Open:

```text
http://<SERVER_IP>:3000
```

---

## 11. EF Core Automatic Migration

Program.cs:

```csharp
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider
        .GetRequiredService<ApplyFlowDbContext>();

    dbContext.Database.Migrate();
}
```

Recommended:

```csharp
sqlOptions.EnableRetryOnFailure();
```

---

## 12. Most Common Problems

### Frontend cannot reach API

Wrong:

```text
http://localhost:8080
```

Correct:

```text
http://<SERVER_IP>:8080/api
```

---

### SQL Login Failed

Check:

```bash
docker logs applyflow-api
```

Verify:

```text
Connection String
SA Password
Database Name
```

---

### Changes Not Visible

Always rebuild:

```bash
docker compose up --build -d
```
