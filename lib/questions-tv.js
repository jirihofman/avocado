export function setQuestionsTv(text, options, solution) {

	const all = {
		questions: [
			{
				question: 'What is the full name of the main characters, the Winchester brothers?',
				correctAnswer: 'Samuel Winchester and Dean Winchester',
				incorrectAnswers: [
					'Michael Winchester and John Winchester',
					'Jared Winchester and Jensen Winchester'
				]
			},
			{
				question: "How did Sam and Dean Winchester's mother, Mary, die?",
				correctAnswer: 'She died in a house fire caused by the demon Azazel',
				incorrectAnswers: [
					'She was killed by a vampire',
					'She died in a car accident'
				]
			},
			{
				question: 'What is the name of the angel who becomes a close ally to the Winchesters?',
				correctAnswer: 'Castiel',
				incorrectAnswers: [
					'Raphael',
					'Gabriel'
				]
			},
			{
				question: 'What is the name of the demon who becomes a recurring antagonist throughout the series?',
				correctAnswer: 'Crowley',
				incorrectAnswers: [
					'Azazel',
					'Abaddon'
				]
			},
			{
				question: 'Which song is frequently played by the Winchester brothers in their car, the Impala?',
				correctAnswer: '"Carry On Wayward Son" by Kansas',
				incorrectAnswers: [
					'"Highway to Hell" by AC/DC',
					'"Wanted Dead or Alive" by Bon Jovi'
				]
			},
			{
				question: 'What is the name of the demon-killing knife that can permanently kill demons?',
				correctAnswer: "Ruby's Knife",
				incorrectAnswers: [
					"Lucifer's Blade",
					'Demon Slayer Dagger'
				]
			},
			{
				question: "Which archangel is responsible for breaking Sam Winchester's wall in his mind?",
				correctAnswer: 'Lucifer',
				incorrectAnswers: [
					'Michael',
					'Gabriel'
				]
			},
			{
				question: 'What is the name of the ancient organization that hunts supernatural creatures?',
				correctAnswer: 'Men of Letters',
				incorrectAnswers: [
					'The Order of the Phoenix',
					'The Night Stalkers'
				]
			},
			{
				question: "What are the names of Sam and Dean Winchester's respective vehicles?",
				correctAnswer: "Sam's vehicle is a black 1967 Chevy Impala, and Dean's vehicle is a 1967 Chevy Impala",
				incorrectAnswers: [
					"Sam's vehicle is a Dodge Charger, and Dean's vehicle is a Ford Mustang",
					"Sam's vehicle is a motorcycle, and Dean's vehicle is a pickup truck"
				]
			},
			{
				question: 'What is the name of the town where Sam and Dean were born and raised?',
				correctAnswer: 'Lawrence, Kansas',
				incorrectAnswers: [
					'Mystic Falls',
					'Sunnydale'
				]
			},
			{
				question: 'Which season of Supernatural introduced the character of Crowley?',
				correctAnswer: 'Season 5',
				incorrectAnswers: [
					'Season 2',
					'Season 7'
				]
			},
			{
				question: 'What is the name of the powerful family of witches who serve as recurring antagonists?',
				correctAnswer: 'The Styne Family',
				incorrectAnswers: [
					'The Coven of Shadows',
					'The Blackwood Witches'
				]
			},
			{
				question: 'Which creature is responsible for the death of Sam Winchester in Season 2?',
				correctAnswer: 'A Hellhound',
				incorrectAnswers: [
					'A Wendigo',
					'A Shapeshifter'
				]
			},
			{
				question: 'What is the name of the parallel universe introduced in Season 6?',
				correctAnswer: 'The Apocalypse World',
				incorrectAnswers: [
					'The Dark Dimension',
					'The Nether Realm'
				]
			},
			{
				question: "Who is the King of Hell after Crowley's death?",
				correctAnswer: 'Asmodeus',
				incorrectAnswers: [
					'Azazel',
					'Belphegor'
				]
			},
			{
				question: 'Which archangel is known as the Trickster and frequently takes on the form of pagan gods?',
				correctAnswer: 'Gabriel',
				incorrectAnswers: [
					'Michael',
					'Raphael'
				]
			},
			{
				question: 'What is the name of the angel who becomes the vessel for the fallen archangel Lucifer?',
				correctAnswer: 'Nick',
				incorrectAnswers: [
					'Adam',
					'Kevin'
				]
			},
			{
				question: 'Which biblical artifact is said to be capable of killing the Darkness?',
				correctAnswer: 'The Staff of Moses',
				incorrectAnswers: [
					'The Holy Grail',
					'The Spear of Destiny'
				]
			},
			{
				question: 'What is the name of the vampire who becomes an ally to the Winchesters?',
				correctAnswer: 'Benny Lafitte',
				incorrectAnswers: [
					'Lucas Barr',
					'Victor Henriksen'
				]
			},
			{
				question: 'What is the name of the angel who leads the Heavenly Host during the Apocalypse?',
				correctAnswer: 'Michael',
				incorrectAnswers: [
					'Castiel',
					'Uriel'
				]
			}
		]
	};

	const i = _.random(all.questions.length - 1);
	const question = all.questions[i];
	solution = question.correctAnswer;
	options = question.incorrectAnswers.map((answer, i) => ({ id: i + 1, value: answer }));
	// Add correct answer to options
	options.push({ id: options.length + 1, value: solution });
	options = _.shuffle(options);

	text = question.question;

	return { text, options, solution };
}
