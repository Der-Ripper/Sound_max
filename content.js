function boostVolume() {
    const audioElements = document.querySelectorAll("audio, video");
    audioElements.forEach((element) => {
        element.volume = Math.min(element.volume * 1.5, 1); // Увеличиваем громкость на 50%, но не более 100%
    });
}

// Привязываем функцию к клавише, например, 'B' для увеличения громкости
document.addEventListener("keydown", (event) => {
    if (event.key === "B") {
        boostVolume();
    }
});