import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageboxPage } from './messagebox.page';

const routes: Routes = [
  {
    path: '',
    component: MessageboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageboxPageRoutingModule {}
