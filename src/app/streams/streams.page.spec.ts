import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StreamsPage } from './streams.page';

describe('StreamsPage', () => {
  let component: StreamsPage;
  let fixture: ComponentFixture<StreamsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StreamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
