chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: boostVolume
    });
  });
  
  function boostVolume() {
    const audioElements = document.querySelectorAll('audio, video');
    audioElements.forEach(element => {
      element.volume = Math.min(element.volume * 1.5, 1); // Увеличиваем громкость на 50%, но не более 100%
    });
  }