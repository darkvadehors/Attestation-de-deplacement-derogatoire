/*
{"firstname":"Johnny","lastname":"Ben el hadj","dateofbirth":"01/12/1976","cityofbird":"Ambilly","adress":"225 Route de la maladière","city":"perrignier","zypcode":74550,"timeback":"20"}




<ion-content >
  <ion-text>



  <h1>Bonjour.</h1>
  <p>Cette application est un exercice de programmation.</p>
   <p>Afin de montrer les possibilités du JavaScript, il est développé avec Angular, ionic.</p>

    <p>En aucun cas nous ne pourrions être tenu responsable de l'utilisation bla bla bla que
      vous pourriez avoir envie d'en faire Bla bla bla sachant qu'il s’agit d'exercice à but
      non lucratif bla bla pour les besoins de la science inter-planétaire bla bla blabla !</p>


    <p>Bien entendu toute ressemblance fortuite avec des documents officiels bla bla, ce n’est pas de ma faute bla bla.</p>

    <p>Enfin ce bla bla ne vous dispense en aucun cas de faire une attestation dérogatoire
     de sorti avec tout le bla bla qui s’y trouve, faite par les autorités :</p>
    <p>1 compétentes.</p>
    <p>2 qui prennent soins de vous.</p>

    <p>Si vous valider cette case vous en assumez les risques et sanctions.</p>
</ion-text>
      <ion-item>
        <ion-label>Je suis d'accord</ion-label>
        <ion-input formControlName = "terms"  type="checkbox"><ion-checkbox color="danger"></ion-checkbox></ion-input>
      </ion-item>
      <div class="validation-errors">
        <ng-container *ngFor="let validation of validation_messages.terms">
          <div class="error-message" *ngIf="validations_form.get('terms').hasError(validation.type) && (validations_form.get('terms').dirty || validations_form.get('terms').touched)">
            <ion-icon name="information-circle-outline"></ion-icon> {{ validation.message }}
          </div>
        </ng-container>
      </div>
</ion-content >



let dateOfBird = this._datepipe.transform(this._varGlobal.setting.dateofbirth, 'short');
    // console.log(this._varGlobal.setting.dateofbirth);
    // console.log(dateOfBird);


this.dateOB = this.datePipe.transform(this._varGlobal.setting.dateofbirth, "dd/mm/yyyy")