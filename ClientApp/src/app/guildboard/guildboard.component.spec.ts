import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildboardComponent } from './guildboard.component';

describe('GuildboardComponent', () => {
  let component: GuildboardComponent;
  let fixture: ComponentFixture<GuildboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuildboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
