import { NgModule } from '@angular/core';
import { ShanCardComponent } from './shan-card/shan-card';
import { IonicModule } from 'ionic-angular';
import { TagCardComponent } from './tag-card/tag-card';
@NgModule({
	declarations: [ShanCardComponent,
    TagCardComponent],
	imports: [IonicModule],
	exports: [ShanCardComponent,
    TagCardComponent],
})
export class ComponentsModule {}
