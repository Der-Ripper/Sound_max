$(document).ready(function() {
    const volumeSlider = $("#volumeSlider");
    const volumeValue = $("#volumeValue");
    const muteButton = $("#mute");
    const resetButton = $("#reset");
    const maxButton = $("#max");

    volumeSlider.roundSlider({
        width: 5,
        sliderType: "min-range",
        handleSize: +15,
        handleShape: "round",
        circleShape: "pie",
        //circleShape: "full", // Изменено на полную окружность
        //startAngle: 0,
        startAngle: 315,
        borderWidth: 0,
        mouseScrollAction: true,
        pathColor: '#555',
        rangeColor: '#8a2be2',
        tooltipColor: '#8a2be2',
        svgMode: true,
        value: 10,
        min: 0,
        max: 100,
        step: 1,
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
                console.log("Cannot access a non-http(s) URL.");
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