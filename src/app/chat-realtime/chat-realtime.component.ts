import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { User } from './model/user.model';
import { ChatRealTimeService } from './chat-realtime.service';
import { ToastrService } from 'ngx-toastr';
import { Message } from './model/message.model';

@Component({
  selector: 'app-chat-realtime',
  templateUrl: './chat-realtime.component.html',
  styleUrls: ['./chat-realtime.component.css']
})
export class ChatRealtimeComponent implements OnInit {

  messageText: string;

  socket: SocketIOClient.Socket;
  isConnected = false;
  currentUser: User = new User({ name: null, avatar: null, status: 'off' });
  usersList: Array<any>;

  messagesList: Array<any>;

  // CurrentChat
  currentTab : string = null;
  currentTabAvatar: string = null;

  constructor(private toastr: ToastrService, private chatRealTimeService: ChatRealTimeService) {

  }

  ngOnInit() {
    this.getUserDetail();
  }
  clickTab(user) {
    this.messagesList = new Array();
    this.currentTab = user.name;
    this.currentTabAvatar = user.avatar;
    this.chatRealTimeService.getOldMess(this.currentUser.name, this.currentTab).subscribe((data:any) => {
      this.messagesList = data;
    });
  }

  getUserDetail() {
    this.chatRealTimeService.getData().subscribe((data: any) => {
      this.currentUser.avatar = data.results[0].picture.large;
    });
  }


  createUser() {
    if (this.currentUser.name) {
      this.currentUser.status = "on";
      this.socket = io.connect('http://localhost:8000');
      this.socket.on('connect', () => {
        console.log(this.socket.id); // an alphanumeric id...
     });
     
      this.socket.on('userChanged', (data: any) => {
        console.log(data);
        this.usersList = data.newUsersList.filter((item) => item.name !== this.currentUser.name);
        if(data.newUser) {
          this.toastr.success('Thành viên ' + data.newUser.name + ' vừa tham gia', 'Thông Báo');
        }
      });
      this.socket.emit('createUser', this.currentUser);
      this.connect()
    }
  }

  connect() {
    this.isConnected = true;
    this.messagesList = new Array();
    this.socket.on('message', (msg: any) => {
      console.log("done");
      this.messagesList.push(msg);
    });
  }

  disconnect() {
    this.isConnected = false;
    this.socket.emit('deleteUser',this.currentUser);
    this.socket.disconnect();
    this.socket.close();
  }

  sendMessage() {
    var currentTime = new Date();
    let msg = new Message({content : this.messageText, from : this.currentUser.name, to : this.currentTab, time : currentTime.getTime()});
    this.socket.emit('message', msg);
    console.log(msg);
    this.messageText = '';
  }

}
