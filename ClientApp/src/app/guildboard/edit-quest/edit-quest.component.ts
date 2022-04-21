import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {Quest} from '../../../models/quest.model';

@Component({
  selector: 'app-edit-quest',
  templateUrl: './edit-quest.component.html',
  styleUrls: ['./edit-quest.component.css']
})
export class EditQuestComponent implements OnInit {
  private http: HttpClient;
  private baseUrl: string;
  public completed: boolean = false;
  public quest: Quest = new Quest;
  public idValue?: number;
  constructor(private router: Router,
    private _http: HttpClient, @Inject('BASE_URL') _baseUrl: string) {
    this.http = _http;
    this.baseUrl = _baseUrl;
  }

  ngOnInit(): void {
    this.quest = history.state.quest;
    if(this.quest.completedDateTime) {
      this.completed = true;
    }
  }

  onSubmit() {
    this.idValue = this.quest!.id;
    if(this.quest.completedDateTime && !this.completed) {
      this.quest.completedDateTime = undefined;
    } else if(!this.quest.completedDateTime && this.completed) {
      this.quest.completedDateTime = new Date;
    }
    this.http.put<Quest>(this.baseUrl + 'api/quests/' + this.idValue, this.quest).subscribe(result => {
      this.quest = result;
      this.router.navigate([`${'guildboard'}`]);
    }, error => console.error(error));
  }
}
