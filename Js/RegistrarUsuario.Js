document.getElementById("btnRegistrar").addEventListener("click", registrarUsuario);

function registrarUsuario() {
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const documento = document.getElementById("documento").value.trim();
  const tipoDocumento = document.getElementById("tipoDocumento").value;
  const contrasena = document.getElementById("contrasena").value;
  const confirmarContrasena = document.getElementById("confirmarContrasena").value;

  if (!nombre || !correo || !documento || !tipoDocumento || !contrasena || !confirmarContrasena) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  if (contrasena !== confirmarContrasena) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  const usuario = {
    nombre,
    correo,
    documento,
    tipoDocumento,
    contrasena,
    foto: "../Recursos/iconoUsuario.png"
  };

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("¡Registro exitoso!");
  window.location.href = "../html/IniciarSeccion.html";
}

function volver() {
  window.location.href = "../index.html";
}
