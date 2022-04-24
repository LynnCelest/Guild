import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../../models/member.model';
import { StoreService } from '../../store';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private http: HttpClient;
  private baseUrl: string;
  public idValue: number = 0;
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
    this.ngOnInit();
    this.http.get<Member>(this.baseUrl + 'api/members/' + this.idValue).subscribe(result => {
      this.store.member = result;
      this.router.navigate([`${'guildboard'}`]);
    }, error => console.error(error));
  }
}
