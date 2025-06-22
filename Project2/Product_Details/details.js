// ----- SẢN PHẨM ĐẦU TIÊN -----
  const firstProductSection = document.querySelector('.copy');
  const productName = firstProductSection.querySelector('.product-name').textContent.trim();
  const productPrice = firstProductSection.querySelector('.price').textContent.trim();
  const productImage = document.querySelector('.image').getAttribute('src');

  // Tạo controls nếu chưa có
  const controlDiv1 = document.createElement('div');
  controlDiv1.className = 'quantity-control';
  controlDiv1.innerHTML = `
    <button class="quantity-btn decrease">-</button>
    <input type="number" class="quantity" value="1" min="1" style="width: 40px; text-align: center;" />
    <button class="quantity-btn increase">+</button>
    <button class="button add-to-cart" style="margin-left: 10px; padding: 8px 16px; border-radius: 6px; color: white; background-color: black;">Thêm vào giỏ</button>
  `;
  firstProductSection.appendChild(controlDiv1);

  // Tăng/giảm sản phẩm đầu
  const qtyInput1 = controlDiv1.querySelector('.quantity');
  controlDiv1.querySelector('.increase').addEventListener('click', () => {
    qtyInput1.value = parseInt(qtyInput1.value) + 1;
  });
  controlDiv1.querySelector('.decrease').addEventListener('click', () => {
    qtyInput1.value = Math.max(1, parseInt(qtyInput1.value) - 1);
  });
  controlDiv1.querySelector('.add-to-cart').addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price: productPrice, quantity: parseInt(qtyInput1.value), image: productImage });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Đã thêm "${productName}" vào giỏ hàng`);
    qtyInput1.value = 1;
  });

  // ----- CÁC SẢN PHẨM .card -----
  document.querySelectorAll('.card').forEach((card) => {
    const name = card.querySelector('.product').textContent.trim();
    const price = card.querySelector('div[class^="_"]').textContent.trim();
    const image = card.querySelector('img').getAttribute('src');

    const controlDiv = document.createElement('div');
    controlDiv.className = 'quantity-control';
    controlDiv.innerHTML = `
      <button class="quantity-btn decrease">-</button>
      <input type="number" class="quantity" value="1" min="1" style="width: 40px; text-align: center;" />
      <button class="quantity-btn increase">+</button>
      <button class="button add-to-cart" style="margin-left: 10px; padding: 8px 16px; border-radius: 6px; color: white; background-color: black;">Thêm vào giỏ</button>
    `;
    card.appendChild(controlDiv);

    const qtyInput = controlDiv.querySelector('.quantity');
    controlDiv.querySelector('.increase').addEventListener('click', () => {
      qtyInput.value = parseInt(qtyInput.value) + 1;
    });
    controlDiv.querySelector('.decrease').addEventListener('click', () => {
      qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
    });
    controlDiv.querySelector('.add-to-cart').addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ name, price, quantity: parseInt(qtyInput.value), image });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`Đã thêm "${name}" vào giỏ hàng`);
      qtyInput.value = 1;
    });
  });