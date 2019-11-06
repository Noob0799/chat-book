import {Post} from './post.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient) {}

  getposts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postdata) => {
      this.posts = postdata.posts;
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
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
    .subscribe((res) => {
      console.log(res);
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });
  }
}
