function addRowsAndColumsElements(tableID) {
  const table = document.getElementById(tableID)
  const newRow = table.tBodies[0].insertRow(-1)
  const cell_itens = newRow.insertCell(0)
  cell_itens.id = "itensCell"
  const cell_qtty = newRow.insertCell(1)
  cell_qtty.className = "align-middle"
  cell_qtty.id = "qttyCells"
  const cell_delete = newRow.insertCell(2)
  cell_delete.id = "deleteCell"
  cell_delete.className = "align-middle"
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
  const del_icon = document.createElement("span")
  del_icon.id = "delIcon"
  del_icon.className = "bi bi-journal-x"
  del_button.appendChild(del_icon)
  del_button.type = "button"
  del_button.className = "btn btn-danger d-flex align-items-center justify-content-center"
  del_button.id = "delBtn"
  del_button.onclick = function(){deleteRow(this)}
  cell_delete.appendChild(del_button)
}

function deleteRow(rowToBeDeleted) {
  const indexOfRow = rowToBeDeleted.parentNode.parentNode.rowIndex
  document.getElementById("listTable").deleteRow(indexOfRow)
}

