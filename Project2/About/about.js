function handleSubmit() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const yourMessage = document.getElementById('yourMessage').value;

    if (firstName && lastName && emailAddress && yourMessage) {
      alert('Yêu cầu hỗ trợ thành công!');
      // Xóa nội dung các trường sau khi gửi thành công
      document.getElementById('firstName').value = '';
      document.getElementById('lastName').value = '';
      document.getElementById('emailAddress').value = '';
      document.getElementById('yourMessage').value = '';
    } else {
      alert('Vui lòng điền đầy đủ tất cả các thông tin!');
    }
  }