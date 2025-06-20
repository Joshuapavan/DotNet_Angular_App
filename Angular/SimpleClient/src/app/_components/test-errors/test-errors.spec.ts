import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestErrors } from './test-errors';

describe('TestErrors', () => {
  let component: TestErrors;
  let fixture: ComponentFixture<TestErrors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestErrors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestErrors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
