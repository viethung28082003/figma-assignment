document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton");
  const menu = document.getElementById("menu");

  menuButton.addEventListener("click", function () {
      // Toggle hiển thị menu
      menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  // Đóng menu khi click ra ngoài
  document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
          menu.style.display = "none";
      }
  });

  // 🔹 Tính năng Swiper (Slider)
  if (typeof Swiper !== "undefined") {
      new Swiper('.swiper', {
          loop: true,
          autoplay: {
              delay: 2000,
              disableOnInteraction: false,
          },
          pagination: {
              el: '.swiper-pagination',
              clickable: true,
          },
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },
      });
  }

  // 🔹 Tính năng kéo vuốt (drag-scroll)
  const container = document.querySelector('.container-product');
  if (container) {
      let isDragging = false;
      let startX, scrollLeft;

      const startDrag = (e) => {
          isDragging = true;
          container.style.cursor = 'grabbing';
          startX = (e.pageX || e.touches[0].pageX) - container.offsetLeft;
          scrollLeft = container.scrollLeft;
      };

      const dragging = (e) => {
          if (!isDragging) return;
          e.preventDefault();
          const x = (e.pageX || e.touches[0].pageX) - container.offsetLeft;
          const walk = (x - startX) * 1.0;
          container.scrollLeft = scrollLeft - walk;
      };

      const stopDrag = () => {
          isDragging = false;
          container.style.cursor = 'grab';
      };

      container.addEventListener('mousedown', startDrag);
      container.addEventListener('mousemove', dragging);
      container.addEventListener('mouseup', stopDrag);
      container.addEventListener('mouseleave', stopDrag);

      container.addEventListener('touchstart', startDrag);
      container.addEventListener('touchmove', dragging);
      container.addEventListener('touchend', stopDrag);
  }

  // 🔹 Nút scroll ngang sản phẩm
  const productSpecial = document.querySelector('.product-special');
  const leftBtn = document.querySelector('.productsp-prev');
  const rightBtn = document.querySelector('.productsp-next');

  if (productSpecial && leftBtn && rightBtn) {
      const scrollAmount = 300; 

      leftBtn.addEventListener('click', () => {
          productSpecial.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });

      rightBtn.addEventListener('click', () => {
          productSpecial.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
  }

  // 🔹 Hiệu ứng cuộn (reveal content)
  const handleScrollReveal = (className) => {
      const reveals = document.querySelectorAll(`.${className}`);
      reveals.forEach((reveal) => {
          const windowHeight = window.innerHeight;
          const revealTop = reveal.getBoundingClientRect().top;
          const revealPoint = 80;

          if (revealTop < windowHeight - revealPoint) {
              reveal.classList.add('show');
          } else {
              reveal.classList.remove('show');
          }
      });
  };

  window.addEventListener('scroll', () => {
      handleScrollReveal('content-reveal');
      handleScrollReveal('content-reveal2');
  });
});
