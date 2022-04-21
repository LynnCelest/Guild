import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/models/member.model';
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
  public members: Member[] = [];
  public totalScore: number = 0;
  public idValue?: number;
  public displayedColumns = ['id', 'name', 'score', 'currency', 'earning']; 
  constructor(private router: Router,
    private _http: HttpClient, @Inject('BASE_URL') _baseUrl: string) {
    this.http = _http;
    this.baseUrl = _baseUrl;
  }

  ngOnInit(): void {
    this.quest = history.state.quest;
    for(let i = 0; i < this.quest.memberQuests.length; i++) {
      this.totalScore += this.quest.memberQuests[i].score;
      this.members.push(this.quest.memberQuests[i].member!);
    }
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
      if(result.completedDateTime){
        for(let i = 0; i < this.members.length; i++) {
          for(let j = 0; j < this.quest.memberQuests.length; j++){
            if(this.members[i].id == this.quest.memberQuests[j].memberId) {
              this.members[i].currency += this.quest.memberQuests[j].score * 100 / this.totalScore
            }
          }
        }
        this.http.put<Member[]>(this.baseUrl + 'api/Members', this.members).subscribe(result => {
          this.members.map((member: Member, index: number, array: Member[]) => {
            for(let i = 0; i < result.length; i++) {
              if(member.id == result[i].id) {
                return result;
              }
            }
              return member;
          });
        }, error => console.error(error));
      }
      this.router.navigate([`${'guildboard'}`]);
    }, error => console.error(error));
  }
}
