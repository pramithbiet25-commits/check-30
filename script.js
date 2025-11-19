/* --- CONFIGURATION --- */
const quizData = [
    { q: "When did our journey begin?", o: ["Jan 1, 2025", "Feb 14, 2025", "Feb 18, 2025", "March 1, 2025"], a: 2 },
    { q: "Where did we first meet?", o: ["A Coffee Shop", "Sapna Book House", "A Park", "College"], a: 1 },
    { q: "Where was our first date?", o: ["Meet Up Cafe", "Starbucks", "Pizza Hut", "The Movies"], a: 0 },
    { q: "What do I love most about you?", o: ["Your Eyes", "Your Smile", "Your Hair", "Everything"], a: 3 },
    { q: "What is my affectionate nickname for you?", o: ["Boo Boo", "Chikudi", "Baccha", "All of the above"], a: 3 }, 
    { q: "What do I crave the most?", o: ["Pizza", "Sleep", "Your Hug", "Travel"], a: 2 },
    { q: "Where is my favorite place to be?", o: ["Home", "With You", "The Beach", "Paris"], a: 1 },
    { q: "Who loves the other more?", o: ["You do", "I do", "Both equally", "Nobody"], a: 2 },
    { q: "How much do I love you?", o: ["A lot", "Infinite", "To the moon", "So much"], a: 1 },
    { q: "What songs remind me of you?", o: ["Perfect", "Preethiya Hesare Ninnu", "Vhalam Aavo Ne", "All of the above"], a: 3 },
    { q: "Will you marry me?", o: ["Yes!", "Of course!", "Definetly Yes!", "Forever Yes!"], a: [0,1,2,3] } 
];

const photoData = [
    { src: "photo1.jpg", cap: "My Princess" },
    { src: "photo2.jpg", cap: "The Beginning" },
    { src: "photo3.jpg", cap: "Gorgeous" },
    { src: "photo4.jpg", cap: "Your Smile" },
    { src: "photo5.jpg", cap: "Date Eve" },
    { src: "photo6.jpg", cap: "Saree Moments" },
    { src: "photo7.jpg", cap: "Radhe Radhe" },
    { src: "photo8.jpg", cap: "Princess" },
    { src: "photo9.jpg", cap: "Spicy 🔥" },
    { src: "photo10.jpg", cap: "Forever" }
];

const letterText = `Boo Boo,
Happy Birthday 🌻

From the day we met, my life changed completely. Every moment with you feels like a dream I never want to wake up from.

Prem, tu mara jeevan ni sabse khubsurat kahani chhe. Tari hasti smile, tari madhur awaaz, ane tari mithi vaatone samajavu, hu hamesha yad rakhish. Tu mara sapna ma hamesha sath chhe, ane hu vaado karu chhu ke hu hamesha tenu sath, tenu support ane tenu prem karish, life ma je bhi challenges ave.

Every time I see you happy, my heart feels full. I promise to always protect you, support you, and make all your dreams come true—just like we’ve promised each other. No matter what happens, you will always have me by your side.

Janmadin ni lakh lakh shubhkamnao, Boo Boo! Tu hamesha khush rahe, tara sapna sacha thaye, ane jevi khushi aaj tu feel kare chhe, hu hamesha tenu dil ma laavish. Aaje, a divas par, hu chhu sirf tere liye, tu mara jeevan ni sabse keemti cheez chhe.

I love you more than words, more than life itself, and more than anything I’ve ever known. You are my everything, my dream, my happiness, and today I just want to hold you in my heart and tell you how much you mean to me.

Hu tane khub prem karu chu, Chikudi 🫶🏻

Forever Yours,
Param ✨`;

/* --- APP LOGIC --- */
let currentView = 'view-intro'; // Start directly at Intro
let quizIndex = 0;
let photoIndex = 0;
const bgMusic = document.getElementById('bg-music');

// AUTO PLAY ON FIRST CLICK
document.body.addEventListener('click', function() {
    if (bgMusic.paused) { bgMusic.play(); }
}, { once: true });

function startHeartRain() {
    const container = document.getElementById('heart-rain');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.innerHTML = '💗'; 
        heart.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 20 + 10 + 'px';
        heart.style.fontSize = size;
        const duration = Math.random() * 5 + 3 + 's';
        heart.style.animationDuration = duration;
        container.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 8000);
    }, 300);
}
startHeartRain();

function switchView(id) {
    document.getElementById(currentView).classList.remove('active');
    setTimeout(() => {
        document.getElementById(id).classList.add('active');
        currentView = id;
    }, 800);
}

function startJourney() {
    loadQuestion();
    switchView('view-quiz');
}

function loadQuestion() {
    const data = quizData[quizIndex];
    document.getElementById('q-text').innerText = data.q;
    const grid = document.getElementById('opt-grid');
    grid.innerHTML = '';
    data.o.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn';
        btn.innerText = opt;
        btn.onclick = () => handleAnswer(btn, idx, data.a);
        grid.appendChild(btn);
    });
}

function handleAnswer(btn, selectedIndex, correctData) {
    const allBtns = document.querySelectorAll('.opt-btn');
    allBtns.forEach(b => b.disabled = true);
    let isCorrect = false;
    if (Array.isArray(correctData)) { isCorrect = true; }
    else if (selectedIndex === correctData) { isCorrect = true; }
    if (isCorrect) {
        btn.classList.add('correct');
        confetti({ particleCount: 50, spread: 60, colors: ['#d4a5a5', '#fff'], gravity: 0.4 });
        setTimeout(() => {
            quizIndex++;
            if (quizIndex < quizData.length) { loadQuestion(); }
            else { showLetter(); }
        }, 1200);
    } else {
        btn.style.opacity = 0.5;
        document.getElementById('feedback').innerText = "Try again, love.";
        setTimeout(() => {
            allBtns.forEach(b => b.disabled = false);
            document.getElementById('feedback').innerText = "";
        }, 1000);
    }
}

function showLetter() {
    document.getElementById('letter-content').innerHTML = letterText;
    switchView('view-letter');
}
function goToGallery() {
    initPhotoStack();
    switchView('view-photos');
}
function initPhotoStack() {
    const container = document.getElementById('stack-container');
    container.innerHTML = '';
    photoData.forEach((photo, i) => {
        const card = document.createElement('div');
        card.className = 'stack-item';
        card.id = `photo-${i}`;
        card.style.zIndex = photoData.length - i; 
        const rot = (Math.random() * 10) - 5;
        card.style.transform = `rotate(${rot}deg)`;
        card.innerHTML = `<img src="${photo.src}" alt="Memory"><div class="stack-caption">${photo.cap}</div>`;
        container.appendChild(card);
    });
    photoIndex = 0;
    updateCounter();
}
function nextPhoto() {
    if (photoIndex < photoData.length) {
        const card = document.getElementById(`photo-${photoIndex}`);
        if (card) card.classList.add('fly-away');
        photoIndex++;
        updateCounter();
    }
}
function prevPhoto() {
    if (photoIndex > 0) {
        photoIndex--;
        const card = document.getElementById(`photo-${photoIndex}`);
        if (card) card.classList.remove('fly-away');
        updateCounter();
    }
}
function updateCounter() {
    let display = photoIndex + 1;
    if (display > photoData.length) display = photoData.length;
    document.getElementById('counter').innerText = `${display} / ${photoData.length}`;
}
document.getElementById('sound-btn').addEventListener('click', function() {
    if (bgMusic.paused) { bgMusic.play(); this.style.opacity = 1; }
    else { bgMusic.pause(); this.style.opacity = 0.5; }
});
