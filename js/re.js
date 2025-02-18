document.addEventListener('DOMContentLoaded', () => {

    const actionChange = document.querySelectorAll('.rp-change');
    const actionButtons = document.querySelectorAll('.rp-btn');
    const clickButtons = document.querySelectorAll('.rp-click');
    const eventButtons = document.querySelectorAll('.rp-event');
    let postbackFired = false;

    function generateRandomString(length, numbers = false) {
        let characters = 'abcdefghijklmnopqrstuvwxyz-0123456789';
        if (numbers) {
            characters = '0123456789';
        }
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }

    function getQueryParam(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results || !results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    actionButtons.forEach(actionButton => {
        let targetUrl = actionButton.href;
        if (targetUrl !== "#" && !targetUrl.endsWith('#')) {
            actionButton.addEventListener('click', clickRpButton);
        } else {
            const observer = new MutationObserver((mutationsList) => {
                mutationsList.forEach(mutation => {
                    if (mutation.target.classList.contains('complete')) {
                        let redirectUrl = mutation.target.getAttribute('data-redirectto'); 
                        callRpPostbacks(redirectUrl);
                        observer.disconnect();
                    }
                });
            });
            observer.observe(actionButton, { attributes: true, attributeFilter: ['class'] });
        }
    });

    function clickRpButton(event) {
        let targetUrl = this.href;
        if (targetUrl !== "#" && !targetUrl.endsWith('#')) {
            event.preventDefault();
        }
        callRpPostbacks(targetUrl, event);
    }

    clickButtons.forEach(actionButton => {
        actionButton.addEventListener('click', clickEngagementElement);
    });

    eventButtons.forEach(eventButton => {
        eventButton.addEventListener('click', clickEngagementElement);
    });

    function clickEngagementElement(event) {
        let targetUrl = '';
        callRpPostbacks(targetUrl, event);
    }

    function callRpPostbacks(targetUrl, event = null) {

        if (postbackFired) {
            if (targetUrl != '') {
                window.location.href = targetUrl;
            }
            return;
        }

        const clickId = getQueryParam('kclickid');
        const subId2 = getQueryParam('sub_id2');
        const subId3 = getQueryParam('sub_id3');
        const subId4 = getQueryParam('sub_id4');
        const subId6 = getQueryParam('sub_id6');
        const subId8 = getQueryParam('sub_id8');
        const postData = new URLSearchParams();
        postData.append('subid', clickId);
        postData.append('sub_id2', subId2);
        postData.append('sub_id3', subId3);
        postData.append('sub_id4', subId4);
        postData.append('sub_id6', subId6);
        postData.append('sub_id8', subId8);

        if (event) {
            let eventclass = [...event.target.classList]
            .filter(className => className.startsWith('rp-'))
            .join(' ');
            postData.append('ec', eventclass);
        }
        
        fetch('https://psbcktrk.com/rprt.php?r='+generateRandomString(32), {
            method: 'POST',
            body: postData
        })
        .then(() => {
            postbackFired = true;
            if (targetUrl != '') {
                window.location.href = targetUrl;
            }
        })
        .catch(error => {
            postbackFired = true;
            if (targetUrl != '') {
                window.location.href = targetUrl;
            }
        });
    }

    actionChange.forEach(actionEl => {
        actionEl.addEventListener('change', reportChange);
    });

    function reportChange() {
        callRpPostbacks('');
    }

    const currentClickId = getQueryParam('click_id');

    function isAbsoluteUrl(url) {
        return /^(?:[a-z]+:)?\/\//i.test(url);
    }

    document.querySelectorAll('a').forEach((anchor) => {
        const href = anchor.getAttribute('href');
        if (currentClickId && href && isAbsoluteUrl(href) && !href.startsWith('#')) {
            const url = new URL(href);
            url.searchParams.set('click_id', currentClickId);
            anchor.setAttribute('href', url.toString());
        }
    });

});