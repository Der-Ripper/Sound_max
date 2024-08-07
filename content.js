let audioCtx;
let gainNodes = new Map();

function boostVolume(factor) {
    if (!audioCtx) {
        audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    }

    const audioElements = document.querySelectorAll('audio, video');
    audioElements.forEach(element => {
        if (!gainNodes.has(element)) {
            const source = audioCtx.createMediaElementSource(element);
            const gainNode = audioCtx.createGain();
            gainNode.gain.value = factor;
            source.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            gainNodes.set(element, gainNode);
        } else {
            const gainNode = gainNodes.get(element);
            gainNode.gain.value = factor;
        }
    });
}

// Привязываем функцию к глобальному объекту window, чтобы она была доступна из popup.js
window.boostVolume = boostVolume;