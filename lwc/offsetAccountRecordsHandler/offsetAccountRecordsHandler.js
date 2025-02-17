import { LightningElement, track } from 'lwc';
import accountRecordsToOffset from '@salesforce/apex/offsetAccountRecords.accountRecordsToOffset';

export default class OffsetAccountRecordsHandler extends LightningElement {
    @track accountDataToDisplay=[];
    error;
    @track number =1;
    @track numberOfRows =5;

    connectedCallback(){
        this.recordsToShow();
    }
    recordsToShow(){
    accountRecordsToOffset({numberOfRows : this.numberOfRows, rowsToSkip :this.number})
        .then (result=>{
            this.accountDataToDisplay=result;

        })
        .catch(error=>{
            this.error=error;
        })
        }
    handlePrevious() {
        if (this.number > 1) {
            this.number -= 1;
            this.recordsToShow();
        }
    }
    handleNext() {
        this.number += 1;
        this.recordsToShow();
    }
    get disabledPreviousButton(){
         if(this.number===1){
            return true;
        }
        else{
            return false;
        }
    }
    get disabledNextButton(){
        if(this.accountDataToDisplay.length < this.numberOfRows){
            return true;
        }
        else{
            return false;
        }
    }

}