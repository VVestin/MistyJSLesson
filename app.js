let lightClient = new LightClient('10.0.10.235')
window.onload = function() {
	//console.log(lightClient)
    let up = false
	let down = false
	let right = false
	let left = false
	lightClient.PostCommand("PlayAudioClip",{AssetId: "Windows XP Startup Sound (Bass Boosted).mp3"});
	window.addEventListener('keydown', function(e) {
		if (e.key == 'ArrowUp') {
			if(!up){
			    up = true
                drive()
                lightClient.PostCommand("images/change",{FileName:"Angry.jpg"});
            }
		} else if (e.key == 'ArrowDown') {
			if(!down){
			    down = true
			    drive(-100, 0)
			}
		} else if (e.key == 'ArrowRight') {
		    if(!right){
		        right = true
		        drive(50, -50)
		    }
		} else if (e.key == 'ArrowLeft') {
		    if(!left){
		        left = true
		        drive(50, 50)
		    }
		    }
	})
	window.addEventListener('keyup', function(e) {
		if (e.key == 'ArrowUp') {
			up = false
			stop()
			lightClient.PostCommand("images/change",{FileName:"perish.jpg"});
		} else if (e.key == 'ArrowDown') {
			down = false
			stop()
		} else if (e.key == 'ArrowRight') {
            right = false
            stop()
        } else if (e.key == 'ArrowLeft') {
            left = false
            stop()
        }
	})
	
}
	
function drive(lin = 100, ang = 0) {
       console.log("I will drive")
	lightClient.PostCommand('drive', {
		LinearVelocity: '' + lin, AngularVelocity: '' + ang
	})
}

function stop() {
    console.log("I will stop")
	lightClient.PostCommand('drive/stop')
}



function LightClient(ip, ajaxTimeout) {

	var ipAddress = (ip === null ? "localhost" : ip);
	var timeout = (ajaxTimeout === null ? 10000 : ajaxTimeout);

	this.SetIp = function (ip) {
		ipAddress = ip;
	}
	this.SetTimeout = function (theTimeout) {
		timeout = theTimeout;
	}

	this.GetCommand = function (command, successCallback = null, version = null) {
		var newUri = "http://" + ipAddress + "/api/" + (version ? version + "/" : "") + command;
		$.ajax({
			type: "GET",
			url: newUri,
			dataType: "json",
			async: true,
			timeout: this._timeout
		})
			.done(function (data, status, xhr) {
				console.log('I did a ' + command)
				console.log(theData)
				if (data === null || data[0] === null || data[0].status === "Error") {
					console.log("Get " + (version ? version : "") + "Response Error:", data[0].errorMessage);
				}
				else if (successCallback) {
					// no errors and there is a callback function.
					successCallback(data);
				}
			})
			.fail(function (request, status, err) {
				// There was an error with the call.  Display error messages.
				console.log("Get Http Error: ", request, status, err);
			});
	}

	this.PostCommand = function (command, theData = {}, successCallback = null, version = null) {
		var newUri = "http://" + ipAddress + "/api/" + (version ? version + "/" : "") + command;
		$.ajax({
			type: "POST",
			url: newUri,
			data: JSON.stringify(theData),
			dataType: "json",
			async: true,
			timeout: this._timeout
		})
			.done(function (data) {
				console.log('I did a ' + command)
				console.log(theData)
				if (data === null || data[0] === null || data[0].status === "Error") {
					console.log("Post " + (version ? version : "") + "Response Error:", data[0].errorMessage);
				}
				else if (successCallback) {
					successCallback(data);
				}
			})
			.fail(function (request, status, err) {
				// There was an error with the call.  Display error messages.
				console.log("Post Http Error: ", request, status, err);
			});
	}
}
