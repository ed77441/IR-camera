
function queryServer (q, args, callback) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(JSON.parse(this.responseText));
    }
  };
  xhttp.open("GET", "/lib/query.php?" + "q=" + q + "&" + args, true);
  xhttp.send();
}
