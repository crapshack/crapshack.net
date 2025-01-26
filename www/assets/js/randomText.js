function randomtext() {
    var randomtxt = [
        'thank u for coming soon',
        'same as it ever was',
        'smile and wave',
		'and the days go by',
		'insert good text before publish',
		'mediocre at best',
		'website for u',
		'powered by quiet noise',
		'product of lost imagination',
		'nearing the end',
		'website for to comfort'
	];
    return randomtxt[Math.floor((Math.random() * 10.99))];
}

document.getElementById("words").innerHTML = randomtext();