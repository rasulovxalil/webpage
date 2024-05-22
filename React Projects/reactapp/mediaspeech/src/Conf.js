
export default class Conf {
    static mainUrl = "api/"
    static loginSystemError = 'Login Error try again later'
    static loginError = 'Email or password incorrect'

    static tokenSystemError = 'Token check error try again later'
    static tokenError = 'Incorrect token'
    static passwordMessage = 'Password must contains at least 1 number and 1 symbol, and minimum length 8 characters'
    static emptyToken = 'Token is required'
    static passwordNotMatch = 'Password dont match'
    static regError = 'Registration Error try again later'
    static regSucc = 'Successfully registered now you can login'
    static fpSucc = 'Password successfully changed now you can login'

    static session = null
    static isMobile = false
    static async postData(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        if(response.status === 200){
            return response.json();
        }else{
            return {error:"Code "+response.status};
        }
        

    }

    static validateUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    }
    static validateEmail(value){
        return value.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      }

    static saveSession(session) {
        if (Conf.isLocalStorageAvailable()) {
            localStorage.setItem('session', JSON.stringify(session));
        }
        Conf.session = session
    }

    static logout() {
        if (Conf.isLocalStorageAvailable()) {
            localStorage.removeItem('session');
        }
        Conf.session = null
    }

    static getSession() {
        if (Conf.isLocalStorageAvailable()) {
            if (localStorage.getItem('session') != null) {
                Conf.session = JSON.parse(localStorage.getItem('session'))
            }

        }
        return Conf.session
    }


    static isLocalStorageAvailable() {
        var test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    static toHHMMSS(secondstotal) {
        var sec_num = parseInt(secondstotal, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    }

    static isMEdiafile(mimetype){
        var type = mimetype.split("/")[0]
        console.log(type)
        if(type == 'audio' || type == 'video'){
            return true
        }
        if(type=='application/ogg'){
            return true
        }
        return false
    }
}