//Creamos un array para guardar los datos del formulario
let gastos = [];

//Obtenemos los valores mediante variables del DOM
const formulario = document.getElementById('formulario');
const listaGastos = document.getElementById('listaGastos');
const totalGastado = document.getElementById('totalGastado');
const filtroCategoria = document.getElementById('filtroCategoria');

//Enviar los valores ingresados al formulario a la lista de gastos
formulario.addEventListener('submit', agregarGastos);

//Agregamos los gastos que recibimos del formularia al array gastos
function agregarGastos(event){
    event.preventDefault();

    const descripcion = document.getElementById('descripcion').value;
    const monto = parseInt(document.getElementById('monto').value);
    const categoria = document.getElementById('categoria').value;

    if(isNaN(monto) || monto <= 0){
        alert("Valor no valido, Porfavor digitar un monto superior a cero ");
        return
    }

    //Creamos un objeto que contenga los valores del formulario
    const gasto = {
        id: Date.now(),
        descripcion,
        monto,
        categoria
    };

    //Enviamos el objeto al array
    gastos.push(gasto);

    //Limpiamos el formulario
    formulario.reset();

    //actualizamos la lista de gastos
    actualizarListaGastos();

    //actualizamos la lista de totales
    actualizarTotalGastos();
}

//Funcion para actualizar la lista de gastos
function actualizarListaGastos(){
    //limpiamos la lista de gastos
    listaGastos.innerHTML = "";

    //Obtener la categoria que ha sido filtrada
    const categoriaFiltro = filtroCategoria.value;

    //Filtro para la lista de gastos ya sea total o por categoria
    const gastosFiltrados = categoriaFiltro === "todas"
    ? gastos
    : gastos.filter( gasto => gasto.categoria === categoriaFiltro );

    //Mostrar los gastos en la lista
    gastosFiltrados.forEach(gasto => {
        const li = document.createElement('li');
        li.innerHTML = 
            `<span> ${gasto.descripcion} / ${moneda(gasto.monto)} / ${gasto.categoria} </span>
            <button onclick="eliminarGasto(${gasto.id})" > Eliminar </button>`;
        listaGastos.appendChild(li);
    }
    );
}

//Funcion para darle el simbolo monetario al monto y que tenga sus separadores de mil
function moneda(gasto){
    return gasto.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimunFractionDigits: 0,
        maximumFractionDigits: 0
    })
}

//Funcion para eliminar un gasto
function eliminarGasto(id){
    gastos = gastos.filter( gasto => gasto.id !== id);
    actualizarListaGastos();
    actualizarTotalGastos();
}

//Funcion para actualizar el total de gastos
function actualizarTotalGastos(){
    const total = gastos.reduce((sum, gasto) => sum + gasto.monto, 0);
    totalGastado.innerHTML = moneda(total);
}

//Evento filtrar por categoria
filtroCategoria.addEventListener("change", actualizarListaGastos);

//Inicializamos las funciones
actualizarListaGastos();
actualizarTotalGastos();