import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRoutingModule } from './business-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BusinessService } from './services/business.service';
import {
  ClappButtonModule,
  ClappSearchModule,
  ClappPaginationModule,
  ClappCardModule,
  ClappTextInputModule,
  ClappInputHelpersModule,
  ClappSelectModule,
  ClappImageDisplayModule,
  ModalModule,
  ClappNotificationModule,
} from '@clapp1/clapp-angular';
import { BusinessEditComponent } from './components/business-edit/business-edit.component';
import { BusinessesListComponent } from './components/businesses-list/businesses-list.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { BusinessEditFormComponent } from './components/business-edit-form/business-edit-form.component';
import { ReactiveFormControlTextInputComponent } from '../shared/components/reactive-form-control-text-input/reactive-form-control-text-input.component';
import { FullErrorNamePipe } from '../shared/pipes/full-error-name.pipe';
import { FloatNumberOrNumberRangeDirective } from '../shared/directives/float-number-or-number-range.directive';
import { OnlyNumberDirective } from '../shared/directives/only-number.directive';
import { ConfirmationModalComponent } from '../shared/components/confirmation-modal/confirmation-modal.component';
import { InvalidFormModalComponent } from '../shared/components/invalid-form-modal/invalid-form-modal.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { BusinessCreateFormComponent } from './components/business-create-form/business-create-form.component';

@NgModule({
  declarations: [
    BusinessesListComponent,
    BusinessCardComponent,
    BusinessEditComponent,
    BusinessCreateFormComponent,
    BusinessEditFormComponent,
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    ClappButtonModule,
    ClappSearchModule,
    ClappPaginationModule,
    ClappCardModule,
    ReactiveFormsModule,
    ClappTextInputModule,
    ClappInputHelpersModule,
    ClappSelectModule,
    ClappImageDisplayModule,
    ModalModule,
    ClappNotificationModule,
    LoaderComponent,
    ConfirmationModalComponent,
    CommonModule,
    BusinessRoutingModule,
    ReactiveFormsModule,
    ClappTextInputModule,
    ClappInputHelpersModule,
    ClappButtonModule,
    ClappSearchModule,
    ClappPaginationModule,
    ClappCardModule,
    ClappSelectModule,
    ClappImageDisplayModule,
    ModalModule,
    // Standalone Components
    ReactiveFormControlTextInputComponent,
    ConfirmationModalComponent,
    FullErrorNamePipe,
    FloatNumberOrNumberRangeDirective,
    OnlyNumberDirective,
    InvalidFormModalComponent,
    LoaderComponent,
  ],
  providers: [BusinessService],
})
export class BusinessModule {}
