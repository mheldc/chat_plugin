GChat Plugin v2
===========
Installation:

app.js
gchatv2.js
socketio.js

On Server
1. Deploy file on Node Server.
2. Run the server.


On frontend/client:
1. Make sure that you have also included the latest jquery.js or just add the following script:
   <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>

2. Add the following script to your frontend source:
   <script src="[path-to-file]/socketio.js"></script>
   <script src="[path-to-file]/gchatv2.js"></script>

   <script type="text/html" id="chatui">
       	<div id="chid-{cid}" class="chid">{cid}</div>
  	<div id="chcontainer-{cid}" class="chcontainer">
      		<table id="tblchatmsgs-{cid}" class="tblchatmsgs"></table>
  	</div>
  	<div id="chatinputs-{cid}" class="chatinputs"> 
      		<input type="text" id="msgs-{cid}" class="msgs">
      		<button id="btn-{cid}" class="btnSend">SEND</button>
  	</div>	
    </script>

    <script type="text/html" id="gchatnotify">
  	<tr id="trnotify-{cid}">
      		<td>
          		<div class="notifier">
              			<p id="notifymsg-{cid}" class="message">{gchat-message}</p>
          		</div>
      		</td>
	</tr>    
    </script>

    <script type="text/html" id="chatms">
	    <tr id="trms-{cid}">
	      	<td>
	          	<div id="usericon-{cid}" class="usericon">
	              		<img id="uavatar-{cid}" class="uavatar" alt="userimage" height="46px" width="46px" src="{avatar}">
	          	</div>
	          	<div id="chat-message-{cid}" class="chat-message">
	              		<label id="uname">{username}</label>
	              		<p id="imsg" class="message">{message}</p>
	              		<label id="timestamp-{cid}" class="timestamp">{timesent}</label>
	          	</div>           
	      	</td>
	  </tr>
    </script>
   

3. Add the following scripts on your frontend/client code :
   
   For : Prompt input of Channel and Username

   <scripts type="text/javascript">
	$(function(){
			var userinfo	= utilCookie.get('user');
			var channelinfo = {"id" : [channel-id], "title" : [channel-name]};
            $(#[chat-holder-element]).initChatBox([channelinfo], [userinfo]);
        });
   </script>





