import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
postId:any;
  constructor(@Inject(HttpClient) private http: HttpClient,public router: Router) {
  }

  logIn(form: object): Observable<any> {
    const headers = new HttpHeaders();

    return this.http.post<any>(
      environment.api + '/login',
      form,
      {headers}
    );
  }

  register(form: object): Observable<any> {
    const headers = new HttpHeaders();

    return this.http.post<any>(
      environment.api + '/register',
      form,
      {headers}
    );
  }

  getIssue(): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.post<any>(
      environment.api + '/getIssue',
      null,
      {headers}
    );
  }


  getUsers(): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.post<any>(
      environment.api + '/getAllUser',
      null,
      {headers}
    );
  }


  getPriorities(): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.post<any>(
      environment.api + '/getPriority',
      null,
      {headers}
    );


  }


  getTaskStatus(): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.post<any>(
      environment.api + '/getTaskStatus',
      null,
      {headers}
    );
  }

  createNewTask(form: object): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.post<any>(
      environment.api + '/createTask',
      form,
      {headers}
    );
  }

  getTask(pageNumber:number): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.post<any>(
      environment.api + '/getTask?page='+pageNumber,
      null,
      {headers}
    );
  }

  setPostId(postId:any){
    this.postId=postId;
    console.log(this.postId);
    this.router.navigate(["/taskDetail"]);
  }

  getTaskDetail(): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.post<any>(
      environment.api + '/getTaskDetail',
      {"postId":localStorage.getItem('postId')},
      {headers}
    );
  }


updateTask(taskId:number,statusId:number,assigneeId:number,prioityId:number,issueId:number): Observable<any> {
  let token = localStorage.getItem('token');
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  return this.http.post<any>(
    environment.api + '/updateTask',
    {"taskId":taskId,
    "statusId":statusId,
    "assigneeId":assigneeId,
    "priorityId":prioityId,
   "issueId":issueId },
    {headers}
  );
}





  logout(): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.post<any>(
      environment.api + '/logout',
      null,
      {headers}
    );
  }





  getMenuItems(): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.post<any>(
      environment.api + '/getMenuItems',
      null,
      {headers}
    );
  }









}




