document.addEventListener("DOMContentLoaded", () => {
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActivo"));
  const listaProfesionales = document.getElementById("listaProfesionales");
  const nombreUsuarioPanel = document.getElementById("nombreUsuario");
  const documentoUsuario = document.getElementById("documentoUsuario");
  const correoUsuarioPanel = document.getElementById("correoUsuario");
  const btnCerrar = document.getElementById("btnCerrar");

  const modal = document.getElementById("modalSolicitud");
  const nombreInput = document.querySelector("#modalSolicitud #nombreUsuario");
  const correoInput = document.querySelector("#modalSolicitud #correoUsuario");
  const razonInput = document.getElementById("razon");
  const btnEnviar = document.getElementById("enviarSolicitud");
  const btnCerrarModal = document.getElementById("cerrarModal");
  let correoProfesionalSeleccionado = "";

  // Verificar si hay usuario logueado
  if (!usuarioActual) {
    alert("Debes iniciar sesión primero.");
    window.location.href = "index.html";
    return;
  }

  // Mostrar información del usuario activo en el panel lateral
  nombreUsuarioPanel.textContent = "Nombre: " + usuarioActual.nombre;
  documentoUsuario.textContent = "Documento: " + usuarioActual.documento;
  correoUsuarioPanel.textContent = "Correo: " + usuarioActual.correo;

  // Cargar profesionales registrados
  const profesionales = JSON.parse(localStorage.getItem("profesionales")) || [];

  

  profesionales.forEach((prof) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="../recursos/iconoUsuario.png" alt="foto profesional" />
      <p><strong>Nombre:</strong> ${prof.nombre}</p>
      <p><strong>Profesión:</strong> ${prof.profesion}</p>
      <button class="btn-solicitar" data-correo="${prof.correo}">Solicitar</button>
    `;
    listaProfesionales.appendChild(card);
  });

 // ----------------- FILTRADO (reemplazar handlers previos) -----------------
const inputBuscar = document.getElementById("buscar");
const filtro = document.getElementById("filtro");

// Función que aplica ambos filtros y muestra/oculta cards
function aplicarFiltros() {
  const termino = inputBuscar.value.trim().toLowerCase();
  const profesionSeleccionada = filtro.value.trim().toLowerCase();

  // recorremos todas las cards
  listaProfesionales.querySelectorAll(".card").forEach(card => {
    // seleccionamos los <p> generados: [0] -> nombre, [1] -> profesión
    const pElems = card.querySelectorAll("p");
    const nombreText = (pElems[0]?.textContent || "").toLowerCase();
    const profesionText = (pElems[1]?.textContent || "").toLowerCase();

    const coincideNombre = nombreText.includes(termino);
    const coincideProfesion = profesionSeleccionada === "" || profesionText.includes(profesionSeleccionada);

    // mostrar solo si ambas condiciones se cumplen
    card.style.display = (coincideNombre && coincideProfesion) ? "" : "none";
  });
}

// listeners: buscar en tiempo real y cambio de filtro
inputBuscar.addEventListener("input", aplicarFiltros);
filtro.addEventListener("change", aplicarFiltros);

// ejecutar una vez al cargar para asegurar estado inicial
aplicarFiltros();
// ------------------------------------------------------------


  // Asignar eventos a los botones "Solicitar"
  document.querySelectorAll(".btn-solicitar").forEach(btn => {
    btn.addEventListener("click", () => {
      correoProfesionalSeleccionado = btn.dataset.correo;
      nombreInput.value = usuarioActual.nombre;
      correoInput.value = usuarioActual.correo;
      modal.style.display = "flex";
    });
  });

  // Cerrar modal
  btnCerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
    razonInput.value = "";
  });

  // Enviar solicitud
  btnEnviar.addEventListener("click", () => {
    const razon = razonInput.value.trim();
    if (!razon) {
      alert("Por favor, escribe la razón de la solicitud.");
      return;
    }

    const nuevaSolicitud = {
      usuarioCorreo: usuarioActual.correo,
      usuarioNombre: usuarioActual.nombre,
      profesionalCorreo: correoProfesionalSeleccionado,
      razon,
      fecha: new Date().toLocaleString(),
    };

    const solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
    solicitudes.push(nuevaSolicitud);
    localStorage.setItem("solicitudes", JSON.stringify(solicitudes));

    alert("Solicitud enviada correctamente.");
    modal.style.display = "none";
    razonInput.value = "";
  });

  // Cerrar sesión
  btnCerrar.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
});

