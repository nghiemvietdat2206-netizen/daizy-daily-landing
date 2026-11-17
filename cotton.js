/**
 * DAIZY DAILY — KHĂN MẶT KHÔ COTTON 100% CAO CẤP (BẢN TÍM 60 TỜ)
 * Interactive Script: Combos, Checkout Calculation, Hero Gallery, FAQ, Reviews
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero Image Thumbnail Switcher
  const heroMainImg = document.getElementById('heroMainImg');
  const thumbBtns = document.querySelectorAll('.thumb-btn');

  thumbBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const targetSrc = btn.getAttribute('data-img');
      if (heroMainImg && targetSrc) {
        heroMainImg.style.opacity = '0.4';
        setTimeout(() => {
          heroMainImg.src = targetSrc;
          heroMainImg.style.opacity = '1';
        }, 120);
      }
    });
  });

  // 2. Combo Package Selection & Calculation
  const comboData = {
    combo1: {
      name: '1 Túi (60 Tờ) — Dùng Thử',
      price: 49000,
      oldPrice: 65000,
      shipping: 25000,
      total: 74000,
      shipText: '25.000đ'
    },
    combo2: {
      name: 'Combo 3 Túi (180 Tờ) — Best Seller',
      price: 129000,
      oldPrice: 195000,
      shipping: 0,
      total: 129000,
      shipText: 'Miễn phí (0đ)'
    },
    combo3: {
      name: 'Combo 6 Túi (360 Tờ) — Siêu Tiết Kiệm (+ Tặng Móc Treo)',
      price: 239000,
      oldPrice: 390000,
      shipping: 0,
      total: 239000,
      shipText: 'Miễn phí (0đ)'
    }
  };

  let activeComboKey = 'combo2'; // Default Best Seller
  const comboCards = document.querySelectorAll('.combo-card');
  const selectedPackageText = document.getElementById('selectedPackageText');
  const calcSubtotal = document.getElementById('calcSubtotal');
  const calcShipping = document.getElementById('calcShipping');
  const calcTotal = document.getElementById('calcTotal');

  function updatePricing(key) {
    activeComboKey = key;
    const data = comboData[key];
    if (!data) return;

    comboCards.forEach((card) => {
      if (card.dataset.combo === key) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    if (selectedPackageText) {
      selectedPackageText.textContent = `Đang chọn: ${data.name} (${data.shipping === 0 ? 'Freeship toàn quốc' : 'Phí ship 25k'})`;
    }

    const fmt = (num) => new Intl.NumberFormat('vi-VN').format(num) + 'đ';

    if (calcSubtotal) calcSubtotal.textContent = fmt(data.price);
    if (calcShipping) calcShipping.textContent = data.shipText;
    if (calcTotal) calcTotal.textContent = fmt(data.total);
  }

  comboCards.forEach((card) => {
    card.addEventListener('click', () => {
      const key = card.dataset.combo;
      updatePricing(key);
    });
  });

  // 3. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach((other) => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 4. Reviews Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const reviewCards = document.querySelectorAll('.review-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      reviewCards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Order Form Submission & Success Modal
  const orderForm = document.getElementById('orderForm');
  const successModal = document.getElementById('successModal');
  const successMessage = document.getElementById('successMessage');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('customerName').value.trim();
      const phone = document.getElementById('customerPhone').value.trim();
      const address = document.getElementById('customerAddress').value.trim();
      const note = document.getElementById('customerNote').value.trim();

      if (!name || !phone || !address) {
        alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng.');
        return;
      }

      // Simple VN phone regex (10 digits starting with 0)
      const phoneRegex = /^0[0-9]{9}$/;
      if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
        alert('Vui lòng nhập số điện thoại hợp lệ (10 chữ số, bắt đầu bằng 0).');
        return;
      }

      const chosen = comboData[activeComboKey];
      const fmt = (num) => new Intl.NumberFormat('vi-VN').format(num) + 'đ';

      if (successMessage) {
        successMessage.innerHTML = `
          Cảm ơn bạn <strong>${name}</strong>!<br/>
          Đơn hàng <strong>${chosen.name}</strong> trị giá <strong>${fmt(chosen.total)}</strong> (COD) đã được tiếp nhận.<br/><br/>
          Nhân viên tư vấn Daizy Daily sẽ liên hệ qua SĐT <strong>${phone}</strong> để xác nhận và gửi hàng nhanh tới: <em>${address}</em>.
        `;
      }

      if (successModal) {
        successModal.classList.add('active');
        successModal.setAttribute('aria-hidden', 'false');
      }

      // Reset form
      orderForm.reset();
      updatePricing('combo2');
    });
  }

  if (closeSuccessBtn && successModal) {
    closeSuccessBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
      successModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
        successModal.setAttribute('aria-hidden', 'true');
      }
    });
  }
});
