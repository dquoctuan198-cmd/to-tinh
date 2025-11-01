// 全局变量
let starfieldCanvas, starfieldCtx;
let meteorsCanvas, meteorsCtx;
let fireworksCanvas, fireworksCtx;
let stars = [];
let meteors = [];
let fireworks = [];
let animationId;
let nameParticles = [];
let currentSection = 'intro-section';
let herName = '';

// 音频元素
const bgMusic = document.getElementById('bg-music');
const starSound = document.getElementById('star-sound');
const fireworkSound = document.getElementById('firework-sound');

// DOM元素
const nameInput = document.getElementById('name-input');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const herNameElement = document.getElementById('her-name');
const nameDisplay = document.getElementById('name-display');

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    initCanvases();
    initStars();
    startAnimation();
    setupEventListeners();
    playBackgroundMusic();
});

// 初始化画布
function initCanvases() {
    // 星空背景画布
    starfieldCanvas = document.getElementById('starfield');
    starfieldCtx = starfieldCanvas.getContext('2d');
    
    // 流星画布
    meteorsCanvas = document.getElementById('meteors');
    meteorsCtx = meteorsCanvas.getContext('2d');
    
    // 烟花画布
    fireworksCanvas = document.getElementById('fireworks');
    fireworksCtx = fireworksCanvas.getContext('2d');
    
    // 设置画布尺寸
    resizeCanvases();
    window.addEventListener('resize', resizeCanvases);
}

// 调整画布尺寸
function resizeCanvases() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    [starfieldCanvas, meteorsCanvas, fireworksCanvas].forEach(canvas => {
        canvas.width = width;
        canvas.height = height;
    });
}

// 初始化星星
function initStars() {
    stars = [];
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * starfieldCanvas.width,
            y: Math.random() * starfieldCanvas.height,
            radius: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.5 + 0.1
        });
    }
}

// 开始动画循环
function startAnimation() {
    animationId = requestAnimationFrame(animate);
}

// 动画循环
function animate() {
    // 清除画布
    starfieldCtx.clearRect(0, 0, starfieldCanvas.width, starfieldCanvas.height);
    meteorsCtx.clearRect(0, 0, meteorsCanvas.width, meteorsCanvas.height);
    
    // 更新和绘制星星
    updateStars();
    
    // 更新和绘制流星
    updateMeteors();
    
    // 更新和绘制烟花
    updateFireworks();
    
    // 继续动画循环
    animationId = requestAnimationFrame(animate);
}

// 更新和绘制星星
function updateStars() {
    starfieldCtx.fillStyle = 'white';
    
    stars.forEach(star => {
        // 更新星星位置
        star.y += star.speed;
        if (star.y > starfieldCanvas.height) {
            star.y = 0;
            star.x = Math.random() * starfieldCanvas.width;
        }
        
        // 绘制星星
        starfieldCtx.globalAlpha = star.opacity;
        starfieldCtx.beginPath();
        starfieldCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        starfieldCtx.fill();
        starfieldCtx.globalAlpha = 1;
        
        // 随机闪烁效果
        if (Math.random() < 0.01) {
            star.opacity = Math.random() * 0.8 + 0.2;
        }
    });
}

// 更新和绘制流星
function updateMeteors() {
    // 随机添加流星
    if (Math.random() < 0.005) {
        addMeteor();
    }
    
    // 更新和绘制现有流星
    meteorsCtx.globalAlpha = 0.8;
    
    meteors.forEach((meteor, index) => {
        // 更新流星位置
        meteor.x += meteor.speedX;
        meteor.y += meteor.speedY;
        
        // 绘制流星
        meteorsCtx.beginPath();
        meteorsCtx.moveTo(meteor.x, meteor.y);
        meteorsCtx.lineTo(
            meteor.x - meteor.trailLength * meteor.speedX,
            meteor.y - meteor.trailLength * meteor.speedY
        );
        meteorsCtx.strokeStyle = meteor.color;
        meteorsCtx.lineWidth = meteor.width;
        meteorsCtx.stroke();
        
        // 移除超出屏幕的流星
        if (
            meteor.x < 0 ||
            meteor.x > meteorsCanvas.width ||
            meteor.y < 0 ||
            meteor.y > meteorsCanvas.height
        ) {
            meteors.splice(index, 1);
        }
    });
    
    meteorsCtx.globalAlpha = 1;
}

// 添加流星
function addMeteor() {
    const x = Math.random() > 0.5 ? -50 : meteorsCanvas.width + 50;
    const y = Math.random() * meteorsCanvas.height * 0.3;
    
    meteors.push({
        x,
        y,
        speedX: x < 0 ? Math.random() * 5 + 3 : -Math.random() * 5 - 3,
        speedY: Math.random() * 2 + 1,
        trailLength: Math.random() * 30 + 20,
        width: Math.random() * 2 + 1,
        color: `rgba(255, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 50)}, 0.8)`
    });
}

// 更新和绘制烟花
function updateFireworks() {
    fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    
    fireworks.forEach((firework, fireworkIndex) => {
        // 更新和绘制烟花粒子
        firework.particles.forEach((particle, particleIndex) => {
            // 更新粒子位置
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // 应用重力
            particle.vy += 0.1;
            
            // 绘制粒子
            fireworksCtx.beginPath();
            fireworksCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            fireworksCtx.fillStyle = particle.color;
            fireworksCtx.fill();
            
            // 移除死亡粒子
            if (particle.alpha <= 0) {
                firework.particles.splice(particleIndex, 1);
            }
            
            // 淡出效果
            particle.alpha -= 0.01;
            particle.radius -= 0.02;
        });
        
        // 移除没有粒子的烟花
        if (firework.particles.length === 0) {
            fireworks.splice(fireworkIndex, 1);
        }
    });
}

// 添加烟花
function addFirework(x, y) {
    const colors = [
        `hsl(${Math.random() * 60 + 300}, 100%, 50%)`, // 紫色
        `hsl(${Math.random() * 60 + 240}, 100%, 50%)`, // 蓝色
        `hsl(${Math.random() * 60 + 0}, 100%, 50%)`,   // 红色
        `hsl(${Math.random() * 60 + 180}, 100%, 50%)`, // 青色
        `hsl(${Math.random() * 60 + 120}, 100%, 50%)`  // 绿色
    ];
    
    const particleCount = 100;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        
        particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1
        });
    }
    
    fireworks.push({ particles });
    
    // 播放烟花音效
    playFireworkSound();
}

// 名字粒子动画
function animateNameParticles(name) {
    // 清除之前的粒子
    nameParticles = [];
    
    // 设置名字显示区
    nameDisplay.textContent = name;
    nameDisplay.style.opacity = 0;
    
    // 获取名字文本的位置和尺寸
    const rect = nameDisplay.getBoundingClientRect();
    const nameX = rect.left + window.scrollX + rect.width / 2;
    const nameY = rect.top + window.scrollY + rect.height / 2;
    
    // 创建粒子
    const particleCount = 200;
    
    for (let i = 0; i < particleCount; i++) {
        nameParticles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            targetX: nameX,
            targetY: nameY,
            radius: Math.random() * 2 + 1,
            speed: Math.random() * 2 + 1,
            color: `rgba(255, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 50)}, 0.8)`
        });
    }
    
    // 播放星星音效
    playStarSound();
    
    // 动画粒子汇聚成名字
    let progress = 0;
    const nameAnimation = setInterval(() => {
        progress += 0.02;
        
        nameParticles.forEach(particle => {
            // 计算粒子到目标位置的距离
            const dx = particle.targetX - particle.x;
            const dy = particle.targetY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // 移动粒子
            if (distance > 1) {
                particle.x += (dx / distance) * particle.speed;
                particle.y += (dy / distance) * particle.speed;
            }
        });
        
        // 绘制粒子
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = window.innerWidth;
        tempCanvas.height = window.innerHeight;
        
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        
        nameParticles.forEach(particle => {
            tempCtx.beginPath();
            tempCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            tempCtx.fillStyle = particle.color;
            tempCtx.fill();
        });
        
        // 当粒子足够接近目标时，显示名字并停止粒子动画
        if (progress >= 1) {
            clearInterval(nameAnimation);
            nameDisplay.style.opacity = 1;
            
            // 3秒后名字散开成流星雨
            setTimeout(() => {
                nameDisplay.style.opacity = 0;
                
                // 粒子散开
                const scatterAnimation = setInterval(() => {
                    nameParticles.forEach(particle => {
                        particle.x += (Math.random() - 0.5) * 10;
                        particle.y += (Math.random() - 0.5) * 10;
                        particle.radius -= 0.05;
                    });
                    
                    // 清除散开的粒子
                    nameParticles = nameParticles.filter(particle => particle.radius > 0);
                    
                    if (nameParticles.length === 0) {
                        clearInterval(scatterAnimation);
                        showSection('confession-section');
                    }
                }, 30);
            }, 3000);
        }
    }, 30);
}

// 事件监听器
function setupEventListeners() {
    // 开始按钮点击事件
    startBtn.addEventListener('click', () => {
        herName = nameInput.value.trim();
        
        if (herName) {
            // 更新表白文字中的名字
            herNameElement.textContent = herName;
            
            // 显示名字区域
            showSection('name-section');
            
            // 开始名字粒子动画
            animateNameParticles(herName);
        } else {
            alert('请输入TA的名字');
        }
    });
    
    // 愿意按钮点击事件
    yesBtn.addEventListener('click', () => {
        // 显示庆祝区域
        showSection('celebration-section');
        
        // 触发烟花效果
        triggerFireworks();
    });
    
    // 不愿意按钮点击事件
    noBtn.addEventListener('click', () => {
        if (noBtn.textContent === '不愿意') {
            noBtn.textContent = '再考虑一下？';
        } else {
            noBtn.textContent = '不愿意';
            resetPage();
        }
    });
    
    // 重新开始按钮点击事件
    restartBtn.addEventListener('click', resetPage);
    
    // 输入框回车事件
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            startBtn.click();
        }
    });
}

// 显示指定区域，隐藏其他区域
function showSection(sectionId) {
    document.getElementById(currentSection).classList.remove('active');
    document.getElementById(sectionId).classList.add('active');
    currentSection = sectionId;
}

// 重置页面
function resetPage() {
    // 停止所有动画
    fireworks = [];
    nameParticles = [];
    
    // 重置输入框
    nameInput.value = '';
    herName = '';
    
    // 重置不愿意按钮文本
    noBtn.textContent = '不愿意';
    
    // 显示初始区域
    showSection('intro-section');
}

// 触发烟花效果
function triggerFireworks() {
    // 播放烟花音效
    playFireworkSound();
    
    // 在随机位置添加烟花
    const fireworkInterval = setInterval(() => {
        const x = Math.random() * fireworksCanvas.width;
        const y = Math.random() * fireworksCanvas.height * 0.7;
        addFirework(x, y);
        
        // 持续10秒后停止
        if (fireworks.length > 50) {
            clearInterval(fireworkInterval);
        }
    }, 300);
}

// 播放背景音乐
function playBackgroundMusic() {
    bgMusic.volume = 0.2;
    bgMusic.play().catch(e => {
        console.log('背景音乐播放失败:', e);
        // 如果自动播放失败，添加用户交互后播放的事件监听
        document.addEventListener('click', () => {
            bgMusic.play().catch(e => console.log('用户交互后背景音乐播放仍失败:', e));
        }, { once: true });
    });
}

// 播放星星音效
function playStarSound() {
    starSound.currentTime = 0;
    starSound.volume = 0.5;
    starSound.play().catch(e => console.log('星星音效播放失败:', e));
}

// 播放烟花音效
function playFireworkSound() {
    fireworkSound.currentTime = 0;
    fireworkSound.volume = 0.5;
    fireworkSound.play().catch(e => console.log('烟花音效播放失败:', e));
}
