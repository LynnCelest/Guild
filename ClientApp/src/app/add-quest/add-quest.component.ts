import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {Quest} from '../../models/quest.model';

@Component({
  selector: 'app-add-quest',
  templateUrl: './add-quest.component.html',
  styleUrls: ['./add-quest.component.css']
})
export class AddQuestComponent implements OnInit {
  private http: HttpClient;
  private baseUrl: string;
  public quest: Quest = new Quest;
  constructor(private router: Router,
    private _http: HttpClient, @Inject('BASE_URL') _baseUrl: string) {
    this.http = _http;
    this.baseUrl = _baseUrl;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.http.post<Quest>(this.baseUrl + 'api/quests', this.quest).subscribe(result => {
      this.quest = result;
      this.router.navigate([`${'guildboard'}`]);
    }, error => console.error(error));
  }

}
