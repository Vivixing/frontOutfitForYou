import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabClosetPage } from './tab-closet.page';

describe('TabClosetPage', () => {
  let component: TabClosetPage;
  let fixture: ComponentFixture<TabClosetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabClosetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
