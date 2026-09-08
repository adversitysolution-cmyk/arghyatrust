# Blog Module Workflow, Architecture, CMS, and UI/UX

This document covers only the blog feature for the Arghya Trust website and admin panel.

## Current Blog Scope

The project already contains a moderated blog workflow:

- Public website blog listing: `src/app/pages/BlogPage.tsx`
- Public blog detail page: `src/app/pages/BlogDetailPage.tsx`
- Public blog submission form: `src/app/pages/BlogSubmitPage.tsx`
- Public API client: `src/app/lib/api.ts`
- Admin blog review screen: `admin/src/app/components/admin/BlogSubmissionsPage.tsx`
- Admin API client: `admin/src/app/lib/api.ts`
- Blog model: `server/models/BlogSubmission.js`
- Public blog routes: `server/routes/publicRoutes.js`
- Admin blog routes: `server/routes/adminRoutes.js`
- Blog submission and publish logic: `server/controllers/formController.js`
- Admin review and status update logic: `server/controllers/adminController.js`
- Blog image upload storage: `server/middleware/upload.js`

## End-To-End Blog Workflow

### 1. Visitor Reads Blogs

The visitor opens `/blog`.

The website loads two sources:

- Approved CMS blogs from `GET /api/blogs`
- Static fallback/default blogs from `src/app/data/blogs.ts`

Only blogs with `status: "approved"` are returned by the public API. The listing sorts blogs by `publishedAt`, newest first.

### 2. Visitor Opens Blog Detail

The visitor opens `/blog/:slug`.

The detail page tries to find the blog by slug from:

- Static blogs through `getBlogBySlug(slug)`
- Approved CMS blogs loaded from `GET /api/blogs`

If the blog is found, the page shows title, author, category, date, read time, image, HTML content, tags, share buttons, and latest related posts.

If the blog is not found after approved blogs load, the visitor is redirected back to `/blog`.

### 3. Visitor Submits a Blog

The visitor opens `/blog/submit`.

The form collects:

- Blog title
- Category
- Author name
- Author email
- Short excerpt
- Blog content
- Tags
- One featured image

The website sends a multipart request to:

`POST /api/blogs/submit`

The backend validates required fields, stores the uploaded image in `server/uploads/blogs`, generates a unique slug, converts plain text content into safe paragraph HTML, calculates read time, and saves the blog as:

`status: "pending"`

At this point, the blog is not visible on the public website.

### 4. Admin Reviews Blog

The admin logs into the admin panel and opens `Blog Review`.

The admin panel loads blog submissions from:

`GET /api/admin/blog-submissions`

This endpoint is protected by admin JWT auth.

The admin can:

- Search by title, author, or author email
- Filter by status: all, pending, approved, rejected
- Open a review modal
- View the submitted image
- Edit title, category, author details, excerpt, content, tags, and review notes
- Save changes
- Approve the blog
- Reject the blog

### 5. Admin Approves Blog

When admin clicks `Approve`, the admin panel sends:

`PUT /api/admin/blog-submissions/:id`

With updated fields and:

`status: "approved"`

The backend updates the blog, regenerates slug if title changed, recalculates content HTML/read time if content changed, sets `approvedAt`, and clears `rejectedAt`.

After approval, the public website can display the blog through `GET /api/blogs`.

### 6. Admin Rejects Blog

When admin clicks `Reject`, the admin panel sends:

`PUT /api/admin/blog-submissions/:id`

With updated fields, optional `reviewNotes`, and:

`status: "rejected"`

The backend sets `rejectedAt` and clears `approvedAt`.

Rejected blogs remain stored for admin reference but do not appear on the public website.

## Blog Architecture

### Frontend Website

The public website is a Vite React app.

Blog routes:

- `/blog`: blog listing
- `/blog/:slug`: blog detail
- `/blog/submit`: public blog submission form

Responsibilities:

- Display approved blogs
- Keep pending/rejected blogs hidden
- Submit community blog entries
- Show toast messages for submission and loading errors
- Normalize uploaded image URLs through `VITE_API_BASE_URL`

### Admin Panel

The admin panel is a separate Vite React app under `admin/`.

Blog admin tab:

- Sidebar label: `Blog Review`
- Component: `BlogSubmissionsPage`
- State owner: `admin/src/app/App.tsx`
- API client: `admin/src/app/lib/api.ts`

Responsibilities:

- Load all blog submissions after login
- Let admin filter and search submissions
- Let admin review, edit, approve, reject, and save changes
- Store admin session in `localStorage` as `AT_ADMIN_SESSION`
- Send admin JWT token in `Authorization: Bearer <token>`

### Backend

The backend is an Express server with MongoDB through Mongoose.

Public blog endpoints:

- `POST /api/blogs/submit`
- `GET /api/blogs`

Admin blog endpoints:

- `GET /api/admin/blog-submissions`
- `PUT /api/admin/blog-submissions/:id`

Storage:

- Blog documents: MongoDB `BlogSubmission`
- Blog images: `server/uploads/blogs`
- Public image serving: `/uploads/blogs/<filename>`

### Database Model

Collection model: `BlogSubmission`

Fields:

- `title`: required, max 180
- `slug`: required, generated from title, max 220
- `category`: default `Stories`
- `authorName`: required
- `authorEmail`: required, lowercase
- `excerpt`: required, max 500
- `content`: required plain text, max 20000
- `contentHtml`: generated safe HTML, max 30000
- `readTime`: generated from word count
- `featuredImageUrl`: required
- `tags`: string array
- `status`: `pending`, `approved`, or `rejected`
- `reviewNotes`: internal admin note
- `approvedAt`: set when approved
- `rejectedAt`: set when rejected
- `createdAt`: automatic
- `updatedAt`: automatic

Indexes:

- `{ status: 1, createdAt: -1 }`
- `{ slug: 1 }`

## CMS Structure For Blog

Recommended admin CMS sections for blog only:

### Blog Inbox

Purpose: review new public submissions.

Filters:

- Pending
- Approved
- Rejected
- Category
- Date range
- Search by title, author, email, tag

Main table columns:

- Title
- Author
- Category
- Status
- Submitted date
- Action

Primary actions:

- View
- Edit
- Approve
- Reject

### Blog Editor

Purpose: edit and prepare a submitted article before publishing.

Fields:

- Title
- Slug
- Category
- Author name
- Author email
- Excerpt
- Content
- Tags
- Featured image
- Review notes
- Status

Recommended enhancements:

- Show content preview before approval
- Add slug editing with uniqueness validation
- Add image replacement from admin panel
- Add publish date scheduling if needed later
- Add SEO title and meta description fields

### Published Blogs

Purpose: manage live articles.

Actions:

- Edit live article
- Move back to pending
- Reject/unpublish
- Copy public URL
- Preview public page

### Rejected Blogs

Purpose: archive rejected submissions.

Actions:

- View rejection reason
- Restore to pending
- Approve after correction
- Delete permanently if a delete policy is added

## Admin Approval Activities

### Pending Review Checklist

Before approval, admin should check:

- Title is meaningful and clean
- Author name/email look valid
- Category is correct
- Featured image is appropriate
- Excerpt is readable
- Content has no spam, abusive text, private information, or broken formatting
- Tags are useful and not excessive
- Blog aligns with Arghya Trust values and public tone

### Approve Activity

Admin clicks `Approve`.

System should:

- Save latest edited fields
- Convert content to safe HTML
- Recalculate read time
- Set `status: "approved"`
- Set `approvedAt`
- Make blog visible on `/blog` and `/blog/:slug`

### Reject Activity

Admin enters review notes and clicks `Reject`.

System should:

- Save latest edited fields
- Set `status: "rejected"`
- Set `rejectedAt`
- Keep blog hidden from public website
- Preserve notes for future reference

### Save Changes Activity

Admin clicks `Save Changes`.

System should:

- Save edits without changing current status
- Regenerate slug only if title changes
- Rebuild content HTML only if content changes
- Keep public visibility based on existing status

## Public Blog UI/UX Design

### Blog Listing Page

Goal: help visitors quickly browse approved stories and perspectives.

Recommended layout:

- Keep current top spacing and background style
- Hero header with small category pill, page title, and short intro
- Three-column blog card grid on desktop
- Two-column grid on tablet
- One-column grid on mobile
- Blog cards should show image, category, title, excerpt, author, date, read time, and read-more action
- Add category filter tabs if blog volume grows
- Add empty state if no approved CMS blogs and no static fallback blogs

Current UI already follows most of this pattern.

### Blog Detail Page

Goal: create a calm reading experience.

Recommended layout:

- Max-width article container
- Category pill above title
- Strong article title
- Author/date/read-time metadata
- Large featured image
- Clean article body typography
- Tags after content
- Share buttons
- Related/latest posts section

Current UI already supports this.

Important UX note:

The page currently renders `blog.content` using `dangerouslySetInnerHTML`. The backend escapes submitted text before generating `contentHtml`, which protects public submissions. If admin later gets a rich-text editor, the backend should sanitize HTML with a proper allowlist before publishing.

### Blog Submit Page

Goal: make public contribution simple and non-technical.

Recommended layout:

- Short explanation that posts require admin approval
- Required fields marked clearly
- Single image upload with visible filename
- Large content textarea
- Submit button with loading state
- Success toast after submission
- Error toast for missing image or failed API request

Current UI already supports this.

Recommended enhancements:

- Add content guideline text near the form
- Add character count for title, excerpt, and content
- Add image size/type hint: JPG, PNG, WebP, max 5MB
- Add success confirmation state with link back to `/blog`

## Admin Blog UI/UX Design

### Blog Review Table

Goal: make moderation fast.

Current table columns are good:

- Title
- Author
- Category
- Status
- Date
- Actions

Recommended enhancements:

- Add quick action buttons directly in table for pending blogs: approve, reject, view
- Add status counts: pending, approved, rejected
- Add date range filter
- Add category filter
- Add pagination for larger content volumes

### Review Modal

Goal: allow admin to make publish decisions without leaving the table.

Current modal supports:

- Image preview
- Edit mode
- Metadata fields
- Content field
- Tags
- Review notes
- Approve
- Reject
- Save Changes
- Close

Recommended enhancements:

- Add public preview mode
- Split editor and preview side by side on desktop
- Make `Review Notes` textarea instead of single-line input
- Disable approval until required fields are valid
- Show slug and public URL after approval
- Confirm rejection if review notes are empty

## Recommended Blog State Machine

Allowed states:

- `pending`: submitted, awaiting admin decision
- `approved`: visible publicly
- `rejected`: hidden, archived with notes

Allowed transitions:

- `pending` to `approved`
- `pending` to `rejected`
- `approved` to `pending`
- `approved` to `rejected`
- `rejected` to `pending`
- `rejected` to `approved`

Current backend allows all these transitions through `PUT /api/admin/blog-submissions/:id`.

## Security And Validation

Current protections:

- Admin routes require JWT auth
- Blog image upload accepts image MIME types only
- Blog image upload limit is 5MB and one file
- Submitted content is escaped before becoming HTML
- Public API only returns approved blogs
- Required fields are validated on backend

Recommended additions:

- Add rate limiting to public blog submission
- Add CAPTCHA or honeypot field to reduce spam
- Add stricter email validation for blog author email
- Add admin audit fields such as `reviewedBy`
- Add delete endpoint only if there is a clear content deletion policy
- Add malware/image scanning if the site receives public uploads at scale

## SEO Structure For Blog

Current detail page updates:

- `document.title`
- Meta description from blog excerpt

Recommended additions:

- Add canonical URL per blog
- Add Open Graph title, description, image
- Add Twitter card tags
- Add BlogPosting JSON-LD schema
- Include approved CMS blogs in sitemap generation if sitemap generation is later added

## Implementation Gaps To Consider

The current blog module works as a moderated CMS, but these improvements would make it more complete:

- Admin cannot upload/replace blog featured image during review.
- Blog detail page fetches all approved blogs instead of fetching one blog by slug.
- Admin summary counts do not include pending blog count.
- Public API has no `/api/blogs/:slug` endpoint.
- Public blog listing mixes approved CMS blogs and static blogs, which is useful as fallback but may need a future switch to CMS-only.
- Review notes are internal only; there is no email notification to the author.
- There is no version history or audit log for admin edits.

## Recommended Future API Additions

Optional endpoints for a stronger CMS:

- `GET /api/blogs/:slug`: public single approved blog
- `GET /api/admin/blog-submissions?status=pending`: admin filtered list
- `POST /api/admin/blog-submissions`: admin-created blog
- `PATCH /api/admin/blog-submissions/:id/status`: status-only update
- `POST /api/admin/blog-submissions/:id/image`: replace featured image
- `DELETE /api/admin/blog-submissions/:id`: permanent delete, only if approved by policy

## Simple End-To-End Flow Diagram

```text
Visitor
  |
  | opens /blog/submit
  v
Website Blog Submit Form
  |
  | POST /api/blogs/submit + image
  v
Express API
  |
  | validate fields, upload image, create slug, generate HTML/read time
  v
MongoDB BlogSubmission
  |
  | status = pending
  v
Admin Panel Blog Review
  |
  | admin edits, saves, approves or rejects
  v
PUT /api/admin/blog-submissions/:id
  |
  | status = approved
  v
GET /api/blogs
  |
  | returns approved blogs only
  v
Public Blog Listing and Detail Pages
```

