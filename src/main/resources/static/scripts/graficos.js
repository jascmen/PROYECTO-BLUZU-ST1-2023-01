$(document).ready(function() {

    // Obtener la fecha del mes actual
    const today = moment();
    const startDate = today.startOf('month').format('YYYY-MM-DD');
    const endDate = today.endOf('month').format('YYYY-MM-DD');

    $('#date-range').daterangepicker({
        startDate: startDate,
        endDate: endDate,
        locale: {
            format: 'YYYY-MM-DD'
        }
    });

    // Manejar el evento de aplicar
    $('#apply-btn').click(function() {
        obtenerTabla();
        obtenerPastel();
        obtenerGraficoLineal();
        obtenerBarras();

    });

    // Obtener la tabla y los gráficos al cargar la página
    obtenerTabla();
    obtenerPastel();
    obtenerGraficoLineal();
    obtenerBarras();

});



async function obtenerTabla() {

    const startDate = $('#date-range').data('daterangepicker').startDate.format('YYYY-MM-DD');
    const endDate = $('#date-range').data('daterangepicker').endDate.format('YYYY-MM-DD');

    const url = `api/tablavendidos?startDate=${startDate}&endDate=${endDate}`;

    const request = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const respuesta = await request.json();

    let listadoHtml = '';
    for (let producto of respuesta) {
        let filaHtml = '<tr><td>' + producto.nombre + '</td><td>' + producto.cantidad + '</td></tr>';
        listadoHtml += filaHtml;
    }

    document.querySelector('#productos-vendidos tbody').innerHTML = listadoHtml;
}





async function obtenerPastel(){

    const startDate = $('#date-range').data('daterangepicker').startDate.format('YYYY-MM-DD');
    const endDate = $('#date-range').data('daterangepicker').endDate.format('YYYY-MM-DD');

    const url = `api/graficopastel?startDate=${startDate}&endDate=${endDate}`;

    const request = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const respuesta = await request.json();
    const datos = [];

// Recorrer la respuesta y agregar los nombres y cantidades al array de objetos
    for (let i = 0; i < respuesta.length; i++) {
        const nombre = respuesta[i].categoria;
        const cantidad = respuesta[i].cantidad;
        const dato = { nombre, cantidad };
        datos.push(dato);
    }

    mostrarGraficoPastel(datos);

}


async function obtenerGraficoLineal() {

    const startDate = $('#date-range').data('daterangepicker').startDate.format('YYYY-MM-DD');
    const endDate = $('#date-range').data('daterangepicker').endDate.format('YYYY-MM-DD');

    const url = `api/graficolineal?startDate=${startDate}&endDate=${endDate}`;

    const request = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const respuesta = await request.json();
    const datosSemanas = [];

    // Recorrer la respuesta y agregar los nombres y cantidades al array de objetos
    for (let i = 0; i < respuesta.length; i++) {
        const semana = respuesta[i].semana;
        const totalVenta = respuesta[i].cantidad;
        const datoSemana = { semana, totalVenta };
        datosSemanas.push(datoSemana);
    }

    mostrarGraficoLinea(datosSemanas);
}

async function obtenerBarras(){

    const startDate = $('#date-range').data('daterangepicker').startDate.format('YYYY-MM-DD');
    const endDate = $('#date-range').data('daterangepicker').endDate.format('YYYY-MM-DD');

    const url = `api/graficobarras?startDate=${startDate}&endDate=${endDate}`;

    const request = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const respuesta = await request.json();
    const datos = [];

// Recorrer la respuesta y agregar los nombres y cantidades al array de objetos
    for (let i = 0; i < respuesta.length; i++) {
        const nombre = respuesta[i].categoria;
        const total = respuesta[i].totalVenta;
        const dato = { nombre, total };
        datos.push(dato);
    }

    mostrarGraficoBarras(datos);

}

let graficoPastel;
let graficoLineas;
let graficoBarras;

function generarColorAleatorio() {
    // Generar valores aleatorios para los componentes RGB
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Construir el color en formato RGB
    const color = `rgb(${r}, ${g}, ${b})`;

    return color;
}

function mostrarGraficoBarras(datos) {
    const nombres = datos.map((dato) => dato.nombre);
    const totales = datos.map((dato) => dato.total);

    const colores = [];
    for (let i = 0; i < nombres.length; i++) {
        const color = generarColorAleatorio();
        colores.push(color);
    }

    // Destruir el gráfico anterior si existe
    if (graficoBarras) {
        graficoBarras.destroy();
    }

    const ctx = document.getElementById('graficoBarras').getContext('2d');
    graficoBarras = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombres,
            datasets: [
                {
                    label: 'Total',
                    data: totales,
                    backgroundColor: colores,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}



// Función para mostrar el gráfico lineal
function mostrarGraficoLinea(datosSemanas) {
    // Extraer los nombres de los meses y las cantidades de ventas en arrays separados
    let semanas = datosSemanas.map(datoSemana => datoSemana.semana);
    let cantidadesVentas = datosSemanas.map(datoSemana => datoSemana.totalVenta);
    let ctx = document.getElementById('graficoLineal').getContext('2d');

    // Destruir el gráfico anterior si existe
    if (graficoLineas) {
        graficoLineas.destroy();
    }

    // Generar colores aleatorios para cada elemento
    const colores = [];
    for (let i = 0; i < semanas.length; i++) {
        const color = generarColorAleatorio();
        colores.push(color);
    }

    // Crear un nuevo gráfico lineal con Chart.js
    graficoLineas =new Chart(ctx, {
        type: 'line',
        data: {
            labels: semanas,
            datasets: [{
                label: 'Ingresos obtenidos',
                data: cantidadesVentas,
                borderColor: 'blue',
                backgroundColor: colores
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function mostrarGraficoPastel(datos) {
    // Obtener los nombres de las categorías y las cantidades de ventas
    const categorias = datos.map(dato => dato.nombre);
    const cantidades = datos.map(dato => dato.cantidad);

    // Generar colores aleatorios para cada elemento
    const colores = [];
    for (let i = 0; i < categorias.length; i++) {
        const color = generarColorAleatorio();
        colores.push(color);
    }

    // Destruir el gráfico anterior si existe
    if (graficoPastel) {
        graficoPastel.destroy();
    }

    // Crear una instancia del gráfico de pastel utilizando colores aleatorios
    const ctx = document.getElementById('graficoPastel').getContext('2d');
    graficoPastel = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categorias,
            datasets: [{
                data: cantidades,
                backgroundColor: colores,
            }]
        },
        options: {
            // Puedes personalizar opciones adicionales del gráfico aquí
        }
    });
}
$('#export-excel-btn-tabla').click(function() {
    reporteTablaExcel();
});

$('#export-pdf-btn-tabla').click(function() {
    reporteTablaPDF();
});

$('#export-excel-btn-pastel').click(function() {
   reportePastelExcel();
});

$('#export-pdf-btn-pastel').click(function() {
    reportePastelPDF();

});

$('#export-excel-btn-barras').click(function() {
    reporteBarrasExcel();
});

$('#export-pdf-btn-barras').click(function() {
    reporteBarrasPDF();

});

$('#export-excel-btn-lineas').click(function() {
   reporteLineasExcel();
});

$('#export-pdf-btn-lineas').click(function() {
    reporteLineasPDF();

});

async function reporteTablaPDF() {
    const startDate = $('#date-range').data('daterangepicker').startDate.format('YYYY-MM-DD');
    const endDate = $('#date-range').data('daterangepicker').endDate.format('YYYY-MM-DD');

    const url = `api/reporteTablasPDF?startDate=${startDate}&endDate=${endDate}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/pdf'
        },
        responseType: 'blob' // Indicar que se espera una respuesta de tipo Blob (archivo)
    });

    const blob = await response.blob();

    // Opción 1: Descargar el archivo
    const urlBlob = URL.createObjectURL(blob);
    const fileName = 'reporte.pdf'; // Nombre del archivo

    const link = document.createElement('a');
    link.href = urlBlob;
    link.target = '_blank';
    link.download = fileName; // Establecer el nombre del archivo para descargar
    link.click();

    // Opción 2: Abrir en una nueva ventana o pestaña
    //window.open(urlBlob, '_blank');
}

async function reporteTablaExcel() {
    const startDate = $('#date-range').data('daterangepicker').startDate.format('YYYY-MM-DD');
    const endDate = $('#date-range').data('daterangepicker').endDate.format('YYYY-MM-DD');

    const url = `api/reporteTablasExcel?startDate=${startDate}&endDate=${endDate}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/octet-stream' // Cambiar el tipo MIME a application/octet-stream para indicar que se espera un archivo binario
        },
        responseType: 'blob' // Indicar que se espera una respuesta de tipo Blob (archivo)
    });

    const blob = await response.blob();

    // Opción 1: Descargar el archivo
    const urll = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = urll;
    link.download = 'reporte.xlsx'; // Cambiar la extensión del archivo a .xlsx
    link.click();
}

async function reportePastelPDF() {
    const startDate = $('#date-range').data('daterangepicker').startDate.format('YYYY-MM-DD');
    const endDate = $('#date-range').data('daterangepicker').endDate.format('YYYY-MM-DD');

    const url = `api/reportePastelPDF?startDate=${startDate}&endDate=${endDate}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/pdf'
        },
        responseType: 'blob' // Indicar que se espera una respuesta de tipo Blob (archivo)
    });

    const blob = await response.blob();

    // Opción 1: Descargar el archivo
    const urlBlob = URL.createObjectURL(blob);
    const fileName = 'reporte.pdf'; // Nombre del archivo

    const link = document.createElement('a');
    link.href = urlBlob;
    link.target = '_blank';
    link.download = fileName; // Establecer el nombre del archivo para descargar
    link.click();

}

async function reportePastelExcel() {
    const startDate = $('#date-range').data('daterangepicker').startDate.format('YYYY-MM-DD');
    const endDate = $('#date-range').data('daterangepicker').endDate.format('YYYY-MM-DD');

    const url = `api/reportePastelExcel?startDate=${startDate}&endDate=${endDate}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/octet-stream' // Cambiar el tipo MIME a application/octet-stream para indicar que se espera un archivo binario
        },
        responseType: 'blob' // Indicar que se espera una respuesta de tipo Blob (archivo)
    });

    const blob = await response.blob();

    // Opción 1: Descargar el archivo
    const urll = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = urll;
    link.download = 'reporte.xlsx'; // Cambiar la extensión del archivo a .xlsx
    link.click();
}

async function reporteBarrasPDF() {
    const startDate = $('#date-range').data('daterangepicker').startDate.format('YYYY-MM-DD');
    const endDate = $('#date-range').data('daterangepicker').endDate.format('YYYY-MM-DD');

    const url = `api/reporteBarrasPDF?startDate=${startDate}&endDate=${endDate}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/pdf'
        },
        responseType: 'blob' // Indicar que se espera una respuesta de tipo Blob (archivo)
    });

    const blob = await response.blob();

    // Opción 1: Descargar el archivo
    const urlBlob = URL.createObjectURL(blob);
    const fileName = 'reporte.pdf'; // Nombre del archivo

    const link = document.createElement('a');
    link.href = urlBlob;
    link.target = '_blank';
    link.download = fileName; // Establecer el nombre del archivo para descargar
    link.click();

}


async function reporteBarrasExcel() {
    const startDate = $('#date-range').data('daterangepicker').startDate.format('YYYY-MM-DD');
    const endDate = $('#date-range').data('daterangepicker').endDate.format('YYYY-MM-DD');

    const url = `api/reporteBarrasExcel?startDate=${startDate}&endDate=${endDate}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/octet-stream' // Cambiar el tipo MIME a application/octet-stream para indicar que se espera un archivo binario
        },
        responseType: 'blob' // Indicar que se espera una respuesta de tipo Blob (archivo)
    });

    const blob = await response.blob();

    // Opción 1: Descargar el archivo
    const urll = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = urll;
    link.download = 'reporte.xlsx'; // Cambiar la extensión del archivo a .xlsx
    link.click();
}

async function reporteLineasPDF() {
    const startDate = $('#date-range').data('daterangepicker').startDate.format('YYYY-MM-DD');
    const endDate = $('#date-range').data('daterangepicker').endDate.format('YYYY-MM-DD');

    const url = `api/reporteLineasPDF?startDate=${startDate}&endDate=${endDate}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/pdf'
        },
        responseType: 'blob' // Indicar que se espera una respuesta de tipo Blob (archivo)
    });

    const blob = await response.blob();

    // Opción 1: Descargar el archivo
    const urlBlob = URL.createObjectURL(blob);
    const fileName = 'reporte.pdf'; // Nombre del archivo

    const link = document.createElement('a');
    link.href = urlBlob;
    link.target = '_blank';
    link.download = fileName; // Establecer el nombre del archivo para descargar
    link.click();

}

async function reporteLineasExcel() {
    const startDate = $('#date-range').data('daterangepicker').startDate.format('YYYY-MM-DD');
    const endDate = $('#date-range').data('daterangepicker').endDate.format('YYYY-MM-DD');

    const url = `api/reporteLineasExcel?startDate=${startDate}&endDate=${endDate}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/octet-stream' // Cambiar el tipo MIME a application/octet-stream para indicar que se espera un archivo binario
        },
        responseType: 'blob' // Indicar que se espera una respuesta de tipo Blob (archivo)
    });

    const blob = await response.blob();

    // Opción 1: Descargar el archivo
    const urll = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = urll;
    link.download = 'reporte.xlsx'; // Cambiar la extensión del archivo a .xlsx
    link.click();
}