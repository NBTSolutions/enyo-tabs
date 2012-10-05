enyo.kind({
    name: "TabPanels",
    kind: "FittableRows",
    events: {
        onTabSelect: ""
    },
    tabWidth: null,
    tabStyle: null,
    textStyle: null,
    components: [
        {name: "tabs", kind: "onyx.RadioGroup", controlClasses: "onyx-tabbutton"},
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

        //inControl.showing = false;
        if (this.tabWidth) inControl.style = "width: "+ this.tabWidth + "; "+ inControl.style;
        if (this.tabStyle) inControl.classes += " " + this.tabStyle;
        this.$.tabs.createComponent(
            {ontap: "tabTap", title: inControl.title, style: inControl.style,
                    classes: inControl.classes, owner: this, components: [
                {content: inControl.title, classes: this.textStyle}
            ]}
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
        this.doTabSelect(inSender);
    }
});
