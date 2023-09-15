const db = new Dexie('NameApp')

db.version(1).stores({ names: '++id,name,age' })

db.names.bulkPut([
  { id: 1, name: "Josephine", age: 21 },
  { id: 2, name: "Per", age: 75 },
  { id: 3, name: "Simon", age: 5 },
  { id: 4, name: "Sara", age: 50, notIndexedProperty: 'foo' }
])

const appNav = document.getElementById('appNav')
const appHead = document.getElementById('appHead')
const appAdd = document.getElementById('appAdd')
const appTable = document.getElementById('appTable')
const appFoot = document.getElementById('appFoot')


function myFunction() {
  var x = document.getElementById("demo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}

appNav.innerHTML =  `
<div class="w3-bar w3-gray">
  <a href="#" class="w3-bar-item w3-button">Friends</a>
  <a href="#" class="w3-bar-item w3-button w3-hide-small">Link 1</a>
  <a href="#" class="w3-bar-item w3-button w3-hide-small">Link 2</a>
  <a href="#" class="w3-bar-item w3-button w3-hide-small">Link 3</a>
  <a href="javascript:void(0)" class="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium" onclick="myFunction()">&#9776;</a>
</div>

<div id="demo" class="w3-bar-block w3-light-gray w3-hide w3-hide-large w3-hide-medium">
  <a href="#" class="w3-bar-item w3-button">Link 1</a>
  <a href="#" class="w3-bar-item w3-button">Link 2</a>
  <a href="#" class="w3-bar-item w3-button">Link 3</a>
</div>
`
appHead.innerHTML =  `
<div id="myDIV" class="header">
  <h2 style="margin:5px">My To Do List</h2>
  <input type="text" id="myInput" placeholder="Title...">
  <span onclick="newElement()" class="addBtn">Add</span>
</div>
`
appFoot.innerHTML =  `
<footer class="w3-container w3-bottom w3-theme w3-margin-top">
<div class="w3-medium w3-padding-16 w3-center">
  <i class="fa fa-facebook-official w3-hover-opacity"></i>
  <i class="fa fa-instagram w3-hover-opacity"></i>
  <i class="fa fa-snapchat w3-hover-opacity"></i>
  <i class="fa fa-pinterest-p w3-hover-opacity"></i>
  <i class="fa fa-twitter w3-hover-opacity"></i>
  <i class="fa fa-linkedin w3-hover-opacity"></i>
  <i></i>
  <a class="w3-hover-opacity" href="https://www.w3schools.com/w3css/default.asp" target="_blank"> w3.css</a>
</div>
</footer>
`

appInput.onsubmit = async (event) => {
  event.preventDefault()
  const name = document.getElementById('nameInput').value
  const age = document.getElementById('ageInput').value
  await db.names.add({ name, age })
  await populateNewDiv()
  appInput.reset()
}

const populateNewDiv = async () => {
  const allItems = await db.names.reverse().toArray()
  appTable.innerHTML = allItems.map(item => `

  <ul id="myUL">
  <li>Hit the gym</li>
  <li class="checked">Pay bills</li>
  <li>Meet George</li>
  <li>Buy eggs</li>
  <li>Read a book</li>
  <li>Organize office</li>
</ul>
  
  `).join('')
}







window.onload = populateNewDiv




var acc = document.getElementsByClassName("accordion");
var i;


// function openCity(evt, cityName) {
//     var i, tabcontent, tablinks;
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//       tabcontent[i].style.display = "none";
//     }
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//       tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
//     document.getElementById(cityName).style.display = "block";
//     evt.currentTarget.className += " active";
//   }


console.log("Its me")

// Used to toggle the menu on small screens when clicking on the menu button
// function menuFn() {
//   var x = document.getElementById("navDemo");
//   if (x.className.indexOf("w3-show") == -1) {
//     x.className += " w3-show";
//   } else {
//     x.className = x.className.replace(" w3-show", "");
//   }
// }



// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}