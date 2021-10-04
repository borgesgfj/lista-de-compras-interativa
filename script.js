const addButton = document.getElementById('btnAdd');
const arrayOfItems = [];
addButton.disabled = true;
const qtty = document.getElementById('inputQtty');
qtty.value = '1';
function validateEmptyInputs() {
  const item = document.getElementById('inputItem').value;
  addButton.disabled = item.trim() === '';
}
document.getElementById('inputItem').addEventListener('change', validateEmptyInputs);

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
  renderTableOfItems('listTableBody');
  addButton.disabled = true;
  document.getElementById('inputItem').value = '';
  document.getElementById('inputItemDescription').value = '';
  document.getElementById('inputQtty').value = '1';
  document.getElementById('selectUnity').value = 'un.';
}

function renderTableOfItems(tableBodyId) {
  const tableBody = document.getElementById(tableBodyId);
  tableBody.innerHTML = '';
  for (let i = 0; i < arrayOfItems.length; i++) {
    const item = arrayOfItems[i];
    let itemCellClass = 'intensCell align-middle';
    let qttyCellClass = 'align-middle qttyCellStandard';
    let tableRowClass = 'standardRow';
    if (item.acquired) {
      itemCellClass += ' checkedTd';
      qttyCellClass += ' checkedTd';
      tableRowClass += ' checkedRow';
    }
    tableBody.innerHTML += `
        <tr class="${tableRowClass}">
          <td class= "${itemCellClass}" onclick="markAcquiredItem(this.parentElement)">
            ${createCellOfItemsContent(
              item.item,
              item.itemDescription,
              item.acquired,
              item.inEdition
            )}
          </td>
          <td class= "${qttyCellClass}">
            ${createCellOfQttyContent(item.quantity, item.unity, item.inEdition)}
          </td>
          <td class="align-middle">
            ${createDeleteBtn()}
          </td>
          <td class="align-middle">${editAndConfirmEditionBtns(item.inEdition, item.acquired)} </td>
        </tr>
      `;
    if (item.inEdition) {
      tableBody.parentElement.rows[i + 1].deleteCell(2);
      tableBody.parentElement.rows[i + 1].cells[1].colSpan = 2;
    }
  }
}
function createEditItemsInputs(item, description) {
  return `
  <div class="input-group-vertical input-group-sm mt-1">
    <input
      type="text"
      class="form-control"
      name="inputEditItemName"
      id="inputEditItemName"
      placeholder="Editar nome do produto"
      oninput="validateDuplicateEditInputs(this.offsetParent.parentElement)"
      value = ${item}
    />
    <input
    type="text"
    class="form-control ms-2 mt-1"
    name="inputEditItemDescription"
    id="inputEditItemDescription"
    placeholder="Editar descrição do produto"
    value = ${description}
    />
  </div>
`;
}
function createEditQttyAndUnityinputs(quantity) {
  return `
  <div class="input-group input-group-sm flex-nowrap">
    <input
      type="number"
      class="form-control-sm inputEditQtty"
      name="EditQtty"
      id="EditQtty"
      min="1"
      size="4"
      value=${quantity}
    />
    <select class="form-select form-select-sm selectEditUnity"
      id="selectInputUnity"
    >
      <option value="un.">un.</option>
      <option value="kg">kg</option>
      <option value="g">g</option>
      <option value="Duz">Duz</option>
      <option value="1/2 Duz">1/2 Duz</option>
    </select>
  </div>
`;
}
function createCellOfItemsContent(itemName, descriptionOfItem, acquiredState, editState) {
  if (!editState) {
    let classOfCheckMarkContainer = 'tickContainer';
    let itemTextLeftIdent = 'standardLeftIdent';
    if (acquiredState) {
      classOfCheckMarkContainer += ' tickContainerChecked';
      itemTextLeftIdent += ' checkedIdent';
    }
    return `
      <div class="${classOfCheckMarkContainer}">
        <div class="${itemTextLeftIdent}">
          <p class="itemName">
            ${itemName} <br/>
            <span class="itemsDescription" >
              ${descriptionOfItem}
            </span>
          </p>
        </div>
      </div>
    `;
  } else {
    return createEditItemsInputs(itemName, descriptionOfItem);
  }
}
function createCellOfQttyContent(qtty, unitySymbol, editState) {
  if (!editState) {
    return `
      <p class="qttyParagraph">
        ${qtty}
        <span class="unitytext">
          ${unitySymbol}
        </span>
      </p>
    `;
  } else {
    return createEditQttyAndUnityinputs(qtty);
  }
}
function createDeleteBtn() {
  return `
    <button
      type="button"
      class="btn btn-danger d-flex align-items-center justify-content-center smallTableBtn"
      id="delBtn"
      onclick="removeItem(this)"
    >
      <span class="bi bi-journal-x" id="delIcon"></span>
    </button>
  `;
}

function removeItem(deleteBtnReference) {
  const indexOfRow = deleteBtnReference.parentNode.parentNode.rowIndex;
  document.getElementById('listTable').deleteRow(indexOfRow);
  arrayOfItems.splice(indexOfRow - 1, 1);
}
function editAndConfirmEditionBtns(editState, acquiredState) {
  if (acquiredState) {
    return '';
  }
  if (!editState) {
    return `
    <button
      type="button"
      class="btn btn-primary d-flex align-items-center justify-content-center smallTableBtn"
      id="editBtn"
      onclick="makeItemEditable(this.parentElement.parentElement)"
    >
      <span class="bi bi-pencil-square tableBtnIcon"></span>
    </button>
    `;
  } else {
    return `
      <button
        type="button"
        class="btn btn-success d-flex align-items-center justify-content-center smallTableBtn"
        id="confirmEditionBtn"
        onclick="confirmEdition(this.parentElement.parentElement)"
      >
        <span class="bi bi bi-check-circle-fill tableBtnIcon"></span>
      </button>
    `;
  }
}

function markAcquiredItem(rowReference) {
  if (!arrayOfItems[rowReference.rowIndex - 1].inEdition) {
    arrayOfItems[rowReference.rowIndex - 1].acquired =
      !arrayOfItems[rowReference.rowIndex - 1].acquired;
    renderTableOfItems('listTableBody');
  }
}
function validateEmptyEditionInputs() {
  const editedItemName = document.getElementById('inputEditItemName').value;
  document.getElementById('confirmEditionBtn').disabled = editedItemName.trim() === '';
}

function validateDuplicateEditInputs(rowReference) {
  const productIndex = rowReference.rowIndex - 1;
  const editedItemName = document.getElementById('inputEditItemName').value;
  document.getElementById('confirmEditionBtn').disabled = arrayOfItems.some((products, index) => {
    if (index != productIndex) {
      return products.item === editedItemName.trim();
    }
  });
}
function makeItemEditable(rowReference) {
  arrayOfItems[rowReference.rowIndex - 1].inEdition =
    !arrayOfItems[rowReference.rowIndex - 1].inEdition;
  renderTableOfItems('listTableBody');
  document
    .getElementById('inputEditItemName')
    .addEventListener('change', validateEmptyEditionInputs);
}

function confirmEdition(rowReference) {
  const item = arrayOfItems[rowReference.rowIndex - 1];
  item.item = document.getElementById('inputEditItemName').value;
  item.itemDescription = document.getElementById('inputEditItemDescription').value;
  item.quantity = document.getElementById('EditQtty').value;
  item.unity = document.getElementById('selectInputUnity').value;
  item.inEdition = false;
  renderTableOfItems('listTableBody');
}
