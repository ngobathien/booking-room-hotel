import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact, ContactDocument } from './schemas/contact.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: Model<ContactDocument>,
  ) {}

  async getContact() {
    return this.contactModel.findOne(); // chỉ 1 record
  }

  async updateContact(data: CreateContactDto) {
    let contact = await this.contactModel.findOne();

    if (!contact) {
      contact = new this.contactModel(data);
    } else {
      Object.assign(contact, data);
    }

    return contact.save();
  }
}
