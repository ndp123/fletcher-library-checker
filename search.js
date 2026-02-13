// script.js – background/service worker for the extension

function isNumbersAndDashes(input) {
  const pattern = /^[0-9-]+$/;
  return pattern.test(input);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
if (message.action !== 'openTabs') return;

const userInput = message.query;

// Build the three URLs that embed the user input.
if (isNumbersAndDashes(userInput)) {
const urls = [
`https://bookfinder.com/search/?isbn=${encodeURIComponent(userInput)}`,
`https://www.ebay.com/sch/i.html?_sop=15&_nkw=${encodeURIComponent(userInput)}`,
`https://www.ebay.com/sch/i.html?_sop=15&LH_Complete=1&LH_Sold=1&_nkw=${encodeURIComponent(userInput)}`
]
urls.forEach((url,index) => {
chrome.tabs.create({ url, active: false, index: index }); // active:false opens in background tabs
});
sendResponse({ status: 'opened', count: urls.length });
}
else {
const urls = [
`https://bookfinder.com/search/?title=${encodeURIComponent(userInput)}`,
`https://www.ebay.com/sch/i.html?_sop=15&_nkw=${encodeURIComponent(userInput)}`,
`https://www.ebay.com/sch/i.html?_sop=15&LH_Complete=1&LH_Sold=1&_nkw=${encodeURIComponent(userInput)}`
]

urls.forEach((url,index) => {
chrome.tabs.create({ url, active: false, index: index }); // active:false opens in background tabs
});
sendResponse({ status: 'opened', count: urls.length });
}
// Open each URL in a new tab.
//urls.forEach(url => {
//chrome.tabs.create({ url, active: false }); // active:false opens in background tabs
//});

// Return true to indicate we’ll respond asynchronously (if needed)
return true;
});

