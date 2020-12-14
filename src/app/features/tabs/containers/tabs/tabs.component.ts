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

    ngOnInit(): void {
        this.validations_form = this.formBuilder.group({
            terms: new FormControl(true, Validators.pattern('true')),
            stat: new FormControl('', Validators.required)
        })
    }
    validation_messages = {
        'terms': [
            { type: 'required', message: 'La ville est obligatoire' }
        ],
        'stat': [
            { type: 'required', message: 'Le nombres de minutes à soutraire est obligatoire' }
        ],
    };

}
