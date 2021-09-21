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

function addElement() {
  const newProduct = {
    item: document.getElementById('inputItem').value.trim(),
    itemDescription: document.getElementById('inputItemDescription').value.trim(),
    quantity: document.getElementById('inputQtty').value,
    unity: document.getElementById('selectUnity').value,
    acquired: false,
    inEdition: false,
  };
  arrayOfItems.push(newProduct);
  createTable('listField');
  buildRow('listTableBody');
  addButton.disabled = true;
  document.getElementById('inputItem').value = '';
  document.getElementById('inputItemDescription').value = '';
  document.getElementById('inputQtty').value = '1';
  document.getElementById('selectUnity').value = 'un.';
}

function createTable(divId) {
  document.getElementById(divId).innerHTML = `
    <table class="table table-borderless table-striped table-hover" id="listTable">
      <thead class="table-dark">
        <tr id="tableHeader">
          <th id="headCellItem">Item</th>
          <th id="headCellQtty">Qtde.</th>
          <th id="headCellDelBtn"></th>
          <th id="headCellEditBtn"></th>
        </tr>
      </thead>
      <tbody id="listTableBody">
      </tbody>
    </table>
  `;
}

function buildRow(tableBodyId) {
  const tableBody = document.getElementById(tableBodyId);
  for (let i = 0; i < arrayOfItems.length; i++) {
    if (!arrayOfItems[i].acquired && !arrayOfItems[i].inEdition) {
      tableBody.innerHTML += `
      <tr>
        <td class="intensCell" onclick="markAcquiredItem(this.parentElement)">
          ${writeItemOnTable(
            arrayOfItems[i].item,
            arrayOfItems[i].itemDescription,
            arrayOfItems[i].acquired,
            arrayOfItems[i].inEdition
          )}
        </td>
        <td class="align-middle qttyCellStandard">
          ${writeQttyOnTable(
            arrayOfItems[i].quantity,
            arrayOfItems[i].unity,
            arrayOfItems[i].acquired,
            arrayOfItems[i].inEdition
          )}
        </td>
        <td class="align-middle">
          ${createDeleteBtn()}
        </td>
        <td class="align-middle"> </td>
      </tr>
    `;
    }
    if (arrayOfItems[i].acquired && !arrayOfItems[i].inEdition) {
      tableBody.innerHTML += `
      <tr class="checkedRow">
        <td class="intensCell checkedTd" onclick="markAcquiredItem(this.parentElement)">
          ${writeItemOnTable(
            arrayOfItems[i].item,
            arrayOfItems[i].itemDescription,
            arrayOfItems[i].acquired,
            arrayOfItems[i].inEdition
          )}
        </td>
        <td class="align-middle qttyCellStandard checkedTd">
          ${writeQttyOnTable(
            arrayOfItems[i].quantity,
            arrayOfItems[i].unity,
            arrayOfItems[i].inEdition
          )}
        </td>
        <td class="align-middle">
          ${createDeleteBtn()}
        </td>
        <td class="align-middle"> </td>
      </tr>
    `;
    }
  }
}
function writeItemOnTable(itemName, descripionOfItem, acquiredState, editState) {
  if (!acquiredState && !editState) {
    const itemCellText = `
    <p class="itemName">
      ${itemName} <br/>
      <span class="itemsDescription" >
        ${descripionOfItem}
      </span>
    </p>
    `;
    return itemCellText;
  }
  if (acquiredState && !editState) {
    const itemCellText = `
    <div class="tickContainerChecked">
      <div class="cellTextContent">
        <p class="itemName">
          ${itemName} <br/>
          <span class="itemsDescription" >
            ${descripionOfItem}
          </span>
        </p>
      </div>
    </div>
    `;
    return itemCellText;
  }
}
function writeQttyOnTable(qtty, unitySymbol, editState) {
  if (!editState) {
    const qttyAndUnityText = `
      <p class="qttyParagraph">
        ${qtty}
        <span class="unityText">
          ${unitySymbol}
        </span>
      </p>
    `;
    return qttyAndUnityText;
  }
}
function createDeleteBtn() {
  const deleteBtnHtml = `
    <button
      type="button"
      class="btn btn-danger d-flex align-items-center justify-content-center"
      id="delBtn"
      onclick="removeItem(this)"
    >
      <span class="bi bi-journal-x" id="delIcon"></span>
    </button>
  `;
  return deleteBtnHtml;
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

function markAcquiredItem(rowReference) {
  arrayOfItems[rowReference.rowIndex - 1].acquired = !arrayOfItems[rowReference.rowIndex - 1].acquired;
  createTable('listField');
  buildRow('listTableBody');
}
