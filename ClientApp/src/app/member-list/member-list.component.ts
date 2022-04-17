import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Member } from 'src/models/member.model';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  private http: HttpClient;
  private baseUrl: string
  public members : Member[] = [];
  public pageSlice : Member[] = []; 
  public pageSizeInit : number = 4;
  public idValue?: number;
  public displayedColumns: string[]; 
  public title: string = 'Member List';

  constructor(private router: Router,
  private _http: HttpClient, @Inject('BASE_URL') _baseUrl: string) {
    _http.get<Member[]>(_baseUrl + 'api/members').subscribe(result => {
      this.members = result;
      this.setPageSlice(0, this.pageSizeInit);
    }, error => console.error(error));
    this.http = _http;
    this.baseUrl = _baseUrl;
    this.displayedColumns = ['name', 'email', 'gender', 'address', 'currency']; 
 }

  ngOnInit(): void {

  }

  directTo(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    this.setPageSlice(startIndex, endIndex);
  }

  setPageSlice(startIndex: number, endIndex : number) {
    if (endIndex > this.members.length) {
      endIndex = this.members.length;
    }
    this.pageSlice = this.members.slice(startIndex, endIndex);    
  }

  onSubmit(testForm: NgForm) {
    this.http.put<Member[]>(this.baseUrl + 'api/Members', this.pageSlice).subscribe(result => {
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
}