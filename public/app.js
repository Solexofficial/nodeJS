document.addEventListener('click', e => {
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
