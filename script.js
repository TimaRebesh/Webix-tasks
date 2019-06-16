/*const info = [
    { id:1, title:"The Shawshank Redemption", year:1994, votes:678790, rating:9.2, rank:1},
    { id:2, title:"The Godfather", year:1972, votes:511495, rating:9.2, rank:2},
    { id:3, title:"The Godfather: Part II", year:1974, votes:319352, rating:9, rank:3},
    { id:4, title:"The Good, the Bad and the Ugly", year:1966, votes:213020, rating:8.9, rank:4},
    { id:5, title:"My Fair Lady", year:1964, votes:533848, rating:8.9, rank:5},
    { id:6, title:"12 Angry Men", year:1957, votes:164558, rating:8.9,rank:6}       
];*/
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
    columns:[
        { id:"rank", header:"", css:"rank",  width:50},
        { id:"title", header:"Film title", 
            template:"<strong>#title#</strong>", width:200},
        { id:"year",	header:"Released" ,
            template:"#year#", width:80},
    ],
    
    autoheight:true,
    autowidth:true,
    autoConfig: true,
    scrollX: false,
    //columnWidth:70,
    data: window.testData
};
//$$("tableInfo").parse(data);

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
    view:"list", 
    id:"", 
    width:200,
    select:true,  
    scroll:false,
   
    
   
    //data:          // webix creates id for names automatically
};

let usersChart = {
    view:"chart",
    type:"bar",
    value:"#sales#",
    label:"#sales#",
    barWidth:35,
    radius:0,
    gradient:"falling",
    data: [
        { id:1, sales:20, year:"02"},
        { id:2, sales:55, year:"03"},
        { id:3, sales:40, year:"04"},
        { id:4, sales:78, year:"05"}
    ]
};

var main = {
    cells:[ 
        { id:"Dashboard", cols:[dataTable, myFormRight]},
        { id:"Users", rows:[usersList, usersChart]},
        { id:"Products", template:"Products view"},
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



