const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sDescricao = document.querySelector('#mDescricao')
const sCategoria = document.querySelector('#mCategoria')
const sPeso = document.querySelector('#mPeso')
const sAltura = document.querySelector('#mAltura')
const sLargura = document.querySelector('#mLargura')
const sComprimento = document.querySelector('#mComprimento')
const sEstoque = document.querySelector('#mEstoque')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

let data = new Date();
let dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear(); 
console.log(dataFormatada);
console.log(id);


function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sDescricao.value = itens[index].Descricao
    sCategoria.value = itens[index].Categoria
    sPeso.value = itens[index].Peso
    sAltura.value = itens[index].Altura
    sLargura.value = itens[index].Largura
    sComprimento.value = itens[index].Comprimento
    sEstoque.value = itens[index].Estoque
    id = index
  } else {
    sDescricao.value = '' 
    sCategoria.value = ''
    sPeso.value = ''
    sAltura.value = ''
    sLargura.value = ''
    sComprimento.value = ''
    sEstoque.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${index}</td>
    <td>${item.Descricao}</td>
    <td> ${item.Categoria}</td>
    <td> ${item.Peso}g</td>
    <td> ${item.Altura}cm</td>
    <td> ${item.Largura}cm</td>
    <td> ${item.Comprimento}cm</td>
    <td> ${item.Estoque}un</td>
    <td> ${dataFormatada}</td>
    <td>
        <button class="acao" onclick="deleteItem(${index})">
            <span class="material-symbols-outlined delete">
                delete
            </span>
        </button>
    </td>
    <td>
        <button class="acao" onclick="editItem(${index})">
            <span class="material-symbols-outlined edit">
                edit
            </span>
        </button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sDescricao.value == '' || sCategoria.value == '' || sPeso.value == '' || sAltura.value == ''
        || sLargura.value == '' || sComprimento.value == '' || sEstoque.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].Descricao = sDescricao.value
    itens[id].Categoria = sCategoria.value
    itens[id].Peso = sPeso.value
    itens[id].Altura = sAltura.value
    itens[id].Largura = sLargura.value
    itens[id].Comprimento = sComprimento.value
    itens[id].Estoque = sEstoque.value
  } else {
    itens.push({
    "Descricao": sDescricao.value,
    "Categoria": sCategoria.value,
    "Peso": sPeso.value,
    "Altura": sAltura.value,
    "Largura": sLargura.value,
    "Comprimento": sComprimento.value,
    "Estoque": sEstoque.value,
    "Data Cadastro": data.value
    })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()