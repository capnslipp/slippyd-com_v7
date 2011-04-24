var shiftStripes = null;

$(document).onReady(function() {
	var stripesLayer = $$('#page-background > .stripes > .layer')[0];
	var stripesVOffset = 0;
	var repeatDur = 32; // in seconds, must match the “transition:” property on “#page-background > .stripes > .layer”
	var shiftVel = 8;
	
	shiftStripes = function() {
		stripesVOffset += shiftVel * repeatDur;
		stripesLayer.setStyle({
			'background-position': '0 '+stripesVOffset+'px',
		});
		
		setTimeout('shiftStripes();', repeatDur * 1000);
	};
	
	shiftStripes();
});
