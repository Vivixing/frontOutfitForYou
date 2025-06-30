import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabEditarPrendaPage } from './tab-editar-prenda.page';

describe('TabEditarPrendaPage', () => {
  let component: TabEditarPrendaPage;
  let fixture: ComponentFixture<TabEditarPrendaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEditarPrendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
