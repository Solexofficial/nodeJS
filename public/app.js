let editMode = false;

function toggleEditMode() {
  return (editMode = !editMode);
}

function getNoteId(e) {
  return e.target.closest('li').dataset.id;
}

document.addEventListener('click', e => {
  function renderNote() {
    const title = e.target.closest('div').previousElementSibling.textContent;
    const noteParentNode = e.target.closest('li');

    if (editMode) {
      noteParentNode.innerHTML = `
      <input type="text" class="note-title" value="${title}" />
      <div class="btn-group">
      <button class="btn btn-success" data-type="save">Сохранить</button>
      <button class="btn btn-danger" data-type="cancel">Отменить</button>
      </div>
      `;
    } else {
      const title = e.target.closest('div').previousElementSibling.value;
      noteParentNode.innerHTML = `
        <span>${title}</span>
                  <div class="btn-group">
                    <button class="btn btn-primary" data-type="update">Обновить</button>
                    <button class="btn btn-danger" data-type="remove">&times;</button>
                  </div>
        `;
    }
  }

  if (e.target.dataset.type === 'update') {
    toggleEditMode();
    renderNote();
  }

  if (e.target.dataset.type === 'save') {
    const id = getNoteId(e);
    const title = e.target.closest('div').previousElementSibling.value;

    update(id, title)
      .then(data => (e.target.closest('div').previousElementSibling.textContent = JSON.parse(data).title))
      .then(() => {
        toggleEditMode();
        renderNote();
      });
  }

  if (e.target.dataset.type === 'cancel') {
    toggleEditMode();
    renderNote();
  }

  if (e.target.dataset.type === 'remove') {
    const noteId = getNoteId(e);
    remove(noteId).then(() => {
      e.target.closest('li').remove();
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE',
  });
}

async function update(id, title) {
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
