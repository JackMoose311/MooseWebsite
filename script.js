// small interactive behavior: mobile nav, modal, year inserts, project modal content

document.addEventListener('DOMContentLoaded', function () {
  // insert year
  const y = new Date().getFullYear();
  const yearEls = [document.getElementById('year'), document.getElementById('yearProjects'), document.getElementById('yearContact')];
  yearEls.forEach(el => { if (el) el.textContent = y; });

  // mobile nav toggles (works multiple headers)
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      // find the nav that is the next sibling (or by aria-controls)
      const targetId = btn.getAttribute('aria-controls');
      let nav = targetId ? document.getElementById(targetId) : btn.nextElementSibling;
      if (!nav) return;
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // Projects modal logic
  const modal = document.getElementById('projectModal');
  const modalInner = document.getElementById('modalInner');
  const closeBtn = modal && modal.querySelector('.modal-close');

  function openModal(html) {
    if (!modal) return;
    modalInner.innerHTML = html;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // focus the close button for accessibility
    closeBtn && closeBtn.focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modalInner.innerHTML = '';
    document.body.style.overflow = '';
  }

  // add click / keyboard handlers on project titles
  document.querySelectorAll('.project-title').forEach(title => {
    title.addEventListener('click', handleTitle);
    title.addEventListener('keypress', function(e){
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTitle.call(this, e); }
    });
  });

  function handleTitle(e) {
    const id = this.dataset.project;
    let content = '';
    // Example detailed content — replace with your real write-ups
    if (id === '1') {
      content = `
        <h2>Project 1 — Compact Task Manager</h2>
        <p><strong>Overview:</strong> A minimal task manager that stores data offline and syncs when online. Focused on keyboard accessibility and fast interactions.</p>
        <h3>Problem</h3>
        <p>Many task managers are heavy. We wanted something fast and keyboard-friendly for power users.</p>
        <h3>Approach</h3>
        <p>Built using React, IndexedDB for local persistence, and a service worker for caching assets and background sync.</p>
        <h3>Highlights</h3>
        <ul>
          <li>Offline-first: tasks available while offline</li>
          <li>Keyboard shortcuts and a11y semantics</li>
          <li>Export/import via JSON</li>
        </ul>
        <p><a href="https://github.com/yourusername/project1" target="_blank" rel="noopener">Repository</a> · <a href="#" onclick="closeModal();return false;">Close</a></p>
      `;
    } else if (id === '2') {
      content = `
        <h2>Project 2 — Data Viz Dashboard</h2>
        <p><strong>Overview:</strong> Interactive dashboard with filtering, drill-down charts, and CSV export for business reporting.</p>
        <h3>Approach</h3>
        <p>D3 to build custom charts, Node backend for authenticated CSV exports, and Postgres for analytics.</p>
        <h3>Impact</h3>
        <p>Cut reporting time by 70% for internal stakeholders.</p>
        <p><a href="https://github.com/yourusername/project2" target="_blank" rel="noopener">Repository</a></p>
      `;
    } else if (id === '3') {
      content = `
        <h2>Project 3 — Portfolio Generator</h2>
        <p><strong>Overview:</strong> A static site generator tailored for designers to easily add projects, with image optimization and simple templates.</p>
        <h3>Stack</h3>
        <p>Eleventy, Netlify, ImageMagick, CSS Grid templates.</p>
        <p><a href="https://github.com/yourusername/project3" target="_blank" rel="noopener">Repository</a></p>
      `;
    } else {
      content = `<h2>Project</h2><p>More details coming soon.</p>`;
    }
    openModal(content);
  }

  // close modal events
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target.classList.contains('modal-backdrop')) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
    });
  }

});
