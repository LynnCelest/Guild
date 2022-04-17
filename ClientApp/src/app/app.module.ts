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
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { GuildboardComponent } from './guildboard/guildboard.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProfileComponent } from './profile/profile.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddQuestComponent } from './add-quest/add-quest.component';
import { EditQuestComponent } from './edit-quest/edit-quest.component';
import { MemberListComponent } from './member-list/member-list.component';
import { AddMemberComponent } from './add-member/add-member.component';

//ng g c ComponentName --module src/app
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    GuildboardComponent,
    ProfileComponent,
    AddQuestComponent,
    EditQuestComponent,
    MemberListComponent,
    AddMemberComponent
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
      { path: 'guildboard/add', component: AddQuestComponent },
      { path: 'memberlist/add', component: AddMemberComponent },
      { path: 'guildboard/edit/:id', component: EditQuestComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
