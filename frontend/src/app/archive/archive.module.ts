import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ArchiveComponent } from "./archive.component";
import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [ArchiveComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [ArchiveComponent]
})
export class ArchiveModule {}
