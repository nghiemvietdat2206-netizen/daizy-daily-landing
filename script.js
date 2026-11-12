/* ==========================================================================
   DAIZY DAILY — Facebook Ads Landing Page Script & Easy Pricing Config
   ========================================================================== */

const CONFIG = {
  // Đường dẫn gian hàng Shopee chính thức (lấy từ link bạn cung cấp)
  shopeeUrl:
    'https://shopee.vn/Kh%C4%83n-Kh%C3%B4-%C4%90a-N%C4%83ng-Cao-C%E1%BA%A5p-D%C3%B9ng-1-L%E1%BA%A7n-Daizy-Daily-D%E1%BB%8Bu-Nh%E1%BA%B9-Cho-B%C3%A9-S%C6%A1-Sinh-Ti%E1%BB%87n-L%E1%BB%A3i-Cho-C%E1%BA%A3-Gia-%C4%90%C3%ACnh-G%C3%B3i-200-T%E1%BB%9D-i.1862928708.50312572945?extraParams=%7B%22display_model_id%22%3A297723737081%2C%22model_selection_logic%22%3A3%7D&image_ids=vn-11134207-81ztc-muucbc2xssg681',

  // Chỉnh sửa giá & combo tại đây để đồng bộ toàn bộ trang
  packages: [
    {
      id: 'pack-1',
      badge: 'Dùng Thử',
      name: '1 Gói Lẻ — 200 Tờ',
      desc: 'Phù hợp trải nghiệm cá nhân hoặc mang đi du lịch',
      price: 89000,
      oldPrice: 109000,
      shippingFee: 25000
    },
    {
      id: 'pack-2',
      badge: 'Best Seller • Khuyên Dùng',
      name: 'Combo 2 Gói — 400 Tờ',
      desc: 'Lựa chọn phổ biến nhất cho Mẹ & Bé và chu trình Skincare',
      price: 165000,
      oldPrice: 218000,
      shippingFee: 0
    },
    {
      id: 'pack-4',
      badge: 'Siêu Tiết Kiệm -28%',
      name: 'Combo 4 Gói — 800 Tờ',
      desc: 'Dùng thoải mái cho cả gia đình, tiết kiệm tối đa chi phí',
      price: 310000,
      oldPrice: 436000,
      shippingFee: 0
    }
  ]
};

const REVIEWS = [
  {
    group: 'baby',
    tag: 'Mẹ & Bé',
    author: 'Chị Ngọc Hân (Q.7, TP.HCM)',
    text: 'Bé nhà mình da nhạy cảm hay bị mẩn đỏ khi dùng khăn ướt có mùi. Từ ngày chuyển sang khăn khô Daizy Daily nhúng nước ấm lau cho con thì da bé êm hẳn, khăn dai không bị bở.'
  },
  {
    group: 'skincare',
    tag: 'Skincare',
    author: 'Minh Thư (Hà Nội)',
    text: 'Mình bỏ hẳn khăn mặt vải để chuyển sang khăn dùng 1 lần này. Gói 200 tờ rất nhiều, lau mặt thấm nước cực nhanh mà không hề bị dính xơ bông lên mặt.'
  },
  {
    group: 'baby',
    tag: 'Mẹ & Bé',
    author: 'Mẹ Bầu Lan Anh (Đà Nẵng)',
    text: 'Thấy chuẩn ISO với GMP nên mình đặt luôn combo 2 gói chuẩn bị giỏ đồ đi sinh. Khăn sờ rất mịn, rút từng tờ dễ dàng.'
  },
  {
    group: 'skincare',
    tag: 'Skincare',
    author: 'Bảo Trâm (Bình Dương)',
    text: 'Mình dùng tẩy trang lẫn thấm khô sau khi rửa mặt. Khăn xong việc vẫn dai nên tận dụng lau luôn bàn trang điểm rất sạch.'
  },
  {
    group: 'baby',
    tag: 'Mẹ & Bé',
    author: 'Anh Hoàng Nam (TP. Thủ Đức)',
    text: 'Mua cho vợ chăm bé sơ sinh, gói xanh 200 tờ nhìn rất sạch sẽ. Đặt hàng kiểm tra đúng bao bì hoa cúc Daizy Daily mới thanh toán nên rất yên tâm.'
  },
  {
    group: 'skincare',
    tag: 'Skincare',
    author: 'Khánh Linh (Cần Thơ)',
    text: 'Da mình đang treatment dùng khăn này cực kỳ dịu, không gây rát da như khăn giấy thường. Sẽ mua tiếp combo 4 gói.'
  }
];

let selectedPkgId = 'pack-2'; // Mặc định chọn Combo 2 gói để tối ưu giá trị đơn Facebook Ads
let activeReviewFilter = 'all';

function formatVND(val) {
  return new Intl.NumberFormat('vi-VN').format(val) + 'đ';
}

// Helper sẵn sàng cho Facebook Pixel / TikTok Pixel
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

// 4. Usage Tabs (Mẹ & Bé / Skincare)
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
          <div class="review-verified">✓ Đã mua Khăn Khô Daizy Daily 200 Tờ</div>
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
  document.getElementById('selectedSummary').innerHTML =
    `Đang chọn: <strong>${pkg.name}</strong> (${pkg.shippingFee === 0 ? 'Freeship toàn quốc' : 'Phí ship ' + formatVND(pkg.shippingFee)})`;

  document.getElementById('summaryProductPrice').textContent = formatVND(pkg.price);
  document.getElementById('summaryShipping').textContent =
    pkg.shippingFee === 0 ? 'Miễn phí (0đ)' : formatVND(pkg.shippingFee);
  document.getElementById('summaryTotal').textContent = formatVND(total);
}

// 7. Handle COD Order Form Submit
const successModal = document.getElementById('successModal');
document.getElementById('orderForm').addEventListener('submit', (e) => {
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

  document.getElementById('successMessage').innerHTML =
    `Cảm ơn <strong>${name}</strong> (${phone})!<br/>Đơn hàng <strong>${pkg.name}</strong> tổng thanh toán <strong>${formatVND(total)}</strong> đã được ghi nhận. Bộ phận CSKH Daizy Daily sẽ liên hệ xác nhận trong ít phút.`;

  successModal.classList.add('open');
  successModal.setAttribute('aria-hidden', 'false');
  e.target.reset();
});

document.getElementById('closeSuccessBtn').addEventListener('click', () => {
  successModal.classList.remove('open');
  successModal.setAttribute('aria-hidden', 'true');
});

successModal.addEventListener('click', (e) => {
  if (e.target === successModal) {
    successModal.classList.remove('open');
    successModal.setAttribute('aria-hidden', 'true');
  }
});

// Track Shopee & CTA clicks
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
trackAdsEvent('ViewContent', { content_name: 'Daizy Daily Khăn Khô Đa Năng 200 Tờ' });
