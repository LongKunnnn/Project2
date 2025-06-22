// js/authStatus.js (hoặc authStatus.js nếu ở cùng cấp)

document.addEventListener('DOMContentLoaded', () => {
    // Lấy liên kết đăng nhập/đăng xuất bằng ID
    const loginLogoutLink = document.getElementById('loginLogoutLink');

    // Nếu không tìm thấy liên kết này, tức là trang này không cần chức năng này, thoát
    if (!loginLogoutLink) {
        return;
    }

    function updateLoginLogoutLinkStatus() {
        // Kiểm tra trạng thái đăng nhập từ sessionStorage
        if (sessionStorage.getItem('loggedIn') === 'true') {
            // Người dùng đã đăng nhập
            loginLogoutLink.textContent = 'Đăng xuất';
            loginLogoutLink.href = '#'; // Xử lý click Đăng xuất bằng JS
            loginLogoutLink.classList.add('logout-link'); // Thêm class để dễ định kiểu nếu cần
        } else {
            // Người dùng chưa đăng nhập
            loginLogoutLink.textContent = 'Đăng nhập';
            // Đảm bảo đường dẫn này đúng từ vị trí của trang HTML hiện tại đến trang login.html
            // Ví dụ: nếu authStatus.js được nhúng vào landing.html, và login.html ở ../Login/login.html
            loginLogoutLink.href = '../Login/login.html'; // Điều chỉnh đường dẫn này nếu cần
            loginLogoutLink.classList.remove('logout-link');
        }
    }

    // Cập nhật trạng thái khi trang vừa tải
    updateLoginLogoutLinkStatus();

    // Lắng nghe sự kiện click trên liên kết Đăng nhập/Đăng xuất
    loginLogoutLink.addEventListener('click', (event) => {
        // Nếu liên kết đang hiển thị "Đăng xuất" (tức là người dùng đã đăng nhập)
        if (sessionStorage.getItem('loggedIn') === 'true') {
            event.preventDefault(); // Ngăn chặn chuyển hướng mặc định của thẻ <a> (href='#')

            const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất không?");
            if (confirmLogout) {
                sessionStorage.removeItem('loggedIn'); // Xóa trạng thái đăng nhập
                updateLoginLogoutLinkStatus(); // Cập nhật lại giao diện (sẽ hiển thị "Đăng nhập")
                // Tùy chọn: chuyển hướng về trang chủ hoặc trang đăng nhập sau khi đăng xuất
                // window.location.href = 'index.html'; // Hoặc bất kỳ trang nào bạn muốn
            }
        }
        // Nếu đang hiển thị "Đăng nhập", để mặc định link hoạt động (chuyển hướng đến login.html)
    });

    // Lắng nghe sự kiện storage để cập nhật trạng thái nếu thay đổi từ tab khác
    window.addEventListener('storage', (event) => {
        // Lắng nghe thay đổi của 'loggedIn' trong sessionStorage (hoặc localStorage)
        if (event.key === 'loggedIn' || event.key === null) { // event.key === null khi clear() được gọi
            updateLoginLogoutLinkStatus();
        }
    });
});