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
        <h2>Project 1 — Fact Checker Discord Bot</h2>
        <p><strong>Overview:</strong> A Discord bot that fact-checks user claims in real time using OpenAI’s GPT models..</p>
        <h3>Problem</h3>
        <p>When talking with friends, misinformation can arise. I wanted to create a bot that will fact-check information live.</p>
        <h3>How I made it:</h3>
        <p>Using OpenAI API libraries in Python, this Discord bot is able to fact-check claims in real-time using ChatGPT models.</p> 
        <h3>Highlights</h3>
        <ul>
          <li>Hosted 24/7 online via Discloud.</li>
          <li>Quirky, nerdy, personality.</li>
          <li>You can invite the bot to your discord server! Link in the Github README.md</li>
        </ul>
        <p><a href="https://github.com/JackMoose311/Fact-Checker-Discord-Bot" target="_blank" rel="noopener">Repository</a></p>
      `;
    } else if (id === '2') {
      content = `
        <h2>This Website!</h2>
        <p><strong>Overview:</strong> A personal portfolio website designed to showcase my background, technical skills, and projects in more detail than a traditional résumé allows. The site is fully responsive and hosted on GitHub Pages.</p>
        <h3>How I Built It</h3>
        <p>
        Developed using <strong>HTML, CSS, and JavaScript</strong>, with a simple multi-page layout. 
        I implemented custom styling for a clean, professional look and added interactive features such as 
        project detail modals. Version control and deployment were managed through <strong>GitHub</strong>.
        </p>
        <p>
          <a href="https://github.com/JackMoose311/MooseWebsite" target="_blank" rel="noopener">View Repository</a>
        </p>
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
