(function(){
  const $ = (sel) => document.querySelector(sel);
  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
  $('#api-base-url').textContent = apiBase;

  // Mode toggles
  function bindModeToggle(groupName, formEl){
    document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
      r.addEventListener('change', () => {
        formEl.classList.toggle('json-mode', r.value === 'json' && r.checked);
        formEl.classList.toggle('fields-mode', !(r.value === 'json' && r.checked));
      });
    });
  }

  // Fetch helpers
  async function http(path, options){
    const url = apiBase.replace(/\/$/, '') + path;
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
    }
    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? res.json() : res.text();
  }

  // Render helpers
  function renderItemCard(item){
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <div class="meta">
        <div><span class="badge">Name</span> ${escapeHtml(item.name ?? '')}</div>
        <div><span class="badge">Desc</span> ${escapeHtml(item.description ?? '')}</div>
        <div class="id">_id: ${escapeHtml(item._id ?? '')}</div>
      </div>
      <div class="actions">
        <button data-edit="${item._id}">Edit</button>
        <button data-delete="${item._id}" class="danger">Delete</button>
      </div>
    `;

    div.querySelector('[data-edit]')?.addEventListener('click', () => {
      $('#update-id').value = item._id || '';
      $('#update-name').value = item.name || '';
      $('#update-description').value = item.description || '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    div.querySelector('[data-delete]')?.addEventListener('click', async () => {
      if (!confirm('Delete this item?')) return;
      try {
        await http(`/items/${encodeURIComponent(item._id)}`, { method: 'DELETE' });
        await refreshList();
      } catch (err) {
        alert(err.message);
      }
    });

    return div;
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"]|'/g, ch => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'
    })[ch]);
  }

  // Create form
  const createForm = $('#create-form');
  bindModeToggle('createMode', createForm);
  createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      let body;
      if (createForm.classList.contains('json-mode')) {
        const raw = $('#create-json').value.trim();
        body = raw ? JSON.parse(raw) : {};
      } else {
        body = {
          name: $('#create-name').value.trim(),
          description: $('#create-description').value.trim() || undefined,
        };
      }
      const created = await http('/items', { method: 'POST', body: JSON.stringify(body) });
      $('#create-name').value = '';
      $('#create-description').value = '';
      $('#create-json').value = '';
      await refreshList();
      alert('Created: ' + (created && created._id ? created._id : 'ok'));
    } catch (err) {
      alert('Create failed: ' + err.message);
    }
  });

  // Update form
  const updateForm = $('#update-form');
  bindModeToggle('updateMode', updateForm);
  updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = $('#update-id').value.trim();
    if (!id) return alert('Provide an item id');
    try {
      let body;
      if (updateForm.classList.contains('json-mode')) {
        const raw = $('#update-json').value.trim();
        body = raw ? JSON.parse(raw) : {};
      } else {
        body = {};
        const name = $('#update-name').value.trim();
        const description = $('#update-description').value.trim();
        if (name) body.name = name;
        if (description) body.description = description;
      }
      const updated = await http(`/items/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(body) });
      await refreshList();
      alert('Updated: ' + (updated && updated._id ? updated._id : 'ok'));
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  });

  // Toolbar actions
  $('#btn-refresh').addEventListener('click', refreshList);
  $('#btn-find-one').addEventListener('click', async () => {
    const id = $('#find-one-id').value.trim();
    if (!id) return alert('Provide an id');
    try {
      const item = await http(`/items/${encodeURIComponent(id)}`, { method: 'GET' });
      $('#result-one').textContent = JSON.stringify(item, null, 2);
    } catch (err) {
      alert('Find failed: ' + err.message);
    }
  });
  $('#btn-delete-all').addEventListener('click', async () => {
    if (!confirm('Delete ALL items?')) return;
    try {
      await http('/items', { method: 'DELETE' });
      await refreshList();
    } catch (err) {
      alert('Delete all failed: ' + err.message);
    }
  });

  async function refreshList(){
    try {
      const items = await http('/items', { method: 'GET' });
      const list = $('#items-list');
      list.innerHTML = '';
      if (!Array.isArray(items) || items.length === 0){
        list.textContent = 'No items yet';
        return;
      }
      items.forEach(it => list.appendChild(renderItemCard(it)));
    } catch (err) {
      $('#items-list').textContent = 'Load failed: ' + err.message;
    }
  }

  // Initial load
  refreshList();
})();