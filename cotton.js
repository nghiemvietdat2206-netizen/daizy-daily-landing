/* ==========================================================================
   DAIZY DAILY — Khăn Mặt Khô Cotton 100% Cao Cấp (Bản Tím 60 Tờ)
   Facebook Ads Landing Page Script & Pricing Config
   ========================================================================== */

const CONFIG = {
  packages: [
    {
      id: 'pack-1',
      badge: 'Dùng Thử',
      name: '1 Túi Lẻ — 60 Tờ',
      desc: 'Phù hợp trải nghiệm cá nhân hoặc mang đi du lịch',
      price: 49000,
      oldPrice: 65000,
      shippingFee: 25000
    },
    {
      id: 'pack-3',
      badge: 'Best Seller • Khuyên Dùng',
      name: 'Combo 3 Túi — 180 Tờ',
      desc: 'Lựa chọn phổ biến nhất cho chu trình Skincare & Tẩy trang',
      price: 129000,
      oldPrice: 195000,
      shippingFee: 0
    },
    {
      id: 'pack-6',
      badge: 'Siêu Tiết Kiệm -39%',
      name: 'Combo 6 Túi — 360 Tờ',
      desc: 'Dùng thoải mái cả mùa + Tặng kèm móc treo tường tiện lợi',
      price: 239000,
      oldPrice: 390000,
      shippingFee: 0
    }
  ]
};

const REVIEWS = [
  {
    group: 'sensitive',
    tag: 'Da Mụn Nhạy Cảm',
    author: 'Minh Thư (Hà Nội)',
    text: 'Trước đây da mình hay bị mụn ẩn li ti không rõ lý do. Bác sĩ da liễu khuyên bỏ hẳn khăn mặt ẩm trong nhà tắm, mình đổi sang khăn tím cotton Daizy Daily này trộm vía da đỡ mụn hẳn. Khăn mềm mịn, không hề có bụi xơ.'
  },
  {
    group: 'skincare',
    tag: 'Skincare',
    author: 'Thu Trang (Đà Nẵng)',
    text: 'Khổ khăn 20x20cm to thật sự, gấp lại làm 4 thấm toner đắp lotion mask cực thích. Khăn ngậm nước vừa phải, không bị chảy tong tỏng mà cũng không tốn toner. Đáng tiền lắm mọi người ạ.'
  },
  {
    group: 'skincare',
    tag: 'Tẩy Trang',
    author: 'Bích Ngọc (TP.HCM)',
    text: 'Dùng tẩy trang mascara với son kem lì êm ru, sợi bông cotton dai không rách tưa như mấy loại giấy ăn thông thường. Lau xong mặt vẫn giữ được độ ẩm, bao bì tím xinh xỉu đặt trên bàn phấn rất sang.'
  },
  {
    group: 'sensitive',
    tag: 'Da Mụn Nhạy Cảm',
    author: 'Khánh Linh (Cần Thơ)',
    text: 'Da mình đang treatment peel da nên cực kỳ nhạy cảm. Dùng khăn này thấm khô mặt thấy siêu êm, không hề có cảm giác rát hay ma sát mạnh. Gói 60 tờ rút từng tờ rất vệ sinh.'
  },
  {
    group: 'skincare',
    tag: 'Skincare',
    author: 'Lan Anh (Hải Phòng)',
    text: 'Mua thử 1 túi dùng ưng quá phải đặt ngay combo 6 túi cho cả mẹ và em gái dùng chung. Khăn dày dặn, nhúng nước ấm vắt ráo dùng thay khăn ướt cực kỳ an toàn không lo hóa chất.'
  },
  {
    group: 'sensitive',
    tag: 'Da Mụn Nhạy Cảm',
    author: 'Hoàng Yến (Nha Trang)',
    text: 'Giao hàng nhanh, đóng hộp carton rất cẩn thận và sạch sẽ. Đúng hàng chính hãng chuẩn logo hoa cúc Daizy Daily. Cho 5 sao chất lượng phục vụ và sản phẩm.'
  }
];

let selectedPkgId = 'pack-3'; // Mặc định chọn Combo 3 túi (Best Seller)
let activeReviewFilter = 'all';

function formatVND(val) {
  return new Intl.NumberFormat('vi-VN').format(val) + 'đ';
}

function trackAdsEvent(eventName, payload = {}) {
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, payload);
  }
  if (typeof window.ttq === 'object' && typeof window.ttq.track === 'function') {
    window.ttq.track(eventName, payload);
  }
  console.info('[Ads Track]', eventName, payload);
}

// 1. Countdown Timer
function startCountdown(seconds = 9919) {
  const el = document.getElementById('countdownTimer');
  if (!el) return;
  let remaining = seconds;

  setInterval(() => {
    remaining = remaining > 0 ? remaining - 1 : seconds;
    const h = String(Math.floor(remaining / 3600)).padStart(2, '0');
    const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
    const s = String(remaining % 60).padStart(2, '0');
    el.textContent = `${h}:${m}:${s}`;
  }, 1000);
}

// 2. Hero Thumbnail Switcher
document.querySelectorAll('.thumb-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.thumb-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('heroMainImg').src = btn.dataset.img;
  });
});

// 3. 5D Softness Step Highlights
document.querySelectorAll('.step-pill').forEach((pill) => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.step-pill').forEach((p) => p.classList.remove('active'));
    pill.classList.add('active');
  });
});

// 4. Usage Tabs
document.querySelectorAll('.usage-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.usage-tab').forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    document.querySelectorAll('.usage-panel').forEach((panel) => panel.classList.remove('active'));
    document.getElementById(`panel-${tab.dataset.usage}`).classList.add('active');
  });
});

// 5. Render Reviews & Filter
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;
  const items =
    activeReviewFilter === 'all'
      ? REVIEWS
      : REVIEWS.filter((r) => r.group === activeReviewFilter);

  grid.innerHTML = items
    .map(
      (r) => `
      <article class="review-card">
        <div>
          <div class="review-top">
            <span class="review-stars">★★★★★</span>
            <span class="review-tag">${r.tag}</span>
          </div>
          <p class="review-text">“${r.text}”</p>
        </div>
        <div>
          <div class="review-author">${r.author}</div>
          <div class="review-verified">✓ Đã mua Khăn Mặt Khô Cotton Daizy Daily</div>
        </div>
      </article>
    `
    )
    .join('');
}

document.querySelectorAll('.rev-filter').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.rev-filter').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    activeReviewFilter = btn.dataset.rev;
    renderReviews();
  });
});

// 6. Render Packages & Sync Checkout Summary
function renderPackages() {
  const list = document.getElementById('packageList');
  if (!list) return;
  list.innerHTML = CONFIG.packages
    .map(
      (pkg) => `
      <button type="button" class="package-card ${pkg.id === selectedPkgId ? 'selected' : ''}" data-pkg="${pkg.id}">
        <div>
          <span class="pkg-badge">${pkg.badge}</span>
          <strong class="pkg-name">${pkg.name}</strong>
          <span class="pkg-desc">${pkg.desc}</span>
        </div>
        <div class="pkg-pricing">
          <strong class="pkg-price">${formatVND(pkg.price)}</strong>
          <span class="pkg-old">${formatVND(pkg.oldPrice)}</span>
        </div>
      </button>
    `
    )
    .join('');

  list.querySelectorAll('.package-card').forEach((card) => {
    card.addEventListener('click', () => {
      selectedPkgId = card.dataset.pkg;
      renderPackages();
      updateCheckoutSummary();
      const chosen = CONFIG.packages.find((p) => p.id === selectedPkgId);
      trackAdsEvent('AddToCart', { content_name: chosen.name, value: chosen.price, currency: 'VND' });
    });
  });
}

function updateCheckoutSummary() {
  const pkg = CONFIG.packages.find((p) => p.id === selectedPkgId);
  if (!pkg) return;

  const total = pkg.price + pkg.shippingFee;
  const summaryEl = document.getElementById('selectedSummary');
  if (summaryEl) {
    summaryEl.innerHTML =
      `Đang chọn: <strong>${pkg.name}</strong> (${pkg.shippingFee === 0 ? 'Freeship toàn quốc' : 'Phí ship ' + formatVND(pkg.shippingFee)})`;
  }

  const priceEl = document.getElementById('summaryProductPrice');
  if (priceEl) priceEl.textContent = formatVND(pkg.price);

  const shipEl = document.getElementById('summaryShipping');
  if (shipEl) {
    shipEl.textContent = pkg.shippingFee === 0 ? 'Miễn phí' : formatVND(pkg.shippingFee);
  }

  const totalEl = document.getElementById('summaryTotal');
  if (totalEl) totalEl.textContent = formatVND(total);

  // Sync Hero price
  const heroNow = document.getElementById('heroPriceNow');
  const heroOld = document.getElementById('heroPriceOld');
  if (heroNow) heroNow.textContent = formatVND(pkg.price);
  if (heroOld) heroOld.textContent = formatVND(pkg.oldPrice);
}

// 7. Handle COD Order Form Submit
const successModal = document.getElementById('successModal');
const orderForm = document.getElementById('orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const pkg = CONFIG.packages.find((p) => p.id === selectedPkgId);
    const total = pkg.price + pkg.shippingFee;

    trackAdsEvent('Purchase', {
      content_name: pkg.name,
      value: total,
      currency: 'VND'
    });

    const msgEl = document.getElementById('successMessage');
    if (msgEl) {
      msgEl.innerHTML =
        `Cảm ơn <strong>${name}</strong> (${phone})!<br/>Đơn hàng <strong>${pkg.name}</strong> tổng thanh toán <strong>${formatVND(total)}</strong> đã được ghi nhận. Bộ phận CSKH Daizy Daily sẽ liên hệ xác nhận trong ít phút.`;
    }

    if (successModal) {
      successModal.classList.add('open');
      successModal.setAttribute('aria-hidden', 'false');
    }
    e.target.reset();
  });
}

const closeBtn = document.getElementById('closeSuccessBtn');
if (closeBtn && successModal) {
  closeBtn.addEventListener('click', () => {
    successModal.classList.remove('open');
    successModal.setAttribute('aria-hidden', 'true');
  });
}

if (successModal) {
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.classList.remove('open');
      successModal.setAttribute('aria-hidden', 'true');
    }
  });
}

// Track CTA clicks
document.querySelectorAll('[data-track]').forEach((el) => {
  el.addEventListener('click', () => {
    trackAdsEvent('InitiateCheckout', { source: el.dataset.track });
  });
});

// Initialize Page
startCountdown();
renderReviews();
renderPackages();
updateCheckoutSummary();
trackAdsEvent('ViewContent', { content_name: 'Daizy Daily Khăn Mặt Khô Cotton 100% 60 Tờ' });

// Active Navigation Scrollspy (Desktop & Mobile)
const navSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.header-nav a');

function updateActiveNav() {
  const scrollPos = window.scrollY + 130;
  let currentId = '';

  navSections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href').replace('#', '');
    if (href === currentId) {
      link.classList.add('nav-active');
    } else {
      link.classList.remove('nav-active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
