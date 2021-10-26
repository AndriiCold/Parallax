"use strict"

//Чекаємо завантаження контенту
window.onload = function () {
    const parallax = document.querySelector('.parallax')
    if (parallax) {
        const content = document.querySelector('.parallax_container');
        const clouds = document.querySelector('.images-parallax_cloud');
        const mountains = document.querySelector('.images-parallax_mountains');
        const human = document.querySelector('.images-parallax_human');

        //Коефіцієнти
        const forClouds = 40;
        const forMountains = 20;
        const forHuman = 10;

        //Швидкість анімації
        const speed = 0.05;

        //Оголошення змінних
        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXprocent-positionX;
            const distY = coordYprocent-positionY;

            positionX = positionX + (distX*speed);
            positionY = positionY + (distY*speed);

            clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`;
            mountains.style.cssText = `transform: translate(${positionX / forMountains}%,${positionY / forMountains}%);`;
            human.style.cssText = `transform: translate(${positionX / forHuman}%,${positionY / forHuman}%);`;

            requestAnimationFrame(setMouseParallaxStyle)
        }
        setMouseParallaxStyle()

        parallax.addEventListener("mousemove", function (e){
            //Отримуємо ширину і висоту блока
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;
            //Нуль по середині екрану
            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;
            //Отримуємо відсотки
            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
        })

        //Паралакс при скролі

        let thresholdSets = [];
        for (let i = 0; i <= 1.0; i += 0.005) {
            thresholdSets.push(i);
        }
        const callback = function (entries, observer) {
            const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
            setParallaxItemsStyle(scrollTopProcent);
        }
        const observer = new IntersectionObserver(callback, {
            threshold: thresholdSets
        })
        observer.observe(document.querySelector('.content'));

        function setParallaxItemsStyle(scrollTopProcent) {
            content.style.cssText = `transform: translate(0%,-${scrollTopProcent / 9}%)`;
            mountains.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%)`;
            human.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 3}%)`;
        }
    }
}
