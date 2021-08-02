import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAndMarkListComponent } from './comment-and-mark-list.component';

describe('CommentAndMarkListComponent', () => {
  let component: CommentAndMarkListComponent;
  let fixture: ComponentFixture<CommentAndMarkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentAndMarkListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentAndMarkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
