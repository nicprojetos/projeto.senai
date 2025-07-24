function showPage(id) {
  const sections = document.querySelectorAll('main section');
  sections.forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function registerUser(event) {
  event.preventDefault();
  const user = document.getElementById("regUser").value;
  const pass = document.getElementById("regPass").value;
  localStorage.setItem(user, pass);
  document.getElementById("loginStatus").innerText = "Conta criada com sucesso!";
}

function loginUser(event) {
  event.preventDefault();
  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;
  const storedPass = localStorage.getItem(user);
  if (storedPass && storedPass === pass) {
    document.getElementById("loginStatus").innerText = "Login bem-sucedido!";
    showPage('home');
  } else {
    document.getElementById("loginStatus").innerText = "Usuário ou senha incorretos.";
  }
}

async function sendMessage() {
  const input = document.getElementById("chatInput");
  const output = document.getElementById("chatOutput");
  const userMsg = input.value.trim();
  if (!userMsg) return;
  output.innerHTML += `<p><strong>Você:</strong> ${userMsg}</p>`;
  input.value = "";
  output.scrollTop = output.scrollHeight;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer SUA_API_KEY_AQUI'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMsg }]
      })
    });
    const data = await res.json();
    const botMsg = data.choices?.[0]?.message?.content || "Desculpe, não consegui entender.";
    output.innerHTML += `<p><strong>Bot:</strong> ${botMsg}</p>`;
    output.scrollTop = output.scrollHeight;
  } catch (error) {
    output.innerHTML += `<p><strong>Bot:</strong> Erro ao conectar com o servidor. Tente novamente mais tarde.</p>`;
  }
}
