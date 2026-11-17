/* ==============================
   YTECH HOTEL - MAIN JAVASCRIPT
============================== */

/* HOTEL CONTACT DETAILS */

const hotelPhone = "0967916468";
const whatsappNumber = "251967916468";

/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");

    menuToggle.textContent =
      navMenu.classList.contains("show") ? "✕" : "☰";
  });

  document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      menuToggle.textContent = "☰";
    });
  });
}

/* ==============================
   HERO AUTOMATIC SLIDESHOW
============================== */

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  if (slides.length === 0) return;

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function startSlideshow() {
  if (slides.length <= 1) return;

  clearInterval(slideTimer);

  slideTimer = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
}

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const slideNumber = Number(dot.dataset.slide);

    showSlide(slideNumber);
    startSlideshow();
  });
});

showSlide(0);
startSlideshow();

/* ==============================
   BOOKING DATE SETTINGS
============================== */

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const guests = document.getElementById("guests");

const bookingForm = document.getElementById("bookingForm");

const today = new Date();

const localToday = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

if (checkin && checkout) {
  checkin.min = localToday;
  checkout.min = localToday;

  checkin.addEventListener("change", () => {
    checkout.min = checkin.value || localToday;

    if (checkout.value && checkout.value <= checkin.value) {
      checkout.value = "";
    }
  });
}

/* ==============================
   BOOKING MODAL
============================== */

const bookingModal = document.getElementById("bookingModal");
const bookingSummary = document.getElementById("bookingSummary");
const closeModal = document.getElementById("closeModal");

const whatsappBooking = document.getElementById("whatsappBooking");
const smsBooking = document.getElementById("smsBooking");

let bookingMessage = "";

/* OPEN BOOKING FORM FROM BOOK NOW LINKS */

document.querySelectorAll('a[href="#booking"]').forEach(link => {
  link.addEventListener("click", () => {
    if (checkin) {
      checkin.focus();
    }
  });
});

/* ==============================
   CHECK AVAILABILITY
============================== */

if (bookingForm) {
  bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const inDate = checkin.value;
    const outDate = checkout.value;
    const guestCount = guests.value;

    if (!inDate || !outDate) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    if (inDate < localToday) {
      alert("Check-in date cannot be in the past.");
      return;
    }

    if (outDate <= inDate) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    /* CREATE BOOKING MESSAGE */

    bookingMessage =
      "Hello YTECH HOTEL!\n\n" +
      "I would like to make a room reservation.\n\n" +
      "HOTEL: YTECH HOTEL\n" +
      "LOCATION: Injibara, Ethiopia\n" +
      "CHECK-IN: " + inDate + "\n" +
      "CHECK-OUT: " + outDate + "\n" +
      "GUESTS: " + guestCount + "\n\n" +
      "Please confirm room availability and prices.\n\n" +
      "Thank you!";

    /* SHOW BOOKING DETAILS */

    bookingSummary.innerHTML =
      "<strong>YOUR RESERVATION DETAILS</strong><br>" +
      "Hotel: YTECH HOTEL<br>" +
      "Location: Injibara, Ethiopia<br>" +
      "Check-in: " + inDate + "<br>" +
      "Check-out: " + outDate + "<br>" +
      "Guests: " + guestCount;

    /* OPEN BOOKING OPTIONS */

    bookingModal.classList.add("show");
    bookingModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
}

/* ==============================
   CLOSE BOOKING MODAL
============================== */

function hideBookingModal() {
  if (!bookingModal) return;

  bookingModal.classList.remove("show");
  bookingModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (closeModal) {
  closeModal.addEventListener("click", hideBookingModal);
}

if (bookingModal) {
  bookingModal.addEventListener("click", function(event) {
    if (event.target === bookingModal) {
      hideBookingModal();
    }
  });
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    hideBookingModal();
  }
});

/* ==============================
   WHATSAPP BOOKING
============================== */

if (whatsappBooking) {
  whatsappBooking.addEventListener("click", function() {
    if (!bookingMessage) return;

    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(bookingMessage);

    window.open(whatsappURL, "_blank");
  });
}

/* ==============================
   SMS BOOKING
============================== */

if (smsBooking) {
  smsBooking.addEventListener("click", function() {
    if (!bookingMessage) return;

    const smsURL =
      "sms:" +
      hotelPhone +
      "?body=" +
      encodeURIComponent(bookingMessage);

    window.location.href = smsURL;
  });
}

/* ==============================
   FOOTER CURRENT YEAR
============================== */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ==============================
   END YTECH HOTEL JAVASCRIPT
============================== */
/* GALLERY SLIDE-IN WHEN VISIBLE */

const galleryPhotos = document.querySelectorAll(".gallery-grid img");

const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const photo = entry.target;
      const index = Array.from(galleryPhotos).indexOf(photo);

      setTimeout(() => {
        photo.classList.add("show-photo");
      }, index * 200);

      galleryObserver.unobserve(photo);
    }
  });
}, {
  threshold: 0.15
});

galleryPhotos.forEach((photo) => {
  galleryObserver.observe(photo);
});
