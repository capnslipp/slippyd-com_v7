var shiftStripes = null;

$(document).onReady(function() {
	var stripesLayer = $$('#page-background > .stripes > .layer')[0];
	var stripesVOffset = 0;
	var repeatDur = 32; // seconds
	var shiftVel = 4;
	
	shiftStripes = function() {
		stripesVOffset += shiftVel * repeatDur;
		stripesLayer.setStyle({
			'background-position-y': stripesVOffset+'px',
		});
		
		setTimeout('shiftStripes();', repeatDur * 1000); // 32s, matching the “transition:” property on “#page-background > .stripes > .layer”
	};
	
	shiftStripes();
});
