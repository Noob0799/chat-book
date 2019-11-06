import { Component, OnInit, OnDestroy } from '@angular/core';
import {Post} from '../post.model';
import {PostService} from '../posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postSub: Subscription;
  constructor(public postService: PostService) { }

  ngOnInit() {
    this.postService.getposts();
    this.postSub = this.postService.getPostsUpdateListener()
    .subscribe((postData: Post[]) => {
      this.posts = postData;
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
