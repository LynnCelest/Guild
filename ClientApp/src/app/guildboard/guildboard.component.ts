import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {Quests} from '../guildboard/quests.model';

@Component({
  selector: 'app-guildboard',
  templateUrl: './guildboard.component.html',
  styleUrls: ['./guildboard.component.css']
})
export class GuildboardComponent implements OnInit {
  private http: HttpClient;
  private baseUrl: string
  public quests: Quests[] = [];
  public quest?: Quests = undefined;
  public value?: number;
  constructor(private router: Router, 
    private _http: HttpClient, @Inject('BASE_URL') _baseUrl: string) {
      _http.get<Quests[]>(_baseUrl + 'api/quests').subscribe(result => {
        this.quests = result;
      }, error => console.error(error));
      this.http = _http;
      this.baseUrl = _baseUrl;
   }

  ngOnInit(): void {
    
  }

  directTo(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  showQuest(all: boolean) {
    if(all) {
      return this.quest != undefined ?  true : false;
    } else {
      return this.quest == undefined ?  true : false;
    }
  }

  deleteQuest() {
    this.value = this.quest!.id;
    this.http.delete<Quests[]>(this.baseUrl + 'api/quests/' + this.value).subscribe(result => {
      this.quest = undefined;
      this.quests = this.quests.filter((value: Quests, index: number, array: Quests[])=> {
        if(value.id != this.value) return true;
        return false;
      });
    }, error => console.error(error));
  }

  displayQuest(event: any, _quest: Quests, pageName:string){
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