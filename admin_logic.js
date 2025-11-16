
document.getElementById('admLoginBtn')?.addEventListener('click', ()=>{
  const u = document.getElementById('admUser').value.trim();
  const p = document.getElementById('admPass').value.trim();
  if(u==='adminrobux' && p==='1234'){ sessionStorage.setItem('rbx_admin','1'); showPanel(); loadLogs(); } else alert('Неверный логин');
});
function showPanel(){ document.getElementById('admLogin').classList.add('hidden'); document.getElementById('admPanel').classList.remove('hidden'); }
document.getElementById('admGiveWin')?.addEventListener('click', ()=>{ let bal=Number(localStorage.getItem('rbx_balance')||0); const win=2000+Math.floor(Math.random()*5000); bal+=win; localStorage.setItem('rbx_balance', bal); alert('Админу начислено: '+win); pushLog({time:Date.now(),type:'admin_win',amount:win}); loadLogs(); });
document.getElementById('admSetBal')?.addEventListener('click', ()=>{ const v=Number(prompt('Новый баланс игрока:', localStorage.getItem('rbx_balance')||0)); if(!isNaN(v)){ localStorage.setItem('rbx_balance', v); alert('Баланс установлен'); } });
document.getElementById('admWithdraws')?.addEventListener('click', ()=>{ const w = JSON.parse(localStorage.getItem('rbx_withdraws')||'[]'); const el=document.getElementById('admLogs'); el.innerHTML='<h4>Заявки</h4>'; w.forEach(x=>{ const d=document.createElement('div'); d.textContent=new Date(x.time).toLocaleString()+' | '+x.amount+' | '+x.method+' | '+x.status+' | user:'+x.user; el.appendChild(d); }); });
function pushLog(obj){ const logs=JSON.parse(localStorage.getItem('rbx_logs')||'[]'); logs.unshift(obj); localStorage.setItem('rbx_logs', JSON.stringify(logs)); }
function loadLogs(){ const logs=JSON.parse(localStorage.getItem('rbx_logs')||'[]'); const el=document.getElementById('admLogs'); el.innerHTML='<h4>Логи</h4>'; logs.forEach(l=>{ const d=document.createElement('div'); d.textContent = new Date(l.time).toLocaleString() + ' | ' + (l.type||'') + ' | ' + (l.item||'') + ' | ' + (l.amount||''); el.appendChild(d); }); }
if(sessionStorage.getItem('rbx_admin')==='1'){ showPanel(); loadLogs(); }
