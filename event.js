function queueSong(url) {
    chrome.storage.sync.get("username", items => {
        let username = items.username;
        if (username === undefined) {
            chrome.runtime.openOptionsPage();
            return;
        }
        let sock = new WebSocket("put your websocket link here");
        var state = 0;
        
        sock.onmessage = event => {
            console.log(state);
            console.log(event);

            if ((event.data === "error taken" && confirm("Username in use! Change username?")) ||
                (event.data === "error invalid" &&
                 confirm("Username has non alphanumeric characters. Change username?"))) {
                chrome.runtime.openOptionsPage();
                sock.close();
            }

            if (state === 0) {
            } else if (state === 2) {
                sock.send("queue " + url);
            } else if (state === 3) {
                sock.close();
            }
            state++;
        };

        sock.onopen = event => {
            sock.send(username);
        }
    });
}
chrome.contextMenus.create({"id": "queue", "title": "Queue on Bridges Jukebox", "contexts":["link"]});

chrome.browserAction.onClicked.addListener(tab => { queueSong(tab.url); });
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "queue") {
        queueSong(info.linkUrl);
    }
});

