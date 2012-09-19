enyo.kind({
    name: "App",
    components: [
        {kind: "TabPanels", classes: "enyo-unselectable", style: "height: 100%", components: [
            {title: "Tab A", components: [
                {name: "tabA", content: "hello. I'm the content for tab A", style: "height: 100%"}
            ]},
            {title: "Tab B", components: [
                {name: "tabB", content: "hello. I'm the content for tab B"}
            ]},
            {title: "Tab C", components: [
                {name: "tabC", content: "hello. I'm the content for tab C"}
            ]}
        ]}
    ]
});
