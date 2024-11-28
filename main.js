function opennav() {
  document.getElementById("navbar").style.width = "100%";
  const openbtn = document.getElementById("openbarbtn");
  openbtn.style.display = "none";
}
function closenav() {
  document.getElementById("navbar").style.width = "0%";
  const openbtn = document.getElementById("openbarbtn");
  openbtn.style.display = "block";
}

document.addEventListener('DOMContentLoaded', () => {
  function countdown(startNumber, endNumber, speed, elementId) {
    let currentNumber = startNumber;
    const countdownDisplay = document.getElementById(elementId);
    if (!countdownDisplay) return; // Add this check
    countdownDisplay.innerHTML = currentNumber;

    const intervalId = setInterval(() => {
      countdownDisplay.innerHTML = currentNumber;
      if (currentNumber <= endNumber) {
        clearInterval(intervalId);
      } else {
        currentNumber--;
      }
    }, speed);
  }

  // Start the countdowns with predefined start numbers, end numbers, and speeds
  countdown(100, 10, 100, 'countdownDisplay');
  countdown(1000, 200, 10, 'stundentcountdown');
  countdown(100, 30, 100, 'coursecountdown');
  countdown(200, 20, 10, 'activitiescountdown');

  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(accordion => {
    accordion.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  });
});

function viewmore(subject) {
  // Get the corresponding list and button by subject name
  const subjectList = document.querySelector(`.${subject}-list`);
  const viewMoreButton = document.querySelector(`.${subject}-view-more`);

  // Toggle the visibility of the list
  if (subjectList.style.display === 'none') {
    subjectList.style.display = 'block';
    viewMoreButton.textContent = 'View Less';
  } else {
    subjectList.style.display = 'none';
    viewMoreButton.textContent = 'View More';
  }
}


//classroom images slides
let currentslides = 0;
 showslides(currentslides);
  function changeslide(n){
 showslides(currentslides += n);
  }
  function showslides(n){
    const slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return; // Add this check
    if(n >= slides.length){
      currentslides = 0;
    }
    if(n < 0){
      currentslides = slides.length - 1;
    }
    for(let i = 0; i < slides.length; i++){
      slides[i].style.display = "none";
    }
    slides[currentslides].style.display = "block";
  }
  //playground images slide 
  let currentplaygroundindex = 0;
  showplaygroundslide(currentplaygroundindex)

  function changeplaygroundslide(n){
    showplaygroundslide(currentplaygroundindex += n);
  }
  function showplaygroundslide(n){
    const playgroundslide = document.getElementsByClassName("playgroundslide");
    if (playgroundslide.length === 0) return; // Add this check
    if(n >= playgroundslide.length)
    {currentplaygroundindex = 0 ;}
    if(n < 0)
    { currentplaygroundindex = playgroundslide.length - 1;}
    for(let i = 0; i < playgroundslide.length; i++)
      {playgroundslide[i].style.display = "none";}
    playgroundslide[currentplaygroundindex].style.display = "block";
  }

  //transport images slide
  let currenttransportslide = 0 ;
   showtransportslide(currenttransportslide);

   function changetransportslide(n){
    showtransportslide(currenttransportslide += n);
   }
    function showtransportslide(n){
      const transportslide = document.getElementsByClassName("transportslide");
      if(n >= transportslide.length)
      {currenttransportslide = 0;}
      if(n < 0)
      {currenttransportslide = transportslide.length - 1;}
      for(let i = 0; i < transportslide.length; i++)
      {transportslide[i].style.display = "none";}
      transportslide[currenttransportslide].style.display = "block";
    }

    //cafeteria images slide
    let currentcafeteriaslide = 0;
     showcafeteriaslide(currentcafeteriaslide);
      function changecafeteriaslide(n){
        showcafeteriaslide(currentcafeteriaslide += n);
      }
      function showcafeteriaslide(n){
        const cafeteriaslide = document.getElementsByClassName("cafeteriaslide");
        if(n >= cafeteriaslide.length)
        {currentcafeteriaslide = 0;}
        if(n < 0)
        {currentcafeteriaslide = cafeteriaslide.length - 1;}
        for(let i = 0; i < cafeteriaslide.length; i++)
        {cafeteriaslide[i].style.display = "none";}
        cafeteriaslide[currentcafeteriaslide].style.display = "block";
      }

      function scrolltoaboutus() {
        const aboutus = document.getElementById("about-us");
        aboutus.scrollIntoView({ behavior: 'smooth', block: 'end' });
        if (window.innerWidth < 650) {
          const navbar = document.getElementById("navbar");
          navbar.style.width = "0%";
const openbtn = document.getElementById("openbarbtn");
openbtn.style.display = "block";
        }
      }
function scrolltoprograms() {
  const programs = document.getElementById("programs");
  programs.scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (window.innerWidth < 650) {
    const navbar = document.getElementById("navbar");
    navbar.style.width = "0%";
    const openbarbtn = document.getElementById("openbarbtn");
    openbarbtn.style.display = "block";
  }
}
function scrolltofacilities() {
  const facilities = document.getElementById("facilities");
  facilities.scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (window.innerWidth < 650) {
    const navbar = document.getElementById("navbar");
    navbar.style.width = "0%";
    const openbarbtn = document.getElementById("openbarbtn");
    openbarbtn.style.display = "block";
  }
}
function scrolltoevents(){
const events = document.getElementById("events");
events.scrollIntoView({behavior:'smooth', block:'center'});
if (window.innerWidth <650){
  const navbar = document.getElementById("navbar");
  navbar.style.width = "0%";
  const openbarbtn = document.getElementById("openbarbtn");
  openbarbtn.style.display = "block";
}
}
function scrolltocontacts(){
  const contacts = document.getElementById("contacts");
  contacts.scrollIntoView({behavior:'smooth', block:'center'});
  if (window.innerWidth <650){
    const navbar = document.getElementById("navbar");
    navbar.style.width = "0%";
    const openbarbtn = document.getElementById("openbarbtn");
    openbarbtn.style.display = "block";
  }
}

//function to show school location 
    // Initialize the map and set its view
    var map = L.map('map').setView([-1.286389, 36.817223], 13); // Coordinates for Nairobi

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 190,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add a marker
    var marker = L.marker([-1.286389, 36.817223]).addTo(map);
    marker.bindPopup("<b>spleng school!</b><br>nairobi.").openPopup();
