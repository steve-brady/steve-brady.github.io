let currentImage = 0;
const debounceScroll = function debounce(fn) {
    var frame = void 0;
    return function () {
        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
            params[_key] = arguments[_key];
        }
        if (frame) {
            cancelAnimationFrame(frame);
        }
        frame = requestAnimationFrame(function () {
            fn.apply(null, params);
        });
    };
};
const storeScroll = function storeScroll() {
    document.documentElement.dataset.scroll = window.scrollY;
};
document.addEventListener('scroll', debounceScroll(storeScroll), { passive: true });

const images = [
    './assets/camero.jpg',
    './assets/land_rover.jpg',
    './assets/rubicon.jpg',
    './assets/challenger.jpg',
    './assets/yukon_denali.jpg',
    './assets/suburban.jpg',
]

window.addEventListener('DOMContentLoaded', (event) => {
    const navbar = document.getElementById('navbar');
    const navDropdown = document.getElementById('navbarSupportedContent');
    const imageModel = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const imgCarousel = document.getElementById('imageCarousel');
    const imgList = document.getElementById('carouselImageList');
    let items = [];

    //nav clicks
    document.querySelectorAll('a.nav-link, a.card-link').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.currentTarget.getAttribute('href').substring(1);
            const offsetTop = document.getElementById(id).offsetTop - 75;
            scroll({ top: offsetTop, behavior: "smooth" });
        })
    });
    //show menu
    navDropdown.addEventListener('show.bs.collapse', function () {
        navbar.classList.add('opened');
    });
    //hide menu
    navDropdown.addEventListener('hide.bs.collapse', function () {
        navbar.classList.remove('opened');
    });
    
    //show photo album
    imageModel.addEventListener('show.bs.modal', function (e) {
        currentImage = parseInt(e.relatedTarget.dataset.index);
        imgList.innerHTML = '';

        //build items
        items = [];
        images.forEach((item, idx) => {
            let carouselItem = document.createElement("div");
            carouselItem.className = 'carousel-item';
            if(idx === currentImage) {
                carouselItem.classList.add('active');
                modalImage.style.backgroundImage = `url("${item}")`;
            }
    
            let column = document.createElement("div");
            column.className = 'col-3';
            
            let card = document.createElement("div");
            card.className = 'card';
    
            let bgImage = document.createElement("div");
            bgImage.className = 'bg-image card-img';
            bgImage.style.backgroundImage = `url("${item}")`;
    
            carouselItem.appendChild(column);
            column.appendChild(card);
            card.appendChild(bgImage);
            imgList.appendChild(carouselItem);
            items.push(carouselItem);
        });

        // //reorder items
        // for(let cnt = 0; cnt < currentImage; cnt++){
        //     items.push(items[0]);
        //     items.shift();
        // }

        //for bootstrap carousel
        items.forEach((el, idx) => {
            const minPerSlide = 4
            let next = el.nextElementSibling
            for (var i = 1; i < minPerSlide; i++) {
                if (!next) {
                    next = items[0]
                }
                let cloneChild = next.cloneNode(true)
                el.appendChild(cloneChild.children[0])
                next = next.nextElementSibling
            }
            // el.addEventListener('click', (i) => {
            //     currentImage = idx;
            //     items.forEach((el1) => el1.classList.toggle('active', idx === currentImage));
            // });
        })






    });

    imgCarousel.addEventListener('slide.bs.carousel', function (e) {
        console.log('slide');
        currentImage = currentImage >= items.length - 1 ? 0 : currentImage + 1;
        modalImage.classList.remove('show');
        setTimeout(() => {
            modalImage.style.backgroundImage = items[currentImage].querySelector('.bg-image').style.backgroundImage;
            modalImage.classList.add('show');
        }, 150);
    })
    
});

