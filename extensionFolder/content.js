
// alert("Hello from your Chrome extension! LoLLLL");
chrome.webRequest.onBeforeRequest.addListener(
        function(details) {

                return {redirectUrl: "https://www.facebook.com/"} },
                // return {cancel: true}; },
        {urls: ["*://www.evil.com/*"]},
        ["blocking"]);
