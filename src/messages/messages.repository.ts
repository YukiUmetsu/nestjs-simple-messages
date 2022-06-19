import { Injectable } from '@nestjs/common';
import {readFile, writeFile} from 'fs/promises';

// add to the DI container
@Injectable()
export class MessagesRepository {

    async loadMessages() {
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);
        return messages;
    }

    async findOne(id: string) {
        const messages = await this.loadMessages();
        return messages[id];
    }

    async findAll() {
        return await this.loadMessages();
    }

    async create(message: string) {
        const messages = await this.loadMessages();
        let lastId = 0;
        const keys = Object.keys(messages);
        let keyLength = keys.length;
        if (messages && keyLength > 0) {
            lastId = messages[keys[keyLength - 1]].id;
        }
        const id = lastId + 1;
        messages[id] = { id, content: message};
        await writeFile('messages.json', JSON.stringify(messages));
    }
}