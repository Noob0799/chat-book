import { Component, OnInit } from '@angular/core';
import {Post} from '../post.model';
import {PostService} from '../posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  titleEmpty = false;
  bodyEmpty = false;
  mode = 'create';
  postId: string;
  post: Post;
  constructor(public postservice: PostService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postservice.getpost(this.postId);
        (document.getElementById('title') as HTMLInputElement).value = this.post.title;
        (document.getElementById('post') as HTMLInputElement).value = this.post.body;
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  savePost(titleInput: HTMLTextAreaElement, postInput: HTMLTextAreaElement) {
    if (titleInput.value && postInput.value) {
      this.titleEmpty = false;
      this.bodyEmpty = false;
      if (this.mode === 'create') {
        console.log('Post saved.');
        this.postservice.addposts(titleInput.value, postInput.value);
      } else {
        console.log('Post updated');
        this.postservice.updateposts(this.postId, titleInput.value, postInput.value);
      }
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
