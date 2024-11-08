
export class EmailDTO {
    constructor(to, subject, text) {
        this.to = to;
        this.subject = subject;
        this.text = text;
    }

    validate() {
        if (!this.to || !this.subject || !this.text) {
            throw new Error('Invalid email data: Missing "to", "subject", or "text".');
        }
    }
}

export class WhatsAppDTO {
    constructor(to, message) {
        this.to = to;
        this.message = message;
    }

    validate() {
        if (!this.to || !this.message) {
            throw new Error('Invalid WhatsApp data: Missing "to" or "message".');
        }
    }
}
