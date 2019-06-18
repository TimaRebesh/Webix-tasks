const topbar = { view:"toolbar", css:"webix_dark", elements:[
    { view:"label", label:"My App", css:"top_label"},
    {},
    { view:"button", id:"butHed", label:"Profile", css:"webix_transparent", type:"icon", icon:"wxi-user", width: 150,
        click: function(){
            winPopup.show(this.$view);
        } }
    ]};
   
const side = {
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
    data: [ "Dashboard", "Users", "Products", "Admin"]         // webix creates id for names automatically
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
var options =  "extra-js/categories.js";

const dataTable = { 
    rows:[
        {  view:"segmented", css:"segbgc", id:"segSelec", inputWidth:600, options:[ 
                { id:1, value: "All" , width:150},
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
        columns:[
            { id:"rank", header:"#", css:"rank",  width:50},
            { id:"title", header:["Film title", {content:"textFilter"}], 
                template:"#title#", width:300},
            { id:"value", header:["Category", {content:"selectFilter"}], editor:"richselect",  options: options, width:80},
            { id:"rating", header:["Rating", {content:"textFilter"}],
                template:"#rating#"},
            { id:"votes", header:["Votes", {content:"textFilter"}],
                template:"#votes#"},
            { id:"year", header:"Year",
                template:"#year#", width:80},
            { template:"{common.trashIcon()}", width:80 }
            
        ],
        editable:true,
        autowidth:true,
        autoConfig: true,
        scrollX: false,
        hover:"myhover",
        onClick:{
            "wxi-trash":function(e, id){
                this.remove(id);
                return false;
            }
        },
        columnWidth:70,
        //data: window.testData
        url:"data/data.js"  
        }
    ]
};

/*
$$("tableInfo").registerFilter(
    $$("segSelec"), 
    { columnId:"year", compare:function(value, filter, item){
    if(filter == 1)  return year < 2000;
    if (filter == 2) return year > 2000;
    }},
    { 
        getValue:function(node){
            return node.getValue();
        },
        setValue:function(node, value){
            node.setValue(value);
        }
    }
);
*/

const myFormRight = {   
    view:"form",
    id:"myform",
    width:280,
    rules:{
        title:webix.rules.isNotEmpty,
        year: webix.rules.isNumber,
        votes: webix.rules.isNotEmpty,
        rating:function(value){
            return value != 0 }
    },    
    elements:[
        { rows:[
            { type: "section", template:"Edit films", },
            { view:"text", label:"Film Title", name:"title", invalidMessage:"Enter movie title"},
            { view:"text", label:"Year", name:"year", invalidMessage:"Enter year between 1970 and this yer"},
            { view:"text", label:"Rating", name:"rating", invalidMessage:"rating should not be zero"},
            { view:"text", label:"Votes", name:"votes", invalidMessage:"votes must be more than 10,000"},
        
            { cols: [
                { view:"button", value:"Save", css:"webix_primary", click:function(){
                    if($$("myform").validate()){
                            let item = $$("myform").getValues();
                            $$("tableInfo").add(item);  
                            webix.message({text: "Verification successful"}); 
                            var form = $$('myform');
				            if(form.isDirty()){
					        if(!form.validate())
					        return false;
				            form.save();} 
                    }
                }},
                { view:"button", value:"Clear", click: () =>{
                     webix.confirm({
                        title:"",
                        text:"Clear this form?"
                    }).then(		
                        function(){	 			
                            $$("myform").clear();
                            $$("myform").clearValidation();
                        },   
                    );   
                }}
            ]}
        ], 
    },
    {},
]};


const thisYear = new Date().getFullYear();

webix.protoUI({
    name:"editlist"
}, webix.EditAbility, webix.ui.list);

let usersList = {
    rows:[
        {
            height: 35,
            view:"toolbar",
            elements:[ 
                {view:"text", id:"list_input", label:"", },
                { view:"button", value:"Sort asc", width: 100, css:"webix_primary"},
                { view:"button", value:"Sort desc", width: 100, css:"webix_primary"},
                { view:"button", value:"Add new", width: 100, css:"webix_primary", click:function(){
                    $$("myUsersList").add({name:"New film", age:"25", country:"Russia"})
                }}
            ]
        },
        {
            view:"editlist", 
            id:"myUsersList", 
            template:"#name#, #age#, from #country# <span class='removeBtn'>X</span>",
            select:true,
            scroll:true, 
            url:"data/users.js",
            editable:true,
            editValue:"title",
            editaction:"dblclick",
			editor:"text",
            editValue:"name",
            rules:{
                "name":webix.rules.isNotEmpty,
            },
            onClick:{
                removeBtn:function(e, id){
                  this.remove(id);
                  return false;
                }
            },
            scheme:{
                $init:function(obj){
                    if (obj.age < 26) obj.$css = "green";
                }
            } 
        }
    ]        
};


let usersChart = {
    view:"chart",
    type:"bar",
    id: "user_chart",
    value:"#age#",
    xAxis:{
        template:"#country#"
    }
};

let ProductsView = {
    view:"treetable",
    columns:[
        { id:"id",	header:"", css:{"text-align":"left"}, width:150},
        { id:"title", header:"Title", width:500, editor:"text",
            template:"{common.treetable()} #title#" },
        { id:"price",	header:"Price",  template:"#price#", editor:"text", width:250},
        {width:300}
    ],
    editable:true,
    rules:{
        "title":webix.rules.isNotEmpty,
        "price":webix.rules.isNumber
    },
    autowidth:true,
    autoConfig: true,
    scrollX: false,
    select: true,
    url:"data/products.js"
};

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
    type:"line",
    id:"app",
    rows: [
        topbar,
        { cols:[ side,  {view:"resizer"}, main ] },
        bottombar   
    ]
});

$$("mylist").select("Dashboard");       // when loading this is the first display

$$("myform").bind($$("tableInfo"));
$$("myform").save();

$$("user_chart").sync($$("myUsersList"));

$$('tableInfo').sort("#year#");

$$("list_input").attachEvent("onTimedKeyPress",function(){
    let value = this.getValue().toLowerCase();
    $$("myUsersList").filter(function(obj){
        return obj.name.toLowerCase().indexOf(value)==0;
    })
});
