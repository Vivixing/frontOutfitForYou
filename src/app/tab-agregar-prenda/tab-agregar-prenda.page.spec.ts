import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabAgregarPrendaPage } from './tab-agregar-prenda.page';

describe('TabAgregarPrendaPage', () => {
  let component: TabAgregarPrendaPage;
  let fixture: ComponentFixture<TabAgregarPrendaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAgregarPrendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
