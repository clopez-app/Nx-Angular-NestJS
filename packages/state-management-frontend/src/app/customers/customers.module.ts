import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersService } from './services/customers.service';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappImageDisplayModule,
  ClappNoResultsModule,
  ClappNotificationModule,
  ClappPaginationModule,
  ClappSearchModule,
  ModalService,
} from '@clapp1/clapp-angular';

const clappModules = [
  ClappCardModule,
  ClappButtonModule,
  ClappSearchModule,
  ClappNoResultsModule,
  ClappImageDisplayModule,
  ClappPaginationModule,
  ClappNotificationModule,
];

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerCardComponent,
    CustomerDetailsComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    ...clappModules,
    LoaderComponent,
  ],
  providers: [ModalService, CustomersService],
})
export class CustomersModule {}
