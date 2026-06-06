# ApplyFlow - Domain Model Overview

## Introduction

ApplyFlow is a job application tracking system designed to help users manage their job search process.

The goal is not only to store job applications but also to track the complete history of communication, interviews, and application progress.

---

# Main Entities

The system consists of four main entities:

```text
Company
├── JobApplication
│     └── ApplicationEvent
│
└── ContactPerson
```

Each entity represents a different aspect of the job search process.

---

# Company

Represents a company where the user may apply for one or more positions.

Examples:

* SEN Systems
* ESET
* Alanata

## Responsibilities

Store company-related information:

* Company name
* City
* Website
* Notes

## Relationships

```text
Company 1 --- N JobApplication
Company 1 --- N ContactPerson
```

A company can have multiple job applications and multiple contact persons.

---

# JobApplication

Represents a specific job application submitted to a company.

Examples:

* Fullstack Developer
* Junior Java Developer
* Mobile Software Engineer

## Responsibilities

Store application-related information:

* Position title
* Application status
* Work mode
* Salary range
* Application source
* Application date
* Notes

## Relationships

```text
Company 1 --- N JobApplication
JobApplication 1 --- N ApplicationEvent
```

A single company can have multiple applications.

A single application can contain multiple events.

---

# ContactPerson

Represents a person associated with a company.

Examples:

* Recruiter
* HR representative
* Team Lead

## Responsibilities

Store contact information:

* Name
* Email
* Phone number
* Role
* Notes

## Relationships

```text
Company 1 --- N ContactPerson
```

A company may have multiple contact persons.

---

# ApplicationEvent

Represents a historical event related to a job application.

This entity acts as a timeline or audit log of the application process.

Examples:

* Application submitted
* HR response received
* Interview scheduled
* Technical interview completed
* Offer received
* Application rejected

## Responsibilities

Store:

* Event type
* Event date
* Notes

## Relationships

```text
JobApplication 1 --- N ApplicationEvent
```

Each application may contain multiple events.

---

# Why ApplicationEvent Exists

The current status of a job application only tells us where the application is now.

Example:

```text
Status = Interview
```

This does not answer:

* When was the application submitted?
* How many interviews took place?
* Was a follow-up sent?
* What happened before the interview?

The ApplicationEvent entity solves this problem by storing the complete history of the application.

Example timeline:

```text
2026-05-28 Applied
2026-05-29 HR Reply
2026-06-02 Interview Scheduled
2026-06-06 Interview
```

Current state:

```text
Status = Interview
```

History:

```text
ApplicationEvents
```

---

# Domain Rule

A JobApplication stores the current state.

An ApplicationEvent stores the history that led to that state.

```text
Current Status = Where we are now

Application Events = How we got here
```

This separation keeps the model simple while preserving the complete application history.

---

# Benefits of the Design

* Clear separation of responsibilities
* Supports timeline visualization
* Easy to build dashboards and statistics
* Flexible for future extensions
* Mimics real-world recruitment workflows
* Demonstrates relational database modeling concepts

This model serves as the foundation for the ApplyFlow backend API, database design, and future React frontend implementation.
