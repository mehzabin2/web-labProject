const email = document.getElementById('email');
const password = document.getElementById('password');
const loginbtn = document.getElementById('loginbtn');
const message = document.getElementById('message');



loginbtn.addEventListener('click', async () => {
  const emailvalue = email.value.trim();
  const passvalue = password.value.trim();

  // Clear previous errors
  

  message.textContent = '';
  message.style.color = 'red';

  let hasError = false;

  // Validate inputs
  if (!emailvalue) {
    errorSpans[0].textContent = 'Email is required';
    hasError = true;
  }
  if (!passvalue) {
    errorSpans[1].textContent = 'Password is required';
    hasError = true;
  }

  if (hasError) return;

  // Send request to server
  let res, data;
  try {
    res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: emailvalue, password: passvalue })
    });

    data = await res.json();
  } catch (err) {
    message.textContent = 'Server error: invalid response';
    return;
  }

  // Handle response
  if (res.status === 200) {
    message.style.color = 'green';
    message.textContent = `Welcome back, ${data.user.name || 'User'}!`;
    window.location.href="index.html";
    email.value = '';
    password.value = '';
  } else {
    message.textContent = data.message || 'Login failed';
  }
});
