import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto } from '../users/users';
import { HttpClient } from '@angular/common/http';


export enum NotificationType
{
  Normal = 'Normal',
  Warning = 'Warning',
  Alert = 'Alert'
}

export interface AppNotification
{
  id: string,
  type: NotificationType;
  message: string;
  receivedAt: Date;
  isRead: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  user: UserDto | null = null;

  private notificationUrl = "http://localhost:5259/api/Notification";
  
  private hubConnection: signalR.HubConnection | null = null;

  private notificationsList: AppNotification[] = [];
  private notificationsSource = new BehaviorSubject<AppNotification[]>([]);
  noifications$ = this.notificationsSource.asObservable();

  constructor(private http: HttpClient){}

  connect(user: UserDto) {
    this.user = user;
    this.startConnection();
    this.registerOnServerEvents();

    this.getNotifications().subscribe(notifs => {
      this.notificationsList = notifs;
      this.notificationsSource.next(this.notificationsList);
    });
  }

  private startConnection()
  {

    if (!this.user) {
      console.error('User not set. Cannot start connection.');
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5259/notificationHub?userid=${this.user.id}`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(()=>console.log("Hub connected."))
      .catch(err => console.error(err));
  }

  private registerOnServerEvents(): void
  {
    this.hubConnection?.on('ReceiveNotification', (id: string, type: NotificationType, message: string, isRead: boolean, receivedAt: Date)=>{
      const newNotif: AppNotification = {id, type, message, isRead, receivedAt}
      this.notificationsList = [newNotif, ...this.notificationsList];
      this.notificationsSource.next(this.notificationsList);
    });
  }

  getNotifications() : Observable<AppNotification[]>
  {
    return this.http.get<AppNotification[]>(`${this.notificationUrl}`);
  }

  markAsRead(notificationIds: string[]): Observable<void>
  {
    return this.http.put<void>(`${this.notificationUrl}`, notificationIds);
  }

}
