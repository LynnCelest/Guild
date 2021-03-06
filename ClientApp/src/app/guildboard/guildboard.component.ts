import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Quest} from '../../models/quest.model';
import {Member} from '../../models/member.model';
import {MemberQuest} from '../../models/memberquest.model';
import {StoreService} from '../../store'

@Component({
  selector: 'app-guildboard',
  templateUrl: './guildboard.component.html',
  styleUrls: ['./guildboard.component.css']
})
export class GuildboardComponent implements OnInit {
  private http: HttpClient;
  private baseUrl: string
  public quests: Quest[] = [];
  public quest?: Quest;
  public idValue?: number;
  public memberQuests: MemberQuest[] = [];
  public adminQuest? : MemberQuest;
  public members : Member[] = [];
  public store: StoreService;
  public displayedColumns = ['id', 'name', 'score']; 
  constructor(private router: Router,  _store: StoreService,
    private _http: HttpClient, @Inject('BASE_URL') _baseUrl: string) {
      _http.get<Quest[]>(_baseUrl + 'api/quests').subscribe(result => {
        this.quests = result;
      }, error => console.error(error));
      this.http = _http;
      this.baseUrl = _baseUrl;
      this.store = _store;
   }

  ngOnInit(): void {

  }

  directTo(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  directToId(pageName: string): void {
    this.router.navigate([`${pageName}`, this.quest?.id], {state: {quest: this.quest}});
  }

  detailQuest(event: any, _quest: Quest, pageName:string){
    if(this.quest === _quest){
      this.quest = void 0;
    } else {
      this.quest = _quest;
      this.findQuesters(_quest, true)
    }
  }

  findQuesters(_quest: Quest, setAdmin: boolean) {
    this.memberQuests = [];
    this.members = [];
    for(var i = 0; i < _quest?.memberQuests?.length; i++) {
      this.memberQuests.push(_quest.memberQuests[i]);
      if(setAdmin) {
        this.adminQuest = _quest?.memberQuests[i];
        if(this.store.member?.id === this.adminQuest?.memberId) {
          setAdmin = false;
        } else if(i === _quest?.memberQuests?.length -1) {
          this.adminQuest = void 0;
        }
      }
      if(this.quest?.memberQuests[i].member != void 0) {
        this.members.push(_quest?.memberQuests[i].member!);
      }
    }
  }

  switchEntry() {
    if(this.adminQuest){
      this.http.delete<MemberQuest>(this.baseUrl + 'api/memberquests/byIds?questId=' + 
      this.adminQuest.questId + '&memberId=' + this.adminQuest.memberId).subscribe(result => {
        this.members = this.members.filter((member: Member, index: Number, members: Member[]) => {
          if(this.adminQuest?.memberId === member.id){
            return false;
          }
          return true;
        });
        this.adminQuest = void 0;
    }, error => console.error(error));
    } else if(this.store.member) {
      this.adminQuest = {
        questId : this.quest?.id,
        memberId : this.store.member.id,
        score : 0,
        isAdmin : false,
      }
    this.http.post<MemberQuest>(this.baseUrl + 'api/memberquests', this.adminQuest).subscribe(result => {
      console.log(result);
      this.adminQuest = result;
      if(result.member){
        this.members.push(result.member);
        this.memberQuests.push(result);
      }
    }, error => console.error(error));
    }
  }

  onSubmit(testForm: NgForm) {
    this.http.put<MemberQuest[]>(this.baseUrl + 'api/memberquests', this.memberQuests).subscribe(result => {
      this.memberQuests = result;
    }, error => console.error(error));
  }

  backToList() {
    this.quest = void 0;
  }
}