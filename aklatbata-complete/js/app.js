const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)];
const AS = "assets/";
const defaultBooks = [
  {
    id: 1,
    title: "The Brave Bunny",
    titleFil: "Ang Matapang na Kuneho",
    category: "Storybooks",
    price: 149,
    stock: 24,
    author: "AklatBata Kids",
    image: "brave-bunny.jpg",
    description:
      "Isang kaibig-ibig na kuwento tungkol sa tapang, pagkakaibigan, at pagtulong sa kapwa. Perpekto para sa batang mambabasa.",
    rating: 5,
    sales: 245,
  },
  {
    id: 2,
    title: "Mathematics Made Easy",
    titleFil: "Matematika para sa Bawat Isa",
    category: "Academic",
    price: 299,
    stock: 18,
    author: "Learning House",
    image: "math-made-easy.jpg",
    description:
      "Madaling sundan na mga aralin at pagsasanay sa pangunahing konsepto ng matematika.",
    rating: 5,
    sales: 184,
  },
  {
    id: 3,
    title: "Science for Kids",
    titleFil: "Agham para sa mga Bata",
    category: "Academic",
    price: 249,
    stock: 15,
    author: "Bright Minds",
    image: "science-for-kids.jpg",
    description:
      "Tuklasin ang mundo ng agham sa pamamagitan ng masaya at madaling unawaing mga aralin.",
    rating: 4,
    sales: 156,
  },
  {
    id: 4,
    title: "English Workbook",
    titleFil: "English Workbook",
    category: "Educational",
    price: 279,
    stock: 20,
    author: "Little Learners",
    image: "english-workbook.jpg",
    description:
      "Mga aktibidad para mapaunlad ang bokabularyo, pagbasa, at pagsulat sa English.",
    rating: 5,
    sales: 132,
  },
  {
    id: 5,
    title: "Si Juan at ang Pisang Bato",
    titleFil: "Si Juan at ang Pisang Bato",
    category: "Storybooks",
    price: 149,
    stock: 30,
    author: "AklatBata Kids",
    image: "brave-bunny.jpg",
    description:
      "Isang masayang kuwentong pambata na nagtuturo ng kabutihan at pagiging maparaan.",
    rating: 5,
    sales: 98,
  },
  {
    id: 6,
    title: "Ang Kuwentong Prinsesa",
    titleFil: "Ang Kuwentong Prinsesa",
    category: "Storybooks",
    price: 199,
    stock: 12,
    author: "AklatBata Kids",
    image: "brave-bunny-detail.jpg",
    description:
      "Isang makulay na kuwentong puno ng pangarap, kabaitan, at pag-asa.",
    rating: 4,
    sales: 87,
  },
  {
    id: 7,
    title: "Mga Halaman at Kalikasan",
    titleFil: "Mga Halaman at Kalikasan",
    category: "Educational",
    price: 189,
    stock: 16,
    author: "Green Learners",
    image: "science-for-kids.jpg",
    description:
      "Kilalanin ang kalikasan at matutong pangalagaan ang ating kapaligiran.",
    rating: 4,
    sales: 74,
  },
  {
    id: 8,
    title: "Basic Reading Skills",
    titleFil: "Mga Unang Hakbang sa Pagbasa",
    category: "Educational",
    price: 229,
    stock: 22,
    author: "Little Learners",
    image: "english-workbook.jpg",
    description:
      "Mga simpleng pagsasanay para sa mga batang nagsisimula pa lamang magbasa.",
    rating: 5,
    sales: 69,
  },
];
const get = (k, d) => {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? d;
    } catch {
      return d;
    }
  },
  set = (k, v) => localStorage.setItem(k, JSON.stringify(v));
let books = get("ab_books", defaultBooks),
  cart = get("ab_cart", []),
  wishlist = get("ab_wishlist", []),
  orders = get("ab_orders", []),
  user = get("ab_user", null),
  categories = get("ab_categories", ["Storybooks", "Academic", "Educational"]);
const peso = (n) =>
  "₱" +
  Number(n || 0).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
const bookBy = (id) => books.find((b) => b.id === Number(id)) || books[0];
const img = (name, cls = "") =>
  `<img class="${cls}" src="${AS}${name}" alt="Pabalat ng libro" onerror="this.src='${AS}brave-bunny.jpg'">`;
const icon = (name) =>
  ({
    search: "⌕",
    cart: "🛒",
    user: "♙",
    menu: "☰",
    book: "▤",
    heart: "♡",
    home: "⌂",
    orders: "▣",
    category: "▦",
    users: "♧",
    settings: "⚙",
    logout: "↪",
    edit: "✎",
    trash: "⌫",
  })[name] || "•";
function header() {
  return `<header class="site-header"><div class="container nav-wrap"><a class="brand" href="index.html"><img src="${AS}logo-reference.jpg" alt="AklatBata logo"><div><div class="brand-name">Aklat<span>Bata</span></div><div class="brand-sub">Online Bookstore</div></div></a><nav class="nav-links"><a href="index.html" data-nav="home">Home</a><a href="books.html" data-nav="books">Mga Libro⌄</a><a href="about.html" data-nav="about">Tungkol Sa Amin</a><a href="contact.html" data-nav="contact">Contact</a></nav><div class="nav-actions"><a class="icon-btn" href="books.html" aria-label="Maghanap">⌕</a><a class="icon-btn" href="cart.html" aria-label="Cart">🛒<span class="count" id="cart-count">${cart.reduce((n, x) => n + x.qty, 0)}</span></a><a class="icon-btn" href="account.html" aria-label="Account">♙</a><a class="btn btn-primary btn-small nav-login" href="${user ? "account.html" : "login.html"}">${user ? "Account" : "Login"}</a><button class="icon-btn mobile-toggle" id="mobile-toggle" aria-label="Menu">☰</button></div></div><div class="mobile-menu" id="mobile-menu"><a href="index.html">Home</a><a href="books.html">Mga Libro</a><a href="about.html">Tungkol Sa Amin</a><a href="contact.html">Contact</a><a href="cart.html">Aking Cart</a><a href="login.html">Mag-login</a></div></header>`;
}
function footer() {
  return `<footer class="site-footer"><div class="container"><div class="footer-grid"><div class="footer-brand"><a class="brand" href="index.html"><img src="${AS}logo-reference.jpg" alt=""><div><div class="brand-name">Aklat<span>Bata</span></div><div class="brand-sub">Online Bookstore</div></div></a><p>Magbasa ngayon, para sa mas magandang bukas! Mga kuwentong nagbibigay-saya at aklat na nagbibigay-kaalaman.</p><div class="socials"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="YouTube">▶</a><a href="#" aria-label="Instagram">◎</a></div></div><div><div class="footer-title">Mga Link</div><div class="footer-links"><a href="index.html">Home</a><a href="books.html">Mga Libro</a><a href="about.html">Tungkol Sa Amin</a><a href="contact.html">Makipag-ugnayan</a></div></div><div><div class="footer-title">Makipag-ugnayan</div><div class="footer-links"><span>✉ hello@aklatbata.ph</span><span>☎ +63 912 345 6789</span><span>📍 Pilipinas</span><a href="contact.html">Magpadala ng mensahe</a></div></div></div><div class="copyright"><span>© 2026 AklatBata Online Bookstore. Lahat ng karapatan ay nakalaan.</span><span><a href="contact.html">Privacy Policy</a>　|　<a href="contact.html">Terms of Service</a></span></div></div></footer>`;
}
function shell(content, admin = false) {
  $("#app").innerHTML =
    (admin ? "" : header()) + content + (admin ? "" : footer());
  if (!admin) {
    let p = document.body.dataset.page;
    let nav = $(`[data-nav="${p}"]`);
    if (nav) nav.classList.add("active");
  }
  $("#mobile-toggle")?.addEventListener("click", () =>
    $("#mobile-menu").classList.toggle("open"),
  );
}
function card(b) {
  return `<article class="book-card"><a class="book-cover" href="book.html?id=${b.id}">${img(b.image)}</a><div class="rating">${"★".repeat(b.rating || 5)}<span style="color:#c6c9c4">${"★".repeat(5 - (b.rating || 5))}</span></div><h3><a href="book.html?id=${b.id}">${b.titleFil || b.title}</a></h3><div class="author">${b.author || "AklatBata"}</div><div class="book-card-bottom"><span class="price">${peso(b.price)}</span><button class="btn btn-primary btn-small" data-add="${b.id}">＋ Idagdag</button></div></article>`;
}
function home() {
  shell(
    `<main><section class="container hero"><div class="hero-copy"><div class="eyebrow">AklatBata Online Bookstore</div><h1>Maligayang Pagdating sa <span>AklatBata!</span></h1><div class="hero-tag">Magbasa. Matuto. Mangarap.</div><p>Ang inyong online bookstore para sa pambatang storybooks at academic books. Hanapin ang susunod mong paboritong kuwento at tuklasin ang saya ng pagbabasa.</p><a class="btn btn-primary" href="books.html">Tuklasin ang Aming Libro <span>→</span></a></div><div class="hero-art">${img("hero-child.jpg")}</div></section><div class="hero-wave"></div><section class="container section"><div class="section-head"><div><div class="eyebrow">Magsimula Dito</div><h2>Tuklasin ang Aming Koleksyon</h2><p>Mga aklat para sa bawat batang mausisa at nangangarap.</p></div><a class="text-link" href="books.html">Tingnan lahat →</a></div><div class="category-strip"><a class="category-tile" href="books.html?category=Storybooks"><span class="category-emoji">📚</span><span><strong>Pambatang Storybooks</strong><small>Mga kuwentong puno ng saya</small></span></a><a class="category-tile" href="books.html?category=Academic"><span class="category-emoji">🎓</span><span><strong>Academic Books</strong><small>Suporta sa pag-aaral</small></span></a><a class="category-tile" href="books.html?category=Educational"><span class="category-emoji">🌱</span><span><strong>Educational Books</strong><small>Matuto habang nagbabasa</small></span></a></div></section><section class="container section"><div class="section-head"><div><div class="eyebrow">Pinili Para Sa Iyo</div><h2>Mga Patok na Libro</h2><p>Mga paborito ng aming mga batang mambabasa.</p></div><a class="text-link" href="books.html">Lahat ng libro →</a></div><div class="book-grid">${books.slice(0, 4).map(card).join("")}</div></section><section class="container section"><div class="panel" style="background:var(--sage2);display:flex;align-items:center;justify-content:space-between;gap:25px;flex-wrap:wrap"><div><div class="eyebrow">Handa Ka Na Bang Magbasa?</div><h2 style="margin:5px 0">Bawat pahina, bagong posibilidad.</h2><p style="color:var(--muted);margin:0">Simulan ang iyong susunod na pakikipagsapalaran sa AklatBata.</p></div><a class="btn btn-primary" href="books.html">Mamili ng Libro →</a></div></section></main>`,
  );
}
function booksPage() {
  shell(
    `<main class="container"><div class="page-intro"><div class="eyebrow">Ang Aming Koleksyon</div><h1>Mga Libro</h1><p>Tuklasin ang aming koleksyon ng storybooks at academic books.</p></div><div class="toolbar"><label class="searchbox">⌕ <input id="book-search" placeholder="Maghanap ng libro, pamagat o may-akda…"></label><div class="filters" id="filters">${["Lahat", ...categories].map((c, i) => `<button class="filter-pill ${i === 0 ? "active" : ""}" data-filter="${c}">${c}</button>`).join("")}</div><select class="select" id="sort-books"><option value="featured">Inirerekomenda</option><option value="low">Presyo: mababa muna</option><option value="high">Presyo: mataas muna</option><option value="az">Pamagat: A–Z</option></select></div><div class="results-line" id="result-count"></div><div class="book-grid" id="catalog-grid">${books.map(card).join("")}</div></main>`,
  );
  let params = new URLSearchParams(location.search),
    active = params.get("category") || "Lahat";
  function draw() {
    let q = $("#book-search").value.toLowerCase(),
      cat = active,
      arr = books.filter(
        (b) =>
          (cat === "Lahat" || b.category === cat) &&
          [b.title, b.titleFil, b.author, b.category]
            .join(" ")
            .toLowerCase()
            .includes(q),
      );
    let sort = $("#sort-books").value;
    if (sort === "low") arr.sort((a, b) => a.price - b.price);
    if (sort === "high") arr.sort((a, b) => b.price - a.price);
    if (sort === "az") arr.sort((a, b) => a.title.localeCompare(b.title));
    $("#catalog-grid").innerHTML = arr.length
      ? arr.map(card).join("")
      : `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">📚</div><h3>Walang nahanap na libro</h3><p>Subukan ang ibang salita o kategorya.</p></div>`;
    $("#result-count").textContent = `${arr.length} na libro ang nakita`;
  }
  $$("[data-filter]").forEach((btn) =>
    btn.addEventListener("click", () => {
      active = btn.dataset.filter;
      $$("[data-filter]").forEach((x) =>
        x.classList.toggle("active", x === btn),
      );
      draw();
    }),
  );
  $("#book-search").addEventListener("input", draw);
  $("#sort-books").addEventListener("change", draw);
  if (active !== "Lahat") {
    $$("[data-filter]").forEach((x) =>
      x.classList.toggle("active", x.dataset.filter === active),
    );
    draw();
  }
}
function detailPage() {
  let id = new URLSearchParams(location.search).get("id") || 1,
    b = bookBy(id);
  shell(
    `<main class="container"><div class="page-intro"><a class="text-link" href="books.html">← Bumalik sa Mga Libro</a></div><section class="detail-layout"><div class="detail-image">${img(b.image)}</div><div class="detail-info"><div class="eyebrow">${b.category}</div><h1>${b.titleFil || b.title}</h1><div class="rating">★★★★★ <span style="color:var(--muted);letter-spacing:0">(12 review)</span></div><div class="price">${peso(b.price)}</div><p>${b.description}</p><div class="meta-list"><div class="meta-row"><strong>May-akda:</strong> ${b.author}</div><div class="meta-row"><strong>Kategorya:</strong> ${b.category}</div><div class="meta-row"><strong>Availability:</strong> ${b.stock > 0 ? `May stock (${b.stock})` : "Ubos na"}</div></div><div style="display:flex;align-items:center;gap:12px"><strong>Dami:</strong><div class="quantity"><button data-qty="-1">−</button><input id="detail-qty" value="1" min="1" max="${Math.max(1, b.stock)}" type="number"><button data-qty="1">＋</button></div></div><div class="detail-actions"><button class="btn btn-primary" data-add="${b.id}" data-qty-input="detail-qty">🛒 Idagdag sa Cart</button><button class="btn btn-outline" data-wish="${b.id}">♡ Idagdag sa Paborito</button></div><small style="color:var(--muted)">Secure na pag-order · Maingat na pagbalot · Suporta sa customer</small></div></section><section class="section"><div class="tabs"><button class="tab active" data-tab="description">Detalye</button><button class="tab" data-tab="reviews">Mga Review</button></div><div id="tab-content"><p>${b.description}</p></div></section><section class="section"><div class="section-head"><h2>Maaaring Magustuhan Mo Rin</h2><a class="text-link" href="books.html">Tingnan lahat →</a></div><div class="book-grid">${books
      .filter((x) => x.id !== b.id)
      .slice(0, 4)
      .map(card)
      .join("")}</div></section></main>`,
  );
  $$("[data-qty]").forEach((btn) =>
    btn.addEventListener("click", () => {
      let el = $("#detail-qty");
      el.value = Math.max(
        1,
        Math.min(b.stock, Number(el.value || 1) + Number(btn.dataset.qty)),
      );
    }),
  );
  $$("[data-tab]").forEach((btn) =>
    btn.addEventListener("click", () => {
      $$("[data-tab]").forEach((x) => x.classList.toggle("active", x === btn));
      $("#tab-content").innerHTML =
        btn.dataset.tab === "description"
          ? `<p>${b.description}</p>`
          : `<p>Wala pang review para sa aklat na ito. Maging unang magbahagi ng iyong karanasan!</p>`;
    }),
  );
}
function cartPage() {
  cart = get("ab_cart", []);
  let rows = cart.map((item) => ({ ...item, book: bookBy(item.id) }));
  let subtotal = rows.reduce((n, x) => n + x.book.price * x.qty, 0);
  shell(
    `<main class="container"><div class="page-intro"><div class="eyebrow">Iyong Pamimili</div><h1>Shopping Cart</h1><p>Tingnan ang iyong mga napiling libro bago mag-checkout.</p></div>${rows.length ? `<div class="cart-layout"><section class="panel"><h2>Mga Napiling Libro (${rows.length})</h2>${rows.map((x) => `<div class="cart-row">${img(x.book.image)}<div><h3>${x.book.titleFil || x.book.title}</h3><small>${x.book.category} · ${peso(x.book.price)}</small><div style="margin-top:9px"><button class="text-link" data-remove="${x.id}">Alisin</button></div></div><div class="quantity"><button data-cart-qty="-1" data-id="${x.id}">−</button><input value="${x.qty}" readonly><button data-cart-qty="1" data-id="${x.id}">＋</button></div><strong class="line-price">${peso(x.book.price * x.qty)}</strong></div>`).join("")}<a class="text-link" href="books.html">← Magpatuloy sa Pagbili</a></section><aside class="panel"><h2>Buod ng Order</h2><div class="summary-line"><span>Subtotal</span><strong>${peso(subtotal)}</strong></div><div class="summary-line"><span>Pagpapadala</span><span>Kinakalkula sa checkout</span></div><div class="summary-line summary-total"><span>Kabuuan</span><strong>${peso(subtotal)}</strong></div><p style="font-size:11px;color:var(--muted)">Hindi pa kasama ang shipping fee.</p><a class="btn btn-primary btn-block" href="checkout.html">Magpatuloy sa Checkout →</a></aside></div>` : `<div class="empty-state"><div class="empty-icon">🛒</div><h2>Wala pang laman ang iyong cart</h2><p>Magdagdag ng mga librong gusto mong bilhin.</p><a class="btn btn-primary" href="books.html">Tuklasin ang Mga Libro</a></div>`}</main>`,
  );
}
function checkoutPage() {
  if (!cart.length) {
    shell(
      `<main class="container"><div class="empty-state"><h2>Walang laman ang cart</h2><a class="btn btn-primary" href="books.html">Mamili muna</a></div></main>`,
    );
    return;
  }
  let total = cart.reduce((n, x) => n + bookBy(x.id).price * x.qty, 0);
  shell(
    `<main class="container"><div class="page-intro"><div class="eyebrow">Huling Hakbang</div><h1>Checkout</h1><p>Ilagay ang iyong delivery details para maipadala ang iyong order.</p></div><form id="checkout-form" class="checkout-layout"><section class="panel"><h2>Impormasyon sa Pagpapadala</h2><div class="form-grid"><div class="field"><label>Buong Pangalan *</label><input name="name" required value="${user?.name || ""}" placeholder="Juan Dela Cruz"></div><div class="field"><label>Email Address *</label><input name="email" type="email" required value="${user?.email || ""}" placeholder="juan@email.com"></div></div><div class="field"><label>Numero ng Telepono *</label><input name="phone" required placeholder="09XX XXX XXXX"></div><div class="field"><label>Address *</label><textarea name="address" required placeholder="House no., street, barangay, city, province"></textarea></div><div class="form-grid"><div class="field"><label>Lungsod *</label><input name="city" required></div><div class="field"><label>Postal Code</label><input name="postal"></div></div><h3>Paraan ng Pagbabayad</h3><label class="radio-card"><input type="radio" name="payment" value="Cash on Delivery" checked> Cash on Delivery (COD)</label><label class="radio-card"><input type="radio" name="payment" value="Bank Transfer"> Bank Transfer (demo)</label><button class="btn btn-primary btn-block" type="submit">Ilagay ang Order · ${peso(total)}</button></section><aside class="panel"><h2>Order Summary</h2>${cart.map((x) => `<div class="summary-line"><span>${bookBy(x.id).title} × ${x.qty}</span><strong>${peso(bookBy(x.id).price * x.qty)}</strong></div>`).join("")}<div class="summary-line summary-total"><span>Kabuuan</span><strong>${peso(total)}</strong></div></aside></form></main>`,
  );
  $("#checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    let order = {
      id: "AB" + Date.now().toString().slice(-7),
      date: new Date().toLocaleDateString("en-PH"),
      items: cart,
      total,
      payment: data.payment,
      status: "Pending",
      customer: data,
    };
    orders = get("ab_orders", []);
    orders.unshift(order);
    set("ab_orders", orders);
    set("ab_cart", []);
    location.href = "order-success.html?id=" + order.id;
  });
}
function successPage() {
  let id = new URLSearchParams(location.search).get("id");
  shell(
    `<main class="container"><div class="success-box"><div class="success-icon">✓</div><div class="eyebrow">Matagumpay</div><h1>Salamat sa iyong order!</h1><p style="color:var(--muted)">Natanggap na namin ang iyong order ${id ? `<strong>${id}</strong>` : ""}. Ipapadala namin ang kumpirmasyon sa iyong email.</p><a class="btn btn-primary" href="orders.html">Tingnan ang Aking Mga Order</a> <a class="btn btn-outline" href="books.html">Magpatuloy Mamili</a></div></main>`,
  );
}
function authPage(type) {
  let isLogin = type === "login",
    isForgot = type === "forgot";
  shell(
    `<main class="container"><div class="auth-wrap"><div class="auth-art">${img("auth-illustration.jpg")}</div><div class="auth-content"><div class="auth-tabs"><a class="${isLogin ? "active" : ""}" href="login.html">Mag-login</a><a class="${type === "register" ? "active" : ""}" href="register.html">Mag-sign Up</a></div><h1>${isForgot ? "I-reset ang Password" : isLogin ? "Welcome Back!" : "Gumawa ng Account"}</h1><p>${isLogin ? "Mag-login upang ipagpatuloy ang iyong paglalakbay sa AklatBata." : isForgot ? "Ilagay ang iyong email upang makatanggap ng reset instructions." : "Sumali sa AklatBata at tuklasin ang saya ng pagbabasa."}</p><form id="auth-form">${!isLogin && !isForgot ? `<div class="field"><label>Buong Pangalan</label><input name="name" required placeholder="Juan Dela Cruz"></div>` : ""}<div class="field"><label>Email Address</label><input type="email" name="email" required placeholder="you@example.com"></div>${!isForgot ? `<div class="field"><label>Password</label><input type="password" name="password" required minlength="6" placeholder="Hindi bababa sa 6 na character"></div>` : ""}${isLogin ? `<div class="checkline"><label><input type="checkbox" name="remember"> Tandaan ako</label><a class="text-link" href="forgot-password.html">Nakalimutan ang password?</a></div>` : ""}<button class="btn btn-primary btn-block" type="submit">${isForgot ? "Magpadala ng Reset Link" : isLogin ? "Mag-login" : "Gumawa ng Account"}</button></form><div style="text-align:center;color:var(--muted);font-size:12px;margin:18px 0">— o —</div><button class="btn btn-outline btn-block" id="google-demo">🌐 Magpatuloy gamit ang Google</button><p style="font-size:11px!important;margin-top:18px!important">Sa pagpapatuloy, sumasang-ayon ka sa aming mga tuntunin at patakaran.</p></div></div></main>`,
  );
  $("#auth-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let d = Object.fromEntries(new FormData(e.target));
    if (isForgot) {
      toast("Demo: ipinadala ang reset instruction kung may account.");
      return;
    }
    if (isLogin) {
      let accounts = get("ab_accounts", []),
        found = accounts.find(
          (x) => x.email === d.email && x.password === d.password,
        );
      if (!found) {
        toast(
          "Hindi tugma ang email o password. Mag-register muna kung demo account ito.",
          true,
        );
        return;
      }
      set("ab_user", found);
      user = found;
      location.href = "account.html";
    } else {
      let accounts = get("ab_accounts", []);
      if (accounts.some((x) => x.email === d.email)) {
        toast("May account na gamit ang email na ito.", true);
        return;
      }
      let account = { name: d.name, email: d.email, password: d.password };
      accounts.push(account);
      set("ab_accounts", accounts);
      set("ab_user", account);
      user = account;
      location.href = "account.html";
    }
  });
  $("#google-demo").addEventListener("click", () =>
    toast("Google sign-in ay nangangailangan ng backend configuration."),
  );
}
function accountPage() {
  if (!user) {
    shell(
      `<main class="container"><div class="empty-state"><h2>Mag-login muna</h2><p>Kailangan mong mag-login upang makita ang iyong account.</p><a class="btn btn-primary" href="login.html">Mag-login</a></div></main>`,
    );
    return;
  }
  shell(
    `<main class="container"><div class="page-intro"><div class="eyebrow">Aking AklatBata</div><h1>Kumusta, ${user.name}!</h1><p>Pamahalaan ang iyong account at mga pagbili.</p></div><div class="category-strip"><a class="category-tile" href="orders.html"><span class="category-emoji">📦</span><span><strong>Aking Mga Order</strong><small>Subaybayan ang iyong mga order</small></span></a><a class="category-tile" href="wishlist.html"><span class="category-emoji">♡</span><span><strong>Mga Paborito</strong><small>Mga librong na-save mo</small></span></a><a class="category-tile" href="contact.html"><span class="category-emoji">✉</span><span><strong>Suporta</strong><small>Makipag-ugnayan sa amin</small></span></a></div><div class="panel"><h2>Impormasyon ng Account</h2><p><strong>Pangalan:</strong> ${user.name}</p><p><strong>Email:</strong> ${user.email}</p><button class="btn btn-outline" id="logout">Mag-logout</button></div></main>`,
  );
  $("#logout").onclick = () => {
    localStorage.removeItem("ab_user");
    user = null;
    location.href = "index.html";
  };
}
function ordersPage() {
  let list = get("ab_orders", []);
  shell(
    `<main class="container"><div class="page-intro"><h1>Aking Mga Order</h1><p>Kasaysayan at status ng iyong mga pagbili.</p></div>${list.length ? `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Order ID</th><th>Petsa</th><th>Mga Item</th><th>Kabuuan</th><th>Paraan</th><th>Status</th></tr></thead><tbody>${list.map((o) => `<tr><td><strong>${o.id}</strong></td><td>${o.date}</td><td>${o.items.length} libro</td><td>${peso(o.total)}</td><td>${o.payment}</td><td><span class="status">${o.status}</span></td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-state"><div class="empty-icon">📦</div><h2>Wala ka pang order</h2><a class="btn btn-primary" href="books.html">Mamili ng Libro</a></div>`}</main>`,
  );
}
function wishlistPage() {
  let list = wishlist.map((id) => bookBy(id));
  shell(
    `<main class="container"><div class="page-intro"><h1>Mga Paborito</h1><p>Mga librong gusto mong balikan.</p></div>${list.length ? `<div class="book-grid">${list.map(card).join("")}</div>` : `<div class="empty-state"><div class="empty-icon">♡</div><h2>Wala pang naka-save</h2><a class="btn btn-primary" href="books.html">Tuklasin ang Mga Libro</a></div>`}</main>`,
  );
}
function aboutPage() {
  shell(
    `<main class="container"><div class="about-grid"><div><div class="eyebrow">Ang Aming Kuwento</div><h1 style="font-size:42px;line-height:1.1">Bawat bata ay may kuwentong dapat matuklasan.</h1><p style="color:var(--muted)">Ang AklatBata ay isang online bookstore na naglalayong gawing mas madaling maabot ng mga bata, magulang, at guro ang mga kuwentong nagbibigay-saya at mga aklat na nagbibigay-kaalaman.</p><p style="color:var(--muted)">Naniniwala kami na ang pagbabasa ay susi sa pagkatuto, imahinasyon, at mas magandang kinabukasan.</p><a class="btn btn-primary" href="books.html">Tuklasin ang Mga Libro</a></div>${img("hero-child.jpg")}</div><div class="feature-grid"><div class="feature"><div class="emoji">📚</div><h3>De-kalidad na Aklat</h3><p>Maingat na piniling mga libro para sa iba't ibang edad at antas.</p></div><div class="feature"><div class="emoji">💚</div><h3>Pagmamahal sa Pagbasa</h3><p>Hinihikayat namin ang mga bata na gawing bahagi ng araw-araw ang pagbabasa.</p></div><div class="feature"><div class="emoji">🌱</div><h3>Pagkatuto at Paglago</h3><p>Mga materyal na tumutulong sa paglinang ng kaalaman at kakayahan.</p></div></div></main>`,
  );
}

function contactPage() {
  shell(`
    <main class="container contact-page">

      <div class="contact-heading">
        <div class="eyebrow">Narito Kami Para Tumulong</div>
        <h1>Makipag-ugnayan</h1>
        <p>May tanong tungkol sa libro o order? Magpadala sa amin ng mensahe.</p>
      </div>

      <div class="contact-layout">

        <section class="contact-form-card">
          <div class="contact-card-heading">
            <h2>Magpadala ng Mensahe</h2>
            <p>Punan ang mga detalye sa ibaba.</p>
          </div>

          <form id="contact-form">

            <div class="contact-fields-row">
              <div class="field">
                <label>Pangalan</label>
                <input type="text" name="name" placeholder="Iyong pangalan" required>
              </div>

              <div class="field">
                <label>Email</label>
                <input type="email" name="email" placeholder="Iyong email address" required>
              </div>
            </div>

            <div class="field">
              <label>Paksa</label>
              <input type="text" name="subject" placeholder="Ano ang iyong katanungan?" required>
            </div>

            <div class="field">
              <label>Mensahe</label>
              <textarea name="message" placeholder="Isulat ang iyong mensahe rito..." required></textarea>
            </div>

            <button type="submit" class="btn btn-primary contact-submit">
              Ipadala ang Mensahe <span>→</span>
            </button>

          </form>
        </section>

        <aside class="contact-info-card">

          <div class="contact-info-top">
            <span class="contact-info-mark">✳</span>
            <h2>Impormasyon</h2>
            <p>Ikinalulugod naming marinig mula sa iyo.</p>
          </div>

          <div class="contact-info-list">

            <div class="contact-info-item">
              <span class="contact-icon">✉</span>
              <div>
                <small>Email</small>
                <p>hello@aklatbata.ph</p>
              </div>
            </div>

            <div class="contact-info-item">
              <span class="contact-icon">☎</span>
              <div>
                <small>Telepono</small>
                <p>+63 912 345 6789</p>
              </div>
            </div>

            <div class="contact-info-item">
              <span class="contact-icon">⌖</span>
              <div>
                <small>Lokasyon</small>
                <p>Pilipinas</p>
              </div>
            </div>

          </div>

          <div class="contact-hours">
            <span class="hours-dot"></span>
            <div>
              <strong>Oras ng suporta</strong>
              <p>Lunes–Biyernes, 9:00 AM–5:00 PM.</p>
            </div>
          </div>

          <div class="contact-info-footer">
            AklatBata · Magbasa. Matuto. Mangarap.
          </div>

        </aside>

      </div>
    </main>
  `);

  $("#contact-form").onsubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    toast("Salamat! Natanggap ang iyong mensahe (demo).");
  };
}
const adminNav = [
  ["admin.html", "▦", "Dashboard", "admin"],
  ["admin-books.html", "▤", "Mga Libro", "admin-books"],
  ["admin-categories.html", "▧", "Mga Kategorya", "admin-categories"],
  ["admin-orders.html", "▣", "Mga Order", "admin-orders"],
  ["admin-customers.html", "♧", "Mga Gumagamit", "admin-customers"],
];
function adminShell(title, content, kind) {
  shell(
    `<div class="admin-shell"><aside class="admin-sidebar"><a class="admin-brand" href="admin.html"><span>📖</span><span>AklatBata<br><small style="font-size:10px;font-weight:500">Admin Panel</small></span></a><nav class="admin-nav">${adminNav.map((x) => `<a class="${kind === x[3] ? "active" : ""}" href="${x[0]}">${x[1]} ${x[2]}</a>`).join("")}<a href="index.html">⚙ Bumalik sa Store</a><a class="logout" href="login.html">↪ Logout</a></nav></aside><main class="admin-main"><div class="admin-top"><div><h1>${title}</h1><p>Pangkalahatang-ideya ng iyong tindahan</p></div><div class="admin-user"><span class="avatar">👤</span> Admin</div></div>${content}</main></div>`,
    true,
  );
}
function adminPage() {
  let total = orders.reduce((n, o) => n + o.total, 0);
  adminShell(
    "Dashboard",
    `<div class="stat-grid"><div class="stat-card"><span class="stat-icon">▤</span><small>Kabuuang Libro</small><strong>${books.length}</strong></div><div class="stat-card"><span class="stat-icon">🛒</span><small>Kabuuang Order</small><strong>${orders.length}</strong></div><div class="stat-card"><span class="stat-icon">♧</span><small>Mga Gumagamit</small><strong>${get("ab_accounts", []).length}</strong></div><div class="stat-card"><span class="stat-icon">₱</span><small>Kita (demo)</small><strong>${peso(total)}</strong></div></div><div class="admin-grid"><div class="chart-card"><h3>Benta sa mga Nakaraang Buwan</h3><div class="chart-bars">${[42, 60, 49, 75, 65, 92, 80, 100, 72, 86, 65, 95].map((h) => `<span style="height:${h}%"></span>`).join("")}</div><div class="chart-labels"><span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Dec</span></div></div><div class="admin-card"><h3>Pinakamabentang Libro</h3>${books
      .slice()
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 3)
      .map(
        (b) =>
          `<p style="display:flex;align-items:center;gap:10px">${img(b.image, "mini-cover")}<span><strong>${b.title}</strong><br><small style="color:var(--muted)">${b.sales} benta · ${peso(b.price)}</small></span></p>`,
      )
      .join(
        "",
      )}</div></div><div class="admin-toolbar"><h3>Mga Kamakailang Order</h3><a class="btn btn-primary btn-small" href="admin-orders.html">Tingnan Lahat</a></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Order ID</th><th>Customer</th><th>Petsa</th><th>Kabuuan</th><th>Status</th></tr></thead><tbody>${
      orders
        .slice(0, 5)
        .map(
          (o) =>
            `<tr><td>${o.id}</td><td>${o.customer?.name || "Customer"}</td><td>${o.date}</td><td>${peso(o.total)}</td><td><span class="status">${o.status}</span></td></tr>`,
        )
        .join("") || '<tr><td colspan="5">Wala pang order.</td></tr>'
    }</tbody></table></div>`,
    "admin",
  );
}
function adminBooks() {
  adminShell(
    "Mga Libro",
    `<div class="admin-toolbar"><div class="searchbox">⌕ <input id="admin-search" placeholder="Hanapin ang libro…"></div><a class="btn btn-primary" href="admin-book-form.html">＋ Magdagdag ng Libro</a></div><div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Libro</th><th>Kategorya</th><th>Presyo</th><th>Stock</th><th>Mga Aksyon</th></tr></thead><tbody id="admin-book-rows">${bookRows()}</tbody></table></div>`,
    "admin-books",
  );
  $("#admin-search").oninput = () => {
    $("#admin-book-rows").innerHTML = bookRows($("#admin-search").value);
  };
}
function bookRows(q = "") {
  return (
    books
      .filter(
        (b) =>
          b.title.toLowerCase().includes(q.toLowerCase()) ||
          (b.titleFil || "").toLowerCase().includes(q.toLowerCase()),
      )
      .map(
        (b) =>
          `<tr><td>${img(b.image, "mini-cover")}<strong>${b.title}</strong></td><td>${b.category}</td><td>${peso(b.price)}</td><td>${b.stock}</td><td><div class="table-actions"><a class="btn btn-outline btn-small" href="admin-book-form.html?id=${b.id}">Edit</a><button class="btn btn-danger btn-small" data-delete-book="${b.id}">Delete</button></div></td></tr>`,
      )
      .join("") || '<tr><td colspan="5">Walang nahanap.</td></tr>'
  );
}
function adminBookForm() {
  let id = new URLSearchParams(location.search).get("id"),
    b = id ? bookBy(id) : {};
  adminShell(
    id ? "I-edit ang Libro" : "Magdagdag ng Libro",
    `<form class="panel" id="book-form" style="max-width:760px"><div class="form-grid"><div class="field"><label>Pamagat (English)</label><input name="title" required value="${b.title || ""}"></div><div class="field"><label>Pamagat (Filipino)</label><input name="titleFil" value="${b.titleFil || ""}"></div><div class="field"><label>Kategorya</label><select name="category">${categories.map((c) => `<option ${b.category === c ? "selected" : ""}>${c}</option>`).join("")}</select></div><div class="field"><label>May-akda</label><input name="author" value="${b.author || ""}"></div><div class="field"><label>Presyo (₱)</label><input name="price" type="number" min="1" required value="${b.price || ""}"></div><div class="field"><label>Stock</label><input name="stock" type="number" min="0" required value="${b.stock ?? ""}"></div><div class="field"><label>Image filename (assets/)</label><input name="image" value="${b.image || "brave-bunny.jpg"}"></div></div><div class="field"><label>Paglalarawan</label><textarea name="description">${b.description || ""}</textarea></div><button class="btn btn-primary">I-save ang Libro</button> <a class="btn btn-outline" href="admin-books.html">Kanselahin</a></form>`,
    "admin-books",
  );
  $("#book-form").onsubmit = (e) => {
    e.preventDefault();
    let d = Object.fromEntries(new FormData(e.target));
    d.id = id ? Number(id) : Date.now();
    d.price = Number(d.price);
    d.stock = Number(d.stock);
    d.rating = b.rating || 5;
    d.sales = b.sales || 0;
    if (id) books = books.map((x) => (x.id === Number(id) ? d : x));
    else books.push(d);
    set("ab_books", books);
    toast("Na-save ang libro.");
    setTimeout(() => (location.href = "admin-books.html"), 500);
  };
}
function adminCategories() {
  adminShell(
    "Mga Kategorya",
    `<div class="panel" style="max-width:700px"><form id="category-form" style="display:flex;gap:10px"><input class="select" style="flex:1" name="category" required placeholder="Bagong kategorya"><button class="btn btn-primary">＋ Idagdag</button></form><div id="category-list" style="margin-top:20px">${categories.map((c) => `<div class="category-tile" style="margin:8px 0"><strong style="flex:1">${c}</strong><button class="btn btn-danger btn-small" data-delete-category="${c}">Alisin</button></div>`).join("")}</div></div>`,
    "admin-categories",
  );
  $("#category-form").onsubmit = (e) => {
    e.preventDefault();
    let v = new FormData(e.target).get("category").trim();
    if (!categories.includes(v)) {
      categories.push(v);
      set("ab_categories", categories);
      location.reload();
    }
  };
}
function adminOrders() {
  adminShell(
    "Mga Order",
    `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Order ID</th><th>Customer</th><th>Petsa</th><th>Kabuuan</th><th>Payment</th><th>Status</th><th>Aksyon</th></tr></thead><tbody>${orders.map((o) => `<tr><td>${o.id}</td><td>${o.customer?.name || "Customer"}</td><td>${o.date}</td><td>${peso(o.total)}</td><td>${o.payment}</td><td><span class="status">${o.status}</span></td><td><select class="select" data-order-status="${o.id}">${["Pending", "Processing", "Shipped", "Completed", "Cancelled"].map((s) => `<option ${o.status === s ? "selected" : ""}>${s}</option>`).join("")}</select></td></tr>`).join("") || '<tr><td colspan="7">Wala pang order.</td></tr>'}</tbody></table></div>`,
    "admin-orders",
  );
}
function adminCustomers() {
  let users = get("ab_accounts", []);
  adminShell(
    "Mga Gumagamit",
    `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Pangalan</th><th>Email</th><th>Uri</th></tr></thead><tbody>${users.map((u) => `<tr><td>${u.name}</td><td>${u.email}</td><td><span class="status">Customer</span></td></tr>`).join("") || '<tr><td colspan="3">Wala pang rehistradong customer.</td></tr>'}</tbody></table></div>`,
    "admin-customers",
  );
}
function toast(msg, error = false) {
  let el = document.createElement("div");
  el.className = "toast" + (error ? " error" : "");
  el.textContent = msg;
  $("#toast-root").append(el);
  setTimeout(() => el.remove(), 2800);
}
function addToCart(id, qty = 1) {
  let b = bookBy(id);
  let existing = cart.find((x) => x.id === Number(id));
  if (existing) existing.qty = Math.min(b.stock, existing.qty + qty);
  else cart.push({ id: Number(id), qty: Math.min(b.stock, qty) });
  set("ab_cart", cart);
  let count = $("#cart-count");
  if (count) count.textContent = cart.reduce((n, x) => n + x.qty, 0);
  toast("Naidagdag sa iyong cart!");
}
document.addEventListener("click", (e) => {
  let a = e.target.closest("[data-add]");
  if (a) {
    let qty = a.dataset.qtyInput
      ? Number($("#" + a.dataset.qtyInput).value || 1)
      : 1;
    addToCart(a.dataset.add, qty);
  }
  let r = e.target.closest("[data-remove]");
  if (r) {
    cart = cart.filter((x) => x.id !== Number(r.dataset.remove));
    set("ab_cart", cart);
    cartPage();
  }
  let q = e.target.closest("[data-cart-qty]");
  if (q) {
    let item = cart.find((x) => x.id === Number(q.dataset.id));
    if (item) {
      item.qty = Math.max(
        1,
        Math.min(bookBy(item.id).stock, item.qty + Number(q.dataset.cartQty)),
      );
      set("ab_cart", cart);
      cartPage();
    }
  }
  let w = e.target.closest("[data-wish]");
  if (w) {
    let id = Number(w.dataset.wish);
    wishlist = wishlist.includes(id)
      ? wishlist.filter((x) => x !== id)
      : [...wishlist, id];
    set("ab_wishlist", wishlist);
    toast(
      wishlist.includes(id)
        ? "Na-save sa iyong mga paborito."
        : "Inalis sa mga paborito.",
    );
  }
  let d = e.target.closest("[data-delete-book]");
  if (d && confirm("Sigurado ka bang buburahin ang librong ito?")) {
    books = books.filter((x) => x.id !== Number(d.dataset.deleteBook));
    set("ab_books", books);
    adminBooks();
  }
  let c = e.target.closest("[data-delete-category]");
  if (c && confirm("Alisin ang kategorya?")) {
    categories = categories.filter((x) => x !== c.dataset.deleteCategory);
    set("ab_categories", categories);
    adminCategories();
  }
});
document.addEventListener("change", (e) => {
  if (e.target.matches("[data-order-status]")) {
    orders = orders.map((o) =>
      o.id === e.target.dataset.orderStatus
        ? { ...o, status: e.target.value }
        : o,
    );
    set("ab_orders", orders);
    toast("Na-update ang status.");
  }
});
const page = document.body.dataset.page;
(
  ({
    home,
    books: booksPage,
    book: detailPage,
    cart: cartPage,
    checkout: checkoutPage,
    success: successPage,
    login: () => authPage("login"),
    register: () => authPage("register"),
    forgot: () => authPage("forgot"),
    account: accountPage,
    orders: ordersPage,
    wishlist: wishlistPage,
    about: aboutPage,
    contact: contactPage,
    admin: adminPage,
    "admin-books": adminBooks,
    "admin-book-form": adminBookForm,
    "admin-categories": adminCategories,
    "admin-orders": adminOrders,
    "admin-customers": adminCustomers,
    notfound: () =>
      shell(
        `<main class="container"><div class="empty-state"><h1>Hindi Nahanap ang Pahina</h1><a class="btn btn-primary" href="index.html">Bumalik sa Home</a></div></main>`,
      ),
  })[page] || home
)();
