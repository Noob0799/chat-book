import { Component, OnInit } from '@angular/core';
import {Post} from '../post.model';
import {PostService} from '../posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimetype } from './mime-type.validator';

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
  post = {id: null, title: '', body: ''};
  postFlag = true;
  form: FormGroup;
  imagePreview: string|ArrayBuffer;

  constructor(public postservice: PostService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
      body: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimetype]})
    });
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postFlag = false;
        this.postId = paramMap.get('postId');
        this.postservice.getpost(this.postId)
          .subscribe(postData => {
            this.post = {id: postData.post._id, title: postData.post.title, body: postData.post.body};
            this.form.setValue({
              title: this.post.title,
              body: this.post.body
            });
            console.log(postData.post);
            this.postFlag = true;
          });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  imageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file
    });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  savePost() {
    // let title = (document.getElementById('title') as HTMLInputElement).value;
    // let body = (document.getElementById('post') as HTMLInputElement).value;
    if (this.form.invalid) {
      return;
    }
    if (this.form.value.title && this.form.value.body) {
      this.titleEmpty = false;
      this.bodyEmpty = false;
      if (this.mode === 'create') {
        console.log('Post saved.');
        this.postservice.addposts(this.form.value.title, this.form.value.body, this.form.value.image);
      } else {
        console.log('Post updated');
        this.postservice.updateposts(this.postId, this.form.value.title, this.form.value.body);
      }
      this.form.reset();
      this.router.navigate(['']);


    } else {
      if (!this.form.value.title) {
        this.titleEmpty = true;
      }
      if (!this.form.value.body) {
        this.bodyEmpty = true;
      }
    }
  }
}
