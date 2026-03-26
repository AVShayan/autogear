# AutoGear Store - Automobile Accessories E-Commerce

## Current State
New project. No existing frontend or backend logic.

## Requested Changes (Diff)

### Add
- Product catalog with CRUD operations (name, description, price in INR, category, stock)
- Shopping cart (add/remove/update quantity)
- Payment/checkout page with order placement
- Toast notification: "Order placed! Thank you!" on order confirmation
- Black and yellow theme throughout

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Backend (Motoko):
   - Product type: id, name, description, price (Nat), category, stock, imageUrl
   - CRUD: addProduct, updateProduct, deleteProduct, getProducts, getProduct
   - Cart/Order: placeOrder storing order with items and total
   - Seed sample automobile accessories data

2. Frontend (React/TypeScript):
   - Pages: Home/Products, Admin (CRUD), Cart, Checkout/Payment
   - Components: ProductCard, CartDrawer or CartPage, CheckoutForm
   - Toast on order placed
   - Black (#000) and yellow (#FACC15) theme
