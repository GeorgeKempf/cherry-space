// ======================================
// CONTROLE DE ESTADO DE EDIÇÃO
// Armazena o índice da anotação em edição
// ======================================
let indiceEditando = null;

// ======================================
// CONTROLE DE NAVEGAÇÃO ENTRE TELAS
// ======================================
function mostrarTela(id) {
    document.querySelectorAll('.tela').forEach(tela => {
        tela.classList.remove('ativa');
    });

    document.getElementById(id).classList.add('ativa');
}

// ======================================
// CONTROLE DO MODAL
// ======================================
function abrirModal() {
    document.getElementById('modal').style.display = 'flex';

    // Limpa o campo apenas se não estiver editando
    if (indiceEditando === null) {
        document.getElementById('textoAnotacao').value = '';
    }
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('textoAnotacao').value = '';
    indiceEditando = null;
}

// ======================================
// SALVAR ANOTAÇÃO (CRIAR OU EDITAR)
// ======================================
function salvarAnotacao() {
    const texto = document.getElementById('textoAnotacao').value.trim();
    if (!texto) return;

    let anotacoes = JSON.parse(localStorage.getItem('cherries')) || [];

    if (indiceEditando !== null) {
        // Atualiza anotação existente
        anotacoes[indiceEditando] = texto;
        indiceEditando = null;
    } else {
        // Cria nova anotação
        anotacoes.push(texto);
    }

    localStorage.setItem('cherries', JSON.stringify(anotacoes));

    fecharModal();
    carregarAnotacoes();
    mostrarTela('space');
}

// ======================================
// CARREGAR ANOTAÇÕES DO LOCALSTORAGE
// ======================================
function carregarAnotacoes() {
    const lista = document.getElementById('listaAnotacoes');
    lista.innerHTML = '';

    const anotacoes = JSON.parse(localStorage.getItem('cherries')) || [];

    anotacoes.forEach((texto, index) => {
        const card = document.createElement('div');
        card.className = 'anotacao';
        card.innerText = texto;

        // Clique exibe opções da anotação
        card.addEventListener('click', () => {
            mostrarOpcoes(card, index);
        });

        lista.appendChild(card);
    });
}

// ======================================
// EXIBIR OPÇÕES (EDITAR / EXCLUIR)
// ======================================
function mostrarOpcoes(elemento, index) {
    document.querySelectorAll('.opcoes').forEach(op => op.remove());

    const opcoes = document.createElement('div');
    opcoes.className = 'opcoes';

    const btnEditar = document.createElement('button');
    btnEditar.innerText = 'Editar';
    btnEditar.onclick = (e) => {
        e.stopPropagation();
        editarAnotacao(index);
    };

    const btnExcluir = document.createElement('button');
    btnExcluir.innerText = 'Excluir';
    btnExcluir.onclick = (e) => {
        e.stopPropagation();
        excluirAnotacao(index);
    };

    opcoes.appendChild(btnEditar);
    opcoes.appendChild(btnExcluir);
    elemento.appendChild(opcoes);
}

// ======================================
// EDITAR ANOTAÇÃO
// ======================================
function editarAnotacao(index) {
    const anotacoes = JSON.parse(localStorage.getItem('cherries')) || [];

    document.getElementById('textoAnotacao').value = anotacoes[index];
    indiceEditando = index;

    abrirModal();
}

// ======================================
// EXCLUIR ANOTAÇÃO
// ======================================
function excluirAnotacao(index) {
    let anotacoes = JSON.parse(localStorage.getItem('cherries')) || [];

    anotacoes.splice(index, 1);
    localStorage.setItem('cherries', JSON.stringify(anotacoes));

    carregarAnotacoes();
}

// ======================================
// INICIALIZAÇÃO
// ======================================
carregarAnotacoes();
