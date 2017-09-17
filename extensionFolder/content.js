
// alert("Hello from your Chrome extension! LoLLLL");
// var sites = []

// function getSites(){
//   $.get({
//
//   })
// }


chrome.webRequest.onBeforeRequest.addListener(
        function(details) {

        return {redirectUrl: "https://www.facebook.com/"} },
                // return {cancel: true}; },
        {urls: ["*://www.reddit.com/*"]},
        ["blocking"]);
