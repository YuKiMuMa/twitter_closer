// Create an alarm

chrome.alarms.clear('NAME_OF_ALARM');
// Run something when the alarm goes off
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'NAME_OF_ALARM') {
    const now = new Date();
    console.log(now.toLocaleString())
    execScript()
  }
});

function execScript() {
    chrome.tabs.query({ }, (e) => {
        for(const t of e){
            const url = t.url;
            if ( url.match(/twitter.com/)) {
                console.log(t.id)
                chrome.tabs.remove(t.id)
            }
            //console.log(url);
        }

    });
}

let checkst=false;
let minutes=1;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "ON"){
        chrome.alarms.clear('NAME_OF_ALARM');
        chrome.alarms.create('NAME_OF_ALARM', { delayInMinutes : request.minute, periodInMinutes :  request.minute});
        console.log(request.minute);
        minutes=request.minute
        checkst=true
    }else if(request.greeting == "OFF"){
        chrome.alarms.clear('NAME_OF_ALARM');
        //console.log("bg OFF");
        checkst=false
    }else if(request.greeting == "check"){
        //console.log("bg CH");
        sendResponse({
        ch: checkst,
        miu:(minutes-1)*10
      });
    }else if(request.greeting == "val"){
        //console.log("val")
        minutes=request.minute;
        sendResponse({
        ch: checkst,
        miu:(minutes-1)*10
      });
    }
    
    });