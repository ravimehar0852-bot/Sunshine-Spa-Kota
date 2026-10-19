/* ============ CENTRAL CONFIG — edit everything here ============ */
const CONFIG = {
  name: "Sunshine Spa Kota",
  phone: "6376899002",          // UNVERIFIED (from a promo image) — confirm with owner
  whatsapp: "",                 // e.g. "916376899002" (country code, no +). Leave empty until verified.
  email: "",                    // optional mailto fallback
  address: "2nd Floor, above Lal Readymades / Red Garments, opposite Multipurpose School, Gumanpura, Kota, Rajasthan 324007",
  hours: "10:00 AM–10:00 PM — please confirm current hours with the spa",
  mapsUrl: "https://maps.app.goo.gl/z3JYwwA7xMEhhGZE6",
  mapsAltUrl: "https://maps.app.goo.gl/yvGjNEqELMzziJ2v9",
  instagramUrl: "https://www.instagram.com/sunshine_spa_kota/",
  showOffers: false,            // set true once the owner confirms current offers
  services: [                   // owner-listed prices; duration: null = not supplied
    { name: "Dry Massage", price: 1199, duration: null, desc: "A classic massage without oil, focused on gentle pressure and a calm pace.", mood: "relax" },
    { name: "Oil Massage", price: 1499, duration: null, desc: "Smooth, flowing strokes with warm oil for a soothing, comforting session.", mood: "relax" },
    { name: "Aroma Massage", price: 1699, duration: null, desc: "Scented oils and slow technique for a deeply restful, sensory experience.", mood: "relax" },
    { name: "Scrub", price: 1799, duration: null, desc: "A refreshing body scrub to leave skin feeling smooth and renewed.", mood: "refresh" },
    { name: "Deep Tissue Massage", price: 1999, duration: null, desc: "Firmer, focused pressure for those who prefer a stronger massage.", mood: "firm" },
    { name: "Jacuzzi", price: 2499, duration: null, desc: "A warm jacuzzi experience to unwind and refresh.", mood: "refresh" },
    { name: "Hand Massage", price: 2999, duration: null, desc: "Attentive, hands-on massage tailored to your comfort.", mood: "firm" }
  ],
  offers: [                     // hidden until showOffers = true. Source posts CONFLICT — confirm first.
    { name: "Hand Massage offer", price: "₹1,500", duration: "1 hour" },
    { name: "Thai Massage", price: "₹1,500", duration: "1 hour" },
    { name: "Cream Massage", price: "₹800 or ₹1,000 (posts differ)", duration: "1 hour" },
    { name: "Jacuzzi Massage", price: "₹2,000 or ₹3,000 (posts differ)", duration: "1 hour" }
  ],
  moods: { relax: "Calm and unwind", firm: "Firmer pressure", refresh: "Refresh and renew" },
  img: u => `https://images.unsplash.com/photo-${u}?auto=format&fit=crop&w=1200&q=70`
};

/* ============ helpers ============ */
const $ = (s, r = document) => r.querySelector(s);
const inr = n => "₹" + n.toLocaleString("en-IN");
const digits = s => (s || "").replace(/\D/g, "");
const telHref = () => CONFIG.phone ? "tel:+91" + digits(CONFIG.phone).slice(-10) : "contact.html";
const waHref = text => CONFIG.whatsapp ? `https://wa.me/${digits(CONFIG.whatsapp)}?text=${encodeURIComponent(text)}` : null;
const bookHref = (svc) => {
  const t = svc ? `Hello Sunshine Spa Kota, I would like to book ${svc.name} (listed ${inr(svc.price)}). Please confirm price, duration and availability.`
                : "Hello Sunshine Spa Kota, I would like to book an appointment. Please share availability.";
  return waHref(t) || "contact.html" + (svc ? "?service=" + encodeURIComponent(svc.name) : "") + "#book";
};
const external = h => /^https?:/.test(h) ? ' target="_blank" rel="noopener"' : "";

/* ============ shared layout ============ */
const NAV = [["index.html","Home"],["services.html","Services"],["about.html","About"],["gallery.html","Gallery"],["contact.html","Contact"]];
const SUN = `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true"><circle cx="16" cy="16" r="5.5"/><path d="M16 3v4M16 25v4M3 16h4M25 16h4M6.8 6.8l2.8 2.8M22.4 22.4l2.8 2.8M25.2 6.8l-2.8 2.8M9.6 22.4l-2.8 2.8"/></svg>`;
const LOGO = `<a class="logo" href="index.html" aria-label="Sunshine Spa Kota — home">${SUN}<span><b>SUNSHINE SPA</b><small>KOTA</small></span></a>`;

function renderLayout() {
  const page = document.body.dataset.page;
  const links = NAV.map(([h, t]) => `<a href="${h}"${h === page ? ' aria-current="page"' : ""}>${t}</a>`).join("");
  $("#site-header").outerHTML = `<header class="site-header"><div class="wrap">${LOGO}
    <nav class="nav" aria-label="Main">${links}<a class="btn" href="${bookHref()}"${external(bookHref())}>Book Appointment</a></nav>
    <button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button></div>
    <nav class="drawer" id="drawer" aria-label="Mobile">${links}<a class="btn" href="${bookHref()}"${external(bookHref())}>Book Appointment</a></nav></header>`;
  const y = new Date().getFullYear();
  $("#site-footer").outerHTML = `<footer class="site-footer"><div class="wrap"><div class="fgrid">
    <div>${LOGO}<p style="margin-top:1rem">Thoughtful massage and wellness in Gumanpura, Kota.</p><a class="btn" href="${bookHref()}"${external(bookHref())}>Book Appointment</a></div>
    <div><h4>Explore</h4>${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}</div>
    <div><h4>Visit</h4><p>${CONFIG.address}</p><p>${CONFIG.hours}</p><a href="${CONFIG.mapsUrl}" target="_blank" rel="noopener">Get directions</a><a href="${CONFIG.instagramUrl}" target="_blank" rel="noopener">Instagram @sunshine_spa_kota</a></div>
    </div><p class="copy">© ${y} ${CONFIG.name}. All rights reserved.</p></div></footer>
    <div class="mbar"><a class="btn ghost" href="${telHref()}">Call</a><a class="btn gold" href="${bookHref()}"${external(bookHref())}>Book</a></div>`;
  const b = $(".burger"), d = $("#drawer");
  b.addEventListener("click", () => { const o = d.classList.toggle("open"); b.setAttribute("aria-expanded", o); b.setAttribute("aria-label", o ? "Close menu" : "Open menu"); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && d.classList.contains("open")) { b.click(); b.focus(); } });
}

/* ============ services ============ */
function cardHTML(s) {
  const href = bookHref(s);
  return `<article class="card"><h3>${s.name}</h3><div class="price">${inr(s.price)}<small>${s.duration ? s.duration : "duration to be confirmed"}</small></div>
  <p>${s.desc}</p><a class="btn ghost" href="${href}"${external(href)}>Book This Service</a></article>`;
}
function renderServices() {
  const all = $("#service-grid"), feat = $("#featured-grid");
  if (all) all.innerHTML = CONFIG.services.map(cardHTML).join("");
  if (feat) feat.innerHTML = [0, 2, 4].map(i => cardHTML(CONFIG.services[i])).join("");
  const off = $("#offers");
  if (off && CONFIG.showOffers) {
    off.hidden = false;
    $("#offer-grid").innerHTML = CONFIG.offers.map(o => `<article class="card"><h3>${o.name}</h3><div class="price">${o.price}<small>${o.duration}</small></div>
      <a class="btn ghost" href="${waHref("Hello, I'd like to ask about the offer: " + o.name) || "contact.html#book"}">Ask about this offer</a></article>`).join("");
  }
}
function renderPicker() {
  const box = $("#picker"); if (!box) return;
  const res = $("#pick-result");
  box.innerHTML = Object.entries(CONFIG.moods).map(([k, v]) => `<button class="chip" aria-pressed="false" data-m="${k}">${v}</button>`).join("");
  box.addEventListener("click", e => {
    const c = e.target.closest(".chip"); if (!c) return;
    box.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === c));
    const list = CONFIG.services.filter(s => s.mood === c.dataset.m);
    res.innerHTML = "<p>Good matches: " + list.map(s => `<a href="${bookHref(s)}"${external(bookHref(s))}><strong>${s.name}</strong></a> (${inr(s.price)})`).join(", ") + ".</p>";
  });
}

/* ============ gallery ============ */
function initGallery() {
  const dlg = $("#lightbox"); if (!dlg) return;
  const big = $("img", dlg);
  document.querySelectorAll(".gal button").forEach(b => b.addEventListener("click", () => {
    const i = $("img", b); if (!i) return;
    big.src = i.src.replace("w=1200", "w=1800"); big.alt = i.alt; dlg.showModal();
  }));
  dlg.addEventListener("click", e => { if (e.target === dlg || e.target.classList.contains("x")) dlg.close(); });
}

/* ============ booking form ============ */
function initForm() {
  const f = $("#book-form"); if (!f) return;
  const sel = $("#service", f);
  sel.innerHTML = '<option value="">Select a service</option>' + CONFIG.services.map(s => `<option>${s.name} — ${inr(s.price)}</option>`).join("") + "<option>Not sure yet</option>";
  const pre = new URLSearchParams(location.search).get("service");
  if (pre) [...sel.options].forEach(o => { if (o.text.startsWith(pre)) sel.value = o.value; });
  const dt = $("#date", f); dt.min = new Date().toISOString().slice(0, 10);
  const status = $("#status");
  const rules = { name: v => v.trim().length > 1 || "Enter your full name.",
    phone: v => /^(\+?91)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, "")) || "Enter a valid 10-digit mobile number.",
    date: v => (!!v && v >= dt.min) || "Choose today or a future date.",
    time: v => !!v || "Choose a preferred time.",
    service: v => !!v || "Select a service." };
  f.addEventListener("submit", e => {
    e.preventDefault(); let ok = true, first = null;
    for (const k in rules) { const el = f.elements[k], r = rules[k](el.value), err = $("#e-" + k);
      el.setAttribute("aria-invalid", r !== true); err.textContent = r === true ? "" : r;
      if (r !== true) { ok = false; first = first || el; } }
    if (!ok) { status.className = "status show"; status.innerHTML = "Please fix the highlighted fields."; first.focus(); return; }
    const v = k => f.elements[k].value.trim();
    const msg = `Hello Sunshine Spa Kota, I'd like to request an appointment.\nName: ${v("name")}\nPhone: ${v("phone")}\nService: ${v("service")}\nPreferred date: ${v("date")}\nPreferred time: ${v("time")}${v("message") ? "\nNote: " + v("message") : ""}\nPlease confirm availability.`;
    const wa = waHref(msg);
    status.className = "status show";
    if (wa) { window.open(wa, "_blank", "noopener"); status.innerHTML = "WhatsApp has opened with your request. It is <strong>not sent until you press Send</strong>, and the spa must confirm availability."; }
    else if (CONFIG.email) { location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Appointment request")}&body=${encodeURIComponent(msg)}`; status.textContent = "Your email app should open. Your request is not confirmed until the spa replies."; }
    else status.innerHTML = `Online sending is not set up yet, so nothing has been submitted. Please <a href="${telHref()}">call the spa</a> with these details; availability must be confirmed by staff.<pre>${msg.replace(/</g, "&lt;")}</pre>`;
  });
}

/* ============ misc ============ */
function initContactInfo() {
  document.querySelectorAll("[data-cfg]").forEach(el => { const k = el.dataset.cfg;
    if (k === "address" || k === "hours") el.textContent = CONFIG[k];
    if (k === "phone") { el.textContent = CONFIG.phone + " (to be confirmed)"; el.href = telHref(); }
    if (k === "maps") el.href = CONFIG.mapsUrl;
    if (k === "maps-alt") el.href = CONFIG.mapsAltUrl;
    if (k === "instagram") el.href = CONFIG.instagramUrl;
    if (k === "book") { const h = bookHref(); el.href = h; if (/^https?:/.test(h)) { el.target = "_blank"; el.rel = "noopener"; } }
    if (k === "whatsapp") { const h = waHref("Hello Sunshine Spa Kota, I would like to book an appointment."); if (h) { el.href = h; el.target = "_blank"; el.rel = "noopener"; } else el.hidden = true; }
  });
}
// Image fallback: remove broken <img>; the .ph wrapper shows a tasteful placeholder
document.addEventListener("error", e => { const t = e.target; if (t.tagName === "IMG") { t.closest(".ph")?.classList.add("failed"); t.remove(); } }, true);

document.addEventListener("DOMContentLoaded", () => {
  renderLayout(); renderServices(); renderPicker(); initGallery(); initForm(); initContactInfo();
});
