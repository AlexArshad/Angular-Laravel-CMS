import { Component, ViewChild, OnInit } from "@angular/core";
import {
  FormArray,
  NgForm,
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { UrlService } from '../services/url.service';

@Component({
  selector: "app-team-edit",
  templateUrl: "./team-edit.component.html",
  styleUrls: ["./team-edit.component.css"]
})
export class TeamEditComponent implements OnInit {
  @ViewChild("profileForm")
  formValues;
  profileForm = this.fb.group({
    id: [""],
    name: ["", Validators.required],
    tag_line: [""],
    css: [""],
    description: [""]
  });
  job: Object;
  subjob:Object;
  Data: Object;
  public error;
  options: Object;
  selectedFile: File = null;
  public fname;

  cssvalue = [
    { style: "grape-9", name: "grape-9" },
    { style: "violet-9", name: "violet-9" },
    { style: "yellow-4", name: "yellow-4" },
    { style: "yellow-7", name: "yellow-7" },
    { style: "cyan-5", name: "cyan-5" },
    { style: "bg-primary", name: "bg-primary" }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private url: UrlService
  ) {
    this.options = {
      removePlugins:
        "colorbutton,colordialog,find,font,format,image,link,sourcearea",
      removeButtons: "Strike,Subscript,Superscript,PasteFromWord",
      toolbarGroups: [
        //{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
        { name: "basicstyles", groups: ["basicstyles"] },
        { name: "paragraph", groups: ["list", "indent"] },
        { name: "styles", groups: ["Styles", "Format"] },
        { name: "insert", groups: ["Table", "HorizontalRule"] },
        { name: "tools" }
        //{ name: 'document',	   groups: [ 'mode' ] }
      ]
    };
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.url.teamRead(params["id"])
      .subscribe((data) => {
          this.job = data;
         // console.log(this.job);
          this.profileForm.patchValue({
            id: this.job["id"],
            name: this.job["name"],
            tag_line: this.job["tag_line"],
            css: this.job["css"],
            description: this.job["description"]
          });
        });
    });
  }
  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }
  onSubmit() {
    const fd = new FormData();
    fd.append("id", this.profileForm.value.id);
    fd.append("name", this.profileForm.value.name);
    fd.append("css", this.profileForm.value.css);
    fd.append("tag_line", this.profileForm.value.tag_line);
    fd.append("description", this.profileForm.value.description);
    fd.append("image", this.selectedFile);
    
    console.log(this.profileForm.value.name);
    console.log(fd);
    this.route.params.subscribe((params: Params) => {
      this.url.teamUpdate(fd)
        .subscribe(
          (data) => {
            this.subjob = data;
            console.log(this.subjob);
          },
          (error) => {
            this.error = error;
            console.log(this.error);
          }
        );
    });
  }
}
