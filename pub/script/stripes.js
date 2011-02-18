if (window.SlippyDouglas == undefined)
	SlippyDouglas = {};


SlippyDouglas.Layer = function(domElement) {
	this._domElement = domElement;
	if (window.console && window.console.log)
		window.console.log('domElement: ', domElement);
	
	var backgroundImage = this._domElement.style.backgroundImage;
	if (window.console && window.console.log)
		window.console.log('backgroundImage: ', backgroundImage);
	this._repeatDist = backgroundImage.width;
	
	this._position = this._domElement.style.backgroundPositionX;
	
	this._velocity = 0.0;
	
	this.position = function() { return this._position || 0; };
	
	this.velocity = function() { return this._velocity; };
	this.setVelocity = function(aVelocity) { this._velocity = aVelocity; };
		
	this.step = function(timeDelta) {
		this._updatePosition(timeDelta);
		this._moveToPosition();
	};
	
	this._updatePosition = function(timeDelta) {
		var oldPosition = this.position();
		var newPosition = oldPosition + (this._velocity * timeDelta);
		while (newPosition >= this._repeatDist)
			newPosition -= this._repeatDist;
		while (newPosition <= -this._repeatDist)
			newPosition += this._repeatDist;
		
		if (window.console && window.console.log)
			window.console.log('position updated from “'+oldPosition+'” to “'+newPosition+'”.', this);
		
		this._position = newPosition;
	};
	
	this._moveToPosition = function() {
		this._domElement.style.backgroundPositionX = this._position;
	};
};


SlippyDouglas.stripes = {
	_layers: {
		r: null,
		g: null,
		b: null,
	},
	rLayer: function() {
		if (this._layers.r == null) {
			this._layers.r = new SlippyDouglas.Layer(
				$('page-background').down('.r.layer')
			);
		}
		return this._layers.r;
	},
	gLayer: function() {
		if (this._layers.g == null) {
			this._layers.g = new SlippyDouglas.Layer(
				$('page-background').down('.g.layer')
			);
		}
		return this._layers.g;
	},
	bLayer: function() {
		if (this._layers.b == null) {
			this._layers.b = new SlippyDouglas.Layer(
				$('page-background').down('.b.layer')
			);
		}
		return this._layers.b;
	},
	
	_animating: false,
	animate: function() {
		if (this._animating)
			return;
		
		if (this._slowMode)
			return;
		
		this._setup();
		this._animating = true;
		
		if (window.console && window.console.log)
			window.console.log('animating');
		
		//this._step();
	},
	
	_setup: function() {
		if (window.console && window.console.log)
			window.console.log('setting up');
		
		this.rLayer().setVelocity(10);
		this.gLayer().setVelocity(20);
		this.bLayer().setVelocity(30);
	},
	
	_lastStepTime: null,
	_lastStepDelta: null,
	_slowMode: false,
	
	_step: function() {
		var now = (new Date).getTime();
		var stepDelta;
		if (this._lastStepTime != null) {
			stepDelta = (now - this._lastStepTime) / 1000.0;
			
			/*if (stepDelta > 2000 && this._lastStepDelta > 2000) {
				this._slowMode = true;
				jar.put('slowMode', true);
				this._animating = false;
				this.jump();
				return;
			}*/
		} else {
			stepDelta = 0.0;
		}
		
		
		if (window.console && window.console.log)
			window.console.log('step of '+stepDelta+' at '+now+'.');
		
		this.rLayer().step(stepDelta);
		this.gLayer().step(stepDelta);
		this.bLayer().step(stepDelta);
		
		
		this._lastStepDelta = stepDelta;
		this._lastStepTime = now;
		
		setTimeout('SlippyDouglas.stripes._step();', 10);
	},
};


Event.observe(window, 'load', function() {
	SlippyDouglas.stripes.animate();
});
