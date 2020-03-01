import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";

import { AppComponent } from "./app.component";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { FeedbackService } from "../app/common/services/feedback.service";
import { ArchiveService } from "../app/common/services/archive.service";
import { TabsModule } from "ngx-bootstrap/tabs";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    MatDialogModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, "herbbase-admin"),
    AngularFirestoreModule,
    TabsModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    FeedbackService,
    ArchiveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
