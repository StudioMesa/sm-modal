  document.addEventListener("DOMContentLoaded", function () {
    const modals = document.querySelectorAll(".custom-modal");
    const closeButtons = document.querySelectorAll(".custom-modal-close");
    let scrollY = 0;

    function openModal(modal) {
      scrollY = window.scrollY;
      document.body.classList.add("modal-lock");
      document.body.style.top = `-${scrollY}px`;
      modal.classList.add("open");
    }

    function closeModal(modal) {
      modal.classList.add("closing");
      setTimeout(() => {
        modal.classList.remove("open", "closing");
        document.body.classList.remove("modal-lock");
        document.body.style.top = "";
        window.scrollTo(0, scrollY);
      }, 300);
    }

    document.querySelectorAll("a[href^='#']").forEach(link => {
      link.addEventListener("click", e => {
        const id = link.getAttribute("href").slice(1);
        const modal = document.getElementById(id);
        if (modal && modal.classList.contains("custom-modal")) {
          e.preventDefault();
          openModal(modal);
        }
      });
    });

    closeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".custom-modal");
        closeModal(modal);
      });
    });

    modals.forEach(modal => {
      modal.addEventListener("click", e => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        modals.forEach(modal => {
          if (modal.classList.contains("open")) {
            closeModal(modal);
          }
        });
      }
    });
  });
