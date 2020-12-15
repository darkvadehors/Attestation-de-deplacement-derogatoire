import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: [ './tabs.component.scss' ]
})
export class TabsComponent implements OnInit {

    validations_form: FormGroup;

    constructor(public formBuilder: FormBuilder) { }

    ngOnInit() {
        this.validations_form = this.formBuilder.group({
            terms: new FormControl(false, Validators.requiredTrue),
        })
    }
    validation_messages = {
        'terms': [
            { type: 'required', message: 'Valider pour poursuivre!' }
        ],
        'stat': [
            { type: 'required', message: 'Il faut vous décider !' }
        ],
    };

    onSubmit(values): any {
        console.log(values);
    }
}
