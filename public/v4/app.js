/* Progressive controls only. The entire personal record lives in the HTML. */
(()=>{'use strict';
const menu=document.getElementById('menu'),trigger=document.querySelector('.menu-trigger'),close=document.querySelector('.menu-close');
if(menu&&typeof menu.showModal==='function'){
 trigger.hidden=false;trigger.setAttribute('aria-expanded','false');
 const dismiss=()=>{menu.close();trigger.setAttribute('aria-expanded','false');trigger.focus({preventScroll:true})};
 trigger.addEventListener('click',()=>{menu.showModal();trigger.setAttribute('aria-expanded','true');close.focus()});
 close.addEventListener('click',dismiss);menu.addEventListener('cancel',e=>{e.preventDefault();dismiss()});
 menu.addEventListener('click',e=>{if(e.target===menu){const r=menu.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dismiss()}});
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{const target=document.querySelector(a.hash);menu.close();trigger.setAttribute('aria-expanded','false');if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView()}}));
 menu.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const els=[...menu.querySelectorAll('a[href],button')];if(e.shiftKey&&document.activeElement===els[0]){e.preventDefault();els.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===els.at(-1)){e.preventDefault();els[0].focus()}});
}
document.querySelector('.skip').addEventListener('click',()=>document.getElementById('main').focus({preventScroll:true}));
document.querySelectorAll('a[href="#source-ai"]').forEach(a=>a.addEventListener('click',()=>document.getElementById('source-ai').open=true));
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.featured-work,.talk-grid,.ge-gallery').forEach((rail,index)=>{
 const id='rail-'+index;rail.id=id;rail.tabIndex=0;rail.setAttribute('role','region');const noun=rail.matches('.featured-work')?'venture':rail.matches('.talk-grid')?'talk':'photo';const label={venture:'Featured ventures',talk:'TEDx talks',photo:'Life at Global Esports photos'}[noun];rail.setAttribute('aria-label',label+', horizontally scrollable on phones');
 const controls=document.createElement('div');controls.className='rail-controls';controls.hidden=true;
 controls.innerHTML='<span>Swipe or use the arrows <span class="position" aria-live="polite"></span></span><div><button type="button" aria-label="Previous '+noun+'" aria-controls="'+id+'">←</button><button type="button" aria-label="Next '+noun+'" aria-controls="'+id+'">→</button></div>';
 rail.after(controls);const [prev,next]=controls.querySelectorAll('button'),pos=controls.querySelector('.position');
 const update=()=>{const max=rail.scrollWidth-rail.clientWidth;controls.hidden=max<5;prev.disabled=rail.scrollLeft<3;next.disabled=rail.scrollLeft>=max-3;const w=rail.firstElementChild.getBoundingClientRect().width+parseFloat(getComputedStyle(rail).gap||'0');pos.textContent=' · '+Math.min(rail.children.length,Math.round(rail.scrollLeft/w)+1)+' / '+rail.children.length};
 const scroll=dir=>rail.scrollBy({left:dir*(rail.firstElementChild.getBoundingClientRect().width+parseFloat(getComputedStyle(rail).gap||'0')),behavior:reduce.matches?'instant':'smooth'});
 prev.addEventListener('click',()=>scroll(-1));next.addEventListener('click',()=>scroll(1));
 rail.addEventListener('keydown',e=>{if(e.target!==rail)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();scroll(e.key==='ArrowRight'?1:-1)}if(e.key==='Home'||e.key==='End'){e.preventDefault();rail.scrollTo({left:e.key==='Home'?0:rail.scrollWidth,behavior:reduce.matches?'instant':'smooth'})}});
 rail.addEventListener('scroll',update,{passive:true});new ResizeObserver(update).observe(rail);update();
});
const navLinks=[...document.querySelectorAll('.site-header nav a')];
const observer=new IntersectionObserver(entries=>{const entry=entries.filter(x=>x.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!entry)return;navLinks.forEach(a=>a.hash==='#'+entry.target.id?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current'))},{rootMargin:'-15% 0px -45% 0px',threshold:[0,.1,.5]});
navLinks.forEach(a=>{const s=document.querySelector(a.hash);if(s)observer.observe(s)});
})();
