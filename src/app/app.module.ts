import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { ChatRealtimeComponent } from './chat-realtime/chat-realtime.component';
import { ChatRealTimeService } from './chat-realtime/chat-realtime.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule, ToastrService } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    ChatRealtimeComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot() ,
    BrowserAnimationsModule
  ],
  providers: [ChatRealTimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
