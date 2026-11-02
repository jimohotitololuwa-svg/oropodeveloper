(function () {
  'use strict';

  /* PASTE your deployed Google Apps Script Web App URL here (it ends with /exec) */
  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxyyydTU2HHOudXAdW416FDl21Uz1UNazQ85UeSX-eib9BRxdRJoLm4u2AoizVmLIy44A/exec';

  var form = document.getElementById('partnerForm');
  if (!form) return;
  var btn = document.getElementById('pfSubmit');
  var label = btn.querySelector('.pf-label');
  var status = document.getElementById('pfStatus');
  var done = document.getElementById('pfDone');
  var again = document.getElementById('pfAgain');
  var msg = document.getElementById('message');
  var count = document.getElementById('pfCount');
  var startedAt = Date.now();
  var sending = false;

  function val(id) { return (document.getElementById(id).value || '').trim(); }
  function setStatus(text, type) { status.textContent = text || ''; status.className = 'pf-status' + (type ? ' ' + type : ''); }

  function clearErrors() {
    [].forEach.call(form.querySelectorAll('.pf-err'), function (el) { el.classList.remove('pf-err'); });
    [].forEach.call(form.querySelectorAll('.pf-field-msg'), function (el) { el.remove(); });
  }
  function fail(el, text) {
    el.classList.add('pf-err');
    var s = document.createElement('span');
    s.className = 'pf-field-msg';
    s.textContent = text;
    var host = el.closest('label') || el.parentNode;
    host.appendChild(s);
  }

  function validate() {
    clearErrors();
    var ok = true, first = null;
    function bad(id, text) { var el = document.getElementById(id); fail(el, text); ok = false; if (!first) first = el; }
    if (!val('organisation')) bad('organisation', 'Please enter your organisation name.');
    if (!val('name')) bad('name', 'Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val('email'))) bad('email', 'Please enter a valid email address.');
    var ph = val('phone');
    if (ph && !/^[+\d][\d\s\-()]{6,}$/.test(ph)) bad('phone', 'Please enter a valid phone number.');
    if (!val('interest')) bad('interest', 'Please choose how you would like to partner.');
    if (val('message').length < 10) bad('message', 'Please tell us a little more (at least 10 characters).');
    if (!document.getElementById('consent').checked) bad('consent', 'Please tick the box to continue.');
    if (first) first.focus();
    return ok;
  }

  msg.addEventListener('input', function () { count.textContent = msg.value.length + ' / ' + msg.maxLength; });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;
    setStatus('');
    if (!validate()) { setStatus('Please fix the highlighted fields.', 'err'); return; }

    /* Spam checks: honeypot filled, or submitted impossibly fast */
    if (val('website') || Date.now() - startedAt < 2500) { showDone(); return; }

    if (!/^https:\/\/script\.google\.com\/.+\/exec/.test(SCRIPT_URL)) {
      setStatus('The form is not connected yet. Please email info@oropovisionarycoaching.com.', 'err');
      console.error('partner-form.js: set SCRIPT_URL to your Google Apps Script web app URL.');
      return;
    }

    var data = new URLSearchParams();
    data.append('organisation', val('organisation'));
    data.append('name', val('name'));
    data.append('email', val('email'));
    data.append('phone', val('phone'));
    data.append('role', val('role'));
    data.append('orgType', val('orgType'));
    data.append('interest', val('interest'));
    data.append('message', val('message'));
    data.append('page', location.href);

    sending = true;
    btn.disabled = true;
    btn.classList.add('loading');
    label.textContent = 'Sending…';

    /* no-cors: Apps Script does not send CORS headers, so the reply is opaque.
       A resolved fetch means the request reached Google; the script does the saving. */
    fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: data })
      .then(showDone)
      .catch(function () {
        setStatus('Something went wrong. Please check your connection and try again, or email us directly.', 'err');
      })
      .then(function () {
        sending = false;
        btn.disabled = false;
        btn.classList.remove('loading');
        label.textContent = 'Send enquiry';
      });
  });

  function showDone() {
    form.hidden = true;
    done.hidden = false;
    done.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  again.addEventListener('click', function () {
    form.reset();
    count.textContent = '0 / ' + msg.maxLength;
    clearErrors();
    setStatus('');
    startedAt = Date.now();
    done.hidden = true;
    form.hidden = false;
    document.getElementById('organisation').focus();
  });
})();
