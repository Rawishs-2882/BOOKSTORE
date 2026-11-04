# AklatBata Complete HTML/CSS/JavaScript Website

## Included pages
- index.html — homepage
- books.html — searchable/filterable catalog
- book.html — product details, quantity, wishlist
- cart.html — persistent cart
- checkout.html — delivery form and demo order placement
- order-success.html — order confirmation
- login.html / register.html / forgot-password.html — demo authentication screens
- account.html / orders.html / wishlist.html — customer pages
- about.html / contact.html — informational pages
- admin.html — dashboard
- admin-books.html / admin-book-form.html — book CRUD
- admin-categories.html — category management
- admin-orders.html — order status management
- admin-customers.html — customer list

## Run locally
Open this folder in VS Code, then run:

```bash
python -m http.server 8000
```

Open http://localhost:8000. You can also use the VS Code Live Server extension.

## Demo data and limitations
This is a front-end implementation using HTML, CSS, vanilla JavaScript and browser localStorage. Cart, demo customer accounts, wishlist, demo orders, inventory and admin CRUD persist in the current browser. It is not connected to a real backend. For production, connect Supabase or another backend, replace demo authentication, implement server-side authorization/RLS, validate orders and stock transactionally, and integrate a real payment provider. Demo passwords are stored locally and must never be used for real customer accounts.

## Image assets
The assets folder contains local image crops extracted from the supplied AklatBata reference screenshot and the earlier prototype. Replace these with original licensed artwork/product images before production.
