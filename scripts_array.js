// Criando uma lista a partir dos dados de input.
const arrayItens = []
function addItenstoArray() {
  let qtty = Number(document.getElementById("input_qtty").value)
  let item = document.getElementById("input_item").value
  arrayItens.push(qtty)
  arrayItens.push(item)
  document.getElementById("input_qtty").value = ""
  document.getElementById("input_item").value = ""
}

function printArray() {
  console.log(arrayItens)
}


/* function addItens() {
  let table = document.getElementById('listTable')
  let newRow = table.insertRow(0)
  let cell_qtd = newRow.insertCell(0)
  let cell_itens = newRow.insertCell(1)
  cell_qtd.innerHTML = '02'
  cell_itens.innerHTML = 'Arroz 5kg'
} */
