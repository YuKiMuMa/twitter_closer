
const saveCheckbox = document.getElementById('toggle-input');

saveCheckbox.addEventListener('change', valueChange);

function valueChange(){
    //console.log("vc_call")
    const check = document.getElementById("toggle-input");
    if(check.checked){
        chrome.runtime.sendMessage({
            greeting:"ON",
            minute:((slider.value/10)+1)
        });
    }else{
        chrome.runtime.sendMessage({
            greeting:"OFF"
        });
    }

}

chrome.runtime.sendMessage({
        greeting:"check"
    },
    function(response){
        //console.log(response.miu)
        slider.value=response.miu
        inputChange()
        if(response.ch){
            saveCheckbox.checked=true
        }else{
            saveCheckbox.checked=false
        }
});

function inputChange(event){
    const check = document.getElementById("toggle-input");
    min.innerText = ((slider.value/10)+1) + 'M';
    if(check.checked){
        chrome.runtime.sendMessage({
            greeting:"ON",
            minute:((slider.value/10)+1)
        });
    }else{
        chrome.runtime.sendMessage({
        greeting:"val",
        minute:((slider.value/10)+1)
    },function(response){
        slider.value=response.miu
    });
}
}

let slider = document.getElementById('slider');
slider.addEventListener('input', inputChange);
let min = document.getElementById('min');