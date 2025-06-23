document.addEventListener('DOMContentLoaded', () => {
            const passwordInput = document.getElementById('password');
            const togglePassword = document.getElementById('togglePassword');
            const errorMessage = document.getElementById('error-message');

            togglePassword.addEventListener('click', function () {
                // Chuyển đổi giữa type "password" và "text"
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                // Thay đổi icon mắt
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });

            function handleLogin(event) {
                event.preventDefault(); // Ngăn chặn form submit mặc định

                const usernameInput = document.getElementById('username').value;
                const passwordValue = passwordInput.value; // Lấy giá trị từ input

                // Tài khoản và mật khẩu cố định
                const fixedUsername = "user";
                const fixedPassword = "password";

                if (usernameInput === fixedUsername && passwordValue === fixedPassword) {
                    // Đăng nhập thành công
                    sessionStorage.setItem('loggedIn', 'true');
                    window.location.href = '../Landing-scape/landing.html'; // Chuyển hướng về trang landing (đảm bảo đúng đường dẫn)
                } else {
                    // Đăng nhập thất bại
                    errorMessage.textContent = "Tài khoản hoặc mật khẩu không đúng.";
                }
            }

            // Gắn hàm handleLogin vào sự kiện submit của form
            const loginForm = document.querySelector('.login-form');
            loginForm.addEventListener('submit', handleLogin);
        });