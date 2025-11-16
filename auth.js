
document.getElementById('btnReg')?.addEventListener('click', ()=>{
  const nick = document.getElementById('regNick').value.trim();
  const pass = document.getElementById('regPass').value;
  if(!nick||!pass){ alert('Введите ник и пароль'); return; }
  const users = JSON.parse(localStorage.getItem('rbx_users')||'{}');
  if(users[nick]){ alert('Пользователь существует'); return; }
  users[nick] = {nick, pass, bal:5000};
  localStorage.setItem('rbx_users', JSON.stringify(users));
  localStorage.setItem('rbx_user', JSON.stringify({nick}));
  localStorage.setItem('rbx_balance', 5000);
  alert('Зарегистрированы и вошли. Баланс: 5000 Robux (фейк)');
  location.href='profile.html';
});
document.getElementById('btnLogin')?.addEventListener('click', ()=>{
  const nick = document.getElementById('loginNick').value.trim();
  const pass = document.getElementById('loginPass').value;
  const users = JSON.parse(localStorage.getItem('rbx_users')||'{}');
  if(users[nick] && users[nick].pass===pass){
    localStorage.setItem('rbx_user', JSON.stringify({nick}));
    localStorage.setItem('rbx_balance', users[nick].bal || 5000);
    alert('Успешный вход');
    location.href='profile.html';
  } else alert('Неверный логин или пароль');
});
document.getElementById('btnGoogle')?.addEventListener('click', ()=>{
  // simulate google auth UI-only
  const fake = {nick:'google_user_'+Math.floor(Math.random()*9999)};
  localStorage.setItem('rbx_user', JSON.stringify(fake));
  localStorage.setItem('rbx_balance', 5000);
  alert('Вход через Google (симуляция) как '+fake.nick);
  location.href='profile.html';
});
