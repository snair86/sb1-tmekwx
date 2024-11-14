chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'unlockArticle') {
    // This is a simple example. In reality, you'd need to implement
    // site-specific logic to bypass paywalls.
    const paywalledContent = document.querySelector('.paywall-content');
    if (paywalledContent) {
      paywalledContent.classList.remove('paywall-content');
    }
    alert('Article unlocked!');
  }
});