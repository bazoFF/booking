import { Component, OnInit } from '@angular/core';
import { Contact, Contacts } from "@capacitor-community/contacts";
import { IContact } from "./contact.model";
import { ModalComponent } from "../modal.component";
import { ModalController } from "@ionic/angular";
import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions/ngx";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent extends ModalComponent implements OnInit {

  public contacts: IContact[];

  constructor(protected _modalController: ModalController, private _permissionsService: AndroidPermissions) {
    super(_modalController);
  }

  async ngOnInit() {
    await this._setupPermissions();
    await this._getContacts();
  }

  private async _setupPermissions() {
    await this._permissionsService.requestPermissions([
      this._permissionsService.PERMISSION.READ_CONTACTS,
      this._permissionsService.PERMISSION.WRITE_CONTACTS
    ]);
  }

  private async _getContacts() {
    const data: { contacts: Contact[] } = await Contacts.getContacts();
    this.contacts = data.contacts.map(contact => (
      {
        name: contact.displayName,
        number: contact.phoneNumbers[0].number
      })
    );
  }
}
