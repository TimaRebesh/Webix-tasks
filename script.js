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

const dataTable = { 
    view:"datatable",
    id: "tableInfo",
    select:true,
    columns:[
        { id:"rank", header:"", css:"rank",  width:50},
        { id:"title", header:"Film title",  
            template:"#title#", width:400},
        { id:"year",	header:"Released",
            template:"#year#", width:80},
        { id:"votes", header:"Votes", 
            template:"#votes#"},
        { template:"{common.trashIcon()}" }
        
    ],
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
    data: window.testData
    //url:"data/data.js",
   
};

const myFormRight = {   
    view:"form",
    id:"myform",
    width:280,
    rules:{
        title:webix.rules.isNotEmpty,
        year:function(value){
            return (value>=1970 && value<=thisYear);},
        votes:function(value){
            return (value>=10000);},
        
        rating:function(value){
            return value != 0 }
    },    
    elements:[
        { rows:[
            { type: "section", template:"Edit films", },
            { view:"text", label:"Title", name:"title", invalidMessage:"Enter movie title"},
            { view:"text", label:"Year", name:"year", invalidMessage:"Enter year between 1970 and this yer"},
            { view:"text", label:"Rating", name:"rating", invalidMessage:"rating should not be zero"},
            { view:"text", label:"Votes", name:"votes", invalidMessage:"votes must be more than 10,000"},
        
            { cols: [
                { view:"button", value:"Add new", css:"webix_primary", click:function(){
                    if($$("myform").validate()){
                            let item = $$("myform").getValues();
                            $$("tableInfo").add(item);  
                            webix.message({text: "Verification successful"});  
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

let usersList = {
    rows:[
        {
            height: 35,
            view:"toolbar",
            elements:[ 
                {view:"text", id:"list_input", label:"", },
                { view:"button", value:"Sort asc", width: 100, css:"webix_primary"},
                { view:"button", value:"Sort desc", width: 100, css:"webix_primary"},
            ]
        },
        {
            view:"list", 
            id:"myUsersList", 
            template:"#name# from #country# <span class='removeBtn'>X</span>",
            select:true,
            scroll:true, 
            data:window.usersData,
            onClick:{
                removeBtn:function(e, id){
                  this.remove(id);
                  return false;
                }
            },
            scheme:{
                $init:function(obj){
                    if (obj.id<=5) obj.$css = "green";
                }
            } 
        }
    ]        
};


let usersChart = {
    view:"chart",
    type:"bar",
    value:"#age#",
    xAxis:{
        template:"#age#"
    },
    data:window.usersData 
};

let ProductsView = {
    view:"treetable",
    columns:[
        { id:"id",	header:"", css:{"text-align":"right"}, width:50},
        { id:"title",	header:"Title",	width:250,
            template:"{common.treetable()} #title#" },
        { id:"price",	header:"Price",  template:"#price#", width:250}
    ],
    autowidth:true,
    autoConfig: true,
    scrollX: false,
    select: true,
    data: window.productsData
};

let main = {
    cells:[ 
        { id:"Dashboard", cols:[dataTable, myFormRight]},
        { id:"Users", rows:[usersList, usersChart]},
        { id:"Products", rows:[ProductsView]},
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

$$('tableInfo').sort("#year#");

$$("list_input").attachEvent("onTimedKeyPress",function(){
    let value = this.getValue().toLowerCase();
    $$("myUsersList").filter(function(obj){
        return obj.name.toLowerCase().indexOf(value)==0;
    })
});
