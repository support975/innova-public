// Mini service catalog (keeps page standalone)
const MINI = {
    'comprehensive-wound-management': {
      title: 'Comprehensive Wound Management',
      blurb: 'Assessment, dressing selection, moisture balance, infection control, debridement planning, and pain management.',
      bullets: ['Pressure injuries (I–IV)','Diabetic foot ulcers','Venous & arterial ulcers','Surgical/traumatic wounds'],
      image: 'https://res.cloudinary.com/dtdpx59sc/image/upload/v1747103827/Nurse_at_Home_Wound_Care_Entrance_wradxx.png',
      duration: '60–90 min initial · 30–45 min follow-ups'
    },
    'ostomy-care-and-education': {
      title: 'Ostomy Care & Education',
      blurb: 'Appliance fitting, skin protection, predictable pouching, leakage troubleshooting, and caregiver training.',
      bullets: ['Colostomy','Ileostomy','Urostomy','Peristomal skin care'],
      image: 'https://res.cloudinary.com/dtdpx59sc/image/upload/v1747103827/Home_Care_Nurse_Assisting_Patient_rhswsi.png',
      duration: '45–60 min visit · virtual check-ins available'
    },
    'telewound-prevention-programs': {
      title: 'Tele-Wound & Prevention Programs',
      blurb: 'Virtual follow-ups, supply guidance, and early-warning checks to prevent deterioration and readmissions.',
      bullets: ['Video follow-ups','Caregiver coaching','Supply guidance','Early warnings'],
      image: 'https://res.cloudinary.com/dtdpx59sc/image/upload/v1747100901/ChatGPT_Image_10_mai_2025_16_05_17_uecx7c.png',
      duration: '20–30 min virtual · flexible cadence'
    }
  };
  
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const svc = MINI[slug] || Object.values(MINI)[0];
  
  document.getElementById('yr').textContent = new Date().getFullYear();
  document.getElementById('svcTitle').textContent = svc.title;
  document.getElementById('svcShort').textContent = svc.title;
  document.getElementById('svcBlurb').textContent = svc.blurb;
  document.getElementById('svcImage').src = svc.image;
  document.getElementById('svcImage').alt = svc.title;
  document.getElementById('svcDuration').textContent = svc.duration;
  document.getElementById('svcBullets').innerHTML = svc.bullets.map(x=>`<li>${x}</li>`).join('');
  document.getElementById('crumbs').innerHTML = `<a href="./Services.html">Services</a> · ${svc.title}`;
  
  // Build booking link carrying the current service
  const bookingHref = `../booking/booking.html?service=${encodeURIComponent(slug)}&title=${encodeURIComponent(svc.title)}`;
  document.getElementById('bookBtn').href = bookingHref;
  document.getElementById('bookBtn2').href = bookingHref;
  document.getElementById('stickySvc').textContent = svc.title;
  document.getElementById('stickyBtn').href = bookingHref;
  
  // Enable bottom padding when sticky bar is visible (mobile)
  if (window.matchMedia('(max-width: 900px)').matches) {
    document.body.classList.add('has-sticky');
  }
  