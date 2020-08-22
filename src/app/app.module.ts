import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { UserService } from './shared/user.service';
import { MessageService } from './shared/message.service';
import { PostService } from './shared/post.service';
import { IonicStorageModule } from '@ionic/storage';
import { PostInterceptor } from './shared/post.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PostInterceptor,
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    MessageService,
    PostService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
