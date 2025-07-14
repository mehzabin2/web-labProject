const name1 = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const savebtn = document.getElementById('button');

savebtn.addEventListener('click', async () => {
  const nameVal = name1.value.trim();
  const emailVal = email.value.trim();
  const passVal = password.value.trim();

  const errorSpans = document.querySelectorAll('.error');
  errorSpans.forEach(span => {
    span.textContent = '';
    span.style.color = 'red';
  });

  let hasError = false;

  if (!nameVal) {
    errorSpans[0].textContent = 'Name is required';
    hasError = true;
  }
  if (!emailVal) {
    errorSpans[1].textContent = 'Email is required';
    hasError = true;
  }
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  if (!passVal) {
    errorSpans[2].textContent = 'Password is required';
    hasError = true;
  }else if (!passwordRegex.test(passVal)){
    errorSpans[2].textContent = 'Password must have 8 characters, one uppercase, one lowercase, one special character';
    hasError = true;
  }

  if (hasError) return;

  await fetch('/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameVal,
      email: emailVal,
      password: passVal
    })
  });

  // Clear form
  name1.value = '';
  email.value = '';
  password.value = '';
});
