// popup.js – runs in the context of search.html
document.getElementById('goBtn').addEventListener('click', () => {
const query = document.getElementById('search').value.trim();


// Optional: guard against empty input
if (!query) {
alert('Please enter a value.');
return;
};

// Send the query to the background/service worker
chrome.runtime.sendMessage({ action: 'openTabs', query });
});

document.getElementById('search').addEventListener('keydown', function(e) {
if (e.key === 'Enter') {
document.getElementById('goBtn').click();
}
});

document.getElementById('search').focus();
