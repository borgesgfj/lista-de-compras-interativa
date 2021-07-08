function addRowsAndColumsElements(tableID) {
  const table = document.getElementById(tableID)
  const newRow = table.insertRow(-1)
  const cell_itens = newRow.insertCell(0)
  cell_itens.className = "cItensCell"
  const cell_qtty = newRow.insertCell(1)
  cell_qtty.className = "cQttyCells"
  const cell_delete = newRow.insertCell(2)
  cell_delete.className = "cDeleteCell"
  //Definig elements cell 0 ellements
  let qtty = document.getElementById("input_qtty").value
  cell_qtty.innerHTML = qtty
  //Definig elements cell 1 ellements
  let item = document.getElementById("input_item").value
  cell_itens.innerHTML = item
  document.getElementById("input_qtty").value = ""
  document.getElementById("input_item").value = ""
  //Definig elements cell 2 ellements
  const del_button = document.createElement("button")
  del_button.type = "button"
  del_button.innerHTML = "Excluir Item"
  del_button.onclick = function(){deleteRow(this)}
  cell_delete.appendChild(del_button)
}

function deleteRow(rowToBeDeleted) {
  const indexOfRow = rowToBeDeleted.parentNode.parentNode.rowIndex
  document.getElementById("listTable").deleteRow(indexOfRow)
}
