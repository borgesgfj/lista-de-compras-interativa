const addButton = document.getElementById('btnAdd');
const arrayOfItems = [];
addButton.disabled = true;
const qtty = document.getElementById('inputQtty');
qtty.value = '1';
function validatEmptyInputs() {
  const item = document.getElementById('inputItem').value;
  addButton.disabled = item.trim() === '';
}
document.getElementById('inputItem').addEventListener('change', validatEmptyInputs);

function validateDuplicatedItem() {
  const newItem = document.getElementById('inputItem').value.trim();
  addButton.disabled = arrayOfItems.some((registeredItem) => registeredItem.item === newItem);
}
document.getElementById('inputItem').addEventListener('change', validateDuplicatedItem);

function addElement(tableReference) {
  const newProduct = {
    item: document.getElementById('inputItem').value.trim(),
    itemDescription: document.getElementById('inputItemDescription').value.trim(),
    quantity: document.getElementById('inputQtty').value,
    unity: document.getElementById('selectUnity').value,
    acquired: false,
  };
  arrayOfItems.push(newProduct);
  const newRowIndex = insertNewRow(tableReference).rowIndex;
  const currentRowRef = document.getElementById(tableReference).rows[newRowIndex];
  writeItemOnTable(currentRowRef, newProduct.item, newProduct.itemDescription);
  writeQttyOnTable(currentRowRef, newProduct.quantity, newProduct.unity);
  createDeltBttn(currentRowRef);
  createEditBttn(currentRowRef);
  addButton.disabled = true;
}

function insertNewRow(tableID) {
  const table = document.getElementById(tableID);
  const newRow = table.tBodies[0].insertRow(-1);
  return newRow;
}
function writeItemOnTable(rowReference, itemName, descripionOfItem) {
  const cellOfitens = rowReference.insertCell(0);
  cellOfitens.id = 'intensCell';
  cellOfitens.innerHTML = `<div class="tickContainer">
    <div class="cellTextContent">
      <p class="itemName">${itemName} <br/>
        <span class="itemsDescription" >
          ${descripionOfItem}
        </span>
      </p>
    </div>
  </div>`;
  document.getElementById('inputItem').value = '';
  document.getElementById('inputItemDescription').value = '';
}
function writeQttyOnTable(rowReference, qtty, unitySymbol) {
  const cellOfQtty = rowReference.insertCell();
  cellOfQtty.className = 'align-middle';
  cellOfQtty.id = 'qttyCells';
  cellOfQtty.innerHTML = `${qtty} ${unitySymbol}`;
  document.getElementById('inputQtty').value = '1';
  document.getElementById('selectUnity').value = 'un.';
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
    removeItem(this);
  };
  cellDelete.appendChild(delBtn);
}

function removeItem(deleteBtnReference) {
  const indexOfRow = deleteBtnReference.parentNode.parentNode.rowIndex;
  document.getElementById('listTable').deleteRow(indexOfRow);
  arrayOfItems.splice(indexOfRow - 1, 1);
}
function createEditBttn(rowReference) {
  const cellEdit = rowReference.insertCell();
  cellEdit.id = 'editCell';
  cellEdit.className = 'align-middle';
}

function markAcquiredItem(event) {
  if (event.target.tagName == 'P') {
    const outterCellContainer = event.target.parentNode.parentNode;
    const cellOfQtty = event.target.parentNode.parentNode.parentNode.nextSibling;
    const clickedRow = event.target.parentNode.parentNode.parentNode.parentNode;
    const clickedRowIndex = clickedRow.rowIndex;
    outterCellContainer.classList.toggle('tickContainerChecked');
    clickedRow.classList.toggle('checkedRow');
    cellOfQtty.classList.toggle('checkedTd');
    arrayOfItems[clickedRowIndex - 1].acquired = clickedRow.className == 'checkedRow';
  }
}
document.getElementById('listTable').addEventListener('click', markAcquiredItem);
