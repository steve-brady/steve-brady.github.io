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


window.addEventListener('DOMContentLoaded', (event) => {
    const navbar = document.getElementById('navbar');
    const navDropdown = document.getElementById('navbarSupportedContent');
    const imageModel = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const imgCarousel = document.getElementById('imageCarousel');
    let items = document.querySelectorAll('.carousel .carousel-item');
    document.querySelectorAll('a.nav-link, a.card-link').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.currentTarget.getAttribute('href').substring(1);
            const offsetTop = document.getElementById(id).offsetTop - 75;
            scroll({ top: offsetTop, behavior: "smooth" });
        })
    });
    navDropdown.addEventListener('show.bs.collapse', function () {
        navbar.classList.add('opened');
    });
    navDropdown.addEventListener('hide.bs.collapse', function () {
        navbar.classList.remove('opened');
    });
    imageModel.addEventListener('show.bs.modal', function (e) {
        currentImage = parseInt(e.relatedTarget.dataset.index);
        items.forEach((el, idx) => el.classList.toggle('active', idx === currentImage));
        console.log(currentImage)
        modalImage.setAttribute('src', e.relatedTarget.children[0].getAttribute('src'));
    });

    imgCarousel.addEventListener('slide.bs.carousel', function (e) {
        currentImage = currentImage >= items.length - 1 ? 0 : currentImage + 1;
        modalImage.classList.remove('show');
        setTimeout(() => {
            modalImage.setAttribute('src', items[currentImage].querySelector('img').getAttribute('src'));
            modalImage.classList.add('show');
        }, 150);
    })
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
        el.addEventListener('click', (i) => {
            currentImage = idx;
            items.forEach((el1) => el1.classList.toggle('active', idx === currentImage));
        });
    })
});

