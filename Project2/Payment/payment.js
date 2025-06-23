// Hàm định dạng tiền tệ
    function formatCurrency(number) {
      // Đảm bảo number là một số
      const num = parseFloat(number);
      if (isNaN(num)) {
          return '0đ'; // Trả về 0đ nếu không phải số hợp lệ
      }
      return num.toLocaleString('vi-VN') + 'đ';
    }

    // Modal cho thông báo
    function showMessageBox(message) {
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.innerHTML = `
            <p>${message}</p>
            <button class="modal-close-btn">Đóng</button>
        `;

        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);

        modalContent.querySelector('.modal-close-btn').addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
            window.location.href = '../Landing-scape/landing.html'; // Chuyển về trang chủ sau khi đóng thông báo
        });

        // Cho phép đóng modal khi click ra ngoài
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
                window.location.href = '../Landing-scape/landing.html'; // Chuyển về trang chủ sau khi đóng thông báo
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
      const totalAmount = localStorage.getItem('totalAmountForPayment');
      const selectedItems = JSON.parse(localStorage.getItem('selectedForPayment')) || [];
      const paymentTotalSpan = document.getElementById('payment-total');
      const orderDetailsDiv = document.getElementById('order-details');

      // Hiển thị tổng tiền
      if (totalAmount) {
        paymentTotalSpan.textContent = totalAmount;
      } else {
        paymentTotalSpan.textContent = '0đ';
      }

      // Hiển thị chi tiết đơn hàng
      if (selectedItems.length > 0) {
          let orderHtml = '<ul class="order-item-list">';
          selectedItems.forEach(item => {
              orderHtml += `
                  <li>
                      <div class="order-item-info">
                          <img src="${item.image || 'https://placehold.co/50x50/F0F0F0/808080?text=Sản+phẩm'}" alt="${item.name}" class="order-item-image">
                          <span>${item.name} x ${item.quantity}</span>
                      </div>
                      <span class="order-item-price">${formatCurrency(item.price * item.quantity)}</span>
                  </li>
              `;
          });
          orderHtml += '</ul>';
          orderDetailsDiv.innerHTML = orderHtml;
      } else {
          orderDetailsDiv.innerHTML = '<p>Không có sản phẩm nào được chọn để thanh toán.</p>';
      }

      // Xử lý nút Thanh toán khi nhận hàng (COD)
      document.getElementById('confirm-cod').addEventListener('click', () => {
        showMessageBox('Đơn hàng của bạn đã được xác nhận thành công! Chúng tôi sẽ giao hàng sớm nhất.');
        // Xóa giỏ hàng sau khi đặt hàng thành công
        localStorage.removeItem('cart');
        localStorage.removeItem('selectedForPayment');
        localStorage.removeItem('totalAmountForPayment');
      });

      // Xử lý nút Hiển thị QR Code
      document.getElementById('show-qr-btn').addEventListener('click', () => {
        const qrCodeArea = document.querySelector('.qr-code-area');
        qrCodeArea.style.display = 'flex'; // Hiển thị QR code
        document.getElementById('show-qr-btn').style.display = 'none'; // Ẩn nút "Hiển thị QR Code"
      });

      // Xử lý nút Đã thanh toán thành công trên app (QR)
      document.getElementById('confirm-qr-paid').addEventListener('click', () => {
        showMessageBox('Thanh toán thành công! Đơn hàng của bạn đã được xác nhận.');
        // Xóa giỏ hàng sau khi đặt hàng thành công
        localStorage.removeItem('cart');
        localStorage.removeItem('selectedForPayment');
        localStorage.removeItem('totalAmountForPayment');
      });
    });