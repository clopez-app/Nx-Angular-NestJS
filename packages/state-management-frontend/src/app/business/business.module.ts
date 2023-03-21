import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRoutingModule } from './business-routing.module';
import { BusinessEditComponent } from './components/business-edit/business-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClappTextInputModule } from '@clapp1/clapp-angular';

@NgModule({
  declarations: [BusinessEditComponent],
  imports: [CommonModule, BusinessRoutingModule, ReactiveFormsModule, ClappTextInputModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BusinessModule {}
