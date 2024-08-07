/*
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
*/

$(document).ready(function() {
    const volumeSlider = $("#volumeSlider");
    const volumeValue = $("#volumeValue");
    const muteButton = $("#mute");
    const resetButton = $("#reset");
    const maxButton = $("#max");

    volumeSlider.roundSlider({
        sliderType: "min-range",
        circleShape: "pie",
        startAngle: 315,
        value: 10,
        min: 0,
        max: 100,
        step: 1,
        editableTooltip: false,
        tooltipFormat: function(e) {
            const factor = (e.value * 0.1).toFixed(1);
            volumeValue.text(factor + "x");
            return factor + "x";
        },
        drag: function(e) {
            updateVolume(e.value);
        },
        change: function(e) {
            updateVolume(e.value);
        }
    });

    function updateVolume(value) {
        const factor = value * 0.1; // Преобразуем значение ползунка в нужный фактор громкости
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (tab.url.startsWith('http://') || tab.url.startsWith('https://')) { // Проверяем URL вкладки
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (factor) => window.boostVolume(factor),
                    args: [factor]
                });
            } else {
                console.error("Cannot access a non-http(s) URL.");
            }
        });
    }

    muteButton.click(() => {
        volumeSlider.roundSlider("setValue", 0);
        volumeValue.text("0.0x");
        updateVolume(0);
    });

    resetButton.click(() => {
        volumeSlider.roundSlider("setValue", 10);
        volumeValue.text("1.0x");
        updateVolume(10);
    });

    maxButton.click(() => {
        volumeSlider.roundSlider("setValue", 100);
        volumeValue.text("10.0x");
        updateVolume(100);
    });
});