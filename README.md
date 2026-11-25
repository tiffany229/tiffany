# Tiffany Watson — Official Portfolio & Concierge

A luxury editorial web experience and booking concierge for **Tiffany Watson**, faithfully inspired by the design system, features, and user experience of [miamiluna.top](https://www.miamiluna.top/).

---

## ✦ Key Features Implemented

1. **18+ Age & Discretion Gate**:
   - Editorial modal gate with monogram crest (`TW`), custom typography, and verification seals.
   - Remembers verified status across sessions via `sessionStorage`.

2. **Top Concierge Bar**:
   - Real-time base city availability status (`Los Angeles / Orange County, CA`).
   - Verification badges (Preferred411 & The Erotic Review) and direct email link (`meettiffanywatson@protonmail.com`).

3. **Sticky Editorial Header**:
   - Dynamic navigation, brand monogram logo, and mobile drawer menu.

4. **Layered Editorial Hero Composition**:
   - Double-framed portrait composition with luxury metadata tags (`Plate I — Lilac Couture`, `Plate II — Suite Poise`).
   - Direct CTAs to booking and visual lookbook.
   - Verification seals bar for instant client trust.

5. **Editorial Marquee Ticker**:
   - Continuous luxury ribbon highlighting vital statistics and signature allure.

6. **Authentic Lookbook & Visual Gallery**:
   - Responsive masonry grid showcasing all 7 authentic photos across curated categories (`All Plates`, `Boudoir & Suite`, `Intimate Lace`, `Glamour`, `Neon Velvet`).
   - Fullscreen lightbox modal with image counter, captions, and keyboard navigation (`←`, `→`, `ESC`).

7. **Personal Dossier & Verified Appearance**:
   - Built directly from verified appearance specifications:
     - **Build**: Athletic / Sculpted
     - **Photo Accurate**: 100% Photos Accurate & Verified
     - **Ethnicity**: White / Caucasian
     - **Age**: 27 (26–30)
     - **Height**: 5'7" (5'6" – 5'8")
     - **Eye Color**: Striking Green
     - **Hair Color & Style**: Honey Blonde with radiant highlights, shoulder length soft curls
     - **Bust**: 34C (Cup C, Band 34-35), 100% Natural, No Implants
     - **Piercings**: Tongue & Navel
     - **Tattoos**: One (Fine-line script)
     - **Grooming**: Shaved / Impeccably Maintained

8. **Donations & Considerations Grid**:
   - Updated rates:
     - **1 Hour**: $1,200 (Express Rendezvous)
     - **2 Hours**: $2,400 (Signature Rendezvous — Most Popular)
     - **6 Hours**: $7,200 (VIP Soirée & Escape)
     - **12 Hours / Overnight**: $10,000 (Overnight Retreat)
     - **Fly Me To You (FMTY)**: 6+ Hours (Worldwide Travel)
   - **Payments Acceptable**: **Chime**, **Bank Transfer**, and **Bitcoin (BTC)**.
   - Interactive selection buttons that automatically pre-fill the duration in the booking form.
   - No outcall surcharge.

9. **Curated Duos Section**:
   - Direct links to companion model portfolios.

10. **Comprehensive Web3Forms Integration**:
    - **Main Reservation Form**: Full client screening, location logistics, date/time picker, preferred payment method (**Chime**, **Bank Transfer**, **Bitcoin**), and dynamic conditional screening options (Preferred411 handle, Companion References, ID verification, Past Meeting, Other).
    - **Floating "Meet Me" Quick Concierge**: Interactive FAB button and modal with instant Web3Forms submission and payment preference selection.
    - Anti-spam honeypot protection (`botcheck`), AJAX dispatch, and responsive status messaging.
    - Destination email configured to **`meettiffanywatson@protonmail.com`**.

---

## ✦ Getting Started & Local Preview

To launch the project locally:

```bash
cd C:\projects\tiffany-watson
npx serve .
```

Then open `http://localhost:3000` in your browser.

---

## ✦ Web3Forms Setup

The forms are pre-configured to submit via [Web3Forms](https://web3forms.com/) directly to **`meettiffanywatson@protonmail.com`**.
To generate or update your free Web3Forms access key for `meettiffanywatson@protonmail.com`:
1. Visit [web3forms.com](https://web3forms.com) and enter `meettiffanywatson@protonmail.com`.
2. Check `meettiffanywatson@protonmail.com` for your access key.
3. Paste your access key into `.env.local` (`WEB3FORMS_ACCESS_KEY`), `script.js` (`DEFAULT_WEB3FORMS_KEY`), and `index.html` (`name="access_key"`).
