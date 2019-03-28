import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { ContactService } from './../_Services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactForm: FormGroup;
  showLoader = false;
  showMessage = false;
  showSuccess = false;
  showError = false;
  message = '';
  constructor(private contactService: ContactService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.contactService.getAllContactList();
    this.initContactForm();
  }

  initContactForm() {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      message: new FormControl('', Validators.required),
      status: new FormControl('New')
    });
  }

  onSubmit() {
    this.showLoader = true;
    const contact = this.contactForm.value;
    this.contactService.createContact(contact)
    .then(() => {
      this.showLoader = false;
      this.showMessage = true;
      this.showSuccess = true;
      this.contactForm.reset();
    })
    .catch(err => {
      this.showLoader = false;
      this.showError = true;
      this.showMessage = true;
      console.log(err);
    })
  }

}
