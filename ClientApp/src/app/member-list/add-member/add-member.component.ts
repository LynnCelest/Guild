import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {Member} from '../../../models/member.model';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  private http: HttpClient;
  private baseUrl: string;
  public member: Member = new Member;
  constructor(private router: Router,
    private _http: HttpClient, @Inject('BASE_URL') _baseUrl: string) {
    this.http = _http;
    this.baseUrl = _baseUrl;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.http.post<Member>(this.baseUrl + 'api/members', this.member).subscribe(result => {
      this.member = result;
      this.router.navigate([`${'memberlist'}`]);
    }, error => console.error(error));
  }

}
