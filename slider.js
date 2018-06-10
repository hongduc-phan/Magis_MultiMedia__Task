const Slider = function Slider(element) {
    this.el = document.querySelector(element);
    this.init();
};

Slider.prototype = {
    init: function () {
        this.currentSlide = 0;
        this.links = this.el.querySelectorAll('#slider-nav a');
        this.wrapper = this.el.querySelector('#slider-wrapper');
        this.prevbtn = this.el.querySelector('.prev');
        this.nextbtn = this.el.querySelector('.next');
        this.setEvents();
        this.animate(0);
    },
    setEvents: function () {

        for (let i = 0; i < this.links.length; ++i) {
            const link = this.links[i];
            link.addEventListener('click', this.slide.bind(this));
        }

        this.prevbtn.addEventListener('click', function (e) {
            e.preventDefault();
            this.prev();
        }.bind(this));

        this.nextbtn.addEventListener('click', function (e) {
            e.preventDefault();
            this.next();
        }.bind(this));

    },

    animate: function (index) {
        this.currentSlide = index;
        const slide = this.wrapper.querySelector('.slide:nth-child(' + (index + 1) + ')');
        this.wrapper.style.left = '-' + slide.offsetLeft + 'px';

        const parent = slide.parentNode;
        const caption = slide.querySelector('.caption');
        const captions = parent.querySelectorAll('.caption');
        for (let k = 0; k < captions.length; ++k) {
            const cap = captions[k];
            if (cap !== caption) {
                cap.classList.remove('visible');
            }
        }
        this.wrapper.classList.add('fade');
        caption.classList.add('visible');
        this.setCurrentLink(index);
    },

    slide: function (e) {
        e.preventDefault();
        const index = parseInt(e.currentTarget.getAttribute('data-slide'), 10);
        this.animate(index);
    },

    prev: function () {
        if (this.currentSlide === 0) {
            this.animate(this.links.length - 1);
        } else {
            this.animate(this.currentSlide - 1);
        }
    },

    next: function () {
        if (this.currentSlide === this.links.length - 1) {
            this.animate(0);
        } else {
            this.animate(this.currentSlide + 1);
        }
    },


    setCurrentLink: function (index) {
        const link = this.links[index];
        const parent = link.parentNode;
        const a = parent.querySelectorAll('a');

        link.className = 'current';

        for (let j = 0; j < a.length; ++j) {
            const cur = a[j];
            if (cur !== link) {
                cur.className = '';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const aSlider = new Slider('#slider');

});
