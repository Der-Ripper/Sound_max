const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
const volumeButton = document.getElementById('boost');

volumeSlider.addEventListener('input', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: boostVolume_v(volumeSlider.value)
        });
    });
});

volumeButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: boostVolume
        });
    });
});


function boostVolume() {
    const audioElements = document.querySelectorAll('audio, video');
    audioElements.forEach(element => {
        const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaElementSource(element);
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 100;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
    });
}

function boostVolume_v(value) {
    const audioElements = document.querySelectorAll('audio, video');
    audioElements.forEach(element => {
        const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaElementSource(element);
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = value;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
    });
    volumeValue.textContent = value;
}