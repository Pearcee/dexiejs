const db = new Dexie('NoteApp')

const appNav = document.getElementById('appNav')
const appHead = document.getElementById('appHead')
const appListNotes = document.getElementById('appListNotes')
const appAddNote = document.getElementById('appAddNote')
const appFoot = document.getElementById('appFoot')

db.version(2).stores({ notes: '++id,note, done' })

db.notes.bulkPut([
  { id: 1, note: "Josephine", done: 0 },
  { id: 2, note: "Per", done: 0},
  { id: 3, note: "Simon", done: 0 },
  { id: 4, note: "Sara", done: 0, notIndexedProperty: 'foo' }
])

appAddNote.innerHTML =  `
<h2 >My Add Note</h2>
`

const populateNewDiv = async () => {
  const allItems = await db.notes.reverse().toArray()
  appListNotes.innerHTML = allItems.map(item => `

    <li class="w3-display-container"> ${item.note}  <span onclick="this.parentElement.style.display='none'" class="w3-button w3-transparent w3-display-right">&times;</span> </li>

    `).join('')
}

window.onload = populateNewDiv

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