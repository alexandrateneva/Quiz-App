import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../app.routing';
import { FooterComponent } from '../../components/footer/footer.component';
import { HomeComponent } from '../../components/home/home.component';
import { NavMenuComponent } from '../../components/nav-menu/nav-menu.component';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    FooterComponent,
    HomeComponent,
    NavMenuComponent,
    NotFoundComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  exports: [
    NavMenuComponent,
    FooterComponent
  ]
})
export class SharedModule { }
