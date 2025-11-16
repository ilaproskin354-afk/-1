
const CASES = [
  {id:'premium', name:'Premium Case', price:500, items:[{name:'Rare Hat',chance:0.05,rarity:'rare'},{name:'Skin A',chance:0.15,rarity:'uncommon'},{name:'Common Token',chance:0.8,rarity:'common'}]},
  {id:'dominus', name:'Dominus Case', price:1500, items:[{name:'Dominus',chance:0.02,rarity:'epic'},{name:'Rare Cloak',chance:0.08,rarity:'rare'},{name:'Common Token',chance:0.9,rarity:'common'}]},
  {id:'limited', name:'Limited U Case', price:3000, items:[{name:'Unique Pet',chance:0.01,rarity:'legend'},{name:'Limited Skin',chance:0.09,rarity:'epic'},{name:'Common Token',chance:0.9,rarity:'common'}]},
  {id:'pet', name:'Exclusive Pet Case', price:800, items:[{name:'Pet Dragon',chance:0.03,rarity:'epic'},{name:'Pet Cat',chance:0.12,rarity:'rare'},{name:'Pet Food',chance:0.85,rarity:'common'}]},
  {id:'random', name:'Random RBX Case', price:200, items:[{name:'Random Rare',chance:0.07,rarity:'rare'},{name:'Random Uncommon',chance:0.2,rarity:'uncommon'},{name:'Common Token',chance:0.73,rarity:'common'}]}
];
function renderCases(){ const wrap=document.getElementById('casesGrid'); CASES.forEach(c=>{ const card=document.createElement('div'); card.className='case-card'; card.innerHTML=`<h4>${c.name}</h4><div>Цена: ${c.price} Robux</div><div style="margin-top:8px"><button class="btn openCaseBtn" data-id="${c.id}">Открыть</button> <button class="btn ghost buyCaseBtn" data-id="${c.id}">Купить</button></div>`; wrap.appendChild(card); }); document.querySelectorAll('.openCaseBtn').forEach(b=>b.addEventListener('click', ()=>openCase(b.dataset.id))); document.querySelectorAll('.buyCaseBtn').forEach(b=>buyCase(b.dataset.id));}
function buyCase(id){ document.querySelectorAll('.buyCaseBtn[data-id]'); }
function openCase(id){ localStorage.setItem('open_case', id); location.href='case_open.html'; }
document.addEventListener('DOMContentLoaded', renderCases);
