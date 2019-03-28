import { Contact } from './../../../_Models/contact.model';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { ContactService } from './../../../_Services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  allMessages: Contact[] = [];
  showLoader = false;
  readLoader = false;
  p = 1;
  constructor(private contactService: ContactService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getAllMessages();
  }

  getAllMessages() {
    this.showLoader = true;
    this.contactService.getAllContactList().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['contactId'] = element.key;
        this.allMessages.push(x as Contact);
      });
      this.showLoader = false;
      console.log(this.allMessages);
    },
    (err => {
      this.showLoader = false;
      console.log(err);
      this.alertify.error('Some error occured');
    }));
  }

  onReadMessage(message: Contact) {
    this.readLoader = true;
    const key = message.contactId;
    this.contactService.updateContact(key, message)
    .then(() => {
      this.alertify.success('Marked as read');
      this.readLoader = false;
      this.allMessages = [];
      this.getAllMessages();
    })
    .catch(err => {
      this.readLoader = false;
      console.log(err);
      this.alertify.error('Some error occured');
    });
  }

}
