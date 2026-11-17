const sampleReviews = [
 'Latricia helped make a grocery trip feel simple and manageable.',
 'I appreciated how clearly Latricia explained the service and the price.',
 'It was nice to have a friendly person to call when I needed a hand.',
 'Latricia made it easy for my family to help arrange an errand.',
 'Having help with a heavy case of water made my day easier.',
 'The option to call instead of using an app makes a big difference.',
 'Latricia took the time to listen to what I needed.',
 'I liked knowing what to expect before confirming anything.',
 'A helping hand with errands can mean so much on a busy day.',
 'The simple steps made it easy to understand how to get started.'
];
const reviewTrack=document.querySelector('#review-track');
function reviewCard(quote,i,duplicate=false){const card=document.createElement('article');card.className='review-card';if(duplicate)card.setAttribute('aria-hidden','true');const stars=document.createElement('div');stars.className='review-stars';stars.setAttribute('aria-label','Five example stars');stars.textContent='★★★★★';const text=document.createElement('blockquote');text.textContent='“'+quote+'”';const person=document.createElement('div');person.className='review-person';const photo=document.createElement('img');photo.src=`assets/review-portrait-${i%3+1}.png`;photo.alt='';const label=document.createElement('span');label.textContent='Fictional example · AI portrait';person.append(photo,label);card.append(stars,text,person);return card}
sampleReviews.forEach((quote,i)=>reviewTrack.append(reviewCard(quote,i)));sampleReviews.forEach((quote,i)=>reviewTrack.append(reviewCard(quote,i,true)));
const reviewToggle=document.querySelector('#review-toggle');reviewToggle.addEventListener('click',()=>{const paused=reviewTrack.classList.toggle('paused');reviewToggle.setAttribute('aria-pressed',String(paused));reviewToggle.textContent=paused?'Play reviews':'Pause reviews'});
