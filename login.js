const loginBox = document.getElementById("login-box");
const registerBox = document.getElementById("register-box");

const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const createAccountBtn = document.getElementById("create-account-btn");
const backLoginBtn = document.getElementById("back-login-btn");

const loginFeedback = document.getElementById("login-feedback");
const registerFeedback = document.getElementById("register-feedback");

// Show register form
registerBtn.addEventListener("click", () => {
  loginBox.classList.add("hidden");
  registerBox.classList.remove("hidden");
});

// Back to login
backLoginBtn.addEventListener("click", () => {
  registerBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
});

// Create account
createAccountBtn.addEventListener("click", () => {
  const username = document.getElementById("new-username").value;
  const password = document.getElementById("new-password").value;

  if (!username || !password) {
    registerFeedback.textContent = "Please fill all fields!";
    registerFeedback.style.color = "red";
    return;
  }

  if (localStorage.getItem(`user_${username}`)) {
    registerFeedback.textContent = "Username already exists!";
    registerFeedback.style.color = "red";
  } else {
    localStorage.setItem(`user_${username}`, password);
    registerFeedback.textContent = "Account created! You can login now.";
    registerFeedback.style.color = "green";
  }
});

// Login
loginBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const storedPassword = localStorage.getItem(`user_${username}`);

  if (!username || !password) {
    loginFeedback.textContent = "Please fill all fields!";
    loginFeedback.style.color = "red";
  } else if (storedPassword === password) {
    loginFeedback.textContent = "Login successful! Redirecting...";
    loginFeedback.style.color = "green";

    localStorage.setItem("currentUser", username);

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    loginFeedback.textContent = "Invalid username or password!";
    loginFeedback.style.color = "red";
  }
});
