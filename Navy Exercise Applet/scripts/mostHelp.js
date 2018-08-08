var mostHelp = {
	"getPlatform": function () {
		var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod|iOS)/ig) ? true : false );
		var android = ( navigator.userAgent.match(/(android)/ig) ? true : false );

		if (iOS) {
			return "iOS";
		}

		if (android) {
			return "Android";
		}

		return "Other";
	},
	"getConfigObject": function () {
		var configData;
		jQuery.ajax({
			url: "mostConfig.json",
			async: false
		}).done(function (data) {
			if (!(typeof data == 'object' || typeof data == 'array')) {
				data = JSON.parse(data);
			}
			configData = data;
		});
		return configData;
	},
	"getCustomizationsObject": function () {
		var customData;
		jQuery.ajax({
			url: "mostCustomizations.json",
			async: false
		}).done(function (data) {
			if (!(typeof data == 'object' || typeof data == 'array')) {
				data = JSON.parse(data);
			}
			customData = data;
		});
		return customData;
	},
    "mostConfirm": function (title, message, okButtonText, cancelButtonText, cancelable, callbackFn, callbackString) {
        if (mostHelp.getPlatform() == 'iOS') {
            IOSBridge.call("showConfirmDialogWithTitle:message:cancelButtonTitle:okButtonTitle:", [title, message, cancelButtonText, okButtonText], callbackFn);
        } else if (mostHelp.getPlatform() == 'Android' && typeof MOST != 'undefined') {
            // Cancelable variable determines whether Android back button can dismiss the dialog with a negative response.
			MOST.showDialog(title, message, okButtonText, cancelButtonText, cancelable, callbackString);
		} else {
            callbackFn(confirm(message));
		}
    },
	"mostDialog": function (title, message, buttonText) {
		if (mostHelp.getPlatform() == 'iOS') {
			IOSBridge.call("showAlertWithTitle:message:button:", [title,
				message, buttonText]);
		} else if (mostHelp.getPlatform() == 'Android' && typeof MOST != 'undefined') {
			MOST.showDialog(title, message, buttonText);
		} else {
			alert(message);
		}
	},
	"mostSetBack": function (destination, text) {
		if (mostHelp.getPlatform() == 'iOS') {
			IOSBridge.call("setAppletBackAction:text:", [destination, text]);
		} else if (mostHelp.getPlatform() == 'Android' && typeof MOST != 'undefined') {
			MOST.setBackBehavior(destination, text);
		}
	},
	"iosInputOpen": function () {
	},
	"iosInputClosed": function () {
	}
};