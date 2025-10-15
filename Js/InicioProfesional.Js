document.addEventListener("DOMContentLoaded", () => {
  // === Leer el profesional que inició sesión ===
  const profesional = JSON.parse(localStorage.getItem("profesionalActivo"));
  const solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
  const listaSolicitudes = document.getElementById("listaSolicitudes");

  // Elementos del panel
  const nombreProfesional = document.getElementById("nombreProfesional");
  const documentoProfesional = document.getElementById("documentoProfesional");
  const profesionProfesional = document.getElementById("profesionProfesional");
  const correoProfesional = document.getElementById("correoProfesional");
  const btnCerrar = document.getElementById("btnCerrar");

  // Si no hay profesional activo, redirigir al login
  if (!profesional) {
    alert("Debes iniciar sesión como profesional primero.");
    window.location.href = "../index.html";
    return;
  }

  // Mostrar datos del profesional en el panel lateral
  nombreProfesional.textContent = "Nombre: " + profesional.nombre;
  documentoProfesional.textContent = "Documento: " + profesional.documento;
  profesionProfesional.textContent = "Profesión: " + (profesional.profesion || "—");
  correoProfesional.textContent = "Correo: " + profesional.correo;

  // === Cargar y mostrar solicitudes ===
  let solicitudesFiltradas = solicitudes.filter(
    (sol) => sol.profesionalCorreo === profesional.correo
  );

  function mostrarSolicitudes(lista) {
    listaSolicitudes.innerHTML = "";

    if (lista.length === 0) {
      listaSolicitudes.innerHTML = "<p>No tienes solicitudes aún.</p>";
      return;
    }

    lista.forEach((sol) => {
      const card = document.createElement("div");
      card.classList.add("card-solicitud");
      card.innerHTML = `
        <img src=".../Recursos/iconoUsuario.png" alt="Usuario" />
        <div class="info-solicitud">
          <p><strong>De:</strong> ${sol.usuarioNombre}</p>
          <p><strong>Correo:</strong> ${sol.usuarioCorreo}</p>
          <p><strong>Razón:</strong> ${sol.razon}</p>
          <p><small><strong>Fecha:</strong> ${sol.fecha}</small></p>
        </div>
      `;
      listaSolicitudes.appendChild(card);
    });
  }

  // Mostrar todas al cargar
  mostrarSolicitudes(solicitudesFiltradas);

  // === 🔍 Filtro de búsqueda por nombre de usuario ===
  const inputBuscar = document.getElementById("buscar");
  const btnBuscar = document.getElementById("btnBuscar");

  function filtrarSolicitudes() {
    const termino = inputBuscar.value.toLowerCase().trim();

    const filtradas = solicitudesFiltradas.filter(sol =>
      sol.usuarioNombre.toLowerCase().includes(termino)
    );

    mostrarSolicitudes(filtradas);
  }

  inputBuscar.addEventListener("input", filtrarSolicitudes);
  btnBuscar.addEventListener("click", filtrarSolicitudes);

  // === Cerrar sesión ===
  btnCerrar.addEventListener("click", () => {
    localStorage.removeItem("profesionalActivo");
    window.location.href = "../index.html";
  });
});
