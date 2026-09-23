# 🎨 CosplayBook — Custom Apparel, Without the Chaos

> **A role-based custom apparel ordering platform where the customer shops, the vendor fulfils, and the admin runs the whole show.**

CosplayBook was built around a simple idea:

**Ordering a custom T-shirt should be easy. Managing all those orders shouldn't be a headache.**

So instead of building just another storefront, this project connects the three sides of the operation:

**Customer → Order → Vendor → Delivery → Admin**

The result is a complete web experience for selling customised apparel while keeping the operational side visible and manageable.

---

## 🌐 What is CosplayBook?

**CosplayBook** is a custom apparel e-commerce platform designed around three different user experiences:

| Role | What they do |
|---|---|
| 🛍️ **Customer** | Browse products, customise apparel, place orders and track them |
| 📦 **Vendor** | See incoming orders, pending deliveries and operational stats |
| 🛠️ **Admin** | Manage the platform, users/orders and monitor overall activity |

The interesting part isn't only the storefront.

The project treats the store as an **operational system** — customers create demand, vendors handle fulfilment, and admins get a central view of what is happening.

---

## ✨ The Core Experience

### 🛍️ Customer Side

A customer can move through the buying journey without touching the management side of the system.

- Browse available apparel
- Explore product details
- Choose/customise products
- Place orders
- View order-related information
- Use the customer-facing shopping interface

### 📦 Vendor Side

The vendor gets a dedicated workspace instead of having to manage everything through the customer UI.

- View new orders
- Check pending deliveries
- Track order activity
- View operational statistics
- Manage the vendor-side workflow

### 🛠️ Admin Side

The admin panel acts as the control room.

- Monitor platform activity
- Manage the overall order workflow
- Handle administrative operations
- View platform-level statistics
- Keep customer/vendor operations organised

---

# 🧠 Why this project is different

A normal e-commerce demo usually stops at:

> **Product → Cart → Checkout**

CosplayBook goes a step further:

> **Customer → Order → Vendor → Fulfilment → Admin oversight**

That makes it closer to a small **multi-role commerce system** than a simple shopping website.

The project was also designed with a clear separation between what each type of user should see. A customer shouldn't need access to vendor operations, and a vendor shouldn't need the entire admin interface.

---

# 🏗️ High-Level Architecture

```text
                         ┌──────────────────┐
                         │     CUSTOMER     │
                         │                  │
                         │ Browse / Order   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │     COSPLAYBOOK  │
                         │   Web Application│
                         └────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
              ┌──────────┐  ┌──────────┐  ┌──────────┐
              │  ADMIN   │  │  VENDOR  │  │ CUSTOMER │
              │ Dashboard│  │ Dashboard│  │  Orders  │
              └────┬─────┘  └────┬─────┘  └────┬─────┘
                   │             │              │
                   └─────────────┼──────────────┘
                                 ▼
                         ┌──────────────────┐
                         │     SUPABASE     │
                         │ Database / Auth  │
                         └──────────────────┘
```

The frontend is built as a modern React/TypeScript application, while Supabase provides the backend service layer used by the application.

---

# 🧰 Tech Stack

## Frontend

- **React 18**
- **TypeScript**
- **Vite**
- **TanStack Router**
- **TanStack Start**
- **React Router DOM**
- **Tailwind CSS**
- **Tailwind Merge**
- **Tailwind Animate**
- **shadcn/ui style component architecture**
- **Radix UI primitives**

## Backend / Data

- **Supabase**
- **Supabase JavaScript Client**
- **Supabase database/backend services**

## UI & Interaction

- **Framer Motion** — animations and transitions
- **Lucide React** — icons
- **Sonner** — toast notifications
- **React Hook Form** — form handling
- **React Day Picker** — date selection
- **Embla Carousel** — carousel interactions
- **Vaul** — drawer-style interfaces
- **cmdk** — command menu interactions
- **React Resizable Panels** — resizable UI layouts
- **Input OTP** — OTP-style input components

## Data Visualization

- **Recharts** — charts and dashboard visualisation

## 3D / Visual Layer

- **Three.js**
- **React Three Fiber**
- **@react-three/drei**

These libraries make it possible to build richer visual experiences beyond standard HTML/CSS interfaces.

## Validation / Utility

- **AJV**
- **class-variance-authority**
- **react-is**

## Developer Tooling

- **ESLint**
- **TypeScript**
- **TypeScript ESLint**
- **Vite**
- **Prettier**
- **Tailwind CSS Vite plugin**

## Deployment / Build

- **Netlify Vite plugin**
- **Vercel configuration**
- **Nitro**
- **Vite production builds**

---

# 📦 Dependency Snapshot

The repository currently includes a fairly broad modern frontend stack.

Some of the major dependencies include:

```text
React
TypeScript
Vite
Supabase
TanStack Router
TanStack Start
React Router
Framer Motion
Recharts
Three.js
React Three Fiber
Radix UI
Tailwind CSS
React Hook Form
Lucide React
Sonner
Embla Carousel
React Day Picker
Vaul
cmdk
AJV
```

The project also contains a large collection of Radix primitives for accessible UI building, including:

```text
Accordion
Alert Dialog
Aspect Ratio
Avatar
Checkbox
Collapsible
Context Menu
Dialog
Dropdown Menu
Hover Card
Label
Menubar
Navigation Menu
Popover
Progress
Radio Group
Scroll Area
Select
Separator
Slider
Slot
Switch
Tabs
Toast
Toggle
Toggle Group
Tooltip
```

That gives the UI a strong component foundation instead of relying on one giant custom component.

---

# 🔐 Role-Based Access

CosplayBook is built around three distinct roles:

```text
                    ┌───────────────┐
                    │     ADMIN     │
                    │ Full control  │
                    └───────┬───────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
       ┌──────────────┐            ┌──────────────┐
       │    VENDOR    │            │   CUSTOMER   │
       │ Fulfilment   │            │   Shopping   │
       └──────────────┘            └──────────────┘
```

The goal is simple:

**Show each person the information they actually need.**

---

# 🧪 Demo Accounts

The following test accounts can be used to explore the different role experiences.

> ⚠️ These are **demo/test credentials only**. Do not use real passwords in a public repository. If these accounts are connected to a real production backend, rotate the passwords before deployment.

### 📦 Vendor

```text
Email: Vendor-vendor@gmail.com
Password: Vendor@1234
```

### 🛠️ Admin

```text
Email: admin-test1234@gmail.com
Password: Test@1234
```

### 🛍️ Customer

```text
Email: Customer-customer@gmail.com
Password: Customer@1234
```

---

# 🚀 Running the Project Locally

## 1. Clone the repository

```bash
git clone https://github.com/Pearlin-Tech/CosplayBook-Ai.git
cd CosplayBook-Ai
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create/configure your local `.env` file with the Supabase configuration required by the application.

Do **not** commit real secrets.

Typical Supabase frontend configuration looks like:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Use the exact variable names expected by the source code/environment configuration in your local version.

## 4. Start the development server

```bash
npm run dev
```

Vite will start the development environment and provide a local URL.

---

# 🧪 Available Scripts

From `package.json`:

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

A typical development cycle:

```bash
npm run dev
```

Then before shipping:

```bash
npm run typecheck
npm run lint
npm run build
```

---

# 📁 Repository Structure

At the top level, the repository currently contains:

```text
CosplayBook-Ai/
│
├── .lovable/
├── .vercel/
├── public/
├── src/
│
├── .env
├── .gitignore
├── .npmrc
├── .prettierignore
├── .prettierrc
├── components.json
├── eslint.config.js
├── index.html
├── netlify.toml
├── package.json
├── package-lock.json
├── test-proxy.js
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

### A note about the project setup

The repository contains both Vercel and Netlify-related configuration, making the project flexible for different deployment workflows.

---

# 🎯 Product Flow

The application can be thought of as a simple pipeline:

```text
        CUSTOMER
           │
           ▼
   Browse Products
           │
           ▼
      Customise
           │
           ▼
      Place Order
           │
           ▼
      ┌─────────┐
      │  ORDER  │
      └────┬────┘
           │
           ▼
        VENDOR
           │
           ├── New Orders
           │
           ├── Pending Delivery
           │
           └── Operational Stats
           │
           ▼
       FULFILMENT
           │
           ▼
         ADMIN
           │
           └── Platform Oversight
```

This workflow is the main idea behind the project.

---

# 📊 Dashboard Thinking

The vendor/admin experiences aren't just collections of buttons.

They are structured around information:

```text
Orders
   ↓
What is new?
   ↓
What is pending?
   ↓
What needs attention?
   ↓
What does the current activity look like?
```

Charts and dashboard components are supported through **Recharts**, while the wider UI uses reusable component primitives.

---

# 🎨 UI Philosophy

CosplayBook uses a component-driven frontend rather than putting everything into a few massive pages.

The stack combines:

**Tailwind CSS**

for styling,

**Radix UI**

for accessible low-level UI primitives,

**shadcn-style patterns**

for reusable components,

and

**Framer Motion**

for movement and transitions.

That combination makes it easier to keep the interface consistent while still giving individual pages room to feel different.

---

# ⚡ Why Vite + React + TypeScript?

The project uses Vite as its development/build layer and React + TypeScript for the application.

That gives the project:

- Fast local development
- Strong typing
- Component-based architecture
- Modern production builds
- A large React ecosystem
- Easier maintenance as the application grows

---

# 🗄️ Why Supabase?

Supabase gives the project a backend layer without requiring a completely separate traditional server stack.

The application can use Supabase for backend services while keeping the main application in the React/TypeScript ecosystem.

This is especially useful for a project like CosplayBook because the system needs persistent information around:

```text
Users
  │
  ├── Customers
  ├── Vendors
  └── Admins

Orders
  │
  ├── Customer
  ├── Product
  ├── Vendor
  └── Status
```

---

# 🧩 Interesting Technical Pieces

A few parts of the stack make this project more than a basic CRUD storefront.

### Motion

`framer-motion`

Used to make transitions and interactions feel less static.

### Charts

`recharts`

Useful for turning operational data into visual dashboard information.

### 3D

`three` + `@react-three/fiber` + `@react-three/drei`

Provides the foundation for 3D/interactive visual experiences.

### Forms

`react-hook-form`

Keeps complex forms easier to manage and validate.

### UI primitives

`@radix-ui/*`

Provides reusable primitives for dialogs, menus, tabs, dropdowns, tooltips, switches, etc.

### Notifications

`sonner`

Provides lightweight feedback for actions and state changes.

---

# 🛡️ Security Notes

Before deploying this as a real business application:

- Never commit production passwords.
- Never expose private/service-role Supabase keys in frontend code.
- Keep `.env` out of version control.
- Use proper authentication and authorization checks.
- Verify role permissions on the backend/data layer, not only in the UI.
- Add database policies/RLS where appropriate.
- Rotate the demo credentials if they are reused anywhere outside testing.
- Review all client-side environment variables before deployment.

The UI hiding an admin button is **not** a security boundary.

The backend/database must enforce the permission.

---

# 🧪 Testing the Demo

A simple demo run can follow this sequence:

### Test 1 — Customer

```text
Login
 ↓
Browse
 ↓
Select/customise
 ↓
Place order
 ↓
Check order information
```

### Test 2 — Vendor

```text
Login as Vendor
 ↓
Open vendor dashboard
 ↓
Check new orders
 ↓
Check pending deliveries
 ↓
Review statistics
```

### Test 3 — Admin

```text
Login as Admin
 ↓
Open admin panel
 ↓
Review platform activity
 ↓
Manage/monitor operations
```

Testing all three accounts gives a much better picture of the system than testing only the storefront.

---

# 🚧 Current Scope

CosplayBook currently focuses on the core custom-apparel commerce and management workflow.

The foundation is suitable for expanding into areas such as:

- More advanced product customisation
- Product variants and sizing
- Inventory management
- Delivery partner integration
- Payment gateway integration
- Order notifications
- Customer order tracking
- Vendor onboarding
- Sales analytics
- Customer profiles
- Reviews and ratings
- Coupons and promotional campaigns
- Automated order notifications
- Mobile/PWA experience

---

# 💡 Where the project can go next

The interesting next step isn't simply adding more pages.

It is turning CosplayBook into a proper **multi-vendor custom merchandise platform**.

For example:

```text
Customer
   │
   ├── Design
   ├── Preview
   ├── Order
   └── Track
        │
        ▼
     Platform
        │
   ┌────┴────┐
   ▼         ▼
Vendor A   Vendor B
   │         │
   ▼         ▼
Print      Print
Ship       Ship
   │         │
   └────┬────┘
        ▼
     Customer
```

That would move the project from an academic/demo e-commerce application toward a more realistic commerce platform.

---

# 🧑‍💻 Project

**CosplayBook-Ai**

Built with:

`React` · `TypeScript` · `Vite` · `Supabase` · `Tailwind CSS` · `Radix UI` · `Framer Motion` · `Recharts` · `Three.js`

Repository:

https://github.com/Pearlin-Tech/CosplayBook-Ai

Live application:

https://cosplaybook-ai.netlify.app/

---

## ⭐ If you found the project interesting

Have a look through the source, try the different roles, and follow the order flow from the customer side to the vendor/admin side.

The real fun starts when you stop looking at it as a shopping website and start looking at it as an **order management system wearing an e-commerce UI.**

---

### Built by Pearlin-Tech

**CosplayBook-Ai — Shop it. Manage it. Fulfil it.**
