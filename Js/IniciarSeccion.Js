document.getElementById("btnIngresar").addEventListener("click", iniciarSesion);
document.getElementById("btnVolver").addEventListener("click", () => {
  window.location.href = "../index.html";
});

function iniciarSesion() {
  const correo = document.getElementById("correo").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();

  if (!correo || !contrasena) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // 🔹 Obtener usuarios normales
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(
    (u) => u.correo === correo && u.contrasena === contrasena
  );

  // 🔹 Obtener profesionales
  const profesionales = JSON.parse(localStorage.getItem("profesionales")) || [];
  const profesional = profesionales.find(
    (p) => p.correo === correo && p.contrasena === contrasena
  );

  // 🔹 Validar tipo de cuenta
  if (usuario) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    alert(`Bienvenido ${usuario.nombre}`);
    window.location.href = "../html/InicioUsuario.html";
    return;
  }

  if (profesional) {
    localStorage.setItem("profesionalActivo", JSON.stringify(profesional));
    alert(`Bienvenido profesional ${profesional.nombre}`);
    window.location.href = "../html/InicioProfesional.html";
    return;
  }

  // 🔹 Si no coincide con ninguno
  alert("Correo o contraseña incorrectos.");
}
