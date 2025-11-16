
let balance = Number(localStorage.getItem('rbx_balance')||0);
const user = JSON.parse(localStorage.getItem('rbx_user')||'null');
document.getElementById('balance').textContent = balance;
const spinS = document.getElementById('spinS');
const winS = document.getElementById('winS');
const symbols = ['🍒','🍋','🍊','⭐','7️⃣'];
function updateBal(){ localStorage.setItem('rbx_balance', balance); document.getElementById('balance').textContent = balance; }
function showMsg(t){ const m = document.getElementById('slotMsg'); m.textContent = t; setTimeout(()=>{ m.textContent=''; },4000); }
document.getElementById('spinBtn').addEventListener('click', ()=>{
  const cost = 100;
  if(!user){ alert('Войдите в аккаунт'); location.href='login.html'; return; }
  if(balance < cost){ showMsg('Недостаточно Robux'); return; }
  balance -= cost; updateBal();
  spinS.play().catch(()=>{});
  let ticks = 20 + Math.floor(Math.random()*30);
  let i=0; const reel = document.getElementById('reels');
  const iv = setInterval(()=>{
    reel.innerHTML = '<div class="symbol">'+symbols[Math.floor(Math.random()*symbols.length)]+'</div><div class="symbol">'+symbols[Math.floor(Math.random()*symbols.length)]+'</div><div class="symbol">'+symbols[Math.floor(Math.random()*symbols.length)]+'</div>';
    i++;
    if(i>=ticks){ clearInterval(iv);
      const chance = Math.random();
      if(chance > 0.92){
        const win = 500 + Math.floor(Math.random()*2500);
        balance += win; updateBal(); winS.play().catch(()=>{}); showMsg('Большой выигрыш: +'+win+' Robux'); pushLog('win','big',win);
      } else if(chance > 0.7){
        const win = 50 + Math.floor(Math.random()*200);
        balance += win; updateBal(); winS.play().catch(()=>{}); showMsg('Выигрыш: +'+win+' Robux'); pushLog('win','small',win);
      } else { showMsg('Проигрыш'); pushLog('loss','spin',0); }
    }
  },80);
});
document.getElementById('openCaseBtn').addEventListener('click', ()=>{ location.href='cases.html'; });
function pushLog(type, subtype, amount){
  const logs = JSON.parse(localStorage.getItem('rbx_logs')||'[]');
  logs.unshift({time:Date.now(), type, subtype, amount, bal:balance, user: (user?user.nick:'guest')});
  localStorage.setItem('rbx_logs', JSON.stringify(logs));
}
