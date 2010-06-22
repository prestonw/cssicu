/**
  * stylebot.chrome
  * 
  * Methods making use of Chrome API
  **/

stylebot.chrome = {
    setIcon: function(value) {
        if(value)
            chrome.extension.sendRequest({ name: "enablePageIcon" }, function(){});
        else
            chrome.extension.sendRequest({ name: "disablePageIcon" }, function(){});
    },
    
    // send request to background.html to copy text
    copyToClipboard: function(text) {
        chrome.extension.sendRequest({ name: "copyToClipboard", text: text }, function(){});
    },
    
    // save rules for page
    save: function(url, rules) {
        chrome.extension.sendRequest({ name: "save", rules: rules, url: url }, function(){});
    },
    
    load: function(url, callback) {
        chrome.extension.sendRequest({ name: "getRulesForPage", url: url }, function(response){
            callback(response);
        });
    }
}

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
        if(request.name == "toggle")
		{
		    if(window != window.top)
		        return;
            stylebot.toggle();
		    sendResponse({ status:stylebot.status });
		}
});
