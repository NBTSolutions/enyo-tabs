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
        {name: "tabs", kind: "onyx.RadioGroup", ontap: "_handleTabSelect"},
		{name: "headerContainer"},
        {arrangerKind: "CardArranger", name: "body", fit: true, components: [
			{kind: "Panels", style: "height: 100%"}
		]},
		{name: "footerContainer"}
    ],
    create: function() {
        this.inherited(arguments);

		if (this.header) {
			this.$.headerContainer.createComponent(this.header, { name: "header", owner: this });
		}
		if (this.footer) {
			this.$.footerContainer.createComponent(this.footer, { name: "footer", owner: this });
		}
		_.each(this.tabs, function(tab) {
			this.$.panels.createComponent(tab.panel, {owner: this});
			this.$.tabs.createComponent(tab, {
				classes: tab.classes + " " + this.tabStyle,
				components: [
					{content: tab.title, classes: this.textStyle}
				]
			});
		}, this);

        this.setActive(0);
    },
    setActive: function(inIndex) {
        this.$.tabs.getControls()[inIndex].setActive(true);
		this.$.panels.setIndex(inIndex);
    },
	_handleTabSelect: function(inSender, inEvent) {
		var tab = inEvent.originator.content ? inEvent.originator.parent : inEvent.originator;
		var index = _.indexOf(this.$.tabs.children, tab);
		if (index < 0) return;

		this.setActive(index);
		this.handleTabSelect(inSender, tab);
	},
	handleTabSelect: function(inSender, inEvent) { }
});
