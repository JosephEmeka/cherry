import nodemailer from 'nodemailer';
import twilio from 'twilio';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendEmailNotification = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
        throw new Error('Email sending failed');
    }
};

export const sendWhatsAppNotification = async (to, message) => {
    try {
        await twilioClient.messages.create({
            body: message,
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
            to: `whatsapp:${to}`
        });
        console.log(`WhatsApp message sent to ${to}`);
    } catch (error) {
        console.error(`Error sending WhatsApp message to ${to}:`, error);
        throw new Error('WhatsApp message sending failed');
    }
};
