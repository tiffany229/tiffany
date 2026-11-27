/**
 * TIFFANY WATSON — INTERACTIVE PORTFOLIO & PRIVATE CONCIERGE SCRIPTS
 * Faithful recreation of the miamiluna.top editorial system with Web3Forms
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ========================================================================
     1. 18+ AGE & DISCRETION GATE
     ======================================================================== */
  const ageGate = document.getElementById('age-gate');
  const enterSiteBtn = document.getElementById('enter-site-btn');

  if (ageGate && enterSiteBtn) {
    if (sessionStorage.getItem('tiffany_watson_age_verified') === 'true') {
      ageGate.classList.add('hidden');
    }

    enterSiteBtn.addEventListener('click', () => {
      sessionStorage.setItem('tiffany_watson_age_verified', 'true');
      ageGate.classList.add('hidden');
    });
  }

  /* ========================================================================
     2. MOBILE MENU TOGGLE
     ======================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const siteNav = document.getElementById('site-nav');

  if (mobileMenuBtn && siteNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ========================================================================
     3. GALLERY CATEGORY FILTERING
     ======================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden-item');
        } else {
          card.classList.add('hidden-item');
        }
      });
    });
  });

  /* ========================================================================
     4. FULLSCREEN LIGHTBOX (GALLERY & EDITORIAL PORTRAITS)
     ======================================================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let lightboxItems = [];
  let currentIndex = 0;

  function buildLightboxList() {
    const visibleGallery = Array.from(document.querySelectorAll('.gallery-card:not(.hidden-item)'));
    lightboxItems = visibleGallery.map((el) => ({
      src: el.getAttribute('data-src') || el.querySelector('img')?.getAttribute('src'),
      caption: el.getAttribute('data-caption') || el.querySelector('strong')?.textContent || 'Tiffany Watson Portfolio',
    }));
  }

  function openLightboxAt(index) {
    if (!lightboxItems.length) buildLightboxList();
    if (!lightboxItems.length) return;
    currentIndex = (index + lightboxItems.length) % lightboxItems.length;
    const item = lightboxItems[currentIndex];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.caption;
    lightboxCounter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(lightboxItems.length).padStart(2, '0')}`;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function openSingleLightbox(src, caption) {
    lightboxItems = [{ src, caption }];
    currentIndex = 0;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightboxCounter.textContent = '01 / 01';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      buildLightboxList();
      const visibleCards = Array.from(document.querySelectorAll('.gallery-card:not(.hidden-item)'));
      const idx = visibleCards.indexOf(card);
      openLightboxAt(idx >= 0 ? idx : 0);
    });
  });

  document.querySelectorAll('.lightbox-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const src = trigger.getAttribute('data-src') || trigger.querySelector('img')?.getAttribute('src');
      const caption = trigger.getAttribute('data-caption') || 'Tiffany Watson Editorial Portrait';
      if (src) openSingleLightbox(src, caption);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => openLightboxAt(currentIndex - 1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => openLightboxAt(currentIndex + 1));

  // Touch Swipe Gesture for Lightbox on Mobile Devices
  let touchStartX = 0;
  let touchEndX = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance > 0) {
          openLightboxAt(currentIndex - 1); // Swiped right -> previous
        } else {
          openLightboxAt(currentIndex + 1); // Swiped left -> next
        }
      }
    }, { passive: true });
  }

  // Exclusive Accordion for FAQ items
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (lightbox && !lightbox.hidden) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openLightboxAt(currentIndex - 1);
      if (e.key === 'ArrowRight') openLightboxAt(currentIndex + 1);
    }
  });

  /* ========================================================================
     5. DONATION TIER QUICK-SELECT -> BOOKING FORM
     ======================================================================== */
  const durationSelect = document.getElementById('bf-duration');
  document.querySelectorAll('[data-select-time]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const timeVal = btn.getAttribute('data-select-time');
      if (durationSelect && timeVal) {
        durationSelect.value = timeVal;
        durationSelect.style.borderColor = '#f43f5e';
        setTimeout(() => {
          durationSelect.style.borderColor = '';
        }, 1800);
      }
    });
  });

  /* ========================================================================
     6. DYNAMIC CONDITIONAL SCREENING FIELDS
     ======================================================================== */
  const screeningRadios = document.querySelectorAll('input[name="screening"]');
  const condPanels = {
    p411: document.getElementById('cond-p411'),
    refs: document.getElementById('cond-refs'),
    ids: document.getElementById('cond-ids'),
    past: document.getElementById('cond-past'),
    other: document.getElementById('cond-other'),
  };

  function updateScreeningPanels() {
    const selected = document.querySelector('input[name="screening"]:checked');
    const condKey = selected ? selected.getAttribute('data-cond') : 'p411';

    Object.entries(condPanels).forEach(([key, panel]) => {
      if (!panel) return;
      if (key === condKey) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  }

  screeningRadios.forEach((radio) => {
    radio.addEventListener('change', updateScreeningPanels);
  });
  updateScreeningPanels();

  /* ========================================================================
     7. FORM HANDLERS VIA WEB3FORMS (BOOKING, QUICK MEET ME MODAL)
     ======================================================================== */
  const DEFAULT_WEB3FORMS_KEY = '3e14486d-a023-4e60-b60e-cb7ebab72047';

  async function submitToWeb3Forms(formEl, statusEl, buildSubjectFn, successMsgFn) {
    const submitBtn = formEl.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : 'Submit';

    const formData = new FormData(formEl);
    const configuredKey = formEl.querySelector('input[name="access_key"]')?.value?.trim();
    formData.set('access_key', configuredKey || DEFAULT_WEB3FORMS_KEY);

    const subjectText = buildSubjectFn(formData);
    formData.set('subject', subjectText);

    const payload = Object.fromEntries(formData.entries());
    if (!payload.botcheck) {
      delete payload.botcheck;
    }

    // Clean empty screening fields
    ['P411', 'ref1', 'ref1e', 'ref2', 'ref2e', 'past_meeting', 'other_screening'].forEach((field) => {
      if (field in payload && !String(payload[field]).trim()) {
        delete payload[field];
      }
    });

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Transmitting Confidential Inquiry...';
    }
    if (statusEl) {
      statusEl.className = 'form-status';
      statusEl.textContent = 'Sending your confidential inquiry to Tiffany Watson...';
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (response.status === 200 && result.success) {
        if (statusEl) {
          statusEl.className = 'form-status success';
          statusEl.innerHTML = successMsgFn(formData);
        }
        formEl.reset();
        updateScreeningPanels();
      } else {
        if (statusEl) {
          statusEl.className = 'form-status error';
          statusEl.textContent =
            result.message || 'Unable to send inquiry right now. Please email meettiffanywatson@protonmail.com directly.';
        }
      }
    } catch (error) {
      if (statusEl) {
        statusEl.className = 'form-status error';
        statusEl.textContent =
          'Network error while sending inquiry. Please email meettiffanywatson@protonmail.com directly.';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    }
  }

  const mainBookingForm = document.getElementById('main-booking-form');
  const bookingStatus = document.getElementById('booking-status');
  let isBookingSubmitting = false;

  if (mainBookingForm && bookingStatus) {
    mainBookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (isBookingSubmitting) return;

      const formData = new FormData(mainBookingForm);
      const firstName = (formData.get('name') || '').toString().trim();
      const lastName = (formData.get('last') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();

      if (!firstName || !lastName || !email) {
        bookingStatus.className = 'form-status error';
        bookingStatus.textContent =
          'Please complete your First Name, Last Name, and Email to submit your booking request.';
        return;
      }

      isBookingSubmitting = true;
      await submitToWeb3Forms(
        mainBookingForm,
        bookingStatus,
        () => `New Booking Inquiry from ${firstName} ${lastName} — Tiffany Watson`,
        () =>
          `<strong>✓ Thank you, ${firstName}! Your booking reservation has been successfully sent to Tiffany Watson at meettiffanywatson@protonmail.com.</strong><br/>Please monitor your inbox. If you do not hear back within 30 minutes, you may also email directly at <a href="mailto:meettiffanywatson@protonmail.com" style="color:#f43f5e;font-weight:600;text-decoration:underline;">meettiffanywatson@protonmail.com</a>.`
      );
      isBookingSubmitting = false;
    });
  }

  /* Floating "Meet Me" Quick Modal */
  const meetFab = document.getElementById('meet-fab');
  const meetModal = document.getElementById('meet-modal');
  const meetModalClose = document.getElementById('meet-modal-close');
  const quickMeetForm = document.getElementById('quick-meet-form');
  const quickMeetStatus = document.getElementById('quick-meet-status');
  let isQuickMeetSubmitting = false;

  if (meetFab && meetModal) {
    meetFab.addEventListener('click', () => {
      meetModal.hidden = false;
    });
  }

  if (meetModalClose && meetModal) {
    meetModalClose.addEventListener('click', () => {
      meetModal.hidden = true;
    });
    meetModal.addEventListener('click', (e) => {
      if (e.target === meetModal) meetModal.hidden = true;
    });
  }

  if (quickMeetForm && quickMeetStatus) {
    quickMeetForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (isQuickMeetSubmitting) return;

      const formData = new FormData(quickMeetForm);
      const email = (formData.get('email') || '').toString().trim();

      if (!email) {
        quickMeetStatus.className = 'form-status error';
        quickMeetStatus.textContent = 'Please enter your email address.';
        return;
      }

      isQuickMeetSubmitting = true;
      await submitToWeb3Forms(
        quickMeetForm,
        quickMeetStatus,
        () => `Quick Meeting Inquiry (${email}) — Tiffany Watson`,
        () => `<strong>✓ Thank you! Your meeting request has been dispatched to Tiffany Watson (meettiffanywatson@protonmail.com).</strong>`
      );
      isQuickMeetSubmitting = false;
    });
  }
});
