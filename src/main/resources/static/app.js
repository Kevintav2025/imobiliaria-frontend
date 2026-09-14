const API_URL = '/api/clientes';

const form = document.getElementById('cliente-form');
const tabelaBody = document.getElementById('tabela-clientes');
const formTitle = document.getElementById('form-title');
const btnSalvar = document.getElementById('btn-salvar');
const btnCancelar = document.getElementById('btn-cancelar');

document.addEventListener('DOMContentLoaded', carregarClientes);

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('cliente-id').value;
    const clienteData = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        tipoInteresse: document.getElementById('tipoInteresse').value,
        statusAtendimento: document.getElementById('statusAtendimento').value,
        perfilImovel: document.getElementById('perfilImovel').value,
        anotacoes: document.getElementById('anotacoes').value
    };

    if (id) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clienteData)
        });
    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clienteData)
        });
    }

    limparFormulario();
    carregarClientes();
});

async function carregarClientes() {
    const res = await fetch(API_URL);
    const clientes = await res.json();

    tabelaBody.innerHTML = '';
    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${cliente.nome}</strong><br><small>${cliente.email || ''}</small></td>
            <td>${cliente.telefone}</td>
            <td>${cliente.tipoInteresse || '-'}</td>
            <td>${cliente.perfilImovel || '-'}</td>
            <td><span class="badge ${getBadgeClass(cliente.statusAtendimento)}">${cliente.statusAtendimento || 'Novo'}</span></td>
            <td>
                <button class="btn btn-sm btn-edit" onclick="prepararEdicao(${cliente.id})">Editar</button>
                <button class="btn btn-sm btn-delete" onclick="deletarCliente(${cliente.id})">Excluir</button>
            </td>
        `;
        tabelaBody.appendChild(tr);
    });
}

async function prepararEdicao(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const cliente = await res.json();

    document.getElementById('cliente-id').value = cliente.id;
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('telefone').value = cliente.telefone;
    document.getElementById('email').value = cliente.email || '';
    document.getElementById('tipoInteresse').value = cliente.tipoInteresse || 'Compra';
    document.getElementById('statusAtendimento').value = cliente.statusAtendimento || 'Novo';
    document.getElementById('perfilImovel').value = cliente.perfilImovel || '';
    document.getElementById('anotacoes').value = cliente.anotacoes || '';

    formTitle.textContent = 'Editar Cliente';
    btnSalvar.textContent = 'Atualizar Cliente';
    btnCancelar.style.display = 'inline-block';
}

async function deletarCliente(id) {
    if (confirm('Deseja realmente excluir este cliente?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        carregarClientes();
    }
}

btnCancelar.addEventListener('click', limparFormulario);

function limparFormulario() {
    document.getElementById('cliente-id').value = '';
    form.reset();
    formTitle.textContent = 'Cadastrar Novo Cliente';
    btnSalvar.textContent = 'Salvar Cliente';
    btnCancelar.style.display = 'none';
}

function getBadgeClass(status) {
    switch (status) {
        case 'Em Negociação': return 'badge-negociacao';
        case 'Visita Agendada': return 'badge-visita';
        case 'Fechado': return 'badge-fechado';
        default: return 'badge-novo';
    }
}