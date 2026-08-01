/* =====================================================
                    NAVBAR
===================================================== */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* =====================================================
                MOBILE MENU
===================================================== */
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
menuBtn.addEventListener("click", function () {
  mobileMenu.classList.toggle("hidden");
  const icon = menuBtn.querySelector("i");
  if (mobileMenu.classList.contains("hidden")) {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  } else {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  }
});

/* =====================================================
                    SEARCH
===================================================== */
const searchBtn = document.getElementById("search-btn");
if (searchBtn) {
  searchBtn.addEventListener("click", function () {
    const destination = document.getElementById("destination").value.trim();
    const message = document.getElementById("search-message");
    if (destination === "") {
      message.textContent = "Please enter a destination.";
      message.classList.remove("hidden");
      message.classList.add("text-red-500");
    } else {
      message.textContent = `Searching for trips to ${destination}...`;
      message.classList.remove("hidden");
      message.classList.remove("text-red-500");
      message.classList.add("text-teal-700");
    }
  });
}

/* =====================================================
            DESTINATION SEARCH & FILTER
===================================================== */
const destinationSearch = document.getElementById("destination-search");
const regionFilter = document.getElementById("region-filter");
const destinationItems = document.querySelectorAll(".destination-item");
const noResults = document.getElementById("no-results");
function filterDestinations() {
  const searchValue = destinationSearch.value.toLowerCase().trim();
  const selectedRegion = regionFilter.value;
  let visibleCount = 0;
  destinationItems.forEach(function (card) {
    const name = card.dataset.name;
    const region = card.dataset.region;
    const matchesSearch = name.includes(searchValue);
    const matchesRegion = selectedRegion === "all" || region === selectedRegion;
    if (matchesSearch && matchesRegion) {
      card.classList.remove("hide");
      visibleCount++;
    } else {
      card.classList.add("hide");
    }
  });

  if (visibleCount === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
  }
}

if (destinationSearch) {
  destinationSearch.addEventListener("input", filterDestinations);
}
if (regionFilter) {
  regionFilter.addEventListener("change", filterDestinations);
}

/* =====================================================
            PACKAGE CATEGORY FILTER
===================================================== */
const filterTabs = document.querySelectorAll(".filter-tab");
const packageItems = document.querySelectorAll(".package-item");
if (filterTabs.length) {
  filterTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      packageItems.forEach(function (item) {
        const categories = item.dataset.category || "";
        if (filter === "all" || categories.includes(filter)) {
          item.classList.remove("hide");
        } else {
          item.classList.add("hide");
        }
      });
    });
  });
}

/* =====================================================
            PACKAGE DETAILS MODAL
===================================================== */
const packageModal = document.getElementById("package-modal");
const detailButtons = document.querySelectorAll(".details-btn");
const modalClose = document.getElementById("modal-close");

function buildList(targetEl, pipeString) {
  targetEl.innerHTML = "";
  pipeString.split("|").forEach(function (line) {
    const li = document.createElement("li");
    li.innerHTML = line;
    targetEl.appendChild(li);
  });
}

if (packageModal) {
  detailButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.getElementById("modal-image").src = btn.dataset.image;
      document.getElementById("modal-title").textContent = btn.dataset.title;
      document.getElementById("modal-rating").textContent =
        "⭐ " + btn.dataset.rating;
      document.getElementById("modal-duration").textContent =
        btn.dataset.duration;
      document.getElementById("modal-desc").textContent = btn.dataset.desc;
      document.getElementById("modal-price").textContent =
        btn.dataset.price + " / person";
      buildList(
        document.getElementById("modal-itinerary"),
        btn.dataset.itinerary,
      );
      buildList(
        document.getElementById("modal-includes"),
        btn.dataset.includes,
      );
      buildList(
        document.getElementById("modal-excludes"),
        btn.dataset.excludes,
      );

      packageModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  });

  function closePackageModal() {
    packageModal.classList.add("hidden");
    document.body.style.overflow = "";
  }
  modalClose.addEventListener("click", closePackageModal);
  packageModal
    .querySelector(".package-modal-backdrop")
    .addEventListener("click", closePackageModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePackageModal();
  });
}

/* =====================================================
            OFFERS — PROMO CODE COPY
===================================================== */
const copyButtons = document.querySelectorAll(".copy-btn");
copyButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const code = document.getElementById(btn.dataset.target).textContent;
    navigator.clipboard.writeText(code).then(function () {
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
      btn.classList.add("copied");
      setTimeout(function () {
        btn.innerHTML = original;
        btn.classList.remove("copied");
      }, 1800);
    });
  });
});

/* =====================================================
            OFFERS — FLASH SALE COUNTDOWN
===================================================== */
const countdownEl = document.getElementById("countdown");
if (countdownEl) {
  const saleEnd = new Date();
  saleEnd.setDate(saleEnd.getDate() + 5);
  saleEnd.setHours(23, 59, 59, 0);

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = saleEnd.getTime() - now;
    if (distance < 0) {
      countdownEl.innerHTML = "<p class='text-white'>Offer Expired</p>";
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("cd-days").textContent = String(days).padStart(
      2,
      "0",
    );
    document.getElementById("cd-hours").textContent = String(hours).padStart(
      2,
      "0",
    );
    document.getElementById("cd-mins").textContent = String(mins).padStart(
      2,
      "0",
    );
    document.getElementById("cd-secs").textContent = String(secs).padStart(
      2,
      "0",
    );
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* =====================================================
            ABOUT — STATS COUNTER ANIMATION
===================================================== */
const counters = document.querySelectorAll(".counter");
if (counters.length) {
  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const duration = 1500;
          const startTime = performance.now();

          function tick(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            el.textContent = Math.floor(progress * target).toLocaleString();
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              el.textContent = target.toLocaleString();
            }
          }
          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((c) => counterObserver.observe(c));
}

/* =====================================================
            ABOUT — GALLERY LIGHTBOX
===================================================== */
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      lightboxImg.src = item.dataset.img;
      lightbox.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.add("hidden");
    document.body.style.overflow = "";
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
}

/* =====================================================
            CONTACT FORM VALIDATION
===================================================== */
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const fields = [
      { id: "name", errorId: "name-error", message: "Please enter your name." },
      {
        id: "email",
        errorId: "email-error",
        message: "Please enter a valid email address.",
        isEmail: true,
      },
      {
        id: "phone",
        errorId: "phone-error",
        message: "Please enter your phone number.",
      },
      {
        id: "subject",
        errorId: "subject-error",
        message: "Please select a subject.",
      },
      {
        id: "message",
        errorId: "message-error",
        message: "Please enter a message.",
      },
    ];

    fields.forEach(function (field) {
      const input = document.getElementById(field.id);
      const errorEl = document.getElementById(field.errorId);
      const value = input.value.trim();
      let fieldValid = value !== "";

      if (fieldValid && field.isEmail) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        fieldValid = emailPattern.test(value);
      }

      if (!fieldValid) {
        errorEl.textContent = field.message;
        input.closest(".form-group").classList.add("error");
        isValid = false;
      } else {
        errorEl.textContent = "";
        input.closest(".form-group").classList.remove("error");
      }
    });

    const successMsg = document.getElementById("form-success");
    if (isValid) {
      successMsg.classList.remove("hidden");
      contactForm.reset();
      setTimeout(function () {
        successMsg.classList.add("hidden");
      }, 6000);
    } else {
      successMsg.classList.add("hidden");
    }
  });
}
