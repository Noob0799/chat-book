import { Component, OnInit } from '@angular/core';
import {Post} from '../post.model';
import {PostService} from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  titleEmpty = false;
  bodyEmpty = false;
  constructor(public postservice: PostService) { }

  ngOnInit() {
  }

  savePost(titleInput: HTMLTextAreaElement, postInput: HTMLTextAreaElement) {
    if (titleInput.value && postInput.value) {
      this.titleEmpty = false;
      this.bodyEmpty = false;
      console.log('Post saved.');
      this.postservice.addposts(titleInput.value, postInput.value);
      titleInput.value = '';
      postInput.value = '';
    } else {
      if (!titleInput.value) {
        this.titleEmpty = true;
      }
      if (!postInput.value) {
        this.bodyEmpty = true;
      }
    }
  }
}
