import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TagVideoListPage } from './tag-video-list';
import { TagVideoListItemComponent } from '../../components/tag-video-list-item/tag-video-list-item';

@NgModule({
  declarations: [
    TagVideoListPage,
    TagVideoListItemComponent,
  ],
  imports: [
    IonicPageModule.forChild(TagVideoListPage),
  ],
  entryComponents: [
    TagVideoListPage,
    TagVideoListItemComponent,
  ]
})
export class TagVideoListPageModule {}
