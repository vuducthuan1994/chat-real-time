export class Message {
    content: string;
    from: string;
    to: string;
    time : number;
    constructor({ content: content, from: from, to: to, time : time }) {
        this.content = content ? content : '';
        this.from = from ? from : '';
        this.to = to ? to : '';
        this.time = time ? time : null;
    }
}