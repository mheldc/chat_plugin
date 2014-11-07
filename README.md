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

3. Add the following scripts on your frontend/client code :
   
   For : Prompt input of Channel and Username

   <scripts type="text/javascript">
	$(function(){
			var userinfo	= utilCookie.get('user');
			var channelinfo = {"id" : [channel-id], "title" : [channel-name]};
            $(#[chat-holder-element]).initChatBox([channelinfo], [userinfo]);
        });
   </script>





