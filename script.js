const addButton = document.getElementById('btnAdd');
addButton.disabled = true;
const qtty = document.getElementById('inputQtty');
qtty.value = '1';
document.getElementById('inputItem').addEventListener('change', validatEmptyInputs);
document.getElementById('inputItem').addEventListener('change', validateDuplicatedItem);

function validatEmptyInputs() {
  const item = document.getElementById('inputItem').value;
  addButton.disabled = item.trim() === '';
}

function validateDuplicatedItem() {
  const table = document.getElementById('listTable');
  const numOfRows = table.rows.length;
  const item = document.getElementById('inputItem').value;
  for (let i = 1; i < numOfRows; i++) {
    const cellText = table.rows[i].cells.item(0).innerHTML;
    if (cellText.trim() == item.trim()) {
      addButton.disabled = true;
      break;
    }
  }
}

function addElementToList(tableReference) {
  const newRowIndex = insertNewRow(tableReference).rowIndex;
  const currentRowRef = document.getElementById(tableReference).rows[newRowIndex];
  writeItemOnTable(currentRowRef);
  writeQttyOnTable(currentRowRef);
  createDeltBttn(currentRowRef);
  createEditBttn(currentRowRef);
  addButton.disabled = true;
}

function insertNewRow(tableID) {
  const table = document.getElementById(tableID);
  const newRow = table.tBodies[0].insertRow(-1);
  return newRow;
}
function writeItemOnTable(rowReference) {
  const cellOfitens = rowReference.insertCell(0);
  const itemText = document.getElementById('inputItem').value;
  cellOfitens.id = 'intensCell';
  cellOfitens.innerHTML = itemText;
  document.getElementById('inputItem').value = '';
}
function writeQttyOnTable(rowReference) {
  const cellOfQtty = rowReference.insertCell();
  const qttyText = document.getElementById('inputQtty').value;
  cellOfQtty.className = 'align-middle';
  cellOfQtty.id = 'qttyCells';
  cellOfQtty.innerHTML = qttyText;
  document.getElementById('inputQtty').value = '1';
}
function createDeltBttn(rowReference) {
  const cellDelete = rowReference.insertCell();
  const delBtn = document.createElement('button');
  const delIcon = document.createElement('span');
  cellDelete.id = 'deleteCell';
  cellDelete.className = 'align-middle';
  delIcon.id = 'delIcon';
  delIcon.className = 'bi bi-journal-x';
  delBtn.appendChild(delIcon);
  delBtn.type = 'button';
  delBtn.className = 'btn btn-danger d-flex align-items-center justify-content-center';
  delBtn.id = 'delBtn';
  delBtn.onclick = function () {
    deleteRow(this);
  };
  cellDelete.appendChild(delBtn);
}
function deleteRow(rowToBeDeleted) {
  const indexOfRow = rowToBeDeleted.parentNode.parentNode.rowIndex;
  document.getElementById('listTable').deleteRow(indexOfRow);
}
function createEditBttn(rowReference) {
  const cellEdit = rowReference.insertCell();
  cellEdit.id = 'editCell';
  cellEdit.className = 'align-middle';
}
