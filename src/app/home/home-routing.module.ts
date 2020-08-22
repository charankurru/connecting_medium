import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        loadChildren: '../streams/streams.module#StreamsPageModule',
      },
      {
        path: 'search',
        loadChildren: '../users/users.module#UsersPageModule',
      },
      {
        path: 'streams',
        loadChildren: '../streams/streams.module#StreamsPageModule',
      },
      {
        path: 'chat',
        loadChildren: '../chating/chating.module#ChatingPageModule',
      },
      {
        path: 'about',
        loadChildren: '../userprofile/userprofile.module#UserprofilePageModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
