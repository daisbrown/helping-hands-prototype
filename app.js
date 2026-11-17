const dialog = document.querySelector('#service-dialog');
const content = document.querySelector('#dialog-content');
const descriptions = {
  'Groceries': 'Tell Latricia what groceries you need and which store you prefer.',
  'Medicine pickup': 'Discuss pickup arrangements with Latricia and your pharmacy. Do not enter prescription or medical details in this demo.',
  'Heavy items': 'Get help with heavier essentials like water, pet food, or paper products.',
  'Other errands': 'Let Latricia know what kind of errand you need help with.'
};
const pictures = {
  'Groceries': ['assets/service-groceries.png', 'Latricia helping an older adult with groceries'],
  'Medicine pickup': ['assets/service-medicine-rx.png', 'Latricia helping with a pharmacy pickup'],
  'Heavy items': ['assets/service-heavy.png', 'Latricia carrying water for an older adult'],
  'Other errands': ['assets/service-errands-minivan.png', 'Latricia driving her minivan on an errand']
};
let selected = '';
let sample = {details:'', time:'', contact:'Call'};
function first() {
  content.innerHTML = `<img class="service-picture" src="${pictures[selected][0]}" alt="${pictures[selected][1]}"><h2 id="dialog-title">${selected}</h2><p>${descriptions[selected]}</p><div class="notice"><strong>Example service fee: $10</strong><p>This is a sample price. Actual fees, item costs, and availability must be confirmed with Latricia before any service.</p></div><p>Want to see how an online request could work?</p><div class="dialog-actions"><button class="button primary" id="start-request">Start an example request →</button><a class="button outline" href="tel:7044385683">Call instead</a></div>`;
  document.querySelector('#start-request').addEventListener('click', second);
}
function second() {
  content.innerHTML = `<h2 id="dialog-title">Tell us a little more</h2><p>This is a demonstration. Please don’t enter personal, payment, or medical information.</p><label for="sample-details">What kind of help would you like?</label><textarea id="sample-details" rows="3" placeholder="For example: help with a grocery list"></textarea><label for="sample-time">When might you need help?</label><select id="sample-time"><option value="">Choose a time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select><fieldset class="contact-choice"><legend>How would you prefer Latricia to respond?</legend><label><input type="radio" name="contact" value="Call"> Call me</label><label><input type="radio" name="contact" value="Text"> Text me</label></fieldset><p class="demo-note">For this example, no phone number is needed and no call or text will be sent.</p><div class="dialog-actions"><button class="button outline" id="back-request">Back</button><button class="button primary" id="review-request">Review example →</button></div>`;
  document.querySelector('#sample-details').value = sample.details;
  document.querySelector('#sample-time').value = sample.time;
  document.querySelector(`input[name="contact"][value="${sample.contact}"]`).checked = true;
  document.querySelector('#back-request').onclick = first;
  document.querySelector('#review-request').onclick = () => {
    sample.details = document.querySelector('#sample-details').value;
    sample.time = document.querySelector('#sample-time').value;
    sample.contact = document.querySelector('input[name="contact"]:checked').value;
    third();
  };
}
function third() {
  content.innerHTML = `<h2 id="dialog-title">Review your example</h2><p>Here's what a request summary could look like.</p><div class="notice"><strong id="summary-service"></strong><p>Preferred response: <strong id="summary-contact"></strong><br>Preferred time: <span id="summary-time"></span><br>Example service fee: $10<br>Items and additional fees: to be confirmed<br><strong>Example total: $10 plus item costs</strong></p><p>Example details: <span id="summary-details"></span></p></div><p>Real prices and availability would be confirmed before you agree to a service.</p><div class="dialog-actions"><button class="button outline" id="back-review">Back</button><button class="button primary" id="finish-request">Finish example</button></div>`;
  document.querySelector('#summary-service').textContent = selected;
  document.querySelector('#summary-contact').textContent = sample.contact;
  document.querySelector('#summary-time').textContent = sample.time || 'Not selected';
  document.querySelector('#summary-details').textContent = sample.details || 'No details added';
  document.querySelector('#back-review').onclick = second;
  document.querySelector('#finish-request').onclick = finish;
}
function finish() {
  content.innerHTML = `<h2 id="dialog-title">That’s the example!</h2><p><strong>No request, call, text, or payment was sent.</strong> This only shows what a future request could look like.</p><div class="notice"><strong>Example notification to Latricia</strong><p>A customer is interested in <span id="notice-service"></span> and prefers a <span id="notice-contact"></span>. Preferred time: <span id="notice-time"></span>.</p><p class="demo-note">This notification is a preview only. Latricia did not receive it.</p></div><p>For real help, call or text Latricia directly.</p><div class="dialog-actions"><a class="button primary" href="tel:7044385683">Call Latricia</a><a class="button outline" href="sms:7044385683">Text Latricia</a></div>`;
  document.querySelector('#notice-service').textContent = selected.toLowerCase();
  document.querySelector('#notice-contact').textContent = sample.contact.toLowerCase();
  document.querySelector('#notice-time').textContent = sample.time || 'not selected';
}
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => { selected = button.dataset.service; sample = {details:'', time:'', contact:'Call'}; first(); dialog.showModal(); }));
document.querySelector('#close-dialog').onclick = () => dialog.close();
dialog.addEventListener('click', e => { if(e.target === dialog) dialog.close(); });
const help = document.querySelector('#help-panel'), toggle = document.querySelector('#help-toggle');
function setHelp(open) { help.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); if(open) help.querySelector('.close-help').focus(); else toggle.focus(); }
toggle.onclick = () => setHelp(help.hidden);
document.querySelector('.close-help').onclick = () => setHelp(false);
document.addEventListener('keydown', e => { if(e.key === 'Escape' && !help.hidden) setHelp(false); });
