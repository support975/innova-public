// ---- Data (edit as needed) ----
const SERVICES = [
  {
    slug: 'comprehensive-wound-management',
    title: 'Comprehensive Wound Management',
    blurb: 'Assessment, dressing selection, moisture balance, infection control, debridement planning, and pain management.',
    bullets: ['Pressure injuries (I–IV)', 'Diabetic foot ulcers', 'Venous & arterial ulcers', 'Surgical/traumatic wounds'],
    category: 'wound',
    image: 'https://res.cloudinary.com/dtdpx59sc/image/upload/v1747103827/Nurse_at_Home_Wound_Care_Entrance_wradxx.png',
    duration: '60–90 min initial · 30–45 min follow-ups'
  },
  {
    slug: 'ostomy-care-and-education',
    title: 'Ostomy Care & Education',
    blurb: 'Appliance fitting, skin protection, predictable pouching, leakage troubleshooting, and caregiver training.',
    bullets: ['Colostomy', 'Ileostomy', 'Urostomy', 'Peristomal skin care'],
    category: 'ostomy',
    image: 'https://res.cloudinary.com/dtdpx59sc/image/upload/v1747103827/Home_Care_Nurse_Assisting_Patient_rhswsi.png',
    duration: '45–60 min visit · virtual check-ins available'
  },
  {
    slug: 'telewound-prevention-programs',
    title: 'Tele-Wound & Prevention Programs',
    blurb: 'Virtual follow-ups, supply guidance, and early-warning checks to prevent deterioration and readmissions.',
    bullets: ['Video follow-ups', 'Caregiver coaching', 'Supply guidance', 'Early warnings'],
    category: 'virtual',
    image: 'https://res.cloudinary.com/dtdpx59sc/image/upload/v1747100901/ChatGPT_Image_10_mai_2025_16_05_17_uecx7c.png',
    duration: '20–30 min virtual · flexible cadence'
  }
];

// ---- DOM wires ----
const grid = document.getElementById('serviceGrid');
const q = document.getElementById('q');
const cat = document.getElementById('category');
const clr = document.getElementById('clear');

// footer year
document.getElementById('yr')?.append(new Date().getFullYear());

// initial render
render(SERVICES);

// events
q.addEventListener('input', applyFilters);
cat.addEventListener('change', applyFilters);
clr.addEventListener('click', () => { q.value=''; cat.value=''; applyFilters(); });

function applyFilters(){
  const term = q.value.trim().toLowerCase();
  const c = cat.value;
  const filtered = SERVICES.filter(s => {
    const hitTerm = !term || [s.title, s.blurb, ...(s.bullets||[])].join(' ').toLowerCase().includes(term);
    const hitCat  = !c || s.category === c;
    return hitTerm && hitCat;
  });
  render(filtered);
}

function render(list){
  grid.innerHTML = '';
  if(list.length === 0){
    grid.innerHTML = `<p class="muted">No services match your search. Try clearing filters.</p>`;
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach(s => frag.appendChild(serviceCard(s)));
  grid.appendChild(frag);
}

function serviceCard(svc){
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <figure class="service-media">
      <img src="${svc.image}" alt="${escapeHtml(svc.title)}">
    </figure>
    <div>
      <h3>${escapeHtml(svc.title)}</h3>
      <p>${escapeHtml(svc.blurb)}</p>
      <div class="meta">
        ${svc.bullets.slice(0,3).map(b=>`<span class="badge">${escapeHtml(b)}</span>`).join('')}
        <span class="badge">${escapeHtml(svc.duration)}</span>
      </div>
      <div class="cta-row">
        <a class="btn" href="./service-details.html?slug=${encodeURIComponent(svc.slug)}">View details</a>
       <a class="btn primary" 
   href="../booking/booking.html?service=${encodeURIComponent(svc.slug)}&title=${encodeURIComponent(svc.title)}"
   aria-label="Book ${escapeHtml(svc.title)}">
   Book this service
</a>

      </div>
    </div>
  `;
  return el;
}

function escapeHtml(x){ return x.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }



