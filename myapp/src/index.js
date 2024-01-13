let cards = document.querySelectorAll(".Karte")
let stackArea = document.querySelector(".stack-area")

function rotateCards(){
    let angle = 0;
    cards.forEach((Karte) => {
        if(Karte.classList.contains("active")){
            Karte.style.transform = `translate(-50%, -120vh) rotate (-48deg)`;
        }
        else{
            Karte.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        }
        Karte.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        angle = angle - 10;
    })
}

rotateCards();


window.addEventListener("scroll", ()=>{
    let proportion = stackArea.getBoundingClientRect().top/window.innerHeight;
    if(proportion<=0){
        let n = cards.length;
        let index = Math.ceil((proportion * n) / 2);
        index = Math.abs(index) - 1;
        for(let i=0; i<n ; i++){
            if(i<=index){
                cards[i].classList.add("active");
            }
            else{
                cards[i].classList.remove("active");
            }
        }
        rotateCards();
    }
})


let lastScrollY = 0;
const navbar = document.querySelector('nav');
const cardContainer = document.querySelector('.Container');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;

    // Check if scrolling within the card container
    const containerRect = cardContainer.getBoundingClientRect();
    if (currentScrollY >= containerRect.top && currentScrollY <= containerRect.bottom) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
});
    



