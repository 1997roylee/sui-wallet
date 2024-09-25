chrome.runtime.sendMessage({ action: 'keepAlive' }, response => {
    console.log('Keep-alive response:', response)
})
