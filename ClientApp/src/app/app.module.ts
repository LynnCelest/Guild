import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MatGridListModule } from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
import { CounterComponent } from './sample/counter/counter.component';
import { FetchDataComponent } from './sample/fetch-data/fetch-data.component';
import { GuildboardComponent } from './guildboard/guildboard.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddQuestComponent } from './guildboard/add-quest/add-quest.component';
import { EditQuestComponent } from './guildboard/edit-quest/edit-quest.component';
import { MemberListComponent } from './member-list/member-list.component';
import { AddMemberComponent } from './member-list/add-member/add-member.component';
import { AccountComponent } from './account/account.component';
import { StoreService } from 'src/store';

//ng g c ComponentName --module src/app
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    GuildboardComponent,
    AddQuestComponent,
    EditQuestComponent,
    MemberListComponent,
    AddMemberComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatGridListModule,
    MatPaginatorModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'guildboard', component: GuildboardComponent },
      { path: 'memberlist', component: MemberListComponent },
      { path: 'login', component: AccountComponent },
      { path: 'guildboard/add', component: AddQuestComponent },
      { path: 'memberlist/add', component: AddMemberComponent },
      { path: 'guildboard/edit/:id', component: EditQuestComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    NoopAnimationsModule
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
