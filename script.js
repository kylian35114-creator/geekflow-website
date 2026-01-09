
// Sections animation
const sections=document.querySelectorAll('section');
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add('show');});},{threshold:0.1});
sections.forEach(section=>observer.observe(section));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{anchor.addEventListener('click',function(e){e.preventDefault();document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});});});

// Back to top
const backToTop=document.getElementById('backToTop');
window.addEventListener('scroll',()=>{backToTop.style.display=window.scrollY>300?'block':'none';});
backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Canvas ultra dynamique
const canvas=document.getElementById('heroCanvas');
const ctx=canvas.getContext('2d');
let w=canvas.width=window.innerWidth;
let h=canvas.height=window.innerHeight;
const particles=[];
for(let i=0;i<150;i++){particles.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*1.5,vy:(Math.random()-0.5)*1.5,r:Math.random()*3+1});}
const logoImg=new Image();
logoImg.src='assets/logo.png';
function drawLogo(){const size=150+10*Math.sin(Date.now()/500);ctx.drawImage(logoImg,w/2-size/2,h/2-size/2,size,size);}
function animate(){ctx.clearRect(0,0,w,h);particles.forEach(p=>{ctx.beginPath();ctx.fillStyle='rgba(57,255,20,0.6)';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();for(let j=0;j<particles.length;j++){const p2=particles[j];const dx=p.x-p2.x;const dy=p.y-p2.y;const dist=Math.sqrt(dx*dx+dy*dy);if(dist<120){ctx.beginPath();ctx.strokeStyle=`rgba(57,255,20,${1-dist/120})`;ctx.lineWidth=1;ctx.moveTo(p.x,p.y);ctx.lineTo(p2.x,p2.y);ctx.stroke();}}p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;});drawLogo();requestAnimationFrame(animate);}
animate();
window.addEventListener('resize',()=>{w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight;});

// Service cards animation
const serviceCards=document.querySelectorAll('.service-card');
const cardObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.style.transform='rotateY(0deg) rotateX(0deg) translateY(0)';entry.target.style.boxShadow='0 0 25px var(--green-neon)';}});},{threshold:0.1});
serviceCards.forEach(card=>cardObserver.observe(card));

// Form mailto
const form=document.querySelector('.contact form');
form.addEventListener('submit',e=>{e.preventDefault();const name=form.name.value;const email=form.email.value;const message=form.message.value;const mailtoLink=`mailto:contact@geekflow.com?subject=Message de ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AEmail: ${encodeURIComponent(email)}`;window.location.href=mailtoLink;alert('Merci pour votre message !');form.reset();});
