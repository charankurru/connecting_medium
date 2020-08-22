import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessageboxPage } from './messagebox.page';

describe('MessageboxPage', () => {
  let component: MessageboxPage;
  let fixture: ComponentFixture<MessageboxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageboxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
