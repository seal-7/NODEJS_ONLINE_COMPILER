
window.onload = function() {
    
    var cod = localStorage.getItem(code);
    var inp = sessionStorage.getItem(input);
    if (cod != null) {
    $('#code').val(cod);
    $('#input').val(inp);
    console.log("got from localStorage");
    }
    

}

function savecode(){
	localStorage.setItem(code,$('#code').val());
    sessionStorage.setItem(input,$('#input').val());
    console.log("saved to localStorage");
}

