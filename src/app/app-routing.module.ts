import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule',
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'streams',
    loadChildren: () =>
      import('./streams/streams.module').then((m) => m.StreamsPageModule),
  },
  {
    path: 'comments',
    loadChildren: () =>
      import('./comments/comments.module').then((m) => m.CommentsPageModule),
  },
  {
    path: 'newpost',
    loadChildren: () =>
      import('./newpost/newpost.module').then((m) => m.NewpostPageModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersPageModule),
  },
  {
    path: 'chating',
    loadChildren: () =>
      import('./chating/chating.module').then((m) => m.ChatingPageModule),
  },
  {
    path: 'messagebox/:name',
    loadChildren: () =>
      import('./messagebox/messagebox.module').then(
        (m) => m.MessageboxPageModule
      ),
  },
  {
    path: 'userprofile/:name',
    loadChildren: () =>
      import('./userprofile/userprofile.module').then(
        (m) => m.UserprofilePageModule
      ),
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./notifications/notifications.module').then(
        (m) => m.NotificationsPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
