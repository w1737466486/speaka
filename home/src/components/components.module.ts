import { NgModule } from '@angular/core';
import { ShanCardComponent } from './shan-card/shan-card';
import { IonicModule } from 'ionic-angular';
import { TagCardComponent } from './tag-card/tag-card';
import { TaskItemComponent } from './task-item/task-item';
@NgModule({
	declarations: [ShanCardComponent,
    TagCardComponent,
    TaskItemComponent],
	imports: [IonicModule],
	exports: [ShanCardComponent,
    TagCardComponent,
    TaskItemComponent],
})
export class ComponentsModule {}
