function toggleForm() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  loginForm.classList.toggle("hidden");
  registerForm.classList.toggle("hidden");
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  document.getElementById("app").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
  document.getElementById("usernameDisplay").textContent = email.split('@')[0];
  localStorage.setItem("username", email.split('@')[0]);
  loadChat();
}

function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;
  alert(`Usuário ${username} registrado! Verifique seu e-mail (simulado).`);
  toggleForm();
}

function logout() {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

function goToPage(page) {
  const contentArea = document.getElementById("contentArea");
  if (page === "chat") {
    contentArea.innerHTML = `
      <h3>Chat Global</h3>
      <div id="chatBox" style="height: 150px; overflow-y: auto; background: #1c1c1c; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;"></div>
      <input type="text" id="chatInput" placeholder="Digite sua mensagem..." />
      <button onclick="sendMessage()">Enviar</button>
    `;
    loadChat();
  } else if (page === "diary") {
    contentArea.innerHTML = \`
      <h3>Diário Pessoal</h3>
      <textarea rows='6' style='width:100%' placeholder='Escreva seu dia...'></textarea>
    \`;
  } else if (page === "friends") {
    contentArea.innerHTML = "<h3>Amizades</h3><p>👥 Lista de amigos em breve...</p>";
  }
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (message === "") return;
  const username = localStorage.getItem("username") || "Anônimo";
  const messages = JSON.parse(localStorage.getItem("chatMessages") || "[]");
  messages.push({ user: username, text: message });
  localStorage.setItem("chatMessages", JSON.stringify(messages));
  input.value = "";
  loadChat();
}

function loadChat() {
  const chatBox = document.getElementById("chatBox");
  if (!chatBox) return;
  const messages = JSON.parse(localStorage.getItem("chatMessages") || "[]");
  chatBox.innerHTML = messages.map(m => \`<p><strong>\${m.user}:</strong> \${m.text}</p>\`).join("");
  chatBox.scrollTop = chatBox.scrollHeight;
}
