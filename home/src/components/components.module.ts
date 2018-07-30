import { NgModule } from '@angular/core';
import { ShanCardComponent } from './shan-card/shan-card';
import { IonicModule } from 'ionic-angular';
import { TagCardComponent } from './tag-card/tag-card';
import { TaskItemComponent } from './task-item/task-item';
import { TagVideoListItemComponent } from './tag-video-list-item/tag-video-list-item';

@NgModule({
	declarations: [ShanCardComponent,
    TagCardComponent,
    TaskItemComponent,
    TagVideoListItemComponent
],
	imports: [IonicModule],
	exports: [ShanCardComponent,
    TagCardComponent,
    TaskItemComponent,
    TagVideoListItemComponent
],
})
export class ComponentsModule {}
