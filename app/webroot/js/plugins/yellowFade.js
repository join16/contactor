
jQuery.fn.yellowFade = function(color, time, attr, callback) {
	var target = this;
	if (this == undefined) {
		return;
	}
	if (attr == undefined) {
		attr = 'backgroundColor';
	}
	if (callback == undefined) {
		callback = function() {};
	}
	var prevBackgroundColor = $(this).css(attr);
	var paramBefore = {};
	var paramAfter = {};
	paramBefore[attr] = color;
	paramAfter[attr] = prevBackgroundColor;
	this.animate( paramBefore, 1 ).animate( paramAfter, time, function() {
		target.attr('style', '');
		callback();
	});
}