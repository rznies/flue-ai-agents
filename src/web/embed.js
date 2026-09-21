/* Raz portfolio assistant widget.
 *
 * Embed with one tag (replace the Worker URL after `npm run deploy`):
 *
 *   <script src="https://<your-worker>.workers.dev/embed.js"
 *           data-title="Ask about Raz"
 *           data-greeting="Hi! I can walk you through Raz's work, process, and services. What are you looking for?"></script>
 *
 * Optional attributes: data-base (defaults to this script's origin),
 * data-agent (defaults to "guide"). Conversations persist per visitor via
 * localStorage, so a recruiter can leave and resume with full history.
 */
(function () {
  var script = document.currentScript;
  function attr(name, fallback) {
    return (script && script.getAttribute(name)) || fallback;
  }
  var BASE = attr('data-base', script ? new URL(script.src).origin : location.origin).replace(/\/$/, '');
  var AGENT = attr('data-agent', 'guide');
  var TITLE = attr('data-title', 'Ask about Raz');
  var GREETING = attr(
    'data-greeting',
    "Hi! I can walk you through Raz's work, process, and services. What are you looking for?"
  );
  var LS_KEY = 'raz-guide-conversation';
  var id = null;
  try {
    id = localStorage.getItem(LS_KEY) || ('visitor-' + Math.random().toString(36).slice(2, 10));
    localStorage.setItem(LS_KEY, id);
  } catch (e) {
    id = 'visitor-' + Math.random().toString(36).slice(2, 10);
  }
  var URL = BASE + '/agents/' + encodeURIComponent(AGENT) + '/' + encodeURIComponent(id);

  var CSS =
    '.rgz-btn{position:fixed;right:20px;bottom:20px;z-index:2147483000;border:none;border-radius:999px;' +
    'background:#1a1a2e;color:#fff;font-size:15px;padding:14px 20px;cursor:pointer;box-shadow:0 6px 24px rgba(0,0,0,.25);}' +
    '.rgz-panel{position:fixed;right:20px;bottom:80px;z-index:2147483000;width:min(360px,calc(100vw - 40px));' +
    'height:480px;max-height:calc(100vh - 120px);background:#fff;border:1px solid #e5e7eb;border-radius:16px;' +
    'display:flex;flex-direction:column;overflow:hidden;box-shadow:0 12px 48px rgba(0,0,0,.25);' +
    'font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;}' +
    '.rgz-head{background:#1a1a2e;color:#fff;padding:12px 16px;font-size:15px;font-weight:600;}' +
    '.rgz-body{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;}' +
    '.rgz-m{max-width:85%;padding:8px 12px;border-radius:12px;font-size:14px;line-height:1.5;white-space:pre-wrap;}' +
    '.rgz-u{align-self:flex-end;background:#4f46e5;color:#fff;border-bottom-right-radius:4px;}' +
    '.rgz-a{align-self:flex-start;background:#f1f5f9;color:#1a1a2e;border-bottom-left-radius:4px;}' +
    '.rgz-form{display:flex;gap:8px;padding:10px;border-top:1px solid #e5e7eb;}' +
    '.rgz-form input{flex:1;border:1px solid #e5e7eb;border-radius:8px;padding:10px;font-size:14px;}' +
    '.rgz-form button{border:none;background:#4f46e5;color:#fff;border-radius:8px;padding:0 16px;font-size:14px;cursor:pointer;}';

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  var btn = document.createElement('button');
  btn.className = 'rgz-btn';
  btn.textContent = '💬 ' + TITLE;
  document.body.appendChild(btn);

  var panel = document.createElement('div');
  panel.className = 'rgz-panel';
  panel.style.display = 'none';
  panel.innerHTML =
    '<div class="rgz-head">' + TITLE + '</div>' +
    '<div class="rgz-body"></div>' +
    '<form class="rgz-form"><input type="text" placeholder="Ask about Raz…" autocomplete="off" />' +
    '<button type="submit">Send</button></form>';
  document.body.appendChild(panel);

  var body = panel.querySelector('.rgz-body');
  var form = panel.querySelector('.rgz-form');
  var field = panel.querySelector('input');
  var busy = false;

  function textOf(m) {
    if (typeof m.body === 'string') return m.body;
    return ((m.parts || []).filter(function (p) { return p && p.type === 'text'; })
      .map(function (p) { return p.text || ''; }).join(''));
  }

  function paint(messages) {
    body.innerHTML = '';
    (messages || []).forEach(function (m) {
      if (m.role !== 'user' && m.role !== 'assistant') return;
      var t = textOf(m);
      if (!t) return;
      var d = document.createElement('div');
      d.className = 'rgz-m ' + (m.role === 'user' ? 'rgz-u' : 'rgz-a');
      d.textContent = t;
      body.appendChild(d);
    });
    body.scrollTop = body.scrollHeight;
  }

  function load() {
    return fetch(URL)
      .then(function (r) { return r.ok ? r.json() : { messages: [] }; })
      .then(function (snap) {
        paint(snap.messages);
        // Seed the greeting on a brand-new conversation.
        if ((!snap.messages || snap.messages.length === 0) && GREETING) {
          var d = document.createElement('div');
          d.className = 'rgz-m rgz-a';
          d.textContent = GREETING;
          body.appendChild(d);
        }
      })
      .catch(function () {});
  }

  function pollFor(submissionId, tries) {
    if (tries <= 0) { load(); return; }
    fetch(URL)
      .then(function (r) { return r.json(); })
      .then(function (snap) {
        paint(snap.messages);
        var done = ((snap.settlements || []).some(function (s) { return s && s.submissionId === submissionId; }));
        if (done) load();
        else setTimeout(function () { pollFor(submissionId, tries - 1); }, 1500);
      })
      .catch(function () { setTimeout(function () { pollFor(submissionId, tries - 1); }, 1500); });
  }

  function ask(q) {
    if (!q || busy) return;
    busy = true;
    fetch(URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ kind: 'user', body: q })
    })
      .then(function (r) { return r.json(); })
      .then(function (admission) { pollFor(admission && admission.submissionId, 40); })
      .catch(function () { load(); })
      .finally(function () { busy = false; });
    field.value = '';
  }

  btn.addEventListener('click', function () {
    var open = panel.style.display !== 'none';
    panel.style.display = open ? 'none' : 'flex';
    if (!open) { load(); field.focus(); }
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    ask(field.value.trim());
  });
})();
