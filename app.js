const dialog = document.querySelector('#service-dialog');
const content = document.querySelector('#dialog-content');
const descriptions = {
  'Groceries': 'Shopping at Walmart, Food Lion, Aldi, Publix, and more. Tell Latricia which store you prefer.',
  'Medicine pickup': 'CVS, Walgreens, prescriptions, and over-the-counter items. Discuss pickup arrangements first; keep medical details out of this demo.',
  'Heavy items': 'Get help with heavier essentials like water, pet food, or paper products.',
  'Other errands': 'Let Latricia know what kind of errand you need help with.'
};
const pictures = {
  'Groceries': ['assets/groceries-polished.png', 'Latricia helping an older adult with groceries'],
  'Medicine pickup': ['assets/medicine-polished.png', 'Latricia helping with a pharmacy pickup'],
  'Heavy items': ['assets/heavy-water-eye-contact.png', 'Latricia carrying water for an older adult'],
  'Other errands': ['assets/errands-polished.png', 'Latricia driving her minivan on an errand']
};
let selected = '';
let pictureTimer = null;
function stopPictures() { if (pictureTimer) clearInterval(pictureTimer); pictureTimer = null; }
let sample = {details:'', time:'', contact:'Call'};
const serviceDetails = {
  'Groceries': ['Your list, your preferred store', 'From Walmart, Food Lion, Aldi, or Publix: discuss your list, quantities, and any substitutions before shopping.', 'Example: a weekly grocery list from one nearby store. Groceries are paid for separately.'],
  'Medicine pickup': ['Plan the pickup together', 'Confirm pharmacy pickup requirements and availability first. Keep prescription and medical information out of this demo.', 'Example: one pharmacy pickup, subject to the pharmacy’s authorization requirements.'],
  'Heavy items': ['An extra hand with bulky essentials', 'Discuss the items, quantities, delivery access, and what can be handled safely before agreeing to a trip.', 'Example: a case of water or a bag of pet food. Item costs are separate.'],
  'Other errands': ['Tell Latricia what you have in mind', 'Discuss the stops, timing, and details so the task and any charges can be agreed on in advance.', 'Example: collecting an everyday item from a nearby shop. Availability needs confirmation.']
};
function focusStep() { const heading = content.querySelector('h2'); heading.tabIndex = -1; heading.focus(); dialog.scrollTop = 0; }
function first() {
  stopPictures();
  const detail = serviceDetails[selected];
  content.innerHTML = `<div class="service-overview"><h2 id="dialog-title">${selected}</h2><p>${descriptions[selected]}</p><div class="notice"><strong>Example service fee: $10</strong><p>Item costs and any other fees are separate and must be confirmed before you agree.</p></div><div class="dialog-actions"><button class="button primary" id="start-request">Try an example request →</button></div></div><figure class="service-figure"><img class="service-picture" src="${pictures[selected][0]}" alt="${pictures[selected][1]}"><figcaption>Illustrated service examples${selected === 'Heavy items' ? ' · Pet assistance is a concept; availability is not confirmed.' : ''}</figcaption></figure><h3>${detail[0]}</h3><p>${detail[1]}</p><p class="sample-scenario">${detail[2]}</p>`;
  const secondPictures = {
    'Groceries': ['assets/groceries-second.png', 'Latricia helps an older man with his grocery bags'],
    'Medicine pickup': ['assets/medicine-second.png', 'Latricia brings a pharmacy bag to an older woman'],
    'Heavy items': ['assets/heavy-dog.png', 'Latricia carries a happy dog to an older man'],
    'Other errands': ['assets/errands-second.png', 'Latricia helps an older man with an errand']
  };
  const img = content.querySelector('.service-picture');
  const firstPicture = pictures[selected];
  const secondPicture = secondPictures[selected];
  const controls = document.createElement('div');
  controls.className = 'picture-controls';
  controls.innerHTML = '<button class="button outline" type="button" id="pause-pictures">Pause pictures</button>';
  content.querySelector('.service-figure').after(controls);
  let showingSecond = false;
  const showNext = () => {
    showingSecond = !showingSecond;
    const picture = showingSecond ? secondPicture : firstPicture;
    img.src = picture[0];
    img.alt = picture[1];
  };
  const pause = controls.querySelector('#pause-pictures');
  if (!document.body.classList.contains('easy-view') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) pictureTimer = setInterval(showNext, 5000);
  else pause.textContent = 'Play pictures';
  pause.onclick = () => {
    if (pictureTimer) { stopPictures(); pause.textContent = 'Play pictures'; }
    else { pictureTimer = setInterval(showNext, 5000); pause.textContent = 'Pause pictures'; }
  };
  document.querySelector('#start-request').addEventListener('click', () => { stopPictures(); second(); });
  if (dialog.open) focusStep();
}
function second() {
  content.innerHTML = `<h2 id="dialog-title">Tell us a little more</h2><p>This is a demonstration. Please don’t enter personal, payment, or medical information.</p><label for="sample-details">What kind of help would you like?</label><textarea id="sample-details" rows="3" placeholder="For example: help with a grocery list"></textarea><label for="sample-time">When might you need help?</label><select id="sample-time"><option value="">Choose a time</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select><fieldset class="contact-choice"><legend>How would you prefer Latricia to respond?</legend><label><input type="radio" name="contact" value="Call"> Call me</label><label><input type="radio" name="contact" value="Text"> Text me</label></fieldset><p class="demo-note">For this example, no phone number is needed and no call or text will be sent.</p><div class="dialog-actions"><button class="button outline" id="back-request">Back</button><button class="button primary" id="review-request">Review example →</button></div>`;
  document.querySelector('#sample-details').value = sample.details;
  document.querySelector('#sample-time').value = sample.time;
  document.querySelector(`input[name="contact"][value="${sample.contact}"]`).checked = true;
  document.querySelector('#back-request').onclick = () => { sample.details = document.querySelector('#sample-details').value; sample.time = document.querySelector('#sample-time').value; sample.contact = document.querySelector('input[name=contact]:checked').value; first(); };
  focusStep();
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
  focusStep();
}
function finish() {
  content.innerHTML = `<h2 id="dialog-title">That’s the example!</h2><p><strong>No request, call, text, or payment was sent.</strong> This only shows what a future request could look like.</p><div class="notice"><strong>Example notification to Latricia</strong><p>A customer is interested in <span id="notice-service"></span> and prefers a <span id="notice-contact"></span>. Preferred time: <span id="notice-time"></span>.</p><p class="demo-note">This notification is a preview only. Latricia did not receive it.</p></div><p>Phone and text contact options will be added later.</p>`;
  document.querySelector('#notice-service').textContent = selected.toLowerCase();
  document.querySelector('#notice-contact').textContent = sample.contact.toLowerCase();
  document.querySelector('#notice-time').textContent = sample.time || 'not selected';
  focusStep();
}
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => { selected = button.dataset.service; sample = {details:'', time:'', contact:'Call'}; first(); dialog.showModal(); focusStep(); }));
document.querySelector('#close-dialog').onclick = () => dialog.close();
dialog.addEventListener('close', stopPictures);
dialog.addEventListener('click', e => { if(e.target === dialog) dialog.close(); });
const help = document.querySelector('#help-panel'), toggle = document.querySelector('#help-toggle');
function setHelp(open) { help.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); if(open) help.querySelector('.close-help').focus(); else toggle.focus(); }
toggle.onclick = () => setHelp(help.hidden);
document.querySelector('.close-help').onclick = () => setHelp(false);
document.addEventListener('keydown', e => { if(e.key === 'Escape' && !help.hidden) setHelp(false); });
// Practice only: these replies are fixed examples and messages stay in this page.
const demoReplies = [
  'Hi! This chat is still in preview. Phone and text contact options will be added later.',
  'Thanks for stopping by! I can help with groceries, errands, heavy items, and medicine pickup.',
  'Groceries can come from Walmart, Food Lion, Aldi, Publix, and more. Discuss your list and preferred store before shopping.',
  'Medicine pickup can include CVS and Walgreens. Pharmacy authorization and pickup arrangements need to be confirmed first.',
  'Need help with something heavy? Water, paper products, and pet food are examples of items Latricia may help with.',
  'A family member or caregiver is welcome to call or text Latricia on your behalf.',
  'The example number is 555-555-5555. It is a placeholder and cannot receive calls or texts.',
  'Latricia can discuss availability and timing with you directly.',
  'Any fees and item costs should be discussed with Latricia before you agree to a service.',
  'Thanks for trying the preview! No message was sent. Contact options will be added when they are ready.'
];
function replyFor(message) {
  const rules = [[/price|cost|fee|charge|pay/,8],[/medicine|prescription|pharmacy|\brx\b/,3],[/grocery|groceries|food|shop/,2],[/heavy|water|pet food/,4],[/family|caregiver|parent|mother|father/,5],[/phone|number|call|text/,6],[/when|time|available|availability|hour|today|tomorrow/,7],[/thank/,9],[/^(hi|hello|hey)\b/,0],[/service|help|errand/,1]];
  const match = rules.find(([pattern]) => pattern.test(message.toLowerCase()));
  return match ? demoReplies[match[1]] : 'This practice chat can explain groceries, medicine pickup, heavy items, timing, and sample fees. Choose a topic below or ask about one of those. No message is sent to Latricia.';
}
const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#chat-input');
const chatMessages = document.querySelector('#chat-messages');
chatForm.addEventListener('submit', event => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;
  const userMessage = document.createElement('p');
  userMessage.className = 'chat-user';
  const userLabel = document.createElement('strong');
  userLabel.textContent = 'You';
  userMessage.append(userLabel, document.createElement('br'), document.createTextNode(message));
  const response = document.createElement('p');
  response.className = 'chat-reply';
  const responseLabel = document.createElement('strong');
  responseLabel.textContent = 'Example reply';
  response.append(responseLabel, document.createElement('br'), document.createTextNode(replyFor(message)));

  chatMessages.append(userMessage, response);
  chatInput.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;
  chatInput.focus();
});

const easyToggle = document.querySelector('#easy-toggle');
function setEasyView(enabled, moveFocus = false) {
  document.body.classList.toggle('easy-view', enabled);
  easyToggle.setAttribute('aria-pressed', String(enabled));
  easyToggle.textContent = enabled ? 'Return to regular view' : 'Use Easy View';
  document.querySelector('.easy-intro').hidden = !enabled;
  try { localStorage.setItem('helping-hands-easy-view', enabled ? 'on' : 'off'); } catch (error) { /* preference is optional */ }
  if (moveFocus && enabled) document.querySelector('#services').focus();
}
try { setEasyView(localStorage.getItem('helping-hands-easy-view') === 'on'); } catch (error) { setEasyView(false); }
easyToggle.addEventListener('click', () => setEasyView(!document.body.classList.contains('easy-view'), true));

document.querySelectorAll('[data-open-chat]').forEach(button => button.addEventListener('click', () => { setHelp(true); chatInput.focus(); }));
document.querySelectorAll('[data-chat-topic]').forEach(button => button.addEventListener('click', () => { chatInput.value = button.dataset.chatTopic; chatForm.requestSubmit(); }));
