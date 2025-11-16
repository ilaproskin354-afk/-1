
document.getElementById('w_send').addEventListener('click', ()=>{
  const amt = Number(document.getElementById('w_amount').value||0);
  const method = document.getElementById('w_method').value;
  if(amt<=0){ alert('Введите сумму'); return; }
  const withdraws = JSON.parse(localStorage.getItem('rbx_withdraws')||'[]');
  withdraws.unshift({time:Date.now(), amount:amt, method:method, status:'processing', user: (JSON.parse(localStorage.getItem('rbx_user')||'null')||{nick:'guest'}).nick});
  localStorage.setItem('rbx_withdraws', JSON.stringify(withdraws));
  document.getElementById('w_status').textContent = 'Заявка создана (фейк). Админ увидит заявку.';
});
