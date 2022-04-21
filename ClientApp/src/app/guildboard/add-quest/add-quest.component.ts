import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MemberQuest } from 'src/models/memberquest.model';
import { StoreService } from 'src/store';
import {Quest} from '../../../models/quest.model';

@Component({
  selector: 'app-add-quest',
  templateUrl: './add-quest.component.html',
  styleUrls: ['./add-quest.component.css']
})
export class AddQuestComponent implements OnInit {
  private http: HttpClient;
  private baseUrl: string;
  public quest: Quest = new Quest;
  public adminQuest?: MemberQuest;
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
    if(this.store.member)
    this.http.post<Quest>(this.baseUrl + 'api/quests', this.quest).subscribe(result => {
      this.quest = result;
      this.makeAdmin();
      this.router.navigate([`${'guildboard'}`]);
    }, error => console.error(error));
  }

  makeAdmin() {
    this.adminQuest = {
      questId : this.quest?.id,
      memberId : this.store.member?.id,
      score : 0,
      isAdmin : true,
    }
    this.http.post<MemberQuest>(this.baseUrl + 'api/memberquests', this.adminQuest).subscribe(result => {
      this.adminQuest = result;
    }, error => console.error(error));
  }

}
