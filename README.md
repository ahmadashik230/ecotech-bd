# EcoTech BD Practice Website

A responsive demo e-commerce website created specifically for digital marketing and analytics practice.

## Included pages
- `index.html` — home/shop/search
- `product.html?id=p001` — product detail
- `cart.html` — cart + view_cart
- `checkout.html` — checkout + begin_checkout + purchase
- `thank-you.html` — purchase confirmation
- `contact.html` — lead/contact form

## Built-in tracking hooks
The site already has `window.dataLayer` and pushes demo events:
- `page_view`
- `select_item`
- `view_item`
- `search`
- `add_to_cart`
- `remove_from_cart`
- `view_cart`
- `begin_checkout`
- `generate_lead`
- `purchase`

Open browser DevTools → Console to see the events.

## Suggested practice order
1. Host the site on a public URL.
2. Create a GTM Web container and add the GTM snippets to every page.
3. In GTM Preview, inspect the existing dataLayer events.
4. Create GA4 configuration/event tags.
5. Add Meta Pixel base code.
6. Map Meta events to the shopping actions.
7. Test browser events in Meta Events Manager.
8. Compare GTM Preview, GA4 DebugView and Meta Events Manager.
9. Later practice Meta CAPI/server-side tracking.

## Important
This is a demo/practice store. It does not process real payments and uses fictional product/order data.

## Hosting
Because this is a static HTML/CSS/JS project, it can be hosted on GitHub Pages, Netlify, Vercel, Cloudflare Pages or similar static hosting.


Brand name: EcoTech BD. This is a fictional practice/demo business website for analytics and advertising tracking practice.
