/*-------------- Constants -------------*/

const helpButton = document.getElementById('helpbutton');
const playButton = document.getElementById('playbutton');
const helpPopup = document.getElementById('helpPopup');

/*---------- Variables (state) ---------*/


/*----- Cached Element References  -----*/


/*-------------- Functions -------------*/


/*----------- Event Listeners ----------*/
// Play button for game.html
playButton.addEventListener('click', function () {
  window.location.href = 'game.html';
});

// Help button for the popup in same page
helpButton.addEventListener('click', () => {
  if (helpPopup.style.display === 'none') {
    helpPopup.style.display = 'block';
  } else {
    helpPopup.style.display = 'none';
  }
});