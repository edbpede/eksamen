var subtitles = {
    T_194487_video: {
		lang: "en",
		name: "English",
        tracks: [
			//from		To			Text
			T(TTime("00:00:00:01"), TTime("00:00:02:00"), "Kun tekst, der er relevant for opgavebesvarelsen, er tekstet til talesyntese<br />MARIA"),
			T(TTime("00:00:02:00"), TTime("00:00:03:30"), "16 ÅR"),
			T(TTime("00:00:03:30"), TTime("00:00:05:30"), "HUN MÅ"),
			T(TTime("00:00:05:30"), TTime("00:00:07:00"), "KØRE KNALLERT"),
			T(TTime("00:00:07:00"), TTime("00:00:08:30"), "DYRKE SEX"),
			T(TTime("00:00:09:30"), TTime("00:00:11:00"), "HUN KAN"),
			T(TTime("00:00:11:00"), TTime("00:00:12:30"), "KOMME I FÆNGSEL"),
			T(TTime("00:00:13:30"), TTime("00:00:15:00"), "ARBEJDE"),
			T(TTime("00:00:15:00"), TTime("00:00:16:30"), "OG BETALE SKAT"),
			T(TTime("00:00:16:30"), TTime("00:00:18:00"), "MEN HUN MÅ IKKE....."),
			T(TTime("00:00:18:30"), TTime("00:00:20:00"), "VALGBORD<br />1"),
			T(TTime("00:00:23:00"), TTime("00:00:26:00"), "GIV DE 16-ÅRIGE STEMMERET"),
			T(TTime("00:00:26:00"), TTime("00:00:27:30"), "WWW.DUF.DK"),
			T(TTime("00:00:31:00"), TTime("00:00:35:00"), "DUF<br />DANSK UNGDOMS FÆLLESRÅD")
			
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
	if(arguments.length == 1) {
		frames = (arguments[0]*1)/24;
	}
	else if(arguments.length == 2) {
		frames = (arguments[1]*1)/24;
		seconds = arguments[0]*1;
	}
	else if(arguments.length == 3) {
		frames = (arguments[2]*1)/24;
		seconds = arguments[1]*1;
		minutes = (arguments[0]*1)*60;
	}
	else if(arguments.length == 4) {
		frames = (arguments[3]*1)/24;
		seconds = arguments[2]*1;
		minutes = (arguments[1]*1)*60;
		hours = (arguments[0]*1)*3600;
	}
	else {
		return 0;
	}
	return hours + minutes + seconds + frames;
}

/**
 * If value is undefined returns 0
 * @param {*} value 
 */
function UndefinedToZero(value) {
	if(typeof value === "undefined") {
		return 0;
	}
	return value;
}

/**
 * Convert input to seconds
 * @param {numeric} frames Not Required
 * @param {numeric} seconds Not Required
 * @param {numeric} minutes Not Required
 * @param {numeric} hours Not Required
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
	if(typeof value === "undefined") {
		value = "00:00:00:00";
	}
	var split = value.split(":");
	var frames = (split[3]*1)/24;
	var seconds = split[2]*1;
	var minutes = (split[1]*1)*60;
	var hours = (split[0]*1)*3600;
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