$(document).ready(function() {
    obtenerTabla();
    obtenerBarras();
    obtenerGraficoLineal();
    obtenerPastel();
});

async function obtenerTabla(){


    const request = await fetch('api/tablavendidos', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const respuesta = await request.json();

    let listadoHtml = '';
    for (let producto of respuesta) {
        let filaHtml = '<tr><td>'+producto.nombre+'</td><td>' + producto.cantidad+ '</td></tr>';
        listadoHtml += filaHtml;
    }

    document.querySelector('#productos-vendidos tbody').innerHTML = listadoHtml;

}




async function obtenerPastel(){


    const request = await fetch('api/graficopastel', {
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
    const request = await fetch('api/graficolineal', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const respuesta = await request.json();
    const datosVentaMes = [];

    // Recorrer la respuesta y agregar los nombres y cantidades al array de objetos
    for (let i = 0; i < respuesta.length; i++) {
        const mes = respuesta[i].mes;
        const totalVenta = respuesta[i].cantidad;
        const dato = { mes, totalVenta };
        datosVentaMes.push(dato);
    }

    mostrarGraficoLinea(datosVentaMes);
}

async function obtenerBarras(){

    const request = await fetch('api/graficobarras', {
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
        const nombre = respuesta[i].nombre;
        const cantidad = respuesta[i].cantidad;
        const total = respuesta[i].totalVenta;
        const dato = { nombre, cantidad, total };
        datos.push(dato);
    }

    mostrarGraficoBarras(datos);

}


function mostrarGraficoBarras(datos) {
    const nombres = datos.map((dato) => dato.nombre);
    const cantidades = datos.map((dato) => dato.cantidad);
    const totales = datos.map((dato) => dato.total);

    const ctx = document.getElementById('graficoBarras').getContext('2d');
    const grafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombres,
            datasets: [
                {
                    label: 'Cantidad',
                    data: cantidades,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Total',
                    data: totales,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
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
function mostrarGraficoLinea(datosVentaMes) {
    // Extraer los nombres de los meses y las cantidades de ventas en arrays separados
    let meses = datosVentaMes.map(dato => dato.mes);
    let cantidadesVentas = datosVentaMes.map(dato => dato.totalVenta);
    let ctx = document.getElementById('graficoLineal').getContext('2d');

    // Crear un nuevo gráfico lineal con Chart.js
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [{
                label: 'Ventas por mes',
                data: cantidadesVentas,
                borderColor: 'blue',
                backgroundColor: 'transparent'
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

    // Crear una instancia del gráfico de pastel usando la librería de gráficos que prefieras (por ejemplo, Chart.js)
    const ctx = document.getElementById('graficoPastel').getContext('2d');
    const grafico = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categorias,
            datasets: [{
                data: cantidades,
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', /* ... */],
            }]
        },
        options: {
            // Puedes personalizar opciones adicionales del gráfico aquí
        }
    });
}

