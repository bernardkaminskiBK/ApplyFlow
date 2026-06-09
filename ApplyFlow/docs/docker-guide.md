# Docker + SQL Server + .NET API Setup Guide

## Overview

This document summarizes the basic setup process for running a .NET Web API and SQL Server using Docker Compose, as well as applying Entity Framework Core migrations from the host machine.

---

# 1. Docker Compose Configuration

```yaml
services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: applyflow-sqlserver
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: "Your_Strong_Password123!"
    ports:
      - "14333:1433"
    volumes:
      - applyflow_sql_data:/var/opt/mssql

  api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: applyflow-api
    depends_on:
      - sqlserver
    environment:
      ASPNETCORE_ENVIRONMENT: "Development"
      ASPNETCORE_URLS: "http://+:8080"
      ConnectionStrings__DefaultConnection: "Server=sqlserver,1433;Database=ApplyFlowDb;User Id=sa;Password=Your_Strong_Password123!;TrustServerCertificate=True;"
    ports:
      - "8080:8080"

volumes:
  applyflow_sql_data:
```

---

# 2. Connection Strings

## API Container → SQL Server Container

Containers communicate through the Docker network using the service name:

```text
Server=sqlserver,1433
```

## Host Machine → SQL Server Container

Applications running on Windows connect through the published port:

```text
Server=localhost,14333
```

Example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,14333;Database=ApplyFlowDb;User Id=sa;Password=Your_Strong_Password123!;TrustServerCertificate=True;"
  }
}
```

---

# 3. Starting Docker Compose

Build and start all containers:

```powershell
docker compose up --build
```

Run in background:

```powershell
docker compose up --build -d
```

Stop and remove containers, networks, and volumes:

```powershell
docker compose down -v
```

---

# 4. Connecting to SQL Server

Open a SQL command prompt inside the SQL Server container:

```powershell
docker exec -it applyflow-sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "Your_Strong_Password123!" -C
```

List databases:

```sql
SELECT name FROM sys.databases;
GO
```

Create a database manually:

```sql
CREATE DATABASE ApplyFlowDb;
GO
```

Exit:

```sql
EXIT
```

---

# 5. Running Entity Framework Migrations

Navigate to the folder containing the project (.csproj):

```powershell
cd path/to/project
```

Apply migrations:

```powershell
dotnet ef database update
```

If no migrations exist yet:

```powershell
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

# 6. How EF Migrations Work with Docker

A common misconception is that migrations run inside Docker.

In reality:

```text
PowerShell
    ↓
dotnet ef database update
    ↓
Reads DbContext and migrations
    ↓
Uses connection string
    ↓
Connects to SQL Server running in Docker
    ↓
Applies schema changes
```

The migration command runs locally on the host machine, but updates the database located inside the Docker container.

---

# 7. Useful Verification Commands

Check running containers:

```powershell
docker ps
```

View container logs:

```powershell
docker logs applyflow-api
docker logs applyflow-sqlserver
```

Inspect API environment variables:

```powershell
docker exec -it applyflow-api printenv
```

Show connection string inside the API container:

```powershell
docker exec -it applyflow-api printenv | Select-String ConnectionStrings
```

---

# 8. Common Issues

## EULA Not Accepted

```text
The SQL Server End-User License Agreement (EULA) must be accepted.
```

Solution:

```yaml
ACCEPT_EULA: "Y"
```

---

## Login Failed for User 'sa'

Verify:

* Password in Docker Compose
* Password in API connection string
* Password used in sqlcmd

All values must match exactly.

---

## Database Does Not Exist

```text
Cannot open database 'ApplyFlowDb'
```

Create the database:

```sql
CREATE DATABASE ApplyFlowDb;
GO
```

Or allow EF Core to create it through migrations.

---

## Tables Do Not Exist

Database exists but migrations were never applied.

Run:

```powershell
dotnet ef database update
```

---

# 9. Useful URLs

Swagger UI:

```text
http://localhost:8080/swagger
```

API Base URL:

```text
http://localhost:8080
```

SQL Server from host machine:

```text
localhost,14333
```

---

# Summary

Architecture overview:

```text
+--------------------+
| Windows Host       |
|                    |
| dotnet ef          |
| Browser            |
| SSMS / ADS         |
+---------+----------+
          |
          v
+--------------------+
| Docker Network     |
|                    |
| applyflow-api      |
| applyflow-sqlserver|
+---------+----------+
          |
          v
+--------------------+
| SQL Server         |
| ApplyFlowDb        |
+--------------------+
```

The API communicates with SQL Server using:

```text
Server=sqlserver,1433
```

The host machine communicates with SQL Server using:

```text
Server=localhost,14333
```

Entity Framework migrations run on the host machine and update the database inside the Docker container through the configured connection string.
