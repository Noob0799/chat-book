import {Post} from './post.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient) {}

  getposts() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          body: post.body,
          id: post._id
        };
      });
    }))
    .subscribe((postdata) => {
      this.posts = postdata;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPostsUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addposts(title: string, body: string) {
    const post: Post = {
                        id: null,
                        title,
                        body
                       };
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
    .subscribe((res) => {
      console.log(res);
      post.id = res.postId;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });
  }

  deletePosts(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log('Deleted!');
        this.getposts();
      });
  }
}
