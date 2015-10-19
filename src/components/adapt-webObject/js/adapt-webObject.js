/*
* adapt-webObject
*/


define(function(require) {
  var ComponentView = require('coreViews/componentView');
  var Adapt = require('coreJS/adapt');
  //  var _ = require('coreJS/libraries/underscore');
    
  var WebObject = ComponentView.extend({
      
   events: {
      'inview':'inview'
    },
	  
    preRender: function() {
            this.$el.addClass("no-state");
            // Checks to see if the blank should be reset on revisit
            this.checkIfResetOnRevisit();
        },

        postRender: function() {
            this.setReadyStatus();


            // Check the instruction to fire trickle check from edge
            
            var useTrickle = this.$('.component-instruction').length > 0
                ? '.component-instruction'
                : (this.$('.component-body').length > 0 ? '.component-body' : null);
            
            this.my_webobject = this;

            if (!useTrickle) {
                this.actTrickle();
            } else {
                this.actTrickle();
            }
        },

        // Used to check if the blank should reset on revisit
        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        }, 
      
    inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.$('.component-widget').off('inview');
                    triggerVar = "0";
                }

            }
        },
      
    actTrickle: function() {
            triggerVar = "0";
            triggerCheck = setInterval(_.bind(this.inview1, this), 1000);
        
    },
      
            inview1: function() {
                if (triggerVar == "1") {
                    this.setCompletionStatus();
                }
            }

  });

  
  Adapt.register("webObject", WebObject);

});