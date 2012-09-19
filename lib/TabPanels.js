enyo.kind({
    name: "TabPanels",
    kind: "FittableRows",
    components: [
        {name: "tabs", kind: "onyx.RadioGroup", controlClasses: "onyx-tabbutton", classes: "tab-panel"},
        {name: "client", style: "position: relative;", fit: true}
    ],
    create: function() {
        this.inherited(arguments);
        this.selectTab(0);
    },
    /**
     * @protected
     *
     * This is a naughty undocumented function by enyo that they are using in
     * their samples anyway! Here's what I've gleaned (the hard way; may be 
     * wrong):
     *
     * 1. It is invoked whenever a new control is added to this parent Control
     * 2. isChrome has something to do with whether the component is being
     *      defined above, or if some subclass is adding it...
     * 3. You can use it to make up your own field names! I created "title"
     */
    addControl: function(inControl) {
        this.inherited(arguments);
        if (inControl.isChrome) return;

        inControl.addClass("enyo-fit");
        inControl.showing = false;
        this.$.tabs.createComponent(
            {content: inControl.title, ontap: "tabTap", owner: this}
        );
    },
    selectTab: function(inIndex) {
        this.$.tabs.getControls()[inIndex].setActive(true);
        for (var i = 0, c$ = this.getClientControls(), c; c = c$[i]; i++) {
            c.setShowing(i == inIndex);
        }
    },
    tabTap: function(inSender) {
        this.selectTab(inSender.indexInContainer());
    }
});
