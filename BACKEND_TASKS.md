# 🛡️ Sentinel Hub — Backend Engineering Tasks

> Laravel API backend for the Postal Security Incident Reporting Platform (PSIRP).
> This API serves both the **Next.js web application** and the **Flutter mobile application**.

---

## Phase Overview

| Phase        | Focus Area                            | Dependencies |
| ------------ | ------------------------------------- | ------------ |
| **Phase 1**  | Project Setup & Foundation            | None         |
| **Phase 2**  | Authentication & User Management      | Phase 1      |
| **Phase 3**  | Organisation & Master Data Management | Phase 2      |
| **Phase 4**  | Incident Reporting & Draft Management | Phase 3      |
| **Phase 5**  | Case Assignment & Review Workflow     | Phase 4      |
| **Phase 6**  | Clarification (RFI) System            | Phase 5      |
| **Phase 7**  | Escalation & LEA Workflow             | Phase 5      |
| **Phase 8**  | Notifications & Announcements         | Phase 2      |
| **Phase 9**  | Analytics & Dashboard APIs            | Phase 4      |
| **Phase 10** | Audit Logging & System Administration | Phase 2      |
| **Phase 11** | File Storage & Export                 | Phase 4      |
| **Phase 12** | Real-Time Broadcasting & Queue Jobs   | Phase 8      |
| **Phase 13** | Testing & Quality Assurance           | All Phases   |

---

## Phase 1 — Project Setup & Foundation

> Scaffold the Laravel project, configure the database, define all enums, traits, and base architecture.

### 1.1 Project Initialisation

- [x] Create new Laravel project
- [x] Configure `.env` for MySQL/PostgreSQL, Redis, S3, mail, and queue
- [x] Install and configure required packages:
  - `laravel/sanctum` — API token authentication
  - `laravel/reverb` or `pusher/pusher-php-server` — broadcasting
  - `predis/predis` — Redis client
  - `league/flysystem-aws-s3-v3` — S3 file storage
  - `spatie/laravel-query-builder` — API query filtering/sorting
  - `spatie/laravel-data` — DTOs (optional)
- [x] Configure CORS for Next.js and Flutter origins
- [x] Configure rate limiting in `RouteServiceProvider`
- [x] Set up API versioning structure (`routes/api.php` → `api/v1/`)

### 1.2 Base Architecture

- [x] Create `HasUuid` trait (UUID primary key, disable auto-increment)
- [x] Create `HasAuditFields` trait (`created_by`, `updated_by`, `deleted_by` auto-fill from `auth()->id()`)
- [ ] Create `BelongsToOrganisation` trait (global scope for multi-tenant filtering)
- [x] Create base `ApiController` with standardised JSON response methods:
  - `successResponse($data, $message, $statusCode)`
  - `errorResponse($message, $statusCode, $errors)`
  - `paginatedResponse($paginator)`
- [x] Create base `BaseService` abstract class
- [x] Create `ApiException` and `ExceptionHandler` for consistent error formatting

### 1.3 Enum Definitions

Create all integer-backed PHP Enums in `App\Enums`:

- [ ] `RoleEnum` — SuperAdmin=1, SystemAdmin=2, Investigator=3, Supervisor=4, CaseOfficer=5, LicenseeAdmin=6, LicenseeReporter=7, LeaViewer=8
- [ ] `UserStatusEnum` — Active=1, Inactive=2, Suspended=3
- [ ] `OrganisationStatusEnum` — Active=1, Suspended=2, Deactivated=3
- [ ] `IncidentStatusEnum` — Draft=1, Submitted=2, InReview=3, RFISent=4, UnderInvestigation=5, Escalated=6, Closed=7
- [ ] `SeverityEnum` — Low=1, Medium=2, High=3, Critical=4
- [ ] `ContainmentEnum` — Yes=1, No=2, Partial=3
- [ ] `YesNoEnum` — Yes=1, No=2
- [ ] `ClarificationStatusEnum` — Open=1, Responded=2, Closed=3
- [ ] `MessageStatusEnum` — Sent=1, Read=2, Responded=3
- [ ] `TimelineEventTypeEnum` — Submission=1, System=2, StatusChange=3, Assignment=4, Escalation=5, Closure=6
- [ ] `EscalationDecisionEnum` — Pending=1, Approved=2, Rejected=3
- [ ] `NotificationTypeEnum` — DraftExpiry=1, ClarificationRequested=2, StatusUpdated=3, CaseEscalated=4, AssignmentReceived=5, SystemAlert=6
- [ ] `PriorityEnum` — Normal=1, Important=2, Urgent=3

### 1.4 Database Migrations

Create all migrations in dependency order:

- [ ] `create_organisations_table`
- [ ] `create_users_table` (with `organisation_id` FK, `role` integer, `mfa_secret`, `language`)
- [ ] `create_branches_table`
- [ ] `create_incident_types_table`
- [ ] `create_incidents_table` (all 40+ columns from schema)
- [ ] `create_incident_documents_table`
- [ ] `create_incident_assignments_table`
- [ ] `create_incident_assessments_table`
- [ ] `create_incident_assessment_comments_table`
- [ ] `create_clarification_threads_table`
- [ ] `create_clarification_messages_table`
- [ ] `create_incident_timelines_table`
- [ ] `create_escalations_table`
- [ ] `create_agencies_table`
- [ ] `create_escalation_agencies_table`
- [ ] `create_notifications_table`
- [ ] `create_announcements_table`
- [ ] `create_audit_logs_table`
- [ ] `create_master_data_table`

### 1.5 Eloquent Models

Create all models with proper `$fillable`, `$casts`, relationships, and traits:

- [ ] `Organisation` — hasMany: users, incidents, branches
- [ ] `User` — belongsTo: organisation | hasMany: incidents, assignments, notifications
- [ ] `Branch` — belongsTo: organisation
- [ ] `IncidentType` — hasMany: incidents
- [ ] `Incident` — belongsTo: organisation, user, incidentType, branch | hasMany: documents, assignments, assessments, threads, timelines, escalations
- [ ] `IncidentDocument` — belongsTo: incident, user
- [ ] `IncidentAssignment` — belongsTo: incident, assignedTo(user), assignedBy(user)
- [ ] `IncidentAssessment` — belongsTo: incident, user | hasMany: comments
- [ ] `IncidentAssessmentComment` — belongsTo: assessment, user
- [ ] `ClarificationThread` — belongsTo: incident, user | hasMany: messages
- [ ] `ClarificationMessage` — belongsTo: thread, user
- [ ] `IncidentTimeline` — belongsTo: incident, user
- [ ] `Escalation` — belongsTo: incident, proposedBy(user), supervisor(user) | hasMany: escalationAgencies
- [ ] `Agency` — hasMany: escalationAgencies
- [ ] `EscalationAgency` — belongsTo: escalation, agency, acknowledgedBy(user)
- [ ] `Notification` — belongsTo: user | morphTo: reference
- [ ] `Announcement` — belongsTo: publishedBy(user)
- [ ] `AuditLog` — belongsTo: user | morphTo: auditable
- [ ] `MasterData` — standalone

### 1.6 Database Seeders

- [ ] `RoleSeeder` — (roles are enum-based, no table needed — but seed demo users per role)
- [ ] `OrganisationSeeder` — Seed 5 organisations (Pos Malaysia, J&T Express, CityLink, Global Express Logistics, DHL eCommerce)
- [ ] `BranchSeeder` — Seed 2-3 branches per organisation
- [ ] `UserSeeder` — Seed 1 demo user per role with known credentials
- [ ] `IncidentTypeSeeder` — Seed: Theft, Loss, Dangerous Goods, Tampering, Fraud, Unauthorised Access, Data Breach
- [ ] `AgencySeeder` — Seed: PDRM, KASTAM, KDN, MOH, KPDNKK, MKN, MOT, AKPS, Jabatan Perhilitan, Ministry of Communications and Digital, Ministry of Natural Resources and Environmental Sustainability
- [ ] `MasterDataSeeder` — Seed severity levels, SLA rules, assistance types
- [ ] `IncidentSeeder` — Seed 20-30 sample incidents across various statuses and organisations

---

## Phase 2 — Authentication & User Management

> Implement Sanctum token authentication, MFA/OTP, password reset, and user profile management.

### 2.1 Authentication

**Service:** `AuthService`

- [ ] `login(email, password, role)` — Validate credentials, verify role matches, generate temporary MFA token, generate and store OTP
- [ ] `verifyOtp(temporaryToken, otp)` — Validate OTP, issue full Sanctum bearer token, record `last_login_at`
- [ ] `logout()` — Revoke current token
- [ ] `forgotPassword(email)` — Generate password reset token, dispatch email notification job
- [ ] `resetPassword(token, email, password)` — Validate token, update password, revoke all existing tokens

**Form Requests:**

- [ ] `LoginRequest` — email (required|email), password (required), role (required|integer, valid RoleEnum)
- [ ] `VerifyOtpRequest` — otp (required|digits:6)
- [ ] `ForgotPasswordRequest` — email (required|email|exists:users)
- [ ] `ResetPasswordRequest` — token (required), email (required|email), password (required|min:8|confirmed, must contain uppercase, lowercase, number, special char)

**Controller:** `AuthController`

- [ ] `POST /api/v1/auth/login`
- [ ] `POST /api/v1/auth/verify-otp`
- [ ] `POST /api/v1/auth/logout`
- [ ] `POST /api/v1/auth/forgot-password`
- [ ] `POST /api/v1/auth/reset-password`
- [ ] `GET  /api/v1/auth/me` — Return authenticated user with role, organisation, and permissions

**Tests:**

- [ ] Login with valid credentials returns temporary token
- [ ] Login with wrong password returns 401
- [ ] Login with mismatched role returns 403
- [ ] OTP verification with correct code returns bearer token
- [ ] OTP verification with wrong code returns 422
- [ ] Logout revokes token
- [ ] Forgot password sends email
- [ ] Reset password with valid token updates password
- [ ] `/me` returns authenticated user data

### 2.2 User Profile Management

**Service:** `UserProfileService`

- [ ] `getProfile(userId)` — Return user profile with organisation
- [ ] `updateProfile(userId, data)` — Update name, phone, designation, language, alternative contacts
- [ ] `changePassword(userId, currentPassword, newPassword)` — Validate current password, update, revoke other tokens

**Form Requests:**

- [ ] `UpdateProfileRequest` — name, phone, designation, language, alternative_phone, alternative_email, fax_number
- [ ] `ChangePasswordRequest` — current_password (required), password (required|min:8|confirmed)

**Controller:** `ProfileController`

- [ ] `GET    /api/v1/profile`
- [ ] `PUT    /api/v1/profile`
- [ ] `PUT    /api/v1/profile/password`

### 2.3 User Management (Admin)

**Service:** `UserService`

- [ ] `list(filters)` — Paginated list with filter by role, status, organisation. Scoped by admin permissions
- [ ] `create(data)` — Create user, assign role and organisation, send welcome email
- [ ] `show(userId)` — Get user details with organisation
- [ ] `update(userId, data)` — Update user details, role, status
- [ ] `delete(userId)` — Soft delete user
- [ ] `activate(userId)` / `deactivate(userId)` / `suspend(userId)` — Status transitions

**Policy:** `UserPolicy`

- [ ] `viewAny` — SuperAdmin, SystemAdmin, LicenseeAdmin (scoped to own org)
- [ ] `view` — SuperAdmin, SystemAdmin, LicenseeAdmin (own org only), self
- [ ] `create` — SuperAdmin, SystemAdmin, LicenseeAdmin (reporters only within own org)
- [ ] `update` — SuperAdmin, SystemAdmin, LicenseeAdmin (own org reporters only)
- [ ] `delete` — SuperAdmin, SystemAdmin

**Form Requests:**

- [ ] `StoreUserRequest` — name, email (unique), password, role, organisation_id (required_if role is Licensee), designation, phone
- [ ] `UpdateUserRequest` — name, designation, phone, status, role (if admin)

**Controller:** `UserController`

- [ ] `GET    /api/v1/users` — List users (paginated, filterable)
- [ ] `POST   /api/v1/users` — Create user
- [ ] `GET    /api/v1/users/{id}` — Show user
- [ ] `PUT    /api/v1/users/{id}` — Update user
- [ ] `DELETE /api/v1/users/{id}` — Soft delete user

---

## Phase 3 — Organisation & Master Data Management

> CRUD for organisations, branches, incident types, agencies, and master data.

### 3.1 Organisation Management

**Service:** `OrganisationService`

- [ ] `list(filters)` — Paginated list with search, status filter
- [ ] `create(data)` — Register new licensee organisation
- [ ] `show(orgId)` — Get details with branch count, user count, incident stats
- [ ] `update(orgId, data)` — Update registration details
- [ ] `delete(orgId)` — Soft delete
- [ ] `activate/suspend/deactivate(orgId)` — Status transitions

**Policy:** `OrganisationPolicy`

- [ ] `viewAny` — SuperAdmin, SystemAdmin, Investigator
- [ ] `view` — SuperAdmin, SystemAdmin, Investigator, LicenseeAdmin (own org)
- [ ] `create` — SuperAdmin, SystemAdmin
- [ ] `update` — SuperAdmin, SystemAdmin
- [ ] `delete` — SuperAdmin

**Controller:** `OrganisationController`

- [ ] `GET    /api/v1/organisations`
- [ ] `POST   /api/v1/organisations`
- [ ] `GET    /api/v1/organisations/{id}`
- [ ] `PUT    /api/v1/organisations/{id}`
- [ ] `DELETE /api/v1/organisations/{id}`

### 3.2 Branch Management

**Service:** `BranchService`

- [ ] `list(organisationId, filters)` — List branches for an organisation
- [ ] `create(organisationId, data)` — Add branch
- [ ] `update(branchId, data)` — Edit branch
- [ ] `delete(branchId)` — Soft delete

**Controller:** `BranchController`

- [ ] `GET    /api/v1/organisations/{orgId}/branches`
- [ ] `POST   /api/v1/organisations/{orgId}/branches`
- [ ] `PUT    /api/v1/branches/{id}`
- [ ] `DELETE /api/v1/branches/{id}`

### 3.3 Incident Type Management

**Service:** `IncidentTypeService`

- [ ] `list()` — All active incident types (sorted)
- [ ] `create(data)` — Add incident type
- [ ] `update(id, data)` — Edit
- [ ] `delete(id)` — Soft delete / deactivate
- [ ] `reorder(ids)` — Update sort order

**Controller:** `IncidentTypeController`

- [ ] `GET    /api/v1/incident-types` — Public list (for forms)
- [ ] `POST   /api/v1/incident-types` — Admin only
- [ ] `PUT    /api/v1/incident-types/{id}` — Admin only
- [ ] `DELETE /api/v1/incident-types/{id}` — Admin only

### 3.4 Agency Management

**Service:** `AgencyService`

- [ ] `list()` — All active agencies (sorted, for escalation selection)
- [ ] `create(data)` — Add agency
- [ ] `update(id, data)` — Edit
- [ ] `delete(id)` — Deactivate

**Controller:** `AgencyController`

- [ ] `GET    /api/v1/agencies`
- [ ] `POST   /api/v1/agencies`
- [ ] `PUT    /api/v1/agencies/{id}`
- [ ] `DELETE /api/v1/agencies/{id}`

### 3.5 Master Data Management

**Service:** `MasterDataService`

- [ ] `listByGroup(group)` — Get items by group key
- [ ] `create(data)` — Add item
- [ ] `update(id, data)` — Edit
- [ ] `delete(id)` — Deactivate
- [ ] `reorder(group, ids)` — Update sort order

**Controller:** `MasterDataController`

- [ ] `GET    /api/v1/master-data?group={group}`
- [ ] `POST   /api/v1/master-data`
- [ ] `PUT    /api/v1/master-data/{id}`
- [ ] `DELETE /api/v1/master-data/{id}`

---

## Phase 4 — Incident Reporting & Draft Management

> Core incident CRUD, multi-step form save, draft expiry, submission, and reference number generation.

### 4.1 Incident Service

**Service:** `IncidentService`

- [ ] `list(filters)` — Paginated incident list with filters:
  - `status` (enum or array)
  - `severity` (enum or array)
  - `organisation_id`
  - `reported_by`
  - `incident_type_id`
  - `date_from`, `date_to`
  - `search` (reference number, title)
  - Scoped by user role (reporters see own, licensee admin sees org, MCMC sees all)
- [ ] `create(data)` — Create new incident as Draft, set `draft_expires_at` (14 days), auto-fill reporter info from auth user
- [ ] `show(incidentId)` — Full incident detail with relationships (type, documents, assignments, threads, timelines, assessments, escalations)
- [ ] `update(incidentId, data)` — Update draft incident (only if status=Draft and owned by user)
- [ ] `saveDraft(incidentId, data)` — Partial save (any subset of fields), update `updated_at` as "last auto-save"
- [ ] `submit(incidentId)` — Validate all required fields are filled, generate reference number (`PSIRP-{YEAR}-{SEQUENCE}`), set status to Submitted, set `submitted_at`, create timeline entry, dispatch notification to MCMC officers
- [ ] `delete(incidentId)` — Soft delete draft only (cannot delete submitted incidents)

**Reference Number Generator:**

- [ ] `generateReferenceNumber()` — Format: `PSIRP-YYYY-NNNN` where NNNN is zero-padded sequential per year. Use DB transaction + lock to prevent duplicates.

**Policy:** `IncidentPolicy`

- [ ] `viewAny` — All authenticated users (scoped by role)
- [ ] `view` — Reporter (own), LicenseeAdmin (own org), CaseOfficer (assigned or all), Supervisor, Investigator, SuperAdmin, SystemAdmin, LEA (escalated only)
- [ ] `create` — LicenseeReporter only
- [ ] `update` — Reporter (own drafts only)
- [ ] `delete` — Reporter (own drafts only)
- [ ] `submit` — Reporter (own drafts only)

**Form Requests:**

- [ ] `StoreIncidentRequest` — incident_type_id (required), title, severity
- [ ] `UpdateIncidentRequest` — all form fields (partial allowed for drafts)
- [ ] `SubmitIncidentRequest` — validate all 6 sections are complete (reporter info, incident type, details, actions, documents/links, declaration)

**Controller:** `IncidentController`

- [ ] `GET    /api/v1/incidents` — List incidents (paginated, filterable, role-scoped)
- [ ] `POST   /api/v1/incidents` — Create new draft
- [ ] `GET    /api/v1/incidents/{id}` — Show full detail
- [ ] `PUT    /api/v1/incidents/{id}` — Update draft
- [ ] `PATCH  /api/v1/incidents/{id}/draft` — Auto-save partial draft
- [ ] `POST   /api/v1/incidents/{id}/submit` — Submit draft
- [ ] `DELETE /api/v1/incidents/{id}` — Delete draft

### 4.2 Draft Management

**Service (within IncidentService):**

- [ ] `listDrafts(userId)` — List user's drafts with `draft_expires_at` and days remaining
- [ ] `listOrgDrafts(orgId)` — List organisation-wide drafts (for Licensee Admin)

**Scheduled Command:** `ExpireDraftsCommand`

- [ ] Run daily via `schedule:run`
- [ ] Find all Draft incidents where `draft_expires_at < now()`
- [ ] Soft delete expired drafts
- [ ] Notify reporters of expired drafts

**Endpoints:**

- [ ] `GET /api/v1/incidents?status=1` — Filter by Draft status (reuse list endpoint)

### 4.3 Incident Documents

**Service:** `IncidentDocumentService`

- [ ] `upload(incidentId, file)` — Store file to S3/local, create `incident_documents` record
- [ ] `list(incidentId)` — List all documents for an incident
- [ ] `download(documentId)` — Generate presigned URL or stream file
- [ ] `delete(documentId)` — Soft delete document + remove from storage

**Form Request:**

- [ ] `UploadDocumentRequest` — file (required|file|max:10240|mimes:pdf,doc,docx,jpg,jpeg,png,xlsx,csv)

**Controller:** `IncidentDocumentController`

- [ ] `GET    /api/v1/incidents/{id}/documents`
- [ ] `POST   /api/v1/incidents/{id}/documents`
- [ ] `GET    /api/v1/documents/{id}/download`
- [ ] `DELETE /api/v1/documents/{id}`

---

## Phase 5 — Case Assignment & Review Workflow

> Case officer assignment, status transitions, assessment, and case closure logic.

### 5.1 Case Assignment

**Service:** `CaseAssignmentService`

- [ ] `assignToOfficer(incidentId, officerUserId, assignedByUserId)` — Create assignment, set incident status to InReview, create timeline entry, notify officer
- [ ] `reassign(incidentId, newOfficerUserId, assignedByUserId)` — Deactivate old assignment, create new, create timeline entry
- [ ] `getAssignedCases(officerUserId, filters)` — List officer's active assignments with incident details
- [ ] `getUnassignedCases()` — Inbox: submitted incidents not yet assigned

**Policy:** `IncidentAssignmentPolicy`

- [ ] `assign` — Supervisor, SystemAdmin, SuperAdmin
- [ ] `reassign` — Supervisor, SystemAdmin, SuperAdmin

**Controller:** `CaseAssignmentController`

- [ ] `POST /api/v1/incidents/{id}/assign` — Assign case officer
- [ ] `PUT  /api/v1/incidents/{id}/reassign` — Reassign to different officer
- [ ] `GET  /api/v1/case-officer/inbox` — Unassigned cases (Case Officer view)
- [ ] `GET  /api/v1/case-officer/assigned` — My assigned cases

### 5.2 Case Status Transitions

**Service:** `CaseStatusService`

- [ ] `moveToReview(incidentId)` — Set status=InReview, create timeline
- [ ] `moveToInvestigation(incidentId)` — Set status=UnderInvestigation, create timeline
- [ ] `closeCaseDirect(incidentId, closureSummary)` — For Low/Medium severity: Officer closes directly. Set status=Closed, `closed_at`, create timeline, notify reporter
- [ ] `requestClosure(incidentId, closureSummary)` — For High/Critical severity: Submit closure recommendation to Supervisor. Create timeline entry with pending approval
- [ ] `approveClosure(incidentId, supervisorId, remarks)` — Supervisor approves closure. Set status=Closed, create timeline, notify officer + reporter
- [ ] `rejectClosure(incidentId, supervisorId, remarks)` — Supervisor rejects closure. Revert to InReview, create timeline, notify officer

**Business Rules:**

- [ ] Enforce severity-based closure rules (Low/Medium = direct, High/Critical = supervisor approval)
- [ ] Validate status transitions (cannot skip states)
- [ ] Record all transitions in `incident_timelines`

**Controller:** `CaseStatusController`

- [ ] `PUT  /api/v1/incidents/{id}/status/in-review`
- [ ] `PUT  /api/v1/incidents/{id}/status/under-investigation`
- [ ] `POST /api/v1/incidents/{id}/close` — Direct close or closure request
- [ ] `POST /api/v1/incidents/{id}/closure/approve` — Supervisor only
- [ ] `POST /api/v1/incidents/{id}/closure/reject` — Supervisor only

### 5.3 Case Assessment

**Service:** `CaseAssessmentService`

- [ ] `create(incidentId, data)` — Create initial assessment (severity, findings, notes)
- [ ] `update(assessmentId, data)` — Update assessment
- [ ] `show(assessmentId)` — Get assessment with comments
- [ ] `addComment(assessmentId, userId, comment)` — Peer comment

**Form Requests:**

- [ ] `StoreAssessmentRequest` — severity_level (required|SeverityEnum), preliminary_findings, internal_notes
- [ ] `StoreAssessmentCommentRequest` — comment (required|string|max:2000)

**Controller:** `CaseAssessmentController`

- [ ] `GET    /api/v1/incidents/{id}/assessment`
- [ ] `POST   /api/v1/incidents/{id}/assessment`
- [ ] `PUT    /api/v1/assessments/{id}`
- [ ] `POST   /api/v1/assessments/{id}/comments`

### 5.4 Case Timeline

**Service:** `TimelineService`

- [ ] `getTimeline(incidentId)` — Chronological list of all events for an incident
- [ ] `addEntry(incidentId, userId, event, eventType, oldStatus, newStatus, metadata)` — Internal method called by other services

**Controller:** `TimelineController`

- [ ] `GET /api/v1/incidents/{id}/timeline`

---

## Phase 6 — Clarification (RFI) System

> Bi-directional threaded communication between Case Officers and Reporters.

### 6.1 Clarification Thread Service

**Service:** `ClarificationService`

- [ ] `createThread(incidentId, officerUserId, initialMessage)` — Create thread + first message, set incident status to RFISent, create timeline entry, notify reporter
- [ ] `getThreads(incidentId)` — List all threads for an incident with latest message preview
- [ ] `getThread(threadId)` — Get thread with all messages
- [ ] `sendMessage(threadId, userId, message)` — Add message to thread, update thread status (Responded if from reporter), mark as new, notify other party
- [ ] `markAsRead(threadId, userId)` — Mark all messages in thread as read for the user
- [ ] `closeThread(threadId)` — Set thread status=Closed

**Business Rules:**

- [ ] When reporter responds, set thread status=Responded, update incident status back to InReview
- [ ] Only Case Officer and the incident reporter can participate in the thread
- [ ] New message creates a notification for the recipient

**Form Requests:**

- [ ] `StoreThreadRequest` — message (required|string|max:5000)
- [ ] `SendMessageRequest` — message (required|string|max:5000)

**Controller:** `ClarificationController`

- [ ] `GET    /api/v1/incidents/{id}/clarifications` — List threads
- [ ] `POST   /api/v1/incidents/{id}/clarifications` — Create new RFI thread
- [ ] `GET    /api/v1/clarifications/{threadId}` — Get thread with messages
- [ ] `POST   /api/v1/clarifications/{threadId}/messages` — Send message
- [ ] `PUT    /api/v1/clarifications/{threadId}/read` — Mark as read
- [ ] `PUT    /api/v1/clarifications/{threadId}/close` — Close thread

---

## Phase 7 — Escalation & LEA Workflow

> Case escalation proposals, supervisor approval, LEA referral and acknowledgement.

### 7.1 Escalation Service

**Service:** `EscalationService`

- [ ] `proposeEscalation(incidentId, officerUserId, justification, agencyIds[])` — Create escalation record with Pending decision, link selected agencies, set incident status=Escalated, create timeline entry, notify supervisor(s)
- [ ] `listPendingEscalations(filters)` — Supervisor queue: all escalations with Pending decision
- [ ] `showEscalation(escalationId)` — Full escalation detail with incident, agencies, proposer
- [ ] `approveEscalation(escalationId, supervisorId, remarks)` — Set decision=Approved, notify officer + LEA users, create timeline entry
- [ ] `rejectEscalation(escalationId, supervisorId, remarks)` — Set decision=Rejected, revert incident status to InReview, notify officer, create timeline entry
- [ ] `acknowledgeCase(escalationAgencyId, leaUserId)` — LEA acknowledges receipt of escalated case, set `acknowledged_at` and `acknowledged_by`

**Policy:** `EscalationPolicy`

- [ ] `propose` — CaseOfficer (assigned to the case)
- [ ] `approve/reject` — Supervisor, SuperAdmin
- [ ] `acknowledge` — LeaViewer (linked to the agency)

**Form Requests:**

- [ ] `ProposeEscalationRequest` — justification (required|string), agency_ids (required|array|min:1, each exists:agencies)
- [ ] `EscalationDecisionRequest` — remarks (nullable|string)

**Controller:** `EscalationController`

- [ ] `GET    /api/v1/escalations` — List escalations (filterable by status)
- [ ] `POST   /api/v1/incidents/{id}/escalate` — Propose escalation
- [ ] `GET    /api/v1/escalations/{id}` — Show escalation detail
- [ ] `POST   /api/v1/escalations/{id}/approve` — Approve
- [ ] `POST   /api/v1/escalations/{id}/reject` — Reject
- [ ] `POST   /api/v1/escalation-agencies/{id}/acknowledge` — LEA acknowledges

### 7.2 LEA Case Access

**Service (within IncidentService):**

- [ ] `listLeaCases(leaUserId, filters)` — List escalated cases referred to the LEA user's agency
- [ ] `getLeaCaseDetail(incidentId, leaUserId)` — Full case detail (read-only) for LEA

**Controller:** `LeaCaseController`

- [ ] `GET /api/v1/lea/cases` — LEA's escalated case list
- [ ] `GET /api/v1/lea/cases/{id}` — LEA case detail

---

## Phase 8 — Notifications & Announcements

> In-app notifications, push notification dispatch, and MCMC announcements.

### 8.1 Notification Service

**Service:** `NotificationService`

- [ ] `createNotification(userId, title, message, type, referenceType, referenceId, icon)` — Create in-app notification
- [ ] `list(userId, filters)` — Paginated notifications with filter by read/unread
- [ ] `markAsRead(notificationId, userId)` — Mark single notification as read
- [ ] `markAllAsRead(userId)` — Mark all as read
- [ ] `getUnreadCount(userId)` — Return unread count for badge
- [ ] `delete(notificationId)` — Delete notification

**Controller:** `NotificationController`

- [ ] `GET    /api/v1/notifications` — List (paginated)
- [ ] `GET    /api/v1/notifications/unread-count` — Unread count
- [ ] `PUT    /api/v1/notifications/{id}/read` — Mark read
- [ ] `PUT    /api/v1/notifications/read-all` — Mark all read
- [ ] `DELETE /api/v1/notifications/{id}` — Delete

### 8.2 Notification Dispatch (triggered by events)

Create notification helper methods or use Laravel Events + Listeners:

- [ ] `IncidentSubmitted` → Notify all CaseOfficers
- [ ] `CaseAssigned` → Notify assigned officer
- [ ] `ClarificationRequested` → Notify reporter
- [ ] `ClarificationResponded` → Notify case officer
- [ ] `StatusChanged` → Notify reporter + assigned officer
- [ ] `EscalationProposed` → Notify supervisor(s)
- [ ] `EscalationApproved` → Notify officer + LEA users
- [ ] `EscalationRejected` → Notify officer
- [ ] `CaseClosed` → Notify reporter
- [ ] `DraftExpiring` → Notify reporter (scheduled, 1 day before expiry)
- [ ] `CaseAcknowledgedByLEA` → Notify officer + supervisor

### 8.3 Announcement Service

**Service:** `AnnouncementService`

- [ ] `list(filters, userRole)` — List published announcements targeted to user's role
- [ ] `create(data)` — Create announcement (SystemAdmin/SuperAdmin only)
- [ ] `update(announcementId, data)` — Edit
- [ ] `publish(announcementId)` — Set `is_published=true`, `published_at`
- [ ] `delete(announcementId)` — Soft delete

**Form Requests:**

- [ ] `StoreAnnouncementRequest` — title, content, priority (PriorityEnum), target_roles (nullable|array), expires_at (nullable|date)
- [ ] `UpdateAnnouncementRequest` — same fields

**Controller:** `AnnouncementController`

- [ ] `GET    /api/v1/announcements` — List (role-filtered)
- [ ] `POST   /api/v1/announcements` — Create
- [ ] `PUT    /api/v1/announcements/{id}` — Update
- [ ] `POST   /api/v1/announcements/{id}/publish` — Publish
- [ ] `DELETE /api/v1/announcements/{id}` — Delete

---

## Phase 9 — Analytics & Dashboard APIs

> Role-specific KPI endpoints and chart data aggregation.

### 9.1 Dashboard Analytics Service

**Service:** `DashboardService`

Each method returns pre-aggregated data for the frontend charts and KPI cards.

#### Reporter Dashboard

- [ ] `getReporterKPIs(userId)` — Counts: drafts, submitted, under_review, escalated, closed
- [ ] `getReporterStatusDistribution(userId)` — Pie chart data (count per status)
- [ ] `getReporterMonthlySubmissions(userId, year)` — Bar chart (submissions per month)
- [ ] `getExpiringDrafts(userId)` — Drafts expiring within 7 days

#### Licensee Admin Dashboard

- [ ] `getLicenseeAdminKPIs(orgId)` — Org-wide counts by status
- [ ] `getLicenseeStatusDistribution(orgId)` — Donut chart data
- [ ] `getLicenseeCaseTypeAnalysis(orgId, year)` — Stacked bar (type × month)

#### Case Officer Dashboard

- [ ] `getCaseOfficerKPIs(userId)` — Assigned, high severity, escalation pending, clarification pending, priority alerts
- [ ] `getRecentAssignedCases(userId, limit)` — Recent case list

#### Supervisor Dashboard

- [ ] `getSupervisorKPIs()` — Total open, pending tasks, closed this month, escalated
- [ ] `getPendingTasks()` — Combined queue: pending closures + pending escalations
- [ ] `getCriticalAlerts()` — Critical incidents needing attention

#### Investigator Dashboard

- [ ] `getInvestigatorKPIs()` — Total, open, escalated, closed, escalation ratio, high severity count
- [ ] `getCasesByOrganisation()` — Bar chart data
- [ ] `getSeverityDistribution()` — Pie chart data
- [ ] `getRecentlyClosed(limit)` — Recent closed cases with outcomes

#### System Admin Dashboard

- [ ] `getAdminKPIs()` — Total licensees, active users, total incidents, system health
- [ ] `getRecentConfigChanges(limit)` — From audit_logs

#### Super Admin Dashboard

- [ ] `getSuperAdminKPIs()` — National: total incidents, this month, high-severity YTD
- [ ] `getRegionalDistribution()` — Incidents by Malaysian state/region
- [ ] `getTopCategories(limit)` — Top incident types with counts and percentages
- [ ] `getMonthlyTrend(year)` — Dual line: total vs resolved per month
- [ ] `getCategoryTrend(year)` — Stacked bar: category × month
- [ ] `getSeverityDistribution()` — Pie chart: Critical/High/Medium/Low
- [ ] `getWorkflowMetrics()` — Avg review time, avg validation time, avg investigation time, total resolution time
- [ ] `getSystemStatus()` — Service health checks

#### LEA Dashboard

- [ ] `getLeaKPIs(agencyId)` — Total, open, escalated, closed
- [ ] `getPendingAcknowledgements(agencyId)` — Cases awaiting LEA acknowledgement
- [ ] `getRecentlyClosed(agencyId, limit)` — Closed cases with outcomes

**Controller:** `DashboardController`

- [ ] `GET /api/v1/dashboard` — Returns role-appropriate dashboard data based on authenticated user's role

---

## Phase 10 — Audit Logging & System Administration

> Automatic audit trail, activity logging, and admin system controls.

### 10.1 Audit Log Service

**Service:** `AuditLogService`

- [ ] `log(userId, action, auditableType, auditableId, oldValues, newValues)` — Create audit entry with IP and user agent from request
- [ ] `list(filters)` — Paginated audit log with filters: user_id, action, auditable_type, date_from, date_to, search
- [ ] `show(auditLogId)` — Full detail with old/new value diff

**Automatic Logging via Model Observer or Trait:**

- [ ] Create `Auditable` trait that auto-logs `created`, `updated`, `deleted` events on models that use it
- [ ] Apply to: User, Organisation, Incident, Escalation, IncidentAssignment, Announcement, MasterData

**Controller:** `AuditLogController`

- [ ] `GET /api/v1/audit-logs` — List (SuperAdmin, SystemAdmin, Supervisor, Investigator)
- [ ] `GET /api/v1/audit-logs/{id}` — Detail

### 10.2 System Health

**Service:** `SystemHealthService`

- [ ] `getHealth()` — Check database connectivity, Redis, S3, queue status
- [ ] `getStats()` — Total users, incidents, active sessions, queue depth

**Controller:** `SystemController`

- [ ] `GET /api/v1/system/health` — System health check
- [ ] `GET /api/v1/system/stats` — System statistics

---

## Phase 11 — File Storage & Export

> S3/local file management for documents and report export generation.

### 11.1 File Storage

- [ ] Configure `filesystems.php` for S3 with separate disk for incident documents
- [ ] Implement presigned URL generation for secure downloads (non-public bucket)
- [ ] Implement file validation (size limits, MIME type whitelist, virus scanning placeholder)
- [ ] Implement cleanup job for orphaned files (documents linked to hard-deleted drafts)

### 11.2 Export Service

**Service:** `ExportService`

- [ ] `exportIncidents(filters, format)` — Export filtered incident list to CSV/XLSX
- [ ] `exportIncidentDetail(incidentId, format)` — Export single incident as PDF
- [ ] `exportAnalyticsReport(role, dateRange)` — Generate analytics report PDF

**Controller:** `ExportController`

- [ ] `POST /api/v1/exports/incidents` — Queue export job, return download URL when ready
- [ ] `POST /api/v1/exports/incidents/{id}/pdf` — Generate single incident PDF
- [ ] `GET  /api/v1/exports/{id}/download` — Download generated export

---

## Phase 12 — Real-Time Broadcasting & Queue Jobs

> Laravel Echo broadcasting for live updates and background job processing.

### 12.1 Broadcasting Channels

- [ ] `private-user.{userId}` — Personal notifications channel
- [ ] `private-incident.{incidentId}` — Case-level updates (new messages, status changes)
- [ ] `private-organisation.{orgId}` — Organisation-wide announcements
- [ ] `private-role.{role}` — Role-based broadcast (e.g., supervisor queue updates)

### 12.2 Broadcast Events

- [ ] `NewNotification` → user channel — New in-app notification
- [ ] `IncidentStatusChanged` → incident channel — Status transition
- [ ] `NewClarificationMessage` → incident channel — New RFI message
- [ ] `EscalationProposed` → role channel (supervisor) — New escalation in queue
- [ ] `CaseAssigned` → user channel — New case assignment

### 12.3 Queue Jobs

- [ ] `SendPasswordResetEmail` — Queued email for password reset
- [ ] `SendWelcomeEmail` — Queued email for new user creation
- [ ] `SendOtpEmail` — Queued email/SMS for MFA OTP
- [ ] `GenerateExportFile` — Queued CSV/XLSX/PDF generation
- [ ] `ExpiredDraftCleanup` — Scheduled: soft-delete expired drafts, notify users
- [ ] `DraftExpiryReminder` — Scheduled: notify reporters 1 day before draft expiry
- [ ] `PurgeOldAuditLogs` — Scheduled: archive/delete audit logs older than retention period (optional)

### 12.4 Scheduled Commands

Register in `Console/Kernel.php` or `routes/console.php`:

- [ ] `drafts:expire` — Daily at midnight: expire overdue drafts
- [ ] `drafts:remind` — Daily at 9 AM: send draft expiry reminders
- [ ] `exports:cleanup` — Weekly: delete temporary export files older than 7 days

---

## Phase 13 — Testing & Quality Assurance

> Comprehensive test coverage for all services and API endpoints.

### 13.1 Unit Tests (Service Layer)

- [ ] `AuthServiceTest` — Login, OTP, logout, password reset logic
- [ ] `IncidentServiceTest` — Create, update, submit, draft expiry, reference number generation
- [ ] `CaseAssignmentServiceTest` — Assign, reassign, get unassigned
- [ ] `CaseStatusServiceTest` — All status transitions, severity-based closure rules
- [ ] `ClarificationServiceTest` — Thread creation, messaging, status updates
- [ ] `EscalationServiceTest` — Propose, approve, reject, acknowledge
- [ ] `NotificationServiceTest` — Create, mark read, unread count
- [ ] `DashboardServiceTest` — KPI calculations per role
- [ ] `AuditLogServiceTest` — Log creation, filtering

### 13.2 Feature Tests (API Endpoints)

- [ ] `AuthApiTest` — Full auth flow (login → OTP → me → logout)
- [ ] `UserApiTest` — CRUD + role-based access control
- [ ] `OrganisationApiTest` — CRUD + policy enforcement
- [ ] `IncidentApiTest` — Full lifecycle (create draft → save → submit → view)
- [ ] `IncidentDocumentApiTest` — Upload, list, download, delete
- [ ] `CaseAssignmentApiTest` — Assign, reassign, inbox, assigned list
- [ ] `CaseStatusApiTest` — All transitions + policy enforcement
- [ ] `ClarificationApiTest` — Thread creation, messaging, mark read
- [ ] `EscalationApiTest` — Propose → approve/reject → acknowledge
- [ ] `NotificationApiTest` — List, read, unread count
- [ ] `AnnouncementApiTest` — CRUD + role filtering
- [ ] `DashboardApiTest` — Each role returns correct dashboard shape
- [ ] `ExportApiTest` — Generate + download
- [ ] `AuditLogApiTest` — List + access control

### 13.3 Policy Tests

- [ ] Test every Policy class to ensure role-based access is enforced correctly
- [ ] Test multi-tenant scoping (LicenseeAdmin can only see own org users/incidents)
- [ ] Test LEA can only see escalated cases referred to their agency

### 13.4 Integration Tests

- [ ] Full incident lifecycle: Reporter creates → submits → Officer assigned → RFI → responded → escalated → Supervisor approves → LEA acknowledges → Closed
- [ ] Multi-tenant isolation: Org A cannot see Org B's incidents
- [ ] Reference number uniqueness under concurrent submissions

---

## API Route Summary

```
/api/v1/
├── auth/
│   ├── POST   login
│   ├── POST   verify-otp
│   ├── POST   logout
│   ├── POST   forgot-password
│   ├── POST   reset-password
│   └── GET    me
│
├── profile/
│   ├── GET    /
│   ├── PUT    /
│   └── PUT    /password
│
├── users/
│   ├── GET    /
│   ├── POST   /
│   ├── GET    /{id}
│   ├── PUT    /{id}
│   └── DELETE /{id}
│
├── organisations/
│   ├── GET    /
│   ├── POST   /
│   ├── GET    /{id}
│   ├── PUT    /{id}
│   ├── DELETE /{id}
│   └── {orgId}/branches/
│       ├── GET    /
│       └── POST   /
│
├── branches/
│   ├── PUT    /{id}
│   └── DELETE /{id}
│
├── incident-types/
│   ├── GET    /
│   ├── POST   /
│   ├── PUT    /{id}
│   └── DELETE /{id}
│
├── agencies/
│   ├── GET    /
│   ├── POST   /
│   ├── PUT    /{id}
│   └── DELETE /{id}
│
├── master-data/
│   ├── GET    /  ?group={group}
│   ├── POST   /
│   ├── PUT    /{id}
│   └── DELETE /{id}
│
├── incidents/
│   ├── GET    /
│   ├── POST   /
│   ├── GET    /{id}
│   ├── PUT    /{id}
│   ├── PATCH  /{id}/draft
│   ├── POST   /{id}/submit
│   ├── DELETE /{id}
│   ├── POST   /{id}/assign
│   ├── PUT    /{id}/reassign
│   ├── PUT    /{id}/status/in-review
│   ├── PUT    /{id}/status/under-investigation
│   ├── POST   /{id}/close
│   ├── POST   /{id}/closure/approve
│   ├── POST   /{id}/closure/reject
│   ├── POST   /{id}/escalate
│   ├── GET    /{id}/documents
│   ├── POST   /{id}/documents
│   ├── GET    /{id}/assessment
│   ├── POST   /{id}/assessment
│   ├── GET    /{id}/clarifications
│   ├── POST   /{id}/clarifications
│   └── GET    /{id}/timeline
│
├── documents/
│   ├── GET    /{id}/download
│   └── DELETE /{id}
│
├── assessments/
│   ├── PUT    /{id}
│   └── POST   /{id}/comments
│
├── clarifications/
│   ├── GET    /{threadId}
│   ├── POST   /{threadId}/messages
│   ├── PUT    /{threadId}/read
│   └── PUT    /{threadId}/close
│
├── escalations/
│   ├── GET    /
│   ├── GET    /{id}
│   ├── POST   /{id}/approve
│   └── POST   /{id}/reject
│
├── escalation-agencies/
│   └── POST   /{id}/acknowledge
│
├── notifications/
│   ├── GET    /
│   ├── GET    /unread-count
│   ├── PUT    /{id}/read
│   ├── PUT    /read-all
│   └── DELETE /{id}
│
├── announcements/
│   ├── GET    /
│   ├── POST   /
│   ├── PUT    /{id}
│   ├── POST   /{id}/publish
│   └── DELETE /{id}
│
├── dashboard/
│   └── GET    /
│
├── lea/
│   ├── GET    /cases
│   └── GET    /cases/{id}
│
├── case-officer/
│   ├── GET    /inbox
│   └── GET    /assigned
│
├── exports/
│   ├── POST   /incidents
│   ├── POST   /incidents/{id}/pdf
│   └── GET    /{id}/download
│
├── audit-logs/
│   ├── GET    /
│   └── GET    /{id}
│
└── system/
    ├── GET    /health
    └── GET    /stats
```

---

## Dependencies Summary

| Package                                        | Purpose                          |
| ---------------------------------------------- | -------------------------------- |
| `laravel/sanctum`                              | API token authentication         |
| `laravel/reverb` or `pusher/pusher-php-server` | WebSocket broadcasting           |
| `predis/predis`                                | Redis client                     |
| `league/flysystem-aws-s3-v3`                   | S3 file storage                  |
| `spatie/laravel-query-builder`                 | API filtering, sorting, includes |
| `maatwebsite/excel`                            | CSV/XLSX export                  |
| `barryvdh/laravel-dompdf`                      | PDF report generation            |
| `pragmarx/google2fa`                           | OTP/MFA implementation           |

---

> **Note:** Each phase should be completed and tested before moving to the next dependent phase. Phases 8-12 can be developed in parallel after Phase 5 is complete.
