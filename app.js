const PRODUCTS=[
{id:"p001",name:"Pulse Mini Speaker",price:1890,category:"Audio",emoji:"◉",desc:"Compact wireless speaker with rich sound for desks and small rooms."},
{id:"p002",name:"Orbit Desk Lamp",price:1490,category:"Home",emoji:"◒",desc:"Minimal LED desk lamp with a warm, focused glow."},
{id:"p003",name:"Nest Bottle",price:790,category:"Lifestyle",emoji:"◐",desc:"Reusable insulated bottle designed for everyday carry."},
{id:"p004",name:"Snap Backpack",price:2290,category:"Travel",emoji:"▣",desc:"Lightweight everyday backpack with smart storage."},
{id:"p005",name:"Cloud Headphones",price:2990,category:"Audio",emoji:"◓",desc:"Comfort-first over-ear headphones for work and travel."},
{id:"p006",name:"Focus Notebook",price:390,category:"Stationery",emoji:"▤",desc:"Premium dotted notebook for ideas, plans and projects."},
{id:"p007",name:"Pixel Mouse",price:1190,category:"Tech",emoji:"◍",desc:"Smooth wireless mouse with a clean ergonomic shape."},
{id:"p008",name:"Daily Tote",price:990,category:"Lifestyle",emoji:"▱",desc:"Simple carry-all tote for work, shopping and weekends."}
];

const money=n=>"৳"+Number(n).toLocaleString("en-BD");
const getCart=()=>JSON.parse(localStorage.getItem("ecotechbd_cart")||"[]");
const saveCart=c=>localStorage.setItem("ecotechbd_cart",JSON.stringify(c));
const pushEvent=(event_name,params={})=>{
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({event:event_name,...params});
  console.log("[EcoTech BD dataLayer]",event_name,params);
};
function cartCount(){return getCart().reduce((s,x)=>s+x.qty,0)}
function updateCount(){document.querySelectorAll("#cartCount").forEach(x=>x.textContent=cartCount())}
function addToCart(id,qty=1){
  const p=PRODUCTS.find(x=>x.id===id); if(!p)return;
  const c=getCart(), found=c.find(x=>x.id===id);
  if(found)found.qty+=qty;else c.push({id,qty});
  saveCart(c);updateCount();
  pushEvent("add_to_cart",{ecommerce:{currency:"BDT",value:p.price*qty,items:[{item_id:p.id,item_name:p.name,price:p.price,quantity:qty}]}});
  alert(`${p.name} added to cart`);
}
function productCard(p){
 return `<article class="product-card"><a href="product.html?id=${p.id}" onclick="trackView('${p.id}')"><div class="product-art">${p.emoji}</div></a><div class="product-info"><p class="muted-text">${p.category}</p><h3>${p.name}</h3><div class="price">${money(p.price)}</div><p class="muted-text">${p.desc}</p><div class="product-actions"><a class="small-btn" href="product.html?id=${p.id}" onclick="trackView('${p.id}')">View</a><button class="small-btn dark" onclick="addToCart('${p.id}')">Add to cart</button></div></div></article>`;
}
function trackView(id){
 const p=PRODUCTS.find(x=>x.id===id);if(!p)return;
 pushEvent("select_item",{ecommerce:{item_list_name:"Popular picks",items:[{item_id:p.id,item_name:p.name,price:p.price}]}});
}
function initHome(){
 const grid=document.getElementById("productGrid"); if(!grid)return;
 const render=(items)=>grid.innerHTML=items.length?items.map(productCard).join(""):`<p>No products found.</p>`;
 render(PRODUCTS);
 document.getElementById("searchInput").addEventListener("input",e=>{
   const q=e.target.value.toLowerCase().trim();
   const items=PRODUCTS.filter(p=>(p.name+" "+p.category+" "+p.desc).toLowerCase().includes(q));
   render(items);
   pushEvent("search",{search_term:q});
 });
}
function initProduct(){
 const el=document.getElementById("productDetail");if(!el)return;
 const id=new URLSearchParams(location.search).get("id")||"p001";const p=PRODUCTS.find(x=>x.id===id)||PRODUCTS[0];
 el.innerHTML=`<div class="product-detail"><div class="detail-art">${p.emoji}</div><div class="detail-copy"><p class="eyebrow">${p.category}</p><h1>${p.name}</h1><p>${p.desc}</p><div class="price">${money(p.price)}</div><div class="quantity"><label>Qty <input id="qty" type="number" min="1" value="1"></label></div><button class="btn primary" id="addDetail">Add to cart</button></div></div>`;
 pushEvent("view_item",{ecommerce:{currency:"BDT",value:p.price,items:[{item_id:p.id,item_name:p.name,price:p.price,quantity:1}]}});
 document.getElementById("addDetail").onclick=()=>addToCart(p.id,Math.max(1,Number(document.getElementById("qty").value)||1));
}
function initCart(){
 const area=document.getElementById("cartArea");if(!area)return;
 const c=getCart();
 if(!c.length){area.innerHTML=`<div class="form-card"><p>Your cart is empty.</p><a class="btn primary" href="index.html#shop">Browse products</a></div>`;return}
 const rows=c.map(x=>{const p=PRODUCTS.find(y=>y.id===x.id);return `<div class="cart-row"><div><b>${p.name}</b><div class="muted-text">${money(p.price)} × ${x.qty}</div></div><div class="line-price">${money(p.price*x.qty)}</div><div><input aria-label="Quantity" type="number" min="1" value="${x.qty}" onchange="changeQty('${p.id}',this.value)" style="width:65px;padding:8px;border:1px solid #e5e7eb;border-radius:8px"></div><button class="remove" onclick="removeItem('${p.id}')">×</button></div>`}).join("");
 const total=c.reduce((s,x)=>s+(PRODUCTS.find(p=>p.id===x.id).price*x.qty),0);
 area.innerHTML=`<div class="cart-table">${rows}<div class="cart-total"><b>Total</b><strong>${money(total)}</strong></div></div><div style="margin-top:18px;text-align:right"><a class="btn primary" href="checkout.html" onclick="beginCheckout()">Proceed to checkout</a></div>`;
 pushEvent("view_cart",{ecommerce:{currency:"BDT",value:total,items:c.map(x=>{const p=PRODUCTS.find(y=>y.id===x.id);return {item_id:p.id,item_name:p.name,price:p.price,quantity:x.qty}})}});
}
function changeQty(id,val){const c=getCart();const x=c.find(y=>y.id===id);if(x)x.qty=Math.max(1,Number(val)||1);saveCart(c);initCart();updateCount()}
function removeItem(id){const c=getCart().filter(x=>x.id!==id);saveCart(c);pushEvent("remove_from_cart",{item_id:id});initCart();updateCount()}
function beginCheckout(){pushEvent("begin_checkout",{ecommerce:{currency:"BDT"}})}
function initCheckout(){
 const summary=document.getElementById("checkoutSummary");if(!summary)return;
 const c=getCart();if(!c.length){summary.innerHTML=`<p>Your cart is empty. <a href="index.html#shop">Go shopping</a></p>`;document.getElementById("checkoutForm").style.display="none";return}
 const total=c.reduce((s,x)=>s+(PRODUCTS.find(p=>p.id===x.id).price*x.qty),0);
 summary.innerHTML=`<b>Order summary</b><p>${c.map(x=>{const p=PRODUCTS.find(y=>y.id===x.id);return `${p.name} × ${x.qty} — ${money(p.price*x.qty)}`}).join("<br>")}</p><strong>Total: ${money(total)}</strong>`;
 pushEvent("begin_checkout",{ecommerce:{currency:"BDT",value:total,items:c}});
 document.getElementById("checkoutForm").addEventListener("submit",e=>{
   e.preventDefault();
   const fd=new FormData(e.target); const orderId="SN"+Date.now().toString().slice(-7);
   const order={orderId,total,items:c,email:fd.get("email"),firstName:fd.get("first_name")};
   localStorage.setItem("ecotechbd_last_order",JSON.stringify(order));
   pushEvent("purchase",{transaction_id:orderId,ecommerce:{transaction_id:orderId,currency:"BDT",value:total,items:c.map(x=>{const p=PRODUCTS.find(y=>y.id===x.id);return {item_id:p.id,item_name:p.name,price:p.price,quantity:x.qty}})}});
   localStorage.removeItem("ecotechbd_cart");
   location.href="thank-you.html";
 });
}
function initThankYou(){
 const o=JSON.parse(localStorage.getItem("ecotechbd_last_order")||"null");const d=document.getElementById("orderDetails");if(!d)return;
 if(o){d.innerHTML=`<div class="form-card"><b>Order #${o.orderId}</b><p>Total: ${money(o.total)}</p><p>Customer: ${o.firstName}</p></div>`}
}
function initContact(){
 const f=document.getElementById("contactForm");if(!f)return;
 f.addEventListener("submit",e=>{e.preventDefault();pushEvent("generate_lead",{lead_type:"contact_form",form_name:"EcoTech BD Contact Form"});document.getElementById("contactStatus").textContent="Thanks! Your message was recorded for this demo.";f.reset()});
}
document.addEventListener("DOMContentLoaded",()=>{
 updateCount();initHome();initProduct();initCart();initCheckout();initThankYou();initContact();
 pushEvent("page_view",{page_type:document.body.dataset.page||"unknown"});
});
