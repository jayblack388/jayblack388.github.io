//document ready function to make everything load once the DOM is ready
$(document).ready(function(){

	//set my initial variables and values	
	let winCount = 0;
	let loseCount = 0;
	let targetScore = Math.floor(Math.random() * 100) + 19;
	let button1 = Math.floor(Math.random() * 12) + 1;
	let button2 = Math.floor(Math.random() * 12) + 1;
	let button3 = Math.floor(Math.random() * 12) + 1;
	let button4 = Math.floor(Math.random() * 12) + 1;
	let currentScore = 0;

	//set my game logic--->case for hitting targetScore and case for overshooting it
	const playGame = () =>{
		if(currentScore === targetScore){
			winCount++;
			$('#win-counter').text(winCount);
			$('#winLoss').text('Winner!');
			targetScore = Math.floor(Math.random() * 100) + 19;
			$('#random-number').text(targetScore);
			currentScore = 0;
			$('#current-score-counter').text(currentScore);
			getButtonScore();
		};
		if(currentScore > targetScore){
			loseCount++;
			$('#loss-counter').html(loseCount);
			$('#winLoss').text('Loser!');
			targetScore = Math.floor(Math.random() * 100) + 19;
			$('#random-number').text(targetScore);
			currentScore = 0;
			$('#current-score-counter').text(currentScore);
			getButtonScore();
		};
	};

	//making a function to re-randomize the button values
	const getButtonScore = () =>{
		button1 = Math.floor(Math.random() * 12) + 1
		button2 = Math.floor(Math.random() * 12) + 1
		button3 = Math.floor(Math.random() * 12) + 1
		button4 = Math.floor(Math.random() * 12) + 1
	};

	//adding the current targetScore to the page
	$('#random-number').text(targetScore);


	//on click functions for each button
	$('#red').on('click', function(){
		currentScore += button1;
		$('#current-score-counter').text(currentScore);
		playGame();
	});
	$('#blue').on('click', function(){
		currentScore += button2;
		$('#current-score-counter').text(currentScore);
		playGame();
	});
	$('#green').on('click', function(){
		currentScore += button3;
		$('#current-score-counter').text(currentScore);
		playGame();
	});
	$('#purple').on('click', function(){
		currentScore += button4;
		$('#current-score-counter').text(currentScore);
		playGame();
	});
});







