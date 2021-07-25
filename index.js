const formularioNotas = document.getElementById('formulario');
const tituloInput = document.getElementById('inputTitulo');
const comentarioInput = document.getElementById('inputComentario');
const categoriaInput = document.getElementById('inputCategorias');
const notasCard = document.getElementById('cardNotas');
const editarFormNota = document.getElementById('FormularioEditar');
const editarTituloNota = document.getElementById('editarTitulo');
const editarComentarioNota = document.getElementById('editarComentario');
const editarCategoriaNota = document.getElementById('editarCategorias');
const json = localStorage.getItem('notas');
let notas = JSON.parse(json) || [];
let notaId = '';


function generarID() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

formularioNotas.onsubmit = function (event) {
    event.preventDefault();
    const nota = {
        id : generarID(),
        titulo : tituloInput.value,
        comentario : comentarioInput.value,
        categoria : categoriaInput.value,
        registro: Date.now(),
        
    };
    notas.push(nota);
    const json = JSON.stringify(notas);
    localStorage.setItem('notas', json);
    const myModal = document.getElementById('notaModal');
    const modal =  bootstrap.Modal.getInstance(myModal);
    modal.hide();
    mostrarNotas();
    formularioNotas.reset()
}


function mostrarNotas() {
    const notasMap = notas.map(function (nota) {
        const fecha = new Date(nota.registro);
        return `
        <div class=" fondoNota col-md-4 border border-dark p-4 mb-2 my-3 bg-dark text-dark m-auto text-center">
            <img class="pincho m-auto" src="./img/pincho.png" alt="">
            <h3 class:"p-4"><i class="fas fa-edit m-1"></i>Titulo: ${nota.titulo}</h3>
            <p class="text-break p-5"> ${nota.comentario}</p>
            <p> Categoria: ${nota.categoria}</p>
            <button onclick="mostrarDetalle('${nota.id}')" class="btn btn-primary btn-sm p-2" data-bs-toggle="modal" data-bs-target="#modalDetalle"> Mostrar Detalles</button> 
            <button onclick="cargarModalEditar('${nota.id}')" type="button" class="btn btn-success btn-sm p-2" data-bs-toggle="modal" data-bs-target="#modalEditar"> Editar </button>
            <button onclick="eliminarNota('${nota.id}')" class="btn btn-danger btn-sm p-2" >Eliminar nota</button>
        </div>
        `;
    } );
    notasCard.innerHTML = notasMap.join('')
}

mostrarNotas();

function eliminarNota(id) {
    const notasFiltradas = notas.filter((nota) => nota.id !== id);
    const json = JSON.stringify(notasFiltradas); 
    localStorage.setItem('notas', json); 
    notas = notasFiltradas;
    mostrarNotas();
    };

function mostrarDetalle(id) {
    const notaEncontrada = notas.find((nota) => nota.id === id);
    const NotaDetalle = document.getElementById('detalleNota');
    const fecha = new Date(notaEncontrada.registro);
    const detallesNota = `
        <p> Id: ${notaEncontrada.id}</p>
        <p> Fecha del registro: ${fecha.toLocaleString()}</p>
    `;
    NotaDetalle.innerHTML = detallesNota;
}

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