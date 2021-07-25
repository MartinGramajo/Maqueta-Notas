const formularioNotas = document.getElementById('formulario');
const tituloInput = document.getElementById('inputTitulo');
const comentarioInput = document.getElementById('inputComentario');
const categoriaInput = document.getElementById('inputCategorias');
const notasCard = document.getElementById('cardNotas')
const json = localStorage.getItem('notas');
let notas = JSON.parse(json) || [];


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
}

function mostrarNotas() {

    const notasMap = notas.map(function (nota) {
        const fecha = new Date(nota.registro);
        return `
        <div class=" fondoNota col-md-4 border border-dark p-5 mb-2 my-3 bg-dark text-dark m-auto text-center">
            <img class="pincho m-auto" src="./img/pincho.png" alt="">
            <h3 class:"p-4"><i class="fas fa-edit m-1"></i>Titulo: ${nota.titulo}</h3>
            <p class="text-break p-5"> ${nota.comentario}</p>
            <p> Categoria: ${nota.categoria}</p>
            <button onclick="mostrarDetalle('${nota.id}')" class="btn btn-primary btn-sm p-2" data-bs-toggle="modal" data-bs-target="#modalDetalle"> Mostrar Detalles</button> 
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
}