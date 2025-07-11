// Hàm định dạng tiền tệ
    function formatCurrency(number) {
      return number.toLocaleString('vi-VN') + 'đ';
    }

    // Hàm để lấy giỏ hàng từ localStorage và hợp nhất các sản phẩm trùng lặp
    function getConsolidatedCart() {
      const rawCart = JSON.parse(localStorage.getItem('cart')) || [];
      const consolidatedItems = new Map(); // Sử dụng Map để nhóm sản phẩm theo tên

      rawCart.forEach(item => {
        if (consolidatedItems.has(item.name)) {
          // Nếu sản phẩm đã tồn tại, cập nhật số lượng và đảm bảo giá khớp
          const existingItem = consolidatedItems.get(item.name);
          existingItem.quantity += item.quantity;
        } else {
          // Nếu sản phẩm chưa tồn tại, thêm vào Map
          // Tạo một bản sao để tránh thay đổi trực tiếp đối tượng trong rawCart
          consolidatedItems.set(item.name, { ...item });
        }
      });
      // Chuyển Map thành mảng để dễ dàng hiển thị
      return Array.from(consolidatedItems.values());
    }

    // Hàm cập nhật tổng tiền
    function updateTotal() {
      let total = 0;
      document.querySelectorAll('.item-checkbox:checked').forEach(cb => {
        const row = cb.closest('tr');
        // Lấy giá trị từ data-attributes để đảm bảo đúng kiểu số
        const price = parseFloat(row.querySelector('.subtotal').dataset.price);
        const qty = parseInt(row.querySelector('.subtotal').dataset.qty);
        total += price * qty;
      });
      document.getElementById('total').textContent = formatCurrency(total);
    }

    // Hàm thêm nút xóa riêng lẻ cho từng sản phẩm
    function addDeleteButtons() {
      document.querySelectorAll('#cart-body tr').forEach((row) => {
        // Chỉ thêm nút xóa nếu chưa có và hàng không phải là hàng trống
        if (!row.querySelector('.delete-btn') && !row.classList.contains('empty-cart-row')) {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Xóa';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => {
                const itemName = row.querySelector('.item-checkbox').dataset.itemName; // Lấy tên sản phẩm để xóa
                let rawCart = JSON.parse(localStorage.getItem('cart')) || [];
                // Lọc bỏ tất cả các sản phẩm có tên trùng khớp trong giỏ hàng gốc
                rawCart = rawCart.filter(item => item.name !== itemName);
                localStorage.setItem('cart', JSON.stringify(rawCart));
                refreshCartDisplay(); // Làm mới toàn bộ giỏ hàng
            });
            const tdProduct = row.querySelector('td:nth-child(2)'); // Ô chứa tên sản phẩm
            tdProduct.appendChild(deleteBtn);
        }
      });
    }

    // Hàm hiển thị (render) giỏ hàng
    function refreshCartDisplay() {
      const displayedCart = getConsolidatedCart(); // Lấy giỏ hàng đã hợp nhất để hiển thị
      const tbody = document.getElementById('cart-body');
      tbody.innerHTML = ''; // Xóa nội dung cũ

      if (displayedCart.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.classList.add('empty-cart-row');
        emptyRow.innerHTML = `<td colspan="5" style="text-align: center; padding: 40px;">Giỏ hàng của bạn đang trống.</td>`;
        tbody.appendChild(emptyRow);
      } else {
        displayedCart.forEach((item, index) => {
          const row = document.createElement('tr');
          // Làm sạch giá để đảm bảo là số
          const priceValue = parseFloat(item.price.replace('$', '').replace(',', ''));
          const subtotalValue = priceValue * item.quantity;

          row.innerHTML = `
            <td><input type="checkbox" class="item-checkbox" data-index="${index}" data-item-name="${item.name}"/></td>
            <td>
              <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${item.image || 'https://placehold.co/60x60/F0F0F0/808080?text=Sản+phẩm'}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" />
                <span>${item.name}</span>
              </div>
            </td>
            <td>${item.quantity}</td>
            <td>${formatCurrency(priceValue)}</td>
            <td class="subtotal" data-price="${priceValue}" data-qty="${item.quantity}">${formatCurrency(subtotalValue)}</td>
          `;
          tbody.appendChild(row);
        });
      }

      // Gắn sự kiện cho các checkbox sau khi render lại
      document.querySelectorAll('.item-checkbox').forEach(cb => {
        cb.addEventListener('change', updateTotal);
      });

      // Thêm nút xóa riêng lẻ sau khi render
      addDeleteButtons();
      // Cập nhật tổng tiền ban đầu
      updateTotal();
    }

    document.addEventListener('DOMContentLoaded', () => {
      refreshCartDisplay(); // Hiển thị giỏ hàng khi trang tải

  // Xử lý nút "Chọn tất cả sản phẩm"
      document.getElementById('select-all-items').addEventListener('click', () => {
          const allCheckboxes = document.querySelectorAll('.item-checkbox');
          // Kiểm tra xem tất cả các hộp kiểm đã được chọn chưa
          // Nếu tất cả đã được chọn, hành động kế tiếp sẽ là bỏ chọn tất cả
          const allAreChecked = Array.from(allCheckboxes).every(cb => cb.checked);

          allCheckboxes.forEach(cb => {
              cb.checked = !allAreChecked; // Đảo ngược trạng thái
          });
          updateTotal(); // Cập nhật tổng tiền
      });

  // Xử lý nút "Xóa các sản phẩm đã chọn"
  document.getElementById('delete-selected').addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.item-checkbox:checked');
        if (checkboxes.length === 0) {
            showMessageBox('Vui lòng chọn sản phẩm để xóa.');
            return;
        }

        const itemNamesToDelete = Array.from(checkboxes).map(cb => cb.dataset.itemName);
        let rawCart = JSON.parse(localStorage.getItem('cart')) || [];
        // Lọc bỏ các sản phẩm có tên trùng khớp với các mục đã chọn để xóa
        rawCart = rawCart.filter(item => !itemNamesToDelete.includes(item.name));
        
        localStorage.setItem('cart', JSON.stringify(rawCart));
        refreshCartDisplay();
      });

      // Lắng nghe sự kiện click cho nút "Tiến hành thanh toán"
      document.getElementById('proceed-to-payment').addEventListener('click', () => {
        const totalAmount = document.getElementById('total').textContent;
        
        const selectedItems = Array.from(document.querySelectorAll('.item-checkbox:checked')).map(cb => {
            const row = cb.closest('tr');
            const imageUrl = row.querySelector('img').src; 
            return {
                name: row.querySelector('span').textContent,
                quantity: parseInt(row.querySelector('td:nth-child(3)').textContent),
                price: parseFloat(row.querySelector('.subtotal').dataset.price),
                image: imageUrl
            };
        });

        if (selectedItems.length === 0) {
            showMessageBox('Vui lòng chọn ít nhất một sản phẩm để thanh toán.');
            return;
        }

        console.log('Dữ liệu sản phẩm được chọn để thanh toán:', selectedItems);
        console.log('Tổng tiền để thanh toán:', totalAmount);

        localStorage.setItem('selectedForPayment', JSON.stringify(selectedItems));
        localStorage.setItem('totalAmountForPayment', totalAmount);
        console.log('Dữ liệu đã được lưu vào localStorage.');

        window.location.href = '../Payment/payment.html'; 
      });

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
          });

          modalOverlay.addEventListener('click', (e) => {
              if (e.target === modalOverlay) {
                  document.body.removeChild(modalOverlay);
              }
          });
      }
    });