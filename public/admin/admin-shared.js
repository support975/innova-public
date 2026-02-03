// -------- Firebase boot --------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyCdIpeMxhFMRpzNxmngoP3QY8ZZl2ABG_s",
  authDomain: "credential-4f22b.firebaseapp.com",
  projectId: "credential-4f22b",
  storageBucket: "credential-4f22b.firebasestorage.app",
  messagingSenderId: "107240797765",
  appId: "1:107240797765:web:9ae5b37760081911ad952c",
  measurementId: "G-XKYX4WC53E"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);

// -------- Utilities --------
export const esc = (x)=> String(x ?? "").replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#039;' }[m]));
export const fmt = (ts)=> ts?.toDate?.()?.toLocaleString?.() || "-";
export const mailto = (to, subject, body)=>{ const u = new URL("mailto:"+(to||"")); if(subject)u.searchParams.set("subject",subject); if(body)u.searchParams.set("body",body); return u.toString(); };
export const badge = (st)=> `<span class="badge status-${esc(st||'new')}">${esc(st||'new')}</span>`;
export const go = (url)=> window.location.assign(url);

// Sidebar current item highlight
export function mountSidebar(activeId){
  const who = document.getElementById("who");
  const logoutBtn = document.getElementById("logoutBtn");
  document.querySelectorAll(".snav .sitem").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.target === activeId);
  });
  onAuthStateChanged(auth, (user)=>{
    if(!user){ go("/admin/login/admin-login.html"); return; }
    if (who) who.textContent = user.email || user.uid;
  });
  logoutBtn?.addEventListener("click", async (e)=>{
    e.preventDefault(); await signOut(auth); go("/admin/login/admin-login.html");
  });
}
