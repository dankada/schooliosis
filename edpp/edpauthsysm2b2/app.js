/* =============================================
   SLOPCLOP SHOP - app.js
   Vanilla JS | Flatzi API | JWT Auth
============================================= */

// ─── CONFIG ──────────────────────────────────
const API_BASE    = "https://api.escuelajs.co/api/v1";
const FETCH_LIMIT = 50;

// ─── STATE ───────────────────────────────────
let allProducts      = [];
let filteredProducts = [];
let cart             = [];
let currentCategoryId = "";   // "" = all categories
let accessToken      = "";

// ─── DOM REFS ─────────────────────────────────
const productGrid   = document.getElementById("productGrid");
const statusBar     = document.getElementById("statusBar");
const cartItems     = document.getElementById("cartItems");
const cartTotal     = document.getElementById("cartTotal");
const cartCount     = document.getElementById("cartCount");
const cartPanel     = document.getElementById("cartPanel");
const modalOverlay  = document.getElementById("modalOverlay");
const modalContent  = document.getElementById("modalContent");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const loginOverlay  = document.getElementById("loginOverlay");
const userBadge     = document.getElementById("userBadge");
const categorySelect= document.getElementById("categorySelect");

// ─── INIT ─────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  // Read the email passed from our auth.js module
  setTimeout(() => {
    if (window.loggedInEmail) {
      userBadge.textContent = "👤 " + window.loggedInEmail;
      fetchCategories(); 
    }
  }, 50); 

  handleResponsiveCart();
  window.addEventListener("resize", handleResponsiveCart);
});


// ─── AUTH: LOGOUT ─────────────────────────────
function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("email");
  accessToken = "";
  cart = [];
  allProducts = [];
  filteredProducts = [];
  renderCart();
  productGrid.innerHTML = "";
  statusBar.textContent = "Logged out. See you! 👋";
  userBadge.textContent = "👤 ...";
  // Show login modal
  document.getElementById("loginEmail").value    = "";
  document.getElementById("loginPassword").value = "";
  document.getElementById("loginError").style.display = "none";
  document.getElementById("loginBtn").textContent = "🚀 Log In!";
  document.getElementById("loginBtn").disabled    = false;
  loginOverlay.classList.add("active");
}

// ─── FETCH CATEGORIES ─────────────────────────
async function fetchCategories() {
  console.log("[CATEGORIES] fetching from API...");
  try {
    const res  = await fetch(`${API_BASE}/categories`);
    const all  = await res.json();
    console.log("[CATEGORIES] raw total from API:", all.length);

    // The Flatzi API is a public sandbox — anyone can POST junk categories.
    // We whitelist the known-good original ones by id and sane name,
    // then allow a few extras up to id=15 if they look clean.
    const WHITELIST_IDS = new Set([1, 2, 3, 4, 5, 9, 10, 11, 12]);
    const JUNK_PATTERN  = /[@%\n\r<>\\{}]/;  // signs of injection / garbage names

    const cats = all.filter(c => {
      if (WHITELIST_IDS.has(c.id)) return true;
      if (c.id > 15) return false;                       // beyond this it's all user spam
      if (!c.name || c.name.trim().length === 0) return false;
      if (JUNK_PATTERN.test(c.name)) return false;
      if (c.name.length > 40) return false;
      return true;
    });

    console.log("[CATEGORIES] after filtering:", cats.length, "categories →",
      cats.map(c => `${c.id}:${c.name}`).join(", "));

    categorySelect.innerHTML = "";

    // "All" option
    const allOpt = document.createElement("option");
    allOpt.value = "";
    allOpt.textContent = "🌐 All Categories";
    categorySelect.appendChild(allOpt);

    cats.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat.id;
      opt.textContent = cat.name;
      categorySelect.appendChild(opt);
    });

    // Default to "All Categories" — individual categories on this public test API
    // are polluted and may have fewer than 25 products. "All" reliably returns 50.
    // The dropdown is still there for the user to filter to a single category.
    categorySelect.value = "";
    currentCategoryId = "";
    console.log("[CATEGORIES] defaulting to: All Categories");

    fetchProducts();
  } catch (err) {
    console.error("[CATEGORIES] fetch failed:", err);
    categorySelect.innerHTML = `<option value="">⚠️ Failed to load</option>`;
    fetchProducts();
  }
}

// ─── CATEGORY CHANGE ──────────────────────────
function onCategoryChange() {
  currentCategoryId = categorySelect.value;
  document.getElementById("priceMin").value = "";
  document.getElementById("priceMax").value = "";
  fetchProducts();
}

// ─── FETCH PRODUCTS ───────────────────────────
async function fetchProducts(priceMin = null, priceMax = null) {
  statusBar.textContent = "Loading products... ⏳";
  productGrid.innerHTML = "";

  let url = `${API_BASE}/products?limit=${FETCH_LIMIT}&offset=0`;
  if (currentCategoryId !== "") {
    url += `&categoryId=${currentCategoryId}`;
  }
  if (priceMin !== null) url += `&price_min=${priceMin}`;
  if (priceMax !== null) url += `&price_max=${priceMax}`;

  console.log("[PRODUCTS] fetching URL:", url);

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    console.log("[PRODUCTS] received:", data.length, "products");
    console.table(data.map(p => ({
      id:       p.id,
      title:    p.title.slice(0, 30),
      price:    p.price,
      category: p.category?.name,
      images:   p.images
    })));

    allProducts      = data;
    filteredProducts = data;

    const catLabel = categorySelect.options[categorySelect.selectedIndex]?.text || "All";
    renderProducts(filteredProducts);
    statusBar.textContent = `✅ ${filteredProducts.length} product(s) — ${catLabel}`;
  } catch (err) {
    console.error("Fetch error:", err);
    statusBar.textContent = "❌ Could not load products. Check your connection.";
    productGrid.innerHTML = `<p style="color:red;font-size:1rem;grid-column:1/-1;">Failed to load products 😢</p>`;
  }
}

// ─── RENDER PRODUCTS ──────────────────────────
function renderProducts(products) {
  productGrid.innerHTML = "";

  if (products.length === 0) {
    productGrid.innerHTML = `<p style="color:#888;font-size:1rem;grid-column:1/-1;">No products found 😕 Try a wider filter!</p>`;
    statusBar.textContent = `🔍 0 products found`;
    return;
  }

  products.forEach(product => {
    const imgSrc  = getValidImage(product.images);
    const inCart  = cart.find(c => c.id === product.id);
    const btnLabel = inCart ? "✅ In Cart!" : "🛒 Add to Cart";

    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = product.id;
    card.innerHTML = `
      <div class="product-img-wrap">
        <img src="${imgSrc}"
             alt="${escapeHtml(product.title)}"
             referrerpolicy="no-referrer"
             onerror="this.src='https://placehold.co/600x400/f0f0f0/999?text=No+Image'" />
      </div>
      <div class="product-info">
        <div class="product-name">${escapeHtml(product.title)}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
      </div>
      <button class="btn btn-add" id="addBtn-${product.id}" onclick="addToCart(${product.id})">${btnLabel}</button>
    `;
    productGrid.appendChild(card);
  });
}

// ─── FILTER ───────────────────────────────────
function applyFilter() {
  const minVal = document.getElementById("priceMin").value.trim();
  const maxVal = document.getElementById("priceMax").value.trim();

  const priceMin = minVal !== "" ? parseFloat(minVal) : null;
  const priceMax = maxVal !== "" ? parseFloat(maxVal) : null;

  console.log("[FILTER] applying price range — min:", priceMin, "| max:", priceMax);

  if (priceMin !== null && priceMax !== null && priceMin > priceMax) {
    alert("😅 Min price can't be greater than Max price!");
    return;
  }

  fetchProducts(priceMin, priceMax);
}

function resetFilter() {
  console.log("[FILTER] resetting price filter");
  document.getElementById("priceMin").value = "";
  document.getElementById("priceMax").value = "";
  fetchProducts();
}

// ─── CART: ADD ────────────────────────────────
function addToCart(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.quantity += 1;
    console.log("[CART] qty increased →", existing.name, "| qty:", existing.quantity);
  } else {
    cart.push({ id: product.id, name: product.title, price: product.price, quantity: 1 });
    console.log("[CART] item added →", product.title, "| price: $" + product.price);
  }

  updateAddButton(productId, true);
  renderCart();
}

// ─── CART: REMOVE ─────────────────────────────
function removeFromCart(productId) {
  const item = cart.find(c => c.id === productId);
  console.log("[CART] removing →", item?.name || productId);
  cart = cart.filter(c => c.id !== productId);
  updateAddButton(productId, false);
  renderCart();
}

// ─── CART: UPDATE QTY ─────────────────────────
function updateQuantity(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;
  item.quantity += delta;
  console.log("[CART] qty updated →", item.name, "| new qty:", item.quantity);
  if (item.quantity <= 0) {
    console.log("[CART] qty hit 0, removing item →", item.name);
    removeFromCart(productId);
    return;
  }
  renderCart();
}

// ─── CART: RENDER ─────────────────────────────
function renderCart() {
  const totalQty = cart.reduce((s, c) => s + c.quantity, 0);
  cartCount.textContent = totalQty;

  const total = cart.reduce((s, c) => s + c.price * c.quantity, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;

  console.log("[CART] state — items:", cart.length, "| total qty:", totalQty, "| total price: $" + total.toFixed(2));
  if (cart.length > 0) {
    console.table(cart.map(c => ({
      id:       c.id,
      name:     c.name.slice(0, 25),
      price:    "$" + c.price.toFixed(2),
      qty:      c.quantity,
      subtotal: "$" + (c.price * c.quantity).toFixed(2)
    })));
  }

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart-msg">Your cart is empty! 😢<br>Add something nice!</p>`;
    return;
  }

  cartItems.innerHTML = "";
  cart.forEach(item => {
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <div class="cart-item-name">${escapeHtml(item.name)}</div>
      <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
        <span class="qty-display">${item.quantity}</span>
        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑 Remove</button>
      </div>
      <div style="font-size:0.8rem;color:#888;">
        Subtotal: <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
      </div>
    `;
    cartItems.appendChild(el);
  });
}

// ─── CHECKOUT ─────────────────────────────────
async function checkout() {
  if (cart.length === 0) {
    alert("😅 Your cart is empty! Add some items first.");
    return;
  }

  // Pulls the email directly from your auth.js state
  let userInfo = { email: window.loggedInEmail || "guest@example.com" };

  const total = cart.reduce((s, c) => s + c.price * c.quantity, 0);
  const payload = {
    user:  userInfo,
    cart:  cart.map(c => ({ ...c })),
    total: parseFloat(total.toFixed(2)),
    date:  new Date()
  };


  console.log("[CHECKOUT] building payload...");
  console.log("[CHECKOUT] user:", userInfo);
  console.log("[CHECKOUT] cart items:", payload.cart.length);
  console.table(payload.cart.map(c => ({
    id:       c.id,
    name:     c.name.slice(0, 25),
    price:    "$" + c.price.toFixed(2),
    qty:      c.quantity,
    subtotal: "$" + (c.price * c.quantity).toFixed(2)
  })));
  console.log("[CHECKOUT] total: $" + payload.total);
  console.log("[CHECKOUT] date:", payload.date.toISOString());

  // Loading state
  openModal(`
    <span class="modal-icon">⏳</span>
    <div class="modal-title">Processing...</div>
    <div class="modal-loading modal-msg">Please wait while we confirm your order!</div>
  `);
  modalCloseBtn.style.display = "none";

  // Simulate async request
  setTimeout(() => {
    const success = Math.random() > 0.1;
    console.log("[CHECKOUT] simulated request result:", success ? "SUCCESS ✅" : "FAILURE ❌");

    if (success) {
      try {
        localStorage.setItem("lastOrder", JSON.stringify(payload));
        console.log("[CHECKOUT] payload saved to localStorage key 'lastOrder'");
        console.log("[CHECKOUT] full payload:", payload);
      } catch (e) {
        console.error("[CHECKOUT] localStorage save failed:", e);
      }

      cart = [];
      renderCart();
      resetAllAddButtons();

      openModal(`
        <span class="modal-icon">🎉</span>
        <div class="modal-title">Order Placed!</div>
        <div class="modal-msg">
          Woohoo! Order confirmed!<br><br>
          📧 <strong>${escapeHtml(userInfo.email)}</strong><br>
          🛍️ ${payload.cart.length} item(s)<br>
          💰 Total: <strong>$${payload.total.toFixed(2)}</strong><br><br>
          <small style="color:#aaa;">Saved to localStorage ✅</small>
        </div>
      `);
    } else {
      openModal(`
        <span class="modal-icon">❌</span>
        <div class="modal-title">Something went wrong!</div>
        <div class="modal-msg">
          Uh oh! The order failed. 😢<br>
          Please try again in a bit!<br><br>
          <small style="color:#aaa;">Your cart has been kept.</small>
        </div>
      `);
    }

    modalCloseBtn.style.display = "block";
  }, 2500);
}

// ─── MODAL ────────────────────────────────────
function openModal(html) {
  modalContent.innerHTML = html;
  modalOverlay.classList.add("active");
}

function closeModal() {
  modalOverlay.classList.remove("active");
}

// ─── CART TOGGLE (mobile) ─────────────────────
function toggleCart() {
  if (window.innerWidth <= 768) {
    cartPanel.classList.toggle("open");
  }
}

function handleResponsiveCart() {
  if (window.innerWidth > 768) {
    cartPanel.classList.remove("open");
  }
}

// ─── HELPERS ──────────────────────────────────

/**
 * getValidImage
 * -------------
 * The Flatzi API is inconsistent with its images field. Possible formats:
 *   1. Clean array:          ["https://..."]
 *   2. JSON-string inside:   ["[\"https://...\"]"]
 *   3. Bracket-wrapped:      ["[https://...]"]
 *   4. Totally broken:       ["not a url at all"]
 *
 * We try each entry, attempt to JSON.parse it if it looks nested,
 * then pull the first valid http URL we find.
 */
function getValidImage(images) {
  const FALLBACK = "https://placehold.co/600x400/f0f0f0/999?text=No+Image";

  if (!images || images.length === 0) {
    console.warn("[IMG] images array empty, using fallback");
    return FALLBACK;
  }

  for (const raw of images) {
    if (typeof raw !== "string") continue;

    // Case 1: clean URL
    if (raw.startsWith("http")) {
      console.log("[IMG] clean URL found:", raw);
      return raw;
    }

    // Case 2 & 3: the string itself contains a URL — try to extract it
    // e.g.  "[\"https://...\"]"  or  "[https://...]"
    const urlMatch = raw.match(/https?:\/\/[^\s"'\]]+/);
    if (urlMatch) {
      console.log("[IMG] extracted URL from wrapped string:", urlMatch[0], "| original:", raw);
      return urlMatch[0];
    }

    // Case 4: try JSON.parse in case it's a stringified array
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        for (const inner of parsed) {
          if (typeof inner === "string" && inner.startsWith("http")) {
            console.log("[IMG] URL from JSON.parsed nested array:", inner);
            return inner;
          }
        }
      } else if (typeof parsed === "string" && parsed.startsWith("http")) {
        console.log("[IMG] URL from JSON.parsed string:", parsed);
        return parsed;
      }
    } catch (_) {
      // not JSON, ignore
    }

    console.warn("[IMG] could not extract URL from entry:", raw);
  }

  console.warn("[IMG] no valid URL found in images array:", images, "— using fallback");
  return FALLBACK;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function updateAddButton(productId, inCart) {
  const btn = document.getElementById(`addBtn-${productId}`);
  if (btn) btn.textContent = inCart ? "✅ In Cart!" : "🛒 Add to Cart";
}

function resetAllAddButtons() {
  document.querySelectorAll("[id^='addBtn-']").forEach(btn => {
    btn.textContent = "🛒 Add to Cart";
  });
}