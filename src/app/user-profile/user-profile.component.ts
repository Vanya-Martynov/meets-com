import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {WebSocketSubject} from "rxjs/observable/dom/WebSocketSubject";
import {IpService} from "../ip.service";
import { PushNotificationService } from 'ng-push-notification';
import { HoldAllUsersService } from "../hold-all-users.service";

export class Message {
  constructor(
    public sender: string,
    public content: string,
    public isBroadcast = false,
    public sendToId: string,
  ) { }
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, AfterViewInit {

  @ViewChild('viewer') public viewer: ElementRef;

  images: Array<string>;

  isHomePage = false;
  isMessagePage = true;
  isMessenger = false;
  isNavigation = true;
  mcCoins = 253;
  allUsers;

  indexOfScroll;
  allMessages: Array<{
    userMessages: Array<any>,
    serverMessages: Array<any>,
  }>;

  public clientMessage = '';
  public isBroadcast = true;

  public sendToId = 'f596a9377d477f57ab8e192bead8610513bd3628';
  public sender = localStorage.getItem("userHash");

  sendJSON = {
    firstUserHash: this.sender,
    secondUserHash: this.sendToId,
    history: this.allMessages,
  };

  private socket$: WebSocketSubject<Message>;

  constructor(
    private _http: HttpClient,
    config: NgbCarouselConfig,
    public ipService: IpService,
    private pushNotification: PushNotificationService,
    private holdUserArray: HoldAllUsersService,
  ) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = true;
    this.socket$ = WebSocketSubject.create('ws://localhost:8010/my');

    this.socket$
      .subscribe(
        (message) => {
          //this.allMessages[this.allMessages.length - 1].userMessages.push(message);

          if(this.allMessages[this.allMessages.length - 1].serverMessages.length !== 0){
            this.allMessages.push({
              userMessages: [message],
              serverMessages: []
            });
          }else{
            this.allMessages[this.allMessages.length - 1].userMessages.push(message);
          }
          this.sendJSON.history = this.allMessages;
          this.showPush(message.content);
          this.ipService.editTest('editChatHistory', this.sendJSON,
            (data)=>{console.log(data)});
          this.scroll();

        },
        (err) => console.error(err),
        () => console.warn('Completed!')
      );

  }

  showPush(content) {
    this.pushNotification.show(
      `${content}`,
      {},
       60000// close delay.
    );
  }


  showHomePage(){
    this.isMessagePage = false;
    this.isMessenger = false;
    this.isHomePage = true;
    this.isNavigation = true;
  }
  showMessagePage(){
    this.isHomePage = false;
    this.isMessenger = false;
    this.isMessagePage = true;
    this.isNavigation = true;
  }
  showMessenger(){
    this.isHomePage = false;
    this.isNavigation = false;
    this.isMessagePage = false;
    this.isMessenger = true;
    this.scroll();
  }

  public send(): void {
    const message = new Message(this.sender, this.clientMessage, this.isBroadcast, this.sendToId);

    if(this.allMessages[this.allMessages.length - 1].userMessages.length !== 0){
      this.allMessages.push({
        userMessages: [],
        serverMessages: [message]
      });
    }else{
      this.allMessages[this.allMessages.length - 1].serverMessages.push(message);
    }
    this.sendJSON.history = this.allMessages;
    this.ipService.editTest('editChatHistory', this.sendJSON,
      (data)=>{console.log(data)});

    this.socket$.next(<any>JSON.stringify(message));
    this.clientMessage = '';
    this.scroll();
  }

  private scroll(): void {
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  private getDiff(): number {
    const nativeElement = this.viewer.nativeElement;
    return nativeElement.scrollHeight - (nativeElement.scrollTop + nativeElement.clientHeight);
  }

  private scrollToBottom(t = 1, b = 0): void {
    if (b < 1) {
      b = this.getDiff();
    }
    if (b > 0 && t <= 12) {
      this.indexOfScroll = setTimeout(() => {
        this.viewer.nativeElement.scrollTop += 1000;
        this.scrollToBottom(++t, b);
      }, 1 / 60);
    }
  }

  public stopScrolling(){
    clearInterval(this.indexOfScroll);
  }

  ngOnInit() {
    this._http.get('http://localhost:8010/getAllUsers')
      .subscribe(data => {
        this.allUsers = data;
        this.holdUserArray.saveAllUsers(data);
      });
    this._http.get('https://picsum.photos/list')
      .pipe(map((images: Array<{id: number}>) => this._randomImageUrls(images)))
      .subscribe(images => this.images = images);

    this.ipService.editTest('getChatHistory', this.sendJSON,
      (data)=>{
        this.allMessages = data;
      })

  }
  private _randomImageUrls(images: Array<{id: number}>): Array<string> {
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      return `https://picsum.photos/900/500?image=${randomId}`;
    });
  }

  ngAfterViewInit(): void {
  }

}
