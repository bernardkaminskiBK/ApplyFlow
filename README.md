# ApplyFlow Backend

ApplyFlow Backend is a REST API built with ASP.NET Core and Entity Framework Core.

The purpose of this project is to demonstrate the implementation of a typical business application backend, including CRUD operations, validation, entity relationships, DTO-based API design and RESTful endpoints.

## Technologies

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* Swagger / OpenAPI
* Dependency Injection
* DTO Pattern

## Features

### Companies

* Create company
* Update company
* Delete company
* Get company details
* List companies

### Job Applications

* Create job application
* Update application
* Delete application
* Get application details
* List applications

### Application Events

* Create application events
* Update events
* Delete events
* Get event details
* List events

### Contact Persons

* Create contacts
* Update contacts
* Delete contacts
* Get contact details
* List contacts

## Architecture

The project follows a simple layered architecture:

```text
Controllers
    ↓
Services
    ↓
Repositories / DbContext
    ↓
Database
```

The API uses DTOs to separate domain entities from public API contracts.

Examples:

* CreateCompanyRequest
* UpdateCompanyRequest
* CompanyResponse
* CreateJobApplicationRequest
* ApplicationEventResponse

## Validation

Validation is implemented using Data Annotations.

Examples:

* Required
* StringLength
* Range
* EmailAddress

Validation errors are automatically returned as HTTP 400 responses.

## Error Handling

Global exception handling is used to provide consistent API responses.

Examples:

* Validation errors
* Entity not found scenarios
* Business rule violations

## API Documentation

Swagger / OpenAPI is available for testing and exploring endpoints.

The API documentation includes:

* Request schemas
* Response schemas
* Validation rules
* Example payloads

## Database Design

The system contains four main business entities:

* Company
* JobApplication
* ApplicationEvent
* ContactPerson

Relationships:

Company
├── JobApplications
└── ContactPersons

JobApplication
└── ApplicationEvents

## Learning Goals

This project was created to practice and demonstrate:

* ASP.NET Core Web API development
* Entity Framework Core
* REST API design
* DTO mapping
* Validation
* Entity relationships
* CRUD operations
* Integration with a React frontend
* Full-stack application development
