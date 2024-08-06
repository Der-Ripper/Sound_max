const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
const volumeButton = document.getElementById('boost');

volumeSlider.addEventListener('input', () => {
    const factor = volumeSlider.value * 0.1; // Преобразуем значение ползунка в нужный фактор громкости
    volumeValue.textContent = factor.toFixed(1) + 'x';
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: (factor) => window.boostVolume(factor),
            args: [factor]
        });
    });
});

volumeButton.addEventListener('click', () => {
    const factor = 10; // Устанавливаем громкость на максимум
    volumeSlider.value = factor * 10;
    volumeValue.textContent = factor.toFixed(1) + 'x';
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: (factor) => window.boostVolume(factor),
            args: [factor]
        });
    });
});