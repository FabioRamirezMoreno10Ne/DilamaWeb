document.getElementById("btnRegistrar").addEventListener("click", registrarProfesional);
document.getElementById("btnVolver").addEventListener("click", () => {
  window.location.href = "../index.html";
});

function registrarProfesional() {
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const documento = document.getElementById("documento").value.trim();
  const tipo = document.getElementById("tipo").value.trim();
  const profesion = document.getElementById("profesion").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();
  const validar = document.getElementById("validar").value.trim();

  if (!nombre || !correo || !documento || !tipo || !profesion || !contrasena || !validar) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  if (contrasena !== validar) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  const nuevoProfesional = {
    nombre,
    correo,
    documento,
    tipo,
    profesion,
    contrasena,
    foto: "../Recursos/iconoProfesional.png"
  };

  const profesionales = JSON.parse(localStorage.getItem("profesionales")) || [];
  const existe = profesionales.some(p => p.correo === correo);

  if (existe) {
    alert("Ya existe un profesional registrado con este correo.");
    return;
  }

  profesionales.push(nuevoProfesional);
  localStorage.setItem("profesionales", JSON.stringify(profesionales));

  alert("Registro exitoso. Ahora puedes iniciar sesión.");
  window.location.href = "../html/IniciarSeccion.html";
}
