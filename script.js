/* ==========================================
   LOVE PROJECT
   PART 1
========================================== */

const loading = document.getElementById("loading");
const giftSection = document.getElementById("giftSection");
const openGift = document.getElementById("openGift");
const giftBox = document.getElementById("giftBox");
const music = document.getElementById("bgMusic");

const progress = document.querySelector(".progress");
const percent = document.getElementById("percent");

const typing = document.getElementById("typing");

let value = 0;

/* ===========================
   Loading
=========================== */

giftSection.style.display = "none";

const loadingTimer = setInterval(() => {

    value++;

    progress.style.width = value + "%";

    percent.innerHTML = value + "%";

    if (value >= 100) {

        clearInterval(loadingTimer);

        loading.style.display = "none";

        giftSection.style.display = "flex";

    }

}, 35);


/* ===========================
   Open Gift
=========================== */

openGift.addEventListener("click", () => {

    document.querySelector(".lid").style.transform =
        "rotate(-130deg) translateY(-20px)";

    giftBox.style.transform = "scale(1.08)";

    setTimeout(() => {

        giftSection.style.display = "none";

        document.getElementById("letter").scrollIntoView({
            behavior: "smooth"
        });

    }, 1600);

    music.play().catch(() => {});

});


/* ===========================
   Typing Effect
=========================== */

const message = `

Gửi bé Huyền yêu dấu của anh ❤️

Anh không biết sau này sẽ có bao nhiêu mùa hè nữa...

Nhưng anh biết...

Mỗi ngày có em đều là một ngày rất đẹp.

Cảm ơn em vì đã xuất hiện.

Cảm ơn em vì những nụ cười.

Cảm ơn em vì đã khiến trái tim anh rung động.

Nếu sau này...

Có thật nhiều bức ảnh...

Anh hy vọng...

Trong những bức ảnh đó...

Sẽ luôn có anh đứng cạnh em.

❤️

`;

let i = 0;

function typeWriter() {

    if (i < message.length) {

        typing.innerHTML += message.charAt(i);

        i++;

        setTimeout(typeWriter, 45);

    }

}

setTimeout(typeWriter, 2500);


/* ===========================
   Countdown
=========================== */

const targetDate = new Date("2026-06-19T00:00:00");

function updateCounter() {

    const now = new Date();

    let diff = now - targetDate;

    if (diff < 0) diff = 0;

    const day = Math.floor(diff / 86400000);

    const hour = Math.floor(diff % 86400000 / 3600000);

    const minute = Math.floor(diff % 3600000 / 60000);

    const second = Math.floor(diff % 60000 / 1000);

    document.getElementById("days").innerHTML = day;

    document.getElementById("hours").innerHTML = hour;

    document.getElementById("minutes").innerHTML = minute;

    document.getElementById("seconds").innerHTML = second;

}

setInterval(updateCounter, 1000);

updateCounter();
/* ==========================================
   LOVE PROJECT
   PART 2
========================================== */


/* ===========================
   Falling Petals
=========================== */

const petals = document.querySelector(".petals");

function createPetal() {

    const petal = document.createElement("div");

    petal.className = "petal";

    petal.style.left = Math.random() * window.innerWidth + "px";

    petal.style.animationDuration = (6 + Math.random() * 6) + "s";

    petal.style.opacity = Math.random();

    petal.style.transform =
        "rotate(" + Math.random() * 360 + "deg)";

    petals.appendChild(petal);

    setTimeout(() => {

        petal.remove();

    }, 12000);

}

setInterval(createPetal, 280);



/* ===========================
   Floating Hearts
=========================== */

const hearts = document.querySelector(".hearts");

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤";

    heart.style.left = Math.random() * window.innerWidth + "px";

    heart.style.fontSize =
        (16 + Math.random() * 24) + "px";

    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 10000);

}

setInterval(createHeart, 500);



/* ===========================
   Music Button
=========================== */

const musicBtn = document.getElementById("musicBtn");

let playing = false;

musicBtn.addEventListener("click", () => {

    if (!playing) {

        music.play();

        playing = true;

        musicBtn.innerHTML = "⏸ Tạm dừng";

    } else {

        music.pause();

        playing = false;

        musicBtn.innerHTML = "🎵 Phát nhạc";

    }

});



/* ===========================
   Back To Top
=========================== */

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backTop.style.display = "block";

    } else {

        backTop.style.display = "none";

    }

});

backTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



/* ===========================
   Modal Image
=========================== */

const modal = document.getElementById("imageModal");

const modalImg = document.getElementById("modalImage");

const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".photo img").forEach(img => {

    img.addEventListener("click", () => {

        modal.style.display = "flex";

        modalImg.src = img.src;

    });

});

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

modal.addEventListener("click", e => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});



/* ===========================
   Scroll Animation
=========================== */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll("section").forEach(section => {

    section.style.opacity = "0";

    section.style.transform = "translateY(80px)";

    section.style.transition = "1s";

    observer.observe(section);

});
/* ==========================================
   LOVE PROJECT
   PART 3
========================================== */

/* ===========================
   Show Final Message
=========================== */

const showFinal = document.getElementById("showFinal");
const finalMessage = document.getElementById("finalMessage");

if (finalMessage) {
    finalMessage.style.display = "none";
}

showFinal.addEventListener("click", () => {

    finalMessage.style.display = "flex";

    finalMessage.scrollIntoView({
        behavior: "smooth"
    });

});


/* ===========================
   Simple Firework Effect
=========================== */

const fireCanvas = document.getElementById("fireCanvas");
const ctx = fireCanvas.getContext("2d");

function resizeCanvas() {
    fireCanvas.width = window.innerWidth;
    fireCanvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

function createFirework(x, y) {

    for (let i = 0; i < 80; i++) {

        particles.push({

            x,
            y,

            dx: (Math.random() - 0.5) * 10,

            dy: (Math.random() - 0.5) * 10,

            life: 100,

            color: `hsl(${Math.random()*360},100%,70%)`

        });

    }

}

function animateFirework() {

    ctx.clearRect(0,0,fireCanvas.width,fireCanvas.height);

    particles.forEach((p,index)=>{

        p.x += p.dx;

        p.y += p.dy;

        p.dy += 0.05;

        p.life--;

        ctx.beginPath();

        ctx.arc(p.x,p.y,2,0,Math.PI*2);

        ctx.fillStyle = p.color;

        ctx.fill();

        if(p.life<=0){

            particles.splice(index,1);

        }

    });

    requestAnimationFrame(animateFirework);

}

animateFirework();

showFinal.addEventListener("click",()=>{

    for(let i=0;i<6;i++){

        setTimeout(()=>{

            createFirework(

                Math.random()*window.innerWidth,

                Math.random()*window.innerHeight/2

            );

        },i*400);

    }

});


/* ===========================
   Cursor Heart
=========================== */

document.addEventListener("mousemove",(e)=>{

    const heart=document.createElement("div");

    heart.innerHTML="❤";

    heart.style.position="fixed";

    heart.style.left=e.clientX+"px";

    heart.style.top=e.clientY+"px";

    heart.style.pointerEvents="none";

    heart.style.color="#ff5d94";

    heart.style.fontSize="14px";

    heart.style.transition="1s";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.style.transform="translateY(-40px) scale(1.5)";

        heart.style.opacity="0";

    },10);

    setTimeout(()=>{

        heart.remove();

    },1000);

});


/* ===========================
   Console Message
=========================== */

console.log("%c❤️ Gửi Bé Huyền ❤️",
"font-size:26px;color:#ff5d94;font-weight:bold;");

console.log("%cNếu em đọc được dòng này...",
"font-size:18px;color:white;");

console.log("%cAnh chỉ muốn nói rằng...",
"font-size:18px;color:pink;");

console.log("%cCảm ơn em vì đã xuất hiện trong cuộc đời anh ❤️",
"font-size:20px;color:#ff6fa8;");
