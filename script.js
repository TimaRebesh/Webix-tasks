let collectionCategories = new webix.DataCollection({url: "extra-js/categories.js"});
let collectionUsers = new webix.DataCollection({url: "data/users.js"});
let countries = new webix.DataCollection({url: "extra-js/countries.js"});

webix.ready(function () {

    const topbar = { 
        view:"toolbar", 
        css:"webix_dark", 
        elements:[
            { view:"label", label:"My App", css:"top_label"},
            {},
            { view:"button", id:"butHed", label:"Profile", css:"webix_transparent", type:"icon", icon:"wxi-user", width: 150,
                click: function(){
                    winPopup.show(this.$view);
                } 
            }
        ]};
    
    const side = {
        rows: [
            {
                view:"list", 
                id:"mylist", 
                width:200,
                select:true,  
                scroll:false,
                css: "list_bgc",
                on:{
                    onAfterSelect:function(id){ 
                    $$(id).show();
                    }
                },
                data: [ "Dashboard", "Users", "Products", "Admin"],         // webix creates id for names automatically
            },
            {
                template: "<div><span class='webix_icon wxi-check'></span>Connected</div>",
                css: "greenbutton",
                autoheight: true
            }
        ]
    };

    const winPopup = webix.ui({
        view:"popup",
        body:{
            view:"list", 
            template:"#title#", 
            select:true,  
            autoheight:true, 
            autowidth:true, 
            data: [ 
                {id:1, title:"Settings"},
                {id:2, title:"Log Out"}
            ]
        }
    });

    const dataTable = { 
        gravity: 3,
        rows:[
            {  view:"tabbar", id:"myTabbar", inputWidth:600, options:[ 
                    { id:1, value: "All"},
                    { id:2, value: "Old" },
                    { id:3, value: "Modern" },
                    { id:4, value: "New" }
                ],
                on:{
                    onChange:function(){
                    $$("tableInfo").filterByAll();
                    }
                }
            },  
            {  
            view:"datatable",
            id: "tableInfo",
            select:true,
            leftSplit: 1,
            scrollX: true,
            hover:"myhover",
            columns:[
                { id:"rank", header:"#", css:"rank", sort: "int",  width:50},
                { id:"title", header:["Film title", {content:"textFilter"}], sort: "string", fillspace: true, width:300},
                { id:"category", header:["Category", {content:"selectFilter"}], 
                    editor:"richselect", sort: "string", options: collectionCategories},
                { id:"rating", header:["Rating", {content:"textFilter"}], sort: "int"},
                { id:"votes", header:["Votes", {content:"textFilter"}], sort: "int",},
                { id:"year", header:"Year"},
                { template:"{common.trashIcon()}", width:80 }
                
            ],
            onClick:{
                "wxi-trash":function(e, id){
                    webix.confirm({
                        title: "Delete",
                        text: "Do you really want to delete this Data?",
                        callback: function (result) {
                            if (result) {
                                $$("tableInfo").remove(id);
                            }
                        }
                    });
                    return false;
                }
            },
            scheme: {
                $init: function (obj) {
                    obj.category = Math.floor(Math.random() * 4 + 1);
                    obj.votes = obj.votes.replace(",", ".");
                    obj.rating = obj.rating.replace(",", ".");
                }
            },
            //data: window.testData
            url:"data/data.js"  
            }
        ]
    };


    const myFormRight = {   
        view:"form",
        id:"myform",  
        elementsConfig: {
            bottomPadding: 30
        }, 
        elements:[
            { rows:[
                { type: "section", template:"Edit films", },
                { view:"text", label:"Film Title", name:"title", invalidMessage:"Enter movie title"},
                { view:"text", label:"Year", name:"year", invalidMessage:"Enter the year"},
                { view: "richselect", label: "Category", name: "category", options: collectionCategories},
                { view:"text", label:"Rating", name:"rating", invalidMessage:"rating should not be zero"},
                { view:"text", label:"Votes", name:"votes", invalidMessage:"votes must be more than 10,000"},
            
                { cols: [
                    { view:"button", value:"Save", css:"webix_primary", align: "left", click:function(){
                        $$("myform").save()
                        
                    }},
                    { view:"button", value:"Clear", click: () =>{
                        webix.confirm({
                            title:"",
                            text:"Clear this form?"
                        }).then(		
                            function(){	 			
                                $$("myform").clear();
                                $$("myform").clearValidation();
                                $$("tableInfo").unselectAll();
                            },   
                        );   
                    }}
                ]}
            ], 
        },
        {},
        ],
        rules:{
            title:webix.rules.isNotEmpty,
            year: function (value) {
                return value <= new Date().getFullYear()},
            votes: webix.rules.isNotEmpty,
            rating:function(value){
                return value != 0 }
            }, 
    };

    webix.protoUI({
        name:"editlist"
    }, webix.EditAbility, webix.ui.list);

    const usersList = {
        rows:[
            {
                height: 45,
                view:"toolbar",
                elements:[ 
                    {view:"text", id:"listInput", gravity: 3,
                    on: {                                           // filtering
                        onTimedKeyPress: () => {
                            let value = $$("listInput").getValue().toLowerCase();

                            $$("myUsersList").filter(function (obj) {
                                return obj.name.toLowerCase().indexOf(value) !== -1;
                            });
                        }
                        },
                    },
                    {   view:"button", 
                        value:"Sort asc", 
                        width: 100, 
                        type: "form",
                        click: () => {
                            collectionUsers.sort("name", "asc");
                        }
                    },
                    {   view:"button", 
                        value:"Sort desc", 
                        width: 100,
                        type: "form",
                        click: () => {
                            collectionUsers.sort("name", "desc");
                        }
                    },
                    {   view:"button", 
                        value:"Add new", 
                        width: 100,
                        type: "form",
                        click:function(){
                            addNewUser();
                    }}
                ]
            },
            {
                view:"editlist", 
                id:"myUsersList", 
                template:"#name#, #age#, from #country# <span class='webix_icon mdi mdi-close remove-icon' title='Remove'>x</span>",
                select:true,
                scroll:true, 
                data: collectionUsers,
                editable:true,
                editValue:"title",
                editaction:"dblclick",
                editor:"text",
                editValue:"name",
                rules:{
                    "name":webix.rules.isNotEmpty,
                },
                onClick:{
                    "remove-icon":function(e, id){
                        webix.confirm({
                            title: "Delete",
                            text: "Are you sure you want to delete this data?",
                            callback: function (result) {
                                if (result) {
                                    collectionUsers.remove(id);
                                }
                            }
                        });
                        return false;
                    }
                },
                scheme:{
                    $init:function(){
                        if (this.data.age < 26) this.data.$css = "green";
                    }
                } 
            }
        ]        
    };


    const usersChart = {
        view:"chart",
        type:"bar",
        id: "user_chart",
        xAxis:{
            template:"#country#"
        },
        yAxis: {}
    };

    const ProductsView = {
        view:"treetable",
        columns:[
            { id:"id",	header:"", css:{"text-align":"left"}, width:50},
            { id:"title", header:"Title",  width:500, editor:"text", template:"{common.treetable()} #title#" },
            { id:"price",	header:"Price",  template:"#price#", editor:"text", fillspace: true}  
        ],
        editable:true,
        rules:{
            "title":webix.rules.isNotEmpty,
            "price":webix.rules.isNumber
        },
        autoConfig: true,
        editaction: "dblclick",
        select: "row",
        scrollX: false,
        select: true,
        ready: function () {
            this.openAll();
        },
        url:"data/products.js"
    };

    function addNewUser() {
        countries.waitData.then(
            () => {
                const arr = countries.serialize();
    
                return {
                    "name": "New user",
                    "age": Math.floor(Math.random() * 100),
                    "country": arr[Math.floor(Math.random() * arr.length)].value
                }
            }
        ).then((userData) => {
            collectionUsers.add(userData);
        });
    }

    let main = {
        cells:[ 
            { id:"Dashboard", cols:[dataTable, myFormRight]},
            { id:"Users", rows:[usersList, usersChart]},
            { id:"Products", rows: [ProductsView] },
            { id:"Admin", template:"Admin view"}
        ]
    };

    const bottombar = {
        view:"label",
        label:"The software is provided by <a href='https://webix.com' target='_blank'>https://webix.com</a>. All rights reserved (c)",
        height:40,
        align:"center"
        };

    webix.ui({
        id:"app",
        rows: [
            topbar,
            { cols:[ side,  {view:"resizer"}, main ] },
            bottombar   
        ]
    });

    $$("myform").bind($$("tableInfo"));
    $$("myform").save();

    $$("tableInfo").registerFilter(
        $$("myTabbar"), {
            columnId: "year", compare: function (value, filter) {
                const ALL = 1;
                const OLD = 2;
                const MODERN = 3;
                const NEW = 4;

                if (+filter === ALL)
                    return value;
                if (+filter === OLD)
                    return value < 2000;
                if (+filter === MODERN)
                    return (value >= 2000 && value < 2010);
                if (+filter === NEW)
                    return value >= 2010;
            }
        },
        {
            getValue: function (node) {
                return node.getValue();
            },
            setValue: function (node, value) {
                node.setValue(value);
            }
        }
    );

    //$$("user_chart").sync($$("myUsersList"));

    $$("user_chart").sync(collectionUsers, function () {
        this.group({
            by: "country",
            map: {
                value: ["name", "count"]
            }
        });
    });
    $$("mylist").select("Dashboard");       // when loading this is the first display
    
});