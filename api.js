const API_URL = 'https://calm-tor-17662.herokuapp.com/items';

async function createItem(productObject) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productObject),
    });
    const data = await response.json();
    return data;
  } catch {
    throw Error(data.status);
  }
}

async function listItems() {
  const response = await fetch(API_URL);
  return await response.json();
}

async function updateItem(id, requisitionBody) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requisitionBody),
    });
    const data = await response.json();
    return data;
  } catch {
    throw Error(data.status);
  }
}
