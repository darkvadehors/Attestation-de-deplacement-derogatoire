import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './containers/tabs/tabs.component';
import { TabsRoutingModule } from './tabs-routing.modules';
import { ReactiveFormsModule } from '@angular/forms';

//FIXME voir pour désactiver la redirection pendant le réglage ou cache les tabs
@NgModule({
    declarations: [ TabsComponent ],
    imports: [
        CommonModule,
        TabsRoutingModule,
        IonicModule,
        ReactiveFormsModule
    ]
})
export class TabsModule { }
