import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAndMarkComponent } from './comment-and-mark.component';

describe('CommentAndMarkComponent', () => {
  let component: CommentAndMarkComponent;
  let fixture: ComponentFixture<CommentAndMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentAndMarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentAndMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
