(this["webpackJsonpweb-chat-ui"]=this["webpackJsonpweb-chat-ui"]||[]).push([[0],{27:function(t,e,n){t.exports=n(59)},54:function(t,e,n){},55:function(t,e,n){},56:function(t,e,n){},57:function(t,e,n){},58:function(t,e,n){},59:function(t,e,n){"use strict";n.r(e);var a=n(0),c=n.n(a),r=n(9),i=n(4),s=n(25),u=n(7),o=n(1),l=n(2),S=n.n(l),E=window.location,f=E.protocol,C=E.hostname,d=E.port,T="".concat(f,"//").concat(C,":").concat(d,"/api"),m="ws://".concat(C,":").concat(d),h=function(){return localStorage.getItem("user_token")},O=function(){var t=h();return t?{Authorization:"Bearer ".concat(t)}:{}},_=function(t){return localStorage.setItem("user_token",t),{type:"SET_USER_TOKEN",token:t}},I={user:null,token:localStorage.getItem("user_token"),initialized:!1,isProcessing:!1},p=n(6),b=function(t){return{type:"SET_ACTIVE_CHAT",chat:t}},A={chats:[],activeChat:null,initialized:!1,isProcessing:!1},N=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"CHAT_PROCESSING_STARTED":return Object(o.a)({},t,{isProcessing:!0});case"CHAT_PROCESSING_FINISHED":return Object(o.a)({},t,{isProcessing:!1});case"CHAT_INITIALIZED":return Object(o.a)({},t,{initialized:!0});case"ACTIVE_CHAT_INITIALIZED":return Object(o.a)({},t,{activeChat:Object(o.a)({},t.activeChat,{initialized:!0})});case"SET_CHAT_LIST":return Object(o.a)({},t,{chats:e.chats});case"ADD_CHAT_TO_LIST":var n=e.chat;return Object(o.a)({},t,{chats:[].concat(Object(p.a)(t.activeChat.chats),[n])});case"SET_ACTIVE_CHAT":return Object(o.a)({},t,{activeChat:Object(o.a)({},e.chat,{messages:[],invitationList:[]})});case"SET_ACTIVE_CHAT_INVITATION_LIST":return Object(o.a)({},t,{activeChat:Object(o.a)({},e.chat,{invitationList:e.invitationList})});case"SET_ACTIVE_CHAT_MESSAGES":return Object(o.a)({},t,{activeChat:Object(o.a)({},t.activeChat,{messages:Object(p.a)(e.messages)})});case"ADD_MESSAGE_TO_ACTIVE_CHAT":return Object(o.a)({},t,{activeChat:Object(o.a)({},t.activeChat,{messages:[].concat(Object(p.a)(t.activeChat.messages),[e.message])})});default:return t}},g={initialized:!1,isProcessing:!1,userContacts:[],availableContacts:[]},v=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"CONTACTS_INITIALIZED":return Object(o.a)({},t,{initialized:!0});case"CONTACTS_PROCESSING_STARTED":return Object(o.a)({},t,{isProcessing:!0});case"CONTACTS_PROCESSING_FINISHED":return Object(o.a)({},t,{isProcessing:!1});case"ADD_CONTACT_TO_LIST":return Object(o.a)({},t,{userContacts:[].concat(Object(p.a)(t.userContacts),[e.userId])});case"REMOVE_CONTACTS_FROM_LIST":var n=t.userContacts.filter((function(t){return t!==e.userId}));return Object(o.a)({},t,{userContacts:n});case"ADD_USER_TO_AVAILABLE":return Object(o.a)({},t,{availableContacts:[].concat(Object(p.a)(t.availableContacts),[e.user])});case"SET_CONTACTSET_ALL_AVAILABLE_CONTACTSS_LIST":return Object(o.a)({},t,{availableContacts:Object(p.a)(e.contacts)});case"SET_CONTACTS_LIST":return Object(o.a)({},t,{userContacts:Object(p.a)(e.userIds)});default:return t}},j=Object(u.c)({user:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"USER_PROCESSING_STARTED":return Object(o.a)({},t,{isProcessing:!0});case"USER_PROCESSING_FINISHED":return Object(o.a)({},t,{isProcessing:!1});case"USER_INITIALIZED":return Object(o.a)({},t,{initialized:!0});case"SET_USER_TOKEN":var n=e.token;return Object(o.a)({},t,{token:n});case"SET_USER_PROFILE":var a=e.user;return Object(o.a)({},t,{user:a});default:return t}},chats:N,contacts:v}),y=n(26),R=(n(54),n(5)),D=(n(55),Object(i.b)((function(t){return{user:t.user}}),(function(t){return{signIn:function(e,n){return t(function(t,e){return function(n,a,c){n({type:"USER_PROCESSING_STARTED"});return S.a.post("".concat(c,"/users/login"),JSON.stringify({login:t,password:e}),{mode:"no-cors",headers:{"content-type":"application/json"}}).then((function(t){var e=t.data;window.localStorage.setItem("user_token",e),n(_(e))})).finally((function(){return n({type:"USER_PROCESSING_FINISHED"})}))}}(e,n))},signUp:function(e,n){return t(function(t,e){return function(n,a,c){n({type:"USER_PROCESSING_STARTED"});return S.a.post("".concat(c,"/users/register"),JSON.stringify({login:t,password:e}),{mode:"no-cors",headers:{"content-type":"application/json"}}).then((function(t){var e=t.data;n(_(e))})).finally((function(){return n({type:"USER_PROCESSING_FINISHED"})}))}}(e,n))}}}))((function(t){var e=t.user,n=t.signIn,r=t.signUp,i=Object(a.useState)(1),s=Object(R.a)(i,2),u=s[0],o=s[1],l=Object(a.useState)(""),S=Object(R.a)(l,2),E=S[0],f=S[1],C=Object(a.useState)(""),d=Object(R.a)(C,2),T=d[0],m=d[1],h=Object(a.useState)(""),O=Object(R.a)(h,2),_=O[0],I=O[1],p=Object(a.useState)(""),b=Object(R.a)(p,2),A=b[0],N=b[1],g=function(){I(""),N("")},v=function(t){return function(e){return t(e.target.value)}};return c.a.createElement("div",{className:"auth-form-container"},c.a.createElement("h3",null,"Web chat application"),c.a.createElement("form",{className:"auth-form",onSubmit:function(t){return t.preventDefault()}},c.a.createElement("input",{type:"text",value:E,disabled:e.isProcessing,onChange:v(f)}),c.a.createElement("input",{type:"password",value:T,disabled:e.isProcessing,onChange:v(m)}),c.a.createElement("div",{className:"auth-form-success"},A),c.a.createElement("div",{className:"auth-form-error"},_),c.a.createElement("div",{className:"auth-form-declaimer"},0===u?c.a.createElement("p",null,"Sign in to continue, don't have account ",c.a.createElement("b",{onClick:o.bind(null,1)},"sign up")):c.a.createElement("p",null,"Already registered, use your account ",c.a.createElement("b",{onClick:o.bind(null,0)},"sign in"))),0===u?c.a.createElement("button",{disabled:e.isProcessing||!E||!T,onClick:function(){g(),n(E,T).catch((function(t){t.response&&t.response.status<500?I("Invalid login or password"):I("server error")}))}},"Sign in"):c.a.createElement("button",{disabled:e.isProcessing||!E||!T,onClick:function(){g(),r(E,T).then((function(){f(""),m(""),o(0),N("User created, now you can sign in")})).catch((function(t){console.log(t.response),t.response&&409===t.response.status?I("User with this name already exists"):I("server error")}))}},"Sign up")))}))),P=(n(56),Object(i.b)((function(t){return{chatState:t.chats,contactsState:t.contacts,userState:t.user}}),(function(t){return{markChatInitialized:function(){return t({type:"CHAT_INITIALIZED"})},setChatList:function(){return t((function(t,e,n){t({type:"CHAT_PROCESSING_STARTED"});var a={headers:O()};return S.a.get("".concat(n,"/chats"),a).then((function(e){return t({type:"SET_CHAT_LIST",chats:e.data}),e.data})).finally((function(){return t({type:"CHAT_PROCESSING_FINISHED"})}))}))},selectChat:function(e){return t(b(e))},inviteToChat:function(e,n){return t(function(t,e){return function(n,a,c){n({type:"CHAT_PROCESSING_STARTED"});var r={headers:Object(o.a)({},O(),{"content-type":"application/json"})},i=JSON.stringify({participantIds:t,name:e});return S.a.post("".concat(c,"/chats"),i,r).then((function(t){return n(b(t.data)),t.data})).finally((function(){return n({type:"CHAT_PROCESSING_FINISHED"})}))}}(e,n))},markContactsInitialized:function(){return t({type:"CONTACTS_INITIALIZED"})},requestAvailableContacts:function(){return t((function(t,e,n){t({type:"CONTACTS_PROCESSING_STARTED"});var a={headers:O()};return S.a.get("".concat(n,"/contacts/all"),a).then((function(e){return t({type:"SET_CONTACTSET_ALL_AVAILABLE_CONTACTSS_LIST",contacts:e.data}),e.data})).finally((function(){return t({type:"CONTACTS_PROCESSING_FINISHED"})}))}))},requestContactList:function(){return t((function(t,e,n){t({type:"CONTACTS_PROCESSING_STARTED"});var a={headers:O()};return S.a.get("".concat(n,"/contacts"),a).then((function(e){return t({type:"SET_CONTACTS_LIST",userIds:e.data}),e.data})).finally((function(){return t({type:"CONTACTS_PROCESSING_FINISHED"})}))}))},addToContacts:function(e){return t(function(t){return function(e,n,a){e({type:"CONTACTS_PROCESSING_STARTED"});var c={headers:O()};return S.a.post("".concat(a,"/contacts/").concat(t),"",c).then((function(n){return e(function(t){return{type:"ADD_CONTACT_TO_LIST",userId:t}}(t)),n.data})).finally((function(){return e({type:"CONTACTS_PROCESSING_FINISHED"})}))}}(e))},deleteFromContacts:function(e){return t(function(t){return function(e,n,a){e({type:"CONTACTS_PROCESSING_STARTED"});var c={headers:O()};return S.a.delete("".concat(a,"/contacts/").concat(t),c).then((function(n){return e(function(t){return{type:"REMOVE_CONTACTS_FROM_LIST",userId:t}}(t)),n.data})).finally((function(){return e({type:"CONTACTS_PROCESSING_FINISHED"})}))}}(e))}}}))((function(t){var e=t.chatState,n=t.contactsState,r=t.userState,i=t.markChatInitialized,s=t.setChatList,u=t.selectChat,o=t.markContactsInitialized,l=t.requestAvailableContacts,S=t.requestContactList,E=t.addToContacts,f=t.deleteFromContacts,C=t.inviteToChat,d=e.chats,T=n.availableContacts,m=n.userContacts,h=Object(a.useState)(""),O=Object(R.a)(h,2),_=O[0],I=O[1],p=Object(a.useState)(0),b=Object(R.a)(p,2),A=b[0],N=b[1],g=Object(a.useState)([]),v=Object(R.a)(g,2),j=v[0],y=v[1];e.initialized||e.isProcessing||(i(),s()),n.initialized||n.isProcessing||(o(),l(),S());var D=function(t){y([]),I(""),N(t)},P=function(t){var e=function(t){return d.find((function(e){return 2===e.participantIds.length&&e.participantIds.includes(t)}))}(t);if(e)return D(0),void u(e);C([t,r.user.id]).then((function(t){D(0),u(t)}))},L=_?j:d,k=_?j:m.map((function(t){return T.find((function(t){return 1===t.id}))}));return c.a.createElement("aside",{className:"chat-sidebar\n      ".concat(e.isProcessing||n.isProcessing?"disabled":"","\n    ")},c.a.createElement("input",{className:"chat-sidebar-filter",placeholder:"Search",value:_,onChange:function(t){var e=0===A?d:T,n=t.target.value;y(e.filter((function(t){return(0===A?t.name:t.login).toLowerCase().indexOf(n.toLowerCase())>-1}))),I(n)}}),c.a.createElement("i",{className:"fa fa-search search-icon","aria-hidden":"true"}),c.a.createElement("div",{className:"switches"},c.a.createElement("button",{onClick:function(){return D(0)},className:"".concat(0===A&&"active")},"Chats"),c.a.createElement("button",{onClick:function(){return D(1)},className:"".concat(1===A&&"active")},"Contacts")),0===A?c.a.createElement("div",{className:"chat-list"},L.map((function(t){return c.a.createElement("div",{onClick:function(){return u(t)},className:"chat-item",key:t.id},t.name)}))):c.a.createElement("div",{className:"chat-list"},k.map((function(t){return c.a.createElement("div",{className:"chat-item",key:t.id},t.login,_?m.includes(t.id)?c.a.createElement("span",null,c.a.createElement("button",{onClick:function(){return P(t.id)}},"chat"),c.a.createElement("button",{onClick:function(){return f(t.id)}},"Remove")):c.a.createElement("button",{onClick:function(){return E(t.id)}},"Add"):c.a.createElement("span",null,c.a.createElement("button",{onClick:function(){return P(t.id)}},"chat"),c.a.createElement("button",{onClick:function(){return f(t.id)}},"Remove")))}))))}))),L=(n(57),Object(i.b)((function(t){return{chatState:t.chats,userState:t.user}}),(function(t){return{sendMessage:function(e,n){return t(function(t,e){return function(n,a,c){var r={headers:Object(o.a)({},O(),{"content-type":"application/json"})},i=JSON.stringify({text:e});return S.a.post("".concat(c,"/chats/").concat(t,"/messages"),i,r)}}(e,n))},setMessages:function(e){return t(function(t){return function(e,n,a){var c={headers:O()};return S.a.get("".concat(a,"/chats/").concat(t,"/messages"),c).then((function(t){return e({type:"SET_ACTIVE_CHAT_MESSAGES",messages:t.data}),t.data}))}}(e))},initializeChat:function(){return t({type:"ACTIVE_CHAT_INITIALIZED"})}}}))((function(t){var e=t.chatState,n=t.userState,r=t.sendMessage,i=t.setMessages,s=t.initializeChat,u=e.activeChat;u&&!u.initialized&&(s(),i(u.id));var o,l=Object(a.useState)(""),S=Object(R.a)(l,2),E=S[0],f=S[1],C=function(){u&&E.trim()&&r(u.id,E).then((function(){return f("")}))},d=c.a.createRef();return setTimeout((function(){d.current&&d.current.scroll(0,window.scrollY+window.innerHeight)}),25),c.a.createElement("main",{className:"active-chat"},c.a.createElement("h3",{className:"name"},u&&u.name),c.a.createElement("div",{className:"active-chat-messages",ref:d},u&&u.messages&&u.messages.map((function(t){return c.a.createElement("div",{key:t.id,className:"message\n              ".concat(t.senderId===n.user.id?"righty":"lefty")},c.a.createElement("div",{className:"bubble"},t.text))}))),c.a.createElement("input",{className:"send-message-input",value:E,onChange:(o=f,function(t){return o(t.target.value)}),onKeyPress:function(t){"Enter"===t.key&&C()}}),c.a.createElement("i",{onClick:C,className:"fa fa-paper-plane-o send-message-button","aria-hidden":"true"}))}))),k=(n(58),Object(i.b)((function(t){return{userState:t.user}}))((function(t){var e=t.dispatch,n=t.userState.user;return c.a.createElement("header",{className:"user-status-header"},c.a.createElement("i",{className:"fa fa-user-circle-o","aria-hidden":"true"}),n&&n.login,c.a.createElement("i",{className:"fa fa-sign-out","aria-hidden":"true",onClick:function(){return e(_(""))}}))}))),H="MESSAGE_CREATED",w="USER_CREATED",G=Object(i.b)((function(t){return{user:t.user}}))((function(t){var e=t.dispatch,n=t.user;return!n.token?c.a.createElement(D,null):(n.initialized||n.isProcessing||(e({type:"USER_INITIALIZED"}),e((function(t,e,n){t({type:"USER_PROCESSING_STARTED"});var a={headers:O()};return S.a.get("".concat(n,"/users/profile"),a).then((function(t){return t.data})).then((function(e){return t(function(t){return{type:"SET_USER_PROFILE",user:t}}(e))})).finally((function(){return t({type:"USER_PROCESSING_FINISHED"})}))})).catch((function(t){})),function(t){try{new WebSocket("".concat(m,"?token=").concat(h())).onmessage=function(e){var n=JSON.parse(e.data);switch(n.type){case H:return t(function(t){return{type:"ADD_MESSAGE_TO_ACTIVE_CHAT",message:t}}(n.data));case w:return t({type:"ADD_USER_TO_AVAILABLE",user:n.data});default:return}}}catch(e){console.log("failed to connect over ws")}}(e)),c.a.createElement("div",{className:"App"},c.a.createElement(k,null),c.a.createElement("div",{className:"component-container"},c.a.createElement(P,null),c.a.createElement(L,null))))})),U=Object(u.d)(j,Object(u.a)(y.a.withExtraArgument(T),Object(s.createLogger)()));Object(r.render)(c.a.createElement(i.a,{store:U},c.a.createElement(G,null)),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.a01ce5a7.chunk.js.map