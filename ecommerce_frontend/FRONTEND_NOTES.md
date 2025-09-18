# OceanShop Frontend

This React app implements a simple eCommerce UI:
- Product grid and product detail
- Cart with add/update/remove/clear
- Checkout flow
- Auth (login/register) with backend endpoints
- Profile and Orders pages
- Admin dashboard for product creation (basic)
- Ocean Professional theme via CSS variables

Configuration:
- Set REACT_APP_API_BASE to your backend API base (e.g., http://localhost:8000/api)
  - When the React app is served by Django on the same domain, you can set REACT_APP_API_BASE="/api" (default).
  - Ensure backend has a catch-all SPA fallback and serves the built assets to avoid 404 on refresh.
- Optional Supabase placeholders:
  - REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY, REACT_APP_SITE_URL

Routing:
- /, /products/:id, /cart, /checkout, /login, /signup, /profile, /orders, /admin

State:
- CartContext manages cart state and syncs with backend.
- AuthProvider wraps app and uses backend /auth/* endpoints.

Notes:
- Admin endpoints require admin user permissions on the backend.
- Supabase integration is stubbed; replace src/lib/supabasePlaceholder.js with actual client init when ready.
