
// $(document).ready(function () {
//   $("#principal").load("inicio.html");

//   $("#dashboard-inicio").click(function (event) {
//     event.preventDefault();
//     cargarPagina("inicio");
//   });

//   $("#opcion-empleados").click(function (event) {
//     event.preventDefault();
//     cargarPagina("empleados");
//   });

//   $("#opcion-productos").click(function (event) {
//     event.preventDefault();
//     cargarPagina("productos");
//   });

//   $("#opcion-categorias").click(function (event) {
//     event.preventDefault();
//     cargarPagina("categorias");
//   });

//   $("#opcion-proveedores").click(function (event) {
//     event.preventDefault();
//     cargarPagina("proveedores");
//   });

//   $("#opcion-servicios").click(function (event) {
//     event.preventDefault();
//     cargarPagina("servicios");
//   });

//   // Capturar el evento de cambio de hash
//   $(window).on("hashchange", function () {
//     var hash = window.location.hash.substring(1);
//     cargarPagina(hash);
//   });

//   // Función para cargar la página correspondiente al hash
//   function cargarPagina(pagina) {
//     $("#principal").load(pagina + ".html");
//   }
// });



  let bodito = document.querySelector("body"),
    modeToggle = bodito.querySelector(".mode-toggle"),
    sidebar = bodito.querySelector("nav"),
    sidebarToggle = bodito.querySelector(".sidebar-toggle");

  let getMode = localStorage.getItem("mode");
  if (getMode && getMode === "dark") {
    bodito.classList.toggle("dark");
  }

  let getStatus = localStorage.getItem("status");
  if (getStatus && getStatus === "close") {
    sidebar.classList.toggle("close");
  }

  modeToggle.addEventListener("click", () => {
    bodito.classList.toggle("dark");
    if (bodito.classList.contains("dark")) {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
    }
  });

  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
      localStorage.setItem("status", "close");
    } else {
      localStorage.setItem("status", "open");
    }
  });

