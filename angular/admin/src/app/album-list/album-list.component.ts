import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";
import { UrlService } from '../services/url.service';

@Component({
  selector: "app-album-list",
  templateUrl: "./album-list.component.html",
  styleUrls: ["./album-list.component.css"]
})
export class AlbumListComponent implements OnInit {
  albums: Object;
  newsdata: Object;
  paramsSubscription: Subscription;
  public next;
  public prev;
  public last_page;
  error: Object;
  data: Object;
  public imagepath;

  constructor( private route: ActivatedRoute, private url: UrlService) {
    this.imagepath = this.url.storagepath;
  }
  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.url.albumlist(params["id"])
        .subscribe((data) => {
          this.albums = data;
          this.newsdata = this.albums["data"];
          //  console.log(this.newsdata);
          this.last_page = this.albums["last_page"];
          this.next = this.albums["current_page"] + 1;
          this.prev = this.albums["current_page"] - 1;
        });
    });
  }
  deletealbum(id) {
    this.url.albumDelete(id)
      .subscribe(
        (data) => this.handleResponse(data),
        (error) => {
          this.error = error;
          console.log(this.error);
          alert("Please Delete all images form this album, then try again");
        }
      );
  }
  handleError(error) {
    console.log(error);
    console.log("error");
  }
  handleResponse(data) {
    console.log(data);
  }
}
