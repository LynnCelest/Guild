import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {Member} from '../../models/member.model';
import {StoreService} from '../../store'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private http: HttpClient;
  private baseUrl: string;
  public member: Member = new Member;
  public store: StoreService;
  constructor(private router: Router, _store: StoreService,
    private _http: HttpClient, @Inject('BASE_URL') _baseUrl: string) {
    this.http = _http;
    this.baseUrl = _baseUrl;
    this.store = _store;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.member.name = "Login";
    this.http.post<Member>(this.baseUrl + 'api/account', this.member).subscribe(result => {
      this.member = result;
      this.store.member = result;
      this.router.navigate([`${'guildboard'}`]);
    }, error => console.error(error));
  }
}
