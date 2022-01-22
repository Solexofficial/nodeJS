document.addEventListener('click', e => {
  if (e.target.dataset.type === 'edit') {
    const id = e.target.dataset.id;
    const title = e.target.closest('div').previousElementSibling.textContent;
    const newTitle = prompt('Введите новое название', title);
    if (newTitle === null) return;

    if (title !== newTitle) {
      edit(id, newTitle).then(
        data => (e.target.closest('div').previousElementSibling.textContent = JSON.parse(data).title)
      );
    }
  }
  if (e.target.dataset.type === 'remove') {
    const id = e.target.dataset.id;
    remove(id).then(() => {
      e.target.closest('li').remove();
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE',
  });
}

async function edit(id, title) {
  const data = JSON.stringify({ id, title });
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });
  return data;
}
