# Chat Plugin

# Installation:

1. Deploy the followng files/folders on the server.
  <ul>
   <li> bin/* </li>
   <li> node_modules/* </li>
   <li> public/* </li>
   <li> routes/* </li>
   <li> views/* </li>
   <li> app.js </li>
   <li> package.json </li>
  </ul>

2. Run the app by executing "node app.js"

Note : Make sure that the server has nodejs installed before executing the command.

====================================================================================

# On frontend/client:

1. Make sure that you have also included the latest jquery.js or just add the following script:
   "<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>"

2. Add the following script to your frontend source:
   ```
    <script src="/socket.io/socket.io.js"></script>
    <script type="text/javascript" src="[path-to-js-file]/gchat.js"></script>
   ```	
3. Add the following scripts on your frontend/client code:
	
	Additional HTML code to be inserted on the UI
	    ```html
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
	        ```
	        
	For : Prompt input of Channel and Username
	   ```html
	   <script type="text/javascript">
		$(function(){
	            $('#chatholder').initChatBox(prompt('Keyin Channel'),prompt('Keyin User'),'%%@&&#%$*%%');
	        });
	   </script>
	   ```
	   
	For : Passing parameters to plugin
	   ```html
	   <script type="text/javascript">
		$(function(){
	            $('#chatholder').initChatBox([Channel_info],[User_info]);
	        });
	   </script>
   

