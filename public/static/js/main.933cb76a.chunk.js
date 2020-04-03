(this["webpackJsonpweb-chat-ui"]=this["webpackJsonpweb-chat-ui"]||[]).push([[0],{27:function(e,t,n){e.exports=n(59)},54:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(9),i=n(5),s=n(25),u=n(7),o=n(1),l=n(2),S=n.n(l),E=window.location,f=E.protocol,d=E.hostname,C=E.port,T="".concat(f,"//").concat(d,":").concat(C,"/api"),m="wss://".concat(d,":").concat(C),h=function(){return localStorage.getItem("user_token")},O=function(){var e=h();return e?{Authorization:"Bearer ".concat(e)}:{}},_=function(e){return localStorage.setItem("user_token",e),{type:"SET_USER_TOKEN",token:e}},I={user:null,token:localStorage.getItem("user_token"),initialized:!1,isProcessing:!1},p=n(6),b=function(e){return{type:"SET_ACTIVE_CHAT",chat:e}},A={chats:[],activeChat:null,initialized:!1,isProcessing:!1},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHAT_PROCESSING_STARTED":return Object(o.a)({},e,{isProcessing:!0});case"CHAT_PROCESSING_FINISHED":return Object(o.a)({},e,{isProcessing:!1});case"CHAT_INITIALIZED":return Object(o.a)({},e,{initialized:!0});case"ACTIVE_CHAT_INITIALIZED":return Object(o.a)({},e,{activeChat:Object(o.a)({},e.activeChat,{initialized:!0})});case"SET_CHAT_LIST":return Object(o.a)({},e,{chats:t.chats});case"ADD_CHAT_TO_LIST":var n=t.chat;return Object(o.a)({},e,{chats:[].concat(Object(p.a)(e.activeChat.chats),[n])});case"SET_ACTIVE_CHAT":return Object(o.a)({},e,{activeChat:Object(o.a)({},t.chat,{messages:[],invitationList:[]})});case"SET_ACTIVE_CHAT_MESSAGES":return Object(o.a)({},e,{activeChat:Object(o.a)({},e.activeChat,{messages:Object(p.a)(t.messages)})});case"ADD_MESSAGE_TO_ACTIVE_CHAT":return Object(o.a)({},e,{activeChat:Object(o.a)({},e.activeChat,{messages:[].concat(Object(p.a)(e.activeChat.messages),[t.message])})});default:return e}},g={initialized:!1,isProcessing:!1,userContacts:[],availableContacts:[]},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CONTACTS_INITIALIZED":return Object(o.a)({},e,{initialized:!0});case"CONTACTS_PROCESSING_STARTED":return Object(o.a)({},e,{isProcessing:!0});case"CONTACTS_PROCESSING_FINISHED":return Object(o.a)({},e,{isProcessing:!1});case"ADD_CONTACT_TO_LIST":return Object(o.a)({},e,{userContacts:[].concat(Object(p.a)(e.userContacts),[t.userId])});case"REMOVE_CONTACTS_FROM_LIST":var n=e.userContacts.filter((function(e){return e!==t.userId}));return Object(o.a)({},e,{userContacts:n});case"ADD_USER_TO_AVAILABLE":return Object(o.a)({},e,{availableContacts:[].concat(Object(p.a)(e.availableContacts),[t.user])});case"SET_CONTACTSET_ALL_AVAILABLE_CONTACTSS_LIST":return Object(o.a)({},e,{availableContacts:Object(p.a)(t.contacts)});case"SET_CONTACTS_LIST":return Object(o.a)({},e,{userContacts:Object(p.a)(t.userIds)});default:return e}},j=Object(u.c)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"USER_PROCESSING_STARTED":return Object(o.a)({},e,{isProcessing:!0});case"USER_PROCESSING_FINISHED":return Object(o.a)({},e,{isProcessing:!1});case"USER_INITIALIZED":return Object(o.a)({},e,{initialized:!0});case"SET_USER_TOKEN":var n=t.token;return Object(o.a)({},e,{token:n});case"SET_USER_PROFILE":var a=t.user;return Object(o.a)({},e,{user:a});default:return e}},chats:N,contacts:v}),y=n(26),R=(n(54),n(4)),D=(n(55),Object(i.b)((function(e){return{user:e.user}}),(function(e){return{signIn:function(t,n){return e(function(e,t){return function(n,a,c){n({type:"USER_PROCESSING_STARTED"});return S.a.post("".concat(c,"/users/login"),JSON.stringify({login:e,password:t}),{mode:"no-cors",headers:{"content-type":"application/json"}}).then((function(e){var t=e.data;window.localStorage.setItem("user_token",t),n(_(t))})).finally((function(){return n({type:"USER_PROCESSING_FINISHED"})}))}}(t,n))},signUp:function(t,n){return e(function(e,t){return function(n,a,c){n({type:"USER_PROCESSING_STARTED"});return S.a.post("".concat(c,"/users/register"),JSON.stringify({login:e,password:t}),{mode:"no-cors",headers:{"content-type":"application/json"}}).then((function(e){var t=e.data;n(_(t))})).finally((function(){return n({type:"USER_PROCESSING_FINISHED"})}))}}(t,n))}}}))((function(e){var t=e.user,n=e.signIn,r=e.signUp,i=Object(a.useState)(1),s=Object(R.a)(i,2),u=s[0],o=s[1],l=Object(a.useState)(""),S=Object(R.a)(l,2),E=S[0],f=S[1],d=Object(a.useState)(""),C=Object(R.a)(d,2),T=C[0],m=C[1],h=Object(a.useState)(""),O=Object(R.a)(h,2),_=O[0],I=O[1],p=Object(a.useState)(""),b=Object(R.a)(p,2),A=b[0],N=b[1],g=function(){I(""),N("")},v=function(e){return function(t){return e(t.target.value)}};return c.a.createElement("div",{className:"auth-form-container"},c.a.createElement("h3",null,"Web chat application"),c.a.createElement("form",{className:"auth-form",onSubmit:function(e){return e.preventDefault()}},c.a.createElement("input",{type:"text",value:E,disabled:t.isProcessing,onChange:v(f)}),c.a.createElement("input",{type:"password",value:T,disabled:t.isProcessing,onChange:v(m)}),c.a.createElement("div",{className:"auth-form-success"},A),c.a.createElement("div",{className:"auth-form-error"},_),c.a.createElement("div",{className:"auth-form-declaimer"},0===u?c.a.createElement("p",null,"Sign in to continue, don't have account ",c.a.createElement("b",{onClick:o.bind(null,1)},"sign up")):c.a.createElement("p",null,"Already registered, use your account ",c.a.createElement("b",{onClick:o.bind(null,0)},"sign in"))),0===u?c.a.createElement("button",{disabled:t.isProcessing||!E||!T,onClick:function(){g(),n(E,T).catch((function(e){e.response&&e.response.status<500?I("Invalid login or password"):I("server error")}))}},"Sign in"):c.a.createElement("button",{disabled:t.isProcessing||!E||!T,onClick:function(){g(),r(E,T).then((function(){f(""),m(""),o(0),N("User created, now you can sign in")})).catch((function(e){console.log(e.response),e.response&&409===e.response.status?I("User with this name already exists"):I("server error")}))}},"Sign up")))}))),P=(n(56),Object(i.b)((function(e){return{chatState:e.chats,contactsState:e.contacts,userState:e.user}}),(function(e){return{markChatInitialized:function(){return e({type:"CHAT_INITIALIZED"})},setChatList:function(){return e((function(e,t,n){e({type:"CHAT_PROCESSING_STARTED"});var a={headers:O()};return S.a.get("".concat(n,"/chats"),a).then((function(t){return e({type:"SET_CHAT_LIST",chats:t.data}),t.data})).finally((function(){return e({type:"CHAT_PROCESSING_FINISHED"})}))}))},selectChat:function(t){return e(b(t))},inviteToChat:function(t,n){return e(function(e,t){return function(n,a,c){n({type:"CHAT_PROCESSING_STARTED"});var r={headers:Object(o.a)({},O(),{"content-type":"application/json"})},i=JSON.stringify({participantIds:e,name:t});return S.a.post("".concat(c,"/chats"),i,r).then((function(e){return n(b(e.data)),e.data})).finally((function(){return n({type:"CHAT_PROCESSING_FINISHED"})}))}}(t,n))},markContactsInitialized:function(){return e({type:"CONTACTS_INITIALIZED"})},requestAvailableContacts:function(){return e((function(e,t,n){e({type:"CONTACTS_PROCESSING_STARTED"});var a={headers:O()};return S.a.get("".concat(n,"/contacts/all"),a).then((function(t){return e({type:"SET_CONTACTSET_ALL_AVAILABLE_CONTACTSS_LIST",contacts:t.data}),t.data})).finally((function(){return e({type:"CONTACTS_PROCESSING_FINISHED"})}))}))},requestContactList:function(){return e((function(e,t,n){e({type:"CONTACTS_PROCESSING_STARTED"});var a={headers:O()};return S.a.get("".concat(n,"/contacts"),a).then((function(t){return e({type:"SET_CONTACTS_LIST",userIds:t.data}),t.data})).finally((function(){return e({type:"CONTACTS_PROCESSING_FINISHED"})}))}))},addToContacts:function(t){return e(function(e){return function(t,n,a){t({type:"CONTACTS_PROCESSING_STARTED"});var c={headers:O()};return S.a.post("".concat(a,"/contacts/").concat(e),"",c).then((function(n){return t(function(e){return{type:"ADD_CONTACT_TO_LIST",userId:e}}(e)),n.data})).finally((function(){return t({type:"CONTACTS_PROCESSING_FINISHED"})}))}}(t))},deleteFromContacts:function(t){return e(function(e){return function(t,n,a){t({type:"CONTACTS_PROCESSING_STARTED"});var c={headers:O()};return S.a.delete("".concat(a,"/contacts/").concat(e),c).then((function(n){return t(function(e){return{type:"REMOVE_CONTACTS_FROM_LIST",userId:e}}(e)),n.data})).finally((function(){return t({type:"CONTACTS_PROCESSING_FINISHED"})}))}}(t))}}}))((function(e){var t=e.chatState,n=e.contactsState,r=e.userState,i=e.markChatInitialized,s=e.setChatList,u=e.selectChat,o=e.markContactsInitialized,l=e.requestAvailableContacts,S=e.requestContactList,E=e.addToContacts,f=e.deleteFromContacts,d=e.inviteToChat,C=t.chats,T=n.availableContacts,m=n.userContacts,h=Object(a.useState)(""),O=Object(R.a)(h,2),_=O[0],I=O[1],p=Object(a.useState)(0),b=Object(R.a)(p,2),A=b[0],N=b[1],g=Object(a.useState)([]),v=Object(R.a)(g,2),j=v[0],y=v[1];t.initialized||t.isProcessing||(i(),s()),n.initialized||n.isProcessing||(o(),l(),S());var D=function(e){y([]),I(""),N(e)},P=function(e){var t=function(e){return C.find((function(t){return 2===t.participantIds.length&&t.participantIds.includes(e)}))}(e);if(t)return D(0),void u(t);d([e,r.user.id]).then((function(e){D(0),u(e)}))},L=_?j:C,k=_?j:m.map((function(e){return T.find((function(e){return 1===e.id}))}));return c.a.createElement("aside",{className:"chat-sidebar\n      ".concat(t.isProcessing||n.isProcessing?"disabled":"","\n    ")},c.a.createElement("input",{className:"chat-sidebar-filter",placeholder:"Search",value:_,onChange:function(e){var t=0===A?C:T,n=e.target.value;console.log(t,n),y(t.filter((function(e){return(0===A?e.name:e.login).toLowerCase().indexOf(n.toLowerCase())>-1}))),I(n)}}),c.a.createElement("i",{className:"fa fa-search search-icon","aria-hidden":"true"}),c.a.createElement("div",{className:"switches"},c.a.createElement("button",{onClick:function(){return D(0)},className:"".concat(0===A&&"active")},"Chats"),c.a.createElement("button",{onClick:function(){return D(1)},className:"".concat(1===A&&"active")},"Contacts")),0===A?c.a.createElement("div",{className:"chat-list"},L.map((function(e){return c.a.createElement("div",{onClick:function(){return u(e)},className:"chat-item",key:e.id},e.name)}))):c.a.createElement("div",{className:"chat-list"},k.map((function(e){return c.a.createElement("div",{className:"chat-item",key:e.id},e.login,_?m.includes(e.id)?c.a.createElement("span",null,c.a.createElement("button",{onClick:function(){return P(e.id)}},"chat"),c.a.createElement("button",{onClick:function(){return f(e.id)}},"Remove")):c.a.createElement("button",{onClick:function(){return E(e.id)}},"Add"):c.a.createElement("span",null,c.a.createElement("button",{onClick:function(){return P(e.id)}},"chat"),c.a.createElement("button",{onClick:function(){return f(e.id)}},"Remove")))}))))}))),L=(n(57),Object(i.b)((function(e){return{chatState:e.chats,userState:e.user,contactsState:e.contacts}}),(function(e){return{sendMessage:function(t,n){return e(function(e,t){return function(n,a,c){var r={headers:Object(o.a)({},O(),{"content-type":"application/json"})},i=JSON.stringify({text:t});return S.a.post("".concat(c,"/chats/").concat(e,"/messages"),i,r)}}(t,n))},setMessages:function(t){return e(function(e){return function(t,n,a){var c={headers:O()};return S.a.get("".concat(a,"/chats/").concat(e,"/messages"),c).then((function(e){return t({type:"SET_ACTIVE_CHAT_MESSAGES",messages:e.data}),e.data}))}}(t))},initializeChat:function(){return e({type:"ACTIVE_CHAT_INITIALIZED"})}}}))((function(e){var t=e.chatState,n=e.userState,r=e.contactsState,i=e.sendMessage,s=e.setMessages,u=e.initializeChat,o=t.activeChat;o&&!o.initialized&&(u(),s(o.id));var l,S=Object(a.useState)(""),E=Object(R.a)(S,2),f=E[0],d=E[1],C=Object(a.useState)(!1),T=Object(R.a)(C,2),m=T[0],h=T[1],O=function(){o&&f.trim()&&i(o.id,f).then((function(){return d("")}))},_=c.a.createRef();return setTimeout((function(){_.current&&_.current.scroll(0,window.scrollY+window.innerHeight)}),25),c.a.createElement("main",{className:"active-chat"},c.a.createElement("div",{className:"active-chat-header"},c.a.createElement("h3",{className:"name"},o&&o.name),o&&c.a.createElement("div",{className:"pane"},c.a.createElement("i",{onClick:function(){return h(!0)},className:"fa fa-plus","aria-hidden":"true"}),m&&c.a.createElement("div",{className:"pane-list ".concat(m?"active":"")},r.availableContacts.map((function(e){return c.a.createElement("div",null,e.login)}))))),c.a.createElement("div",{className:"active-chat-messages",ref:_},o&&o.messages&&o.messages.map((function(e){return c.a.createElement("div",{key:e.id,className:"message\n              ".concat(e.senderId===n.user.id?"righty":"lefty")},c.a.createElement("div",{className:"bubble"},e.text))}))),c.a.createElement("input",{className:"send-message-input",value:f,onChange:(l=d,function(e){return l(e.target.value)}),onKeyPress:function(e){"Enter"===e.key&&O()}}),c.a.createElement("i",{onClick:O,className:"fa fa-paper-plane-o send-message-button","aria-hidden":"true"}))}))),k=(n(58),Object(i.b)((function(e){return{userState:e.user}}))((function(e){var t=e.dispatch,n=e.userState.user;return c.a.createElement("header",{className:"user-status-header"},c.a.createElement("i",{className:"fa fa-user-circle-o","aria-hidden":"true"}),n&&n.login,c.a.createElement("i",{className:"fa fa-sign-out","aria-hidden":"true",onClick:function(){return t(_(""))}}))}))),H="MESSAGE_CREATED",w="USER_CREATED",G=Object(i.b)((function(e){return{user:e.user}}))((function(e){var t=e.dispatch,n=e.user;return!n.token?c.a.createElement(D,null):(n.initialized||n.isProcessing||(t({type:"USER_INITIALIZED"}),t((function(e,t,n){e({type:"USER_PROCESSING_STARTED"});var a={headers:O()};return S.a.get("".concat(n,"/users/profile"),a).then((function(e){return e.data})).then((function(t){return e(function(e){return{type:"SET_USER_PROFILE",user:e}}(t))})).finally((function(){return e({type:"USER_PROCESSING_FINISHED"})}))})).catch((function(e){})),function(e){try{new WebSocket("".concat(m,"?token=").concat(h())).onmessage=function(t){var n=JSON.parse(t.data);switch(n.type){case H:return e(function(e){return{type:"ADD_MESSAGE_TO_ACTIVE_CHAT",message:e}}(n.data));case w:return e({type:"ADD_USER_TO_AVAILABLE",user:n.data});default:return}}}catch(t){console.log("failed to connect over ws")}}(t)),c.a.createElement("div",{className:"App"},c.a.createElement(k,null),c.a.createElement("div",{className:"component-container"},c.a.createElement(P,null),c.a.createElement(L,null))))})),U=Object(u.d)(j,Object(u.a)(y.a.withExtraArgument(T),Object(s.createLogger)()));Object(r.render)(c.a.createElement(i.a,{store:U},c.a.createElement(G,null)),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.933cb76a.chunk.js.map