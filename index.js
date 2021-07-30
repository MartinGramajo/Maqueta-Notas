const formularioNotas = document.getElementById('formulario');
const tituloInput = document.getElementById('inputTitulo');
const comentarioInput = document.getElementById('inputComentario');
const categoriaInput = document.getElementById('inputCategorias');
const notasCard = document.getElementById('cardNotas');
const editarFormNota = document.getElementById('FormularioEditar');
const editarTituloNota = document.getElementById('editarTitulo');
const editarComentarioNota = document.getElementById('editarComentario');
const editarCategoriaNota = document.getElementById('editarCategorias');
const busquedaForm = document.getElementById('formBusqueda');
const alerta = document.getElementById('alertaBusqueda');   
const json = localStorage.getItem('notas');
let notas = JSON.parse(json) || [];
let notaId = '';


function generarID() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

formularioNotas.onsubmit = function (event) {
    event.preventDefault();
    const notasLocal = JSON.parse(localStorage.getItem('notas')) || [];
    const nota = {
        id : generarID(),
        titulo : tituloInput.value,
        comentario : comentarioInput.value,
        categoria : categoriaInput.value,
        registro: Date.now(),
        
    };
    notasLocal.push(nota);
    notas = notasLocal;
    const json = JSON.stringify(notasLocal);
    localStorage.setItem('notas', json);
    const myModal = document.getElementById('notaModal');
    const modal =  bootstrap.Modal.getInstance(myModal);
    modal.hide();
    mostrarNotas();
    formularioNotas.reset()
}

//funcion para mostrar las notas en la pantalla. 
function mostrarNotas() {
    const notasMap = notas.map(function (nota) {
        const fecha = new Date(nota.registro);
        return `
        <div class="fondoNota col-md-6 border-1 p-4 mb-2 my-3 bg-dark text-dark m-auto text-center">
            <img class="pincho m-auto" src="./img/pincho.png" alt="">
            <h3 class:"p-4"><i class="fas fa-edit m-1"></i>Titulo: ${nota.titulo}</h3>
            <p class="bodyNota text-break px-2 overflow-auto"> ${nota.comentario}</p>
            <p> Categoria: ${nota.categoria}</p>
            <button onclick="mostrarDetalle('${nota.id}')" class="btn btn-primary btn-sm p-2" data-bs-toggle="modal" data-bs-target="#modalDetalle"> Mostrar Detalles</button> 
            <button onclick="cargarModalEditar('${nota.id}')" type="button" class="btn btn-success btn-sm p-2" data-bs-toggle="modal" data-bs-target="#modalEditar"> Editar </button>
            <button onclick="eliminarNota('${nota.id}')" class="btn btn-danger btn-sm p-2" >Eliminar nota</button>
        </div>
        `;
    } );
    notasCard.innerHTML = notasMap.join('');
    if (notas.length !== 0) {
        alerta.classList.add('d-none');
    }
}
mostrarNotas();

//Funcion para eliminar las nota

function eliminarNota(id) {
    const confirmar = confirm('Confirme para eliminar la nota seleccionada.');
    if (!confirmar) {
        return;
    }
    const notasLocal = JSON.parse(localStorage.getItem('notas')) || [];
    const notasFiltradas = notasLocal.filter((nota) => nota.id !== id);
    const json = JSON.stringify(notasFiltradas); 
    localStorage.setItem('notas', json); 
    notas = notasFiltradas;
    mostrarNotas();
    };

//Funcion para mostrar el detalle de cada nota ( fecha)
function mostrarDetalle(id) {
    const notaEncontrada = notas.find((nota) => nota.id === id);
    const NotaDetalle = document.getElementById('detalleNota');
    const fecha = new Date(notaEncontrada.registro);
    const detallesNota = `
        <p> Fecha del registro: ${fecha.toLocaleString()}</p>
    `;
    NotaDetalle.innerHTML = detallesNota;
}

// funcion para editar la nota
function cargarModalEditar(id) {
    const notaEncontrada = notas.find((nota) => nota.id === id);
    editarTituloNota.value = notaEncontrada.titulo;
    editarComentarioNota.value = notaEncontrada.comentario;
    editarCategoriaNota.value = notaEncontrada.categoria;
    notaId = notaEncontrada.id;
}

editarFormNota.onsubmit = function editarUsuario(event) {
    event.preventDefault();
    const notasModificadas = notas.map((nota) => {
        if (nota.id === notaId){
            return {
                ...nota,
                titulo: editarTituloNota.value, 
                comentario: editarComentarioNota.value,
                categoria: editarCategoriaNota.value,
            };
        }
        return nota;
    });

    const json = JSON.stringify(notasModificadas); 
    localStorage.setItem('notas', json); 
    notas = notasModificadas;
    mostrarNotas();
    const myModal = document.getElementById('modalEditar');
    const modal =  bootstrap.Modal.getInstance(myModal);
    modal.hide();
}

// function busqueda de notas
const submitBusqueda = (e) => {
    e.preventDefault();
    const notasLocal = JSON.parse(localStorage.getItem('notas')) || [];
    const busquedaInput = document.getElementById('busqueda');
    const termino = busquedaInput.value.toLowerCase();
    const notasFiltradas = notasLocal.filter((nota) =>
    {
        const tituloEnMinuscula = nota.titulo.toLowerCase();
        return tituloEnMinuscula.includes(termino);
    })
    notas = notasFiltradas;
    mostrarNotas();
    if (notasFiltradas.length === 0) {
        alerta.classList.remove('d-none');
    } else{
        alerta.classList.add('d-none');
    }
}

//funcion para limpiar el historial de busqueda. 
const limpiarFiltro = () => {
    notas = JSON.parse(localStorage.getItem('notas')) || [];
    busquedaForm.reset();
    mostrarNotas();
    const alerta = document.getElementById('alertaBusqueda');
    alerta.classList.add('d-none');
}

mostrarNotas();
busquedaForm.onsubmit = submitBusqueda;
