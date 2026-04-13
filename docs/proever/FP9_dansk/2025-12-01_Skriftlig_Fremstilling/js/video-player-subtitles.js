var subtitles = {
	T_29186: {
        lang: "en",
        name: "English",
        tracks: [
        T(TTime("00:00:00.000:00"), TTime("00:00:03.000:00"), "Kun tekst, der er relevant for opgavebesvarelsen, er tekstet til talesyntese."),
        T(TTime("00:00:03.840:00"), TTime("00:00:04.960:00"), "Det er dårligt vejr."),
        T(TTime("00:00:04.960:00"), TTime("00:00:08.320:00"), "Måske ligger du indenfor, under dynen eller oppe på sofaen?"),
        T(TTime("00:00:08.320:00"), TTime("00:00:11.680:00"), "Og mens du nyder din kop te, så lytter du til det her:"),
        T(TTime("00:00:11.680:00"), TTime("00:00:15.680:00"), "“En mand er i gang med at hive en livløs kvindekrop ud af bilen."),
        T(TTime("00:00:16.200:00"), TTime("00:00:20.480:00"), "Så tager han fat i liget under armen og trækker det hen over vejen"),
        T(TTime("00:00:20.480:00"), TTime("00:00:23.280:00"), "ind mod et lille skovområde ved siden af rideskolen."),
        T(TTime("00:00:23.760:00"), TTime("00:00:27.640:00"), "True Crime er en af de mest hørte, sete og læste genrer i verden."),
        T(TTime("00:00:27.840:00"), TTime("00:00:31.520:00"), "Den dominerer på streamingtjennester som HBO og Netflix"),
        T(TTime("00:00:31.520:00"), TTime("00:00:35.360:00"), "- på bestsellerlister og ikke mindst på hele podcastmarkedet."),
        T(TTime("00:00:35.360:00"), TTime("00:00:41.680:00"), "Vi er kommet på fornavn med bestialske mordere, og kender til voldsomme detaljer om deres gerninger."),
        T(TTime("00:00:42.040:00"), TTime("00:00:45.480:00"), "Men hvorfor er vi egentlig så fascinerede af True Crime?"),
        T(TTime("00:00:45.480:00"), TTime("00:00:49.520:00"), "Jeg tror frygten for det mørke, den tror jeg altid har været der"),
        T(TTime("00:00:49.520:00"), TTime("00:00:52.240:00"), "og den tror jeg altid vil være der, uanset hvor meget vi gemmer den af vejen."),
        T(TTime("00:00:52.480:00"), TTime("00:00:53.840:00"), "Det her er Mette Bratlann."),
        T(TTime("00:00:53.840:00"), TTime("00:00:59.920:00"), "Hun er psykolog, og har beskæftiget sig med unges forestilling og frygt for mørket i dem selv."),
        T(TTime("00:01:00.040:00"), TTime("00:01:04.840:00"), "Jeg tror altid, vi har haft en lyst til eller en tilbøjelighed til at opsøge det,"),
        T(TTime("00:01:04.840:00"), TTime("00:01:07.320:00"), "men under kontrollerede forhold."),
        T(TTime("00:01:07.440:00"), TTime("00:01:11.000:00"), "Som små børn, når vi leger fangeleg, så er det jo i virkeligheden lidt af det samme,"),
        T(TTime("00:01:11.000:00"), TTime("00:01:13.440:00"), "og vi kan tænke - Uh, jeg skal komme væk."),
        T(TTime("00:01:13.440:00"), TTime("00:01:16.000:00"), "Men man ved godt, det ikke er virkelighed, men leger det bare."),
        T(TTime("00:01:16.360:00"), TTime("00:01:18.800:00"), "True Crime, på mange måder, gør lidt af det samme."),
        T(TTime("00:01:18.800:00"), TTime("00:01:22.600:00"), "At man kan få lov til at beskæftige sig med det mørke og det skræmmende."),
        T(TTime("00:01:22.600:00"), TTime("00:01:27.480:00"), "Men under nogle forhold, hvor man jo godt ved, det er ikke mig, det går ud over nu.")
        ]
    }, 
	T_29754: {
        lang: "en",
        name: "English",
        tracks: [
        T(TTime("00:00:00.000:00"), TTime("00:00:02.936:00"), "Kun tekst, der er relevant for opgavebesvarelsen, er tekstet til talesyntese."),
        T(TTime("00:00:02.936:00"), TTime("00:00:07.173:00"), "Jeg skulle til at fortælle en sjov historie – fortælle noget meget morsomt."),
        T(TTime("00:00:07.707:00"), TTime("00:00:09.376:00"), "Og så kigger jeg lidt rundt -"),
        T(TTime("00:00:09.376:00"), TTime("00:00:11.544:00"), "- Hvorfor er der ikke nogen, der griner? Hvorfor er der ikke nogen reaktion?"),
        T(TTime("00:00:12.212:00"), TTime("00:00:15.348:00"), "- Så ser jeg, at alle sidder på deres telefoner. - Og så er jeg sådan lidt –"),
        T(TTime("00:00:16.049:00"), TTime("00:00:17.584:00"), "- Gud, det gider jeg ikke."),
        T(TTime("00:00:17.751:00"), TTime("00:00:19.853:00"), "- Jeg tror bare, det sådan lidt er blevet en kultur"),
        T(TTime("00:00:19.853:00"), TTime("00:00:22.922:00"), "- at man tager sin telefon frem."),
        T(TTime("00:00:23.356:00"), TTime("00:00:26.426:00"), "- Jeg tror bare, at man skal til at vågne lidt op.")
        ]
	}
};

/**
 * Takes up to 4 values 
 * 4 values: [0]hours[1]minutes[2]seconds[3]frames
 * 3 values: [0]minutes[1]seconds[2]frames
 * 2 values: [0]seconds[1]frames
 * 1 value : [0]frames
 */
function ATime() {
	var frames = 0;
	var seconds = 0;
	var minutes = 0;
	var hours = 0;
	if (arguments.length == 1) {
		frames = (arguments[0] * 1) / 24;
	}
	else if (arguments.length == 2) {
		frames = (arguments[1] * 1) / 24;
		seconds = arguments[0] * 1;
	}
	else if (arguments.length == 3) {
		frames = (arguments[2] * 1) / 24;
		seconds = arguments[1] * 1;
		minutes = (arguments[0] * 1) * 60;
	}
	else if (arguments.length == 4) {
		frames = (arguments[3] * 1) / 24;
		seconds = arguments[2] * 1;
		minutes = (arguments[1] * 1) * 60;
		hours = (arguments[0] * 1) * 3600;
	}
	else {
		return 0;
	}
	return hours + minutes + seconds + frames;
}

/**
 * If value is undefined returns 0
 * *//*@param {*} value *//*
 */
function UndefinedToZero(value) {
	if (typeof value === "undefined") {
		return 0;
	}
	return value;
}

/**
 * Convert input to seconds
 //* @param {numeric} frames Not Required
 //* @param {numeric} seconds Not Required
 //* @param {numeric} minutes Not Required
 //* @param {numeric} hours Not Required
 */

function _Time(frames, seconds, minutes, hours) {
	frames = UndefinedToZero(frames) / 24;
	seconds = UndefinedToZero(seconds);
	minutes = UndefinedToZero(minutes) * 60;
	hours = UndefinedToZero(hours) * 3600;
	return hours + minutes + seconds + frames;
}

/**
 * Convert string input "00:00:00:00" to seconds
 * @param {string} value Required
 */
function TTime(value) {
	if (typeof value === "undefined") {
		value = "00:00:00:00";
	}
	var split = value.split(":");
	var frames = (split[3] * 1) / 24;
	var seconds = split[2] * 1;
	var minutes = (split[1] * 1) * 60;
	var hours = (split[0] * 1) * 3600;
	var output = hours + minutes + seconds + frames;
	return output;
}

function T(start, end, text) {
	return {
		start: start,
		end: end,
		text: text
	};
}