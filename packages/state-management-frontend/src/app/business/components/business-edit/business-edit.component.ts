import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { defaultBusinessClassificationBackendData } from '../../utils/default-business-classification-backend-data';
import { FormEditPayload } from '../../models/form-edit-payload.interface';
import { defaultBusinessData } from '../../utils/default-business-data';

@Component({
  selector: 'app-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.scss'],
})
export class BusinessEditComponent implements OnInit {
  // TO SIMULATE DATA FROM THE BE
  mockBusinessService$ = of(19);
  businessId = 5;
  hasQueryError = false;
  isEditing = false;
  // Needs adequate typing when we know what the BE sends
  businessData = defaultBusinessData;
  mockBackendData = defaultBusinessClassificationBackendData;

  private numberRegexPattern = /^[0-9]+$/;
  activeRequest = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((urlData: Params) => {
      const urlIdSting = urlData?.['id'];
      if (!urlIdSting.match(this.numberRegexPattern)) {
        this.hasQueryError = true;
        return;
      }
      // When the service is ready
      // const urlId = parseInt(urlIdSting);
      // this.businessService.getBusinessData(urlId).
      this.mockBusinessService$.subscribe({
        error: (error) => {
          this.hasQueryError = true;
          // IMPLEMENT
          // this.handleQueryError(error);
        },
        next: (businessId: number) => {
          this.businessId = businessId;
        },
      });
    });
  }

  handleEditFormSubmission(payload: FormEditPayload): void {
    // IMPLEMENT
    this.activeRequest = true;
    setTimeout(() => {
      this.activeRequest = false;
    }, 5000);
    console.log(payload);
    // MAKE VALIDATIONS
    // if(this.businessData == payload){
    //   console.log('EQUAL DATA CAN NOT BE UPDATED');
    //   return;
    // }
    // this.businessService.updateBusiness(payload).subscribe(
    //   {
    //   next : ()=>{
    // this.modalService.open(SuccessModal, data)
    // },
    //   error: ()=>{
    // handleError();
    // },
    // complete: ()=>{
    //   this.ongoingRequest = false;
    // }
    // }
    // );
  }

  handleBusinessDeletion(payload: FormEditPayload): void {
    this.activeRequest = true;
    //Simulates service connection
    setTimeout(() => {
      this.activeRequest = false;
    }, 5000);
  }
}
