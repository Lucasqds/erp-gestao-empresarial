import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheEmpresaComponent } from '../../../features/empresa/detalhe-empresa/detalhe-empresa.component';

describe('DetalheEmpresaComponent', () => {
  let component: DetalheEmpresaComponent;
  let fixture: ComponentFixture<DetalheEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
