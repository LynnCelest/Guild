import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {Quest} from '../../models/quest.model';

@Component({
  selector: 'app-guildboard',
  templateUrl: './guildboard.component.html',
  styleUrls: ['./guildboard.component.css']
})
export class GuildboardComponent implements OnInit {
  private http: HttpClient;
  private baseUrl: string
  public quests: Quest[] = [];
  public quest?: Quest = undefined;
  public value?: number;
  constructor(private router: Router, 
    private _http: HttpClient, @Inject('BASE_URL') _baseUrl: string) {
      _http.get<Quest[]>(_baseUrl + 'api/quests').subscribe(result => {
        this.quests = result;
      }, error => console.error(error));
      this.http = _http;
      this.baseUrl = _baseUrl;
   }

  ngOnInit(): void {
    
  }

  directToAdd(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  directToEdit(pageName: string): void {
    this.router.navigate([`${pageName}`, this.quest?.id], {state: {quest: this.quest}});
  }

  deleteQuest() {
    this.value = this.quest!.id;
    this.http.delete<Quest[]>(this.baseUrl + 'api/quests/' + this.value).subscribe(result => {
      this.quest = undefined;
      this.quests = this.quests.filter((value: Quest, index: number, array: Quest[])=> {
        if(value.id != this.value) return true;
        return false;
      });
    }, error => console.error(error));
  }

  displayQuest(event: any, _quest: Quest, pageName:string){
    if(this.quest == _quest){
      this.quest = undefined;
    } else {
      this.quest = _quest;
    }
  }

  backToList() {
    this.quest = undefined;
  }
}