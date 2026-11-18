const cardsDialog = document.querySelector('#cards-dialog');
const cardsContent = document.querySelector('#cards-content');
const sampleCards = new Set();
const cardTypes = {
  id: {name:'Identification', detail:'Sample ID · Alex Example', mark:'ID', note:'Identification requirements would be explained before any real document is requested.'},
  fsa: {name:'FSA card', detail:'Sample FSA card · ending 0000', mark:'FSA', note:'FSA acceptance and eligible purchases would need to be confirmed before using a real card.'}
};
function cardsFocus() { const h = cardsContent.querySelector('h2'); h.tabIndex=-1; h.focus(); cardsDialog.scrollTop=0; }
function chooseCard(){
  cardsContent.innerHTML='<h2 id="cards-title">What would you like to add?</h2><p>Choose a sample card to practice. No camera or real card is needed.</p><div class="card-type-list"></div>';
  for(const [key,type] of Object.entries(cardTypes)){
    const b=document.createElement('button');b.className='card-type';b.type='button';
    const icon=document.createElement('span');icon.className='sample-card-icon';icon.textContent=type.mark;icon.setAttribute('aria-hidden','true');
    const label=document.createElement('strong');label.textContent=type.name;
    b.append(icon,label);b.onclick=()=>prepareCard(key);cardsContent.querySelector('.card-type-list').append(b);
  }
  if(cardsDialog.open)cardsFocus();
}
function prepareCard(key){const type=cardTypes[key];cardsContent.innerHTML=`<h2 id="cards-title">Add ${type.name.toLowerCase()}</h2><ol class="scan-steps"><li>Use the sample card shown below.</li><li>Tap “Try sample scan” to fill in the example details.</li><li>Review the details before adding it.</li></ol><div class="sample-card-display"><strong>${type.mark}</strong><span>EXAMPLE ONLY</span><p>${type.detail}</p></div><p>${type.note}</p><div class="dialog-actions"><button class="button outline" id="card-back">Back</button><button class="button primary" id="sample-scan">Try sample scan</button></div>`;cardsContent.querySelector('#card-back').onclick=chooseCard;cardsContent.querySelector('#sample-scan').onclick=()=>reviewCard(key);cardsFocus();}
function reviewCard(key){const type=cardTypes[key];cardsContent.innerHTML=`<h2 id="cards-title">Check your sample card</h2><p>Here are the details from the simulated scan. Nothing was photographed or uploaded.</p><div class="notice"><strong>${type.name}</strong><p>${type.detail}</p><p>Cardholder: Alex Example</p></div><p>${type.note}</p><div class="dialog-actions"><button class="button outline" id="scan-again">Try again</button><button class="button primary" id="save-sample">Add sample card</button></div>`;cardsContent.querySelector('#scan-again').onclick=()=>prepareCard(key);cardsContent.querySelector('#save-sample').onclick=()=>{sampleCards.add(key);renderCards();cardsContent.innerHTML='<h2 id="cards-title">Sample card added</h2><p>You’ve completed the practice steps. This sample stays only on this page until you refresh. No real card, document, or payment was saved.</p><button class="button primary" id="cards-done">Done</button>';cardsContent.querySelector('#cards-done').onclick=()=>cardsDialog.close();cardsFocus();};cardsFocus();}
function renderCards(){const list=document.querySelector('#saved-sample-cards');list.replaceChildren();for(const key of sampleCards){const row=document.createElement('div');row.className='saved-sample';const label=document.createElement('span');label.textContent=cardTypes[key].detail;const remove=document.createElement('button');remove.className='button outline';remove.textContent='Remove';remove.setAttribute('aria-label','Remove '+cardTypes[key].name+' sample');remove.onclick=()=>{sampleCards.delete(key);renderCards();document.querySelector('#open-cards').focus();};row.append(label,remove);list.append(row);}}
document.querySelector('#open-cards').onclick=()=>{chooseCard();cardsDialog.showModal();cardsFocus();};document.querySelector('#close-cards').onclick=()=>cardsDialog.close();
