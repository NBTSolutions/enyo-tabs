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
        {name: "tabs", kind: "onyx.RadioGroup", ontap: "doTabSelect"},
		{name: "headerContainer"},
        {arrangerKind: "CardArranger", name: "body", fit: true, components: [
			{kind: "Panels", draggable: false, animate: false, style: "height: 100%"}
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
			var newTab = this.$.tabs.createComponent(tab, { classes: tab.classes + " " + this.tabStyle });
			newTab.createComponent({
				components: [
					{content: tab.title, classes: this.textStyle, name: tab.name + "Text"}
				]
			});
		}, this);

        this.setActive(0);
    },
    setActive: function(inIndex) {
        this.$.tabs.getControls()[inIndex].setActive(true);
		this.$.panels.setIndex(inIndex);
    },
	doTabSelect: function(inSender, inEvent) {
		var tab = inEvent.originator.name.indexOf("Text") > -1 ? inEvent.originator.parent.parent : inEvent.originator;
		var index = _.indexOf(this.$.tabs.children, tab);
		if (index < 0) return;

		this.handleTabSelect(inSender, tab);
	},
	handleTabSelect: function(inSender, inTab) {
		this.setActive(_.indexOf(this.$.tabs.children, inTab));
	}
});
