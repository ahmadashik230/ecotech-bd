# EcoTech BD Tracking Practice Plan

| User action | dataLayer event | GA4 event | Meta event |
|---|---|---|---|
| Homepage loads | page_view | page_view | PageView |
| Product selected | select_item | select_item | — |
| Product detail opens | view_item | view_item | ViewContent |
| Search | search | search | Search |
| Add product | add_to_cart | add_to_cart | AddToCart |
| Cart opens | view_cart | view_cart | — |
| Checkout starts | begin_checkout | begin_checkout | InitiateCheckout |
| Contact form submits | generate_lead | generate_lead / lead | Lead |
| Order completes | purchase | purchase | Purchase |

## Recommended GTM variables
- `DLV - ecommerce.currency`
- `DLV - ecommerce.value`
- `DLV - ecommerce.items`
- `DLV - transaction_id`
- `DLV - search_term`
- `DLV - form_name`

## Testing checklist
- GTM Preview receives each event.
- GA4 DebugView receives the intended event.
- GA4 ecommerce parameters contain item data.
- Meta Test Events receives browser events.
- Purchase has a unique transaction/order ID.
- Refreshing the thank-you page should not be used as a production purchase trigger without deduplication safeguards.
