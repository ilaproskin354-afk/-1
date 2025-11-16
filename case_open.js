
const CASES_MAP = {
  premium: {name:'Premium Case', items:[{name:'Rare Hat',rarity:'rare'},{name:'Skin A',rarity:'uncommon'},{name:'Common Token',rarity:'common'}]},
  dominus: {name:'Dominus Case', items:[{name:'Dominus',rarity:'epic'},{name:'Rare Cloak',rarity:'rare'},{name:'Common Token',rarity:'common'}]},
  limited: {name:'Limited U Case', items:[{name:'Unique Pet',rarity:'legend'},{name:'Limited Skin',rarity:'epic'},{name:'Common Token',rarity:'common'}]},
  pet: {name:'Exclusive Pet Case', items:[{name:'Pet Dragon',rarity:'epic'},{name:'Pet Cat',rarity:'rare'},{name:'Pet Food',rarity:'common'}]},
  random: {name:'Random RBX Case', items:[{name:'Random Rare',rarity:'rare'},{name:'Random Uncommon',rarity:'uncommon'},{name:'Common Token',rarity:'common'}]}
};
function buildStrip(items){ const inner=document.getElementById('stripInner'); inner.innerHTML=''; // fill many times to simulate long strip
  for(let r=0;r<6;r++){ for(const it of items){ const card=document.createElement('div'); card.className='strip-card'; card.innerHTML=`<div>${it.name}</div><div class="small">${it.rarity}</div>`; inner.appendChild(card);} } }
function startAnim(){ const id = localStorage.getItem('open_case')||'random'; const cfg = CASES_MAP[id] || CASES_MAP['random']; document.getElementById('caseTitle').textContent = 'Открытие: '+cfg.name; buildStrip(cfg.items); const inner=document.getElementById('stripInner'); document.getElementById('caseStart').play().catch(()=>{}); // compute target
  // choose result by weighted random from cfg.items
  const items = cfg.items; const weights = items.map((it,i)=>{ if(it.rarity==='legend') return 0.01; if(it.rarity==='epic') return 0.05; if(it.rarity==='rare') return 0.15; return 0.79; });
  const total = weights.reduce((a,b)=>a+b,0); let r=Math.random()*total; let chosen=items[items.length-1]; for(let i=0;i<weights.length;i++){ r-=weights[i]; if(r<=0){ chosen=items[i]; break; } }
  // find an index in strip to stop at chosen (approx center)
  const cards = inner.children; let stopIndex= Math.floor(cards.length/2) + Math.floor(Math.random()*cards.length/6); // find nearest matching name
  for(let i=0;i<cards.length;i++){ if(cards[i].textContent.includes(chosen.name)){ stopIndex = i; break; } }
  const cardWidth = cards[0].offsetWidth + 12; const container = inner.parentElement; const containerWidth = container.offsetWidth;
  const targetX = -(stopIndex*cardWidth) + (containerWidth/2) - (cardWidth/2);
  // animate via transition
  inner.style.transition = 'transform 3s cubic-bezier(.2,.8,.2,1)';
  inner.style.transform = 'translateX('+targetX+'px)';
  setTimeout(()=>{ document.getElementById('caseDrop').play().catch(()=>{}); document.getElementById('caseResult').textContent = 'Вы получили: '+chosen.name+' ('+chosen.rarity+')'; if(chosen.rarity==='legend' || chosen.rarity==='epic') document.getElementById('caseWin').play().catch(()=>{}); // save to inventory
    const inv = JSON.parse(localStorage.getItem('rbx_inv')||'[]'); inv.push({name:chosen.name, rarity:chosen.rarity, time:Date.now()}); localStorage.setItem('rbx_inv', JSON.stringify(inv));
    // save log
    const logs = JSON.parse(localStorage.getItem('rbx_logs')||'[]'); logs.unshift({time:Date.now(),type:'case',case:id,item:chosen.name,rarity:chosen.rarity}); localStorage.setItem('rbx_logs', JSON.stringify(logs));
  }, 3200);
}
document.getElementById('startAnim').addEventListener('click', startAnim);
window.addEventListener('load', ()=>{ /* build sample strip so layout stabilizes */ const id = localStorage.getItem('open_case')||'random'; const cfg = CASES_MAP[id] || CASES_MAP['random']; buildStrip(cfg.items); });
