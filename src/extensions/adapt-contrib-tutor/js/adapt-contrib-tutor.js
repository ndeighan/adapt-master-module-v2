define([
    'coreJS/adapt'
],function(Adapt) {

    Adapt.on('questionView:showFeedback', function(view) {

        var alertObject = {
            title: view.model.get("feedbackTitle"),
            body: view.model.get("feedbackMessage"),
            audioMp3: view.model.get("feedbackAudioMp3"),
            audioOgg: view.model.get("feedbackAudioOgg"),
            graphic: view.model.get("feedbackGraphic"),
            graphicAlt: view.model.get("feedbackGraphicAlt"),
            graphicTitle: view.model.get("feedbackGraphicTitle")
        };

        Adapt.once("notify:closed", function() {
            Adapt.trigger("tutor:closed");
        });

        Adapt.trigger('notify:popup', alertObject);
        
        Adapt.trigger('tutor:opened');
    });

});
