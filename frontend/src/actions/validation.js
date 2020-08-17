




export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


export function check_itsnot_empty(arg)
{
if(arg==''){
    return false;
}
return true;
}

 /*check about if its only string
 return true if the string contain number 
 else return false*/
 export function allLetter(inputtxt)
 {
    return !isNaN(inputtxt)
 }

 export function isNumber(inputtxt)
 {
    return !isNaN(inputtxt)
 }


  export function lengthOfString(str, length){
    var strLength=str.length
    if(strLength>length){
        return false
    }
    return true
  }
  

  export function is_url(str){
  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          return true;
        }
          return false;
        
}

export function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}
export function check_password(password,confirm_password){
    if((password=='')||(password.length<5)){
        return false;
    }
  
    return true;
}
export function check_passward_theSame(password,confirm_password){
  if(password!=confirm_password){
      return false;
  }
  return true;

}
export function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}