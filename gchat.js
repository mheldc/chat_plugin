$.fn.initChatBox = function(channelname, user, token){
    
    //var jsio = document.createElement("SCRIPT");
    //    jsio.setAttribute("type","text/javascript");
    //    jsio.setAttribute("src","/socket.io/socket.io.js");
    //
    //var jq = document.createElement("SCRIPT");
    //    jq.setAttribute("type","text/javascript");
    //    jq.setAttribute("src","http://code.jquery.com/jquery-1.11.1.min.js");
    //    
    //document.body.appendChild(jsio);
    //document.body.appendChild(jq);
    
    var socket = io.connect();
    //alert(socket.connected);

    var tokenValid = false;
    if (user.length > 0 && token.length > 0) {
        tokenValid = true;
    }
    
    /* The Chatbox */
    var divChatBox = document.createElement("DIV");
        divChatBox.setAttribute("id","chat-container");
        divChatBox.style.backgroundColor = "#F8F8F8";
        divChatBox.style.border = "2px solid gray";
        divChatBox.style.borderTopLeftRadius = "10px";
        divChatBox.style.borderTopRightRadius = "10px";
        divChatBox.style.width = "100%";
        divChatBox.style.height = "100%";
        divChatBox.style.fontFamily = "Calibri";
        divChatBox.style.textAlign = "center"
    
    /* Channel Name */
    var divChannel = document.createElement("DIV");
    var divRoomName = document.createTextNode(channelname);
        divChannel.setAttribute("id","channel");
        divChannel.style.fontWeight = "bolder";
        divChannel.style.backgroundColor = "#F8F8F8";
        divChannel.style.height = "5%";
        divChannel.style.width = "100%";
        divChannel.style.borderBottom = "1px solid gray";
        divChannel.style.marginTop = "1px";
        divChannel.appendChild(divRoomName);
    
    /* Chat panel */
    var divChatPanel = document.createElement("DIV");
        divChatPanel.setAttribute("id","chatbox");
        divChatPanel.style.backgroundColor = "#F8F8F8;";
        divChatPanel.style.width = "100%";
        divChatPanel.style.height = "87%";
        divChatPanel.style.overflowY = "scroll";
        divChatPanel.style.marginBottom = "2px";
        divChatPanel.style.borderBottom = "1px solid gray";
        divChatPanel.style.fontSize = "12px";
        divChatPanel.style.textAlign = "left";
        
    /* Chat Textbox and Send Button */
    var divChatInputs = document.createElement("DIV");
        divChatInputs.setAttribute("id","inputsender");
        divChatInputs.style.backgroundColor = "#F8F8F8";
        divChatInputs.style.width = "100%";
        divChatInputs.style.height = "6%";

    var inpChatText = document.createElement("INPUT");
        inpChatText.setAttribute("id","data");
        inpChatText.setAttribute("type","text");
        inpChatText.style.marginTop = "2px";
        inpChatText.style.marginBottom = "2px";
        inpChatText.style.marginLeft = "3px";
        inpChatText.style.marginRight = "2px";
        inpChatText.style.fontFamily = "Calibri";
        inpChatText.style.height = "35px";
        inpChatText.style.width = "80%";
        inpChatText.style.border = "1px solid gray";

    var btnSendText = document.createElement("BUTTON");
    var btnText = document.createTextNode("SEND");
        btnSendText.setAttribute("id","datasend");
        btnSendText.style.fontSize = "14px";
        btnSendText.style.height = "100%";
        btnSendText.style.width = "15%";
        btnSendText.style.fontFamily = "Calibri";
        btnSendText.style.fontWeight = "bolder";
        btnSendText.appendChild(btnText);
        
    if (!tokenValid) {
        inpChatText.setAttribute("readonly","readonly");
        btnSendText.setAttribute("disabled", "disabled");
    }
    
    divChatInputs.appendChild(inpChatText);
    divChatInputs.appendChild(btnSendText);
    
    divChatBox.appendChild(divChannel);
    divChatBox.appendChild(divChatPanel);
    divChatBox.appendChild(divChatInputs);
    
    this.append(divChatBox);
    
    var sendViaButton   = document.getElementById('datasend');
    var msgContainer    = document.getElementById('data');
    var docBody         = document.body;
    
    sendViaButton.addEventListener("click",function(){
            socket.emit('sendchat', msgContainer.value);
            msgContainer.value = "";
            msgContainer.focus();
    });
    
    msgContainer.addEventListener("keypress", function(e){
        if (e.which == 13) {
            socket.emit('sendchat', msgContainer.value);
            msgContainer.value = "";
            msgContainer.focus();
        }
    });
    
    socket.on('connect', function(){  
        //socket.emit('adduser',  user );
        socket.emit('adduser',{username: user, channel: channelname});
    });
    
    socket.on('updatechat', function(username, data){
        var msgContainer = document.getElementById('data');
        var chBox       = document.getElementById('chatbox');
        var newMsg      = document.createElement("B");
            newMsg.style.marginLeft = "1em";
        var msgOwner    = document.createTextNode(username + ": ");
        var msgText     = document.createTextNode(data);
        var newline     = document.createElement("BR");
            newMsg.appendChild(msgOwner);
            chBox.appendChild(newMsg);
            chBox.appendChild(msgText);
            chBox.appendChild(newline);
            msgContainer.focus();
    });
                                        
    //socket.on('updatechat', function (username, data) { 
    //    $('#chatbox').append('<b>'+ username + ':</b> ' +  data + '<br>'); 
    //    $('#data').focus(); 
    //}); 
    //
    //socket.on('updaterooms', function(rooms, current_room) { 
    //    $('#rooms').empty(); 
    //    $.each(rooms, function(key, value) { 
    //        if(value == current_room){ 
    //            $('#rooms').append('<div>' + value + '</div>'); 
    //        } else {  
    //            $('#rooms').append('<div><a href="#" onclick="switchRoom('+value+')">' + value + '</a></div>');  
    //        } 
    //    }); 
    //});
    //
    //function switchRoom(room){ 
    //    socket.emit('switchRoom', room); 
    //}
    //
    //$(function(){ 
    //    $('#datasend').click( function() { 
    //        var message = $('#data').val(); 
    //        $('#data').val('');  
    //        socket.emit('sendchat', message); 
    //    }); 
    //
    //    $('#data').keypress(function(e) { 
    //        if(e.which == 13) { 
    //            $(this).blur(); 
    //            $('#datasend').focus().click(); 
    //        }  
    //    }); 
    //});
 
    
    //return this;

};

