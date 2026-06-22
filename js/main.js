// claudia-kanitz.de - Interaktionen (Erstentwurf)
(function(){
  // Mobile-Nav
  var t=document.getElementById('navToggle'), n=document.getElementById('navLinks');
  if(t&&n){t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o);});}

  // Cookie-Consent (Gate vor Tracking)
  var c=document.getElementById('cookieBanner');
  function setConsent(v){try{localStorage.setItem('ck_consent',v);}catch(e){} if(c){c.classList.add('hidden');c.setAttribute('hidden','');}}
  if(c){
    var saved=null; try{saved=localStorage.getItem('ck_consent');}catch(e){}
    if(!saved){c.removeAttribute('hidden');c.classList.remove('hidden');}
    c.querySelectorAll('[data-consent]').forEach(function(b){
      b.addEventListener('click',function(){setConsent(b.getAttribute('data-consent'));
        // Hier später: if(accept) Tracker laden.
      });
    });
  }

  // PEM-Selbstcheck (rein clientseitig, keine Speicherung)
  var btn=document.getElementById('pemBtn'), res=document.getElementById('pemResult');
  if(btn&&res){
    btn.addEventListener('click',function(){
      var n=0; for(var i=1;i<=5;i++){var q=document.getElementById('q'+i); if(q&&q.checked)n++;}
      var msg;
      if(n>=3){msg='<b>'+n+' von 5 Anzeichen.</b> Mehrere deiner Antworten passen zu PEM, dem Kernsymptom von ME/CFS und Long COVID. Das ist keine Diagnose, aber ein deutliches Signal, das Thema ernst zu nehmen. Sprich mit einer ärztlichen Fachperson und schau dir Pacing an.';}
      else if(n>=1){msg='<b>'+n+' von 5 Anzeichen.</b> Einige Punkte treffen zu. Beobachte dich weiter und halte deine Belastungsgrenzen im Blick. Im Magazin findest du erste Hilfen.';}
      else {msg='<b>Keine der Aussagen angekreuzt.</b> Wenn du dir dennoch Sorgen machst, vertraue deinem Gefühl und sprich mit einer ärztlichen Fachperson.';}
      res.innerHTML=msg; res.classList.add('show');
    });
  }

  // Formular-Demos (noch ohne Backend)
  function demo(form,msgId,text){
    if(!form)return;
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var m=document.getElementById(msgId);
      if(!form.checkValidity()){if(m){m.style.color='var(--red)';m.textContent='Bitte fülle die Pflichtfelder aus und stimme der Datenschutzerklärung zu.';}return;}
      if(m){m.style.color='var(--sea-deep)';m.textContent=text;}
      form.reset();
    });
  }
  demo(document.getElementById('leadForm'),'leadMsg','Danke! Sobald die Anbindung steht, bekommst du den Selbstcheck per E-Mail.');
  demo(document.getElementById('contactForm'),'contactMsg','Danke für deine Nachricht! Sobald der Versand verbunden ist, erreicht sie uns direkt.');

  // Dezente Scroll-Reveals (nur ohne reduced-motion, mit IntersectionObserver)
  try {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && 'IntersectionObserver' in window) {
      document.documentElement.classList.add('reveal-on');
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      document.querySelectorAll('main > section').forEach(function(s, i){ if(i>0){ s.classList.add('reveal'); io.observe(s); } });
    }
  } catch(e){}
})();
