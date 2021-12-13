'use strict';
let generateBtn = document.querySelector("#shortURL");
let api = document.querySelector("#myurl")
let toastError = document.querySelector('.toast-error')
let toastSuccess = document.querySelector('.toast-success')
let loader = document.querySelector('.loader')
const url = "https://xsrt.ml/shortit";
let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
}
document.addEventListener('DOMContentLoaded', function() {
    var bg = chrome.extension.getBackgroundPage();
    chrome.tabs.getSelected(null, function(tab) {
        api.value = tab.url;
        if(api.value) {
            answer()
        }
    });
    
    generateBtn.addEventListener('click', answer);

    async function answer() {
        if (api.value) {
            loader.classList.toggle('d-hide');
            try {
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                            "url": api.value,
                            "slug": "",
                        }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const json = await response.json();
                console.log(json);
                loader.classList.add('d-hide')
                toastSuccess.classList.remove('d-hide');
                toastSuccess.textContent = json.shortURL;
                generateBtn.textContent = "Copied to Clipboard!"
                setTimeout(() => {
                    generateBtn.textContent = "Generate short URL again!"
                }, 3000)
                navigator.clipboard.writeText(toastSuccess.textContent);
            }   catch (e) {
                console.error(e);
                console.log("there as an error");
            }
        } else {
            toastError.classList.remove('d-hide')
            setTimeout(() => {
                toastError.classList.add('d-hide')
            }, 1500)
        }
    }
});