// auth.js - shared authentication module
// state → render → UI → event → state

export function signup({ username, email, password }) {
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

  const alreadyExists = existingUsers.find((user) => user.email === email);
  if (alreadyExists) {
    return { success: false, message: "An account with that email already exists." };
  }

  const newUser = { username, email, password };
  existingUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(existingUsers));

  return { success: true, message: "Account created successfully!" };
}

export function login({ email, password }) {
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

  const matchedUser = existingUsers.find(
    (user) => user.email === email && user.password === password
  );

  if (!matchedUser) {
    return { success: false, message: "Incorrect email or password." };
  }

  // set authenticated user in localStorage (global state)
  localStorage.setItem(
    "currentUser",
    JSON.stringify({ username: matchedUser.username, email: matchedUser.email })
  );

  return { success: true, message: "Login successful!" };
}

export function getCurrentUser() {
  const currentUser = localStorage.getItem("currentUser");
  return currentUser ? JSON.parse(currentUser) : null;
}

export function logout() {
  localStorage.removeItem("currentUser");
}