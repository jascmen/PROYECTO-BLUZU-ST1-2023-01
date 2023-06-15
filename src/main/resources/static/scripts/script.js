


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

