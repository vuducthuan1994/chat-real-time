import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ChatRealTimeService {
    private apiURL = 'https://randomuser.me/api/';
    private apiListUser = 'http://localhost:8000/accounts'
    // $.ajax({
    //     url: 'https://randomuser.me/api/',
    //     dataType: 'json',
    //     success: function(data) {
    //       console.log(data);
    //     }
    //   });
            
   constructor( private httpClient: HttpClient) { }

   getListUsers() {
    return this.httpClient.get(this.apiListUser);
   }
   getData() {
    return this.httpClient.get(this.apiURL);
  }
    
  getOldMess(from,to) {
        return this.httpClient.get(`http://localhost:8000/mess/${from}/${to}`);
  }
 
}