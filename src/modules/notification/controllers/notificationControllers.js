import { sendEmailNotification, sendWhatsAppNotification } from '../services/notificationService';
import { EmailDTO, WhatsAppDTO } from '../dtos/notification.dto';

export const sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;
    try {
        const emailDTO = new EmailDTO(to, subject, text);
        emailDTO.validate();

        await sendEmailNotification(to, subject, text);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
};

export const sendWhatsApp = async (req, res) => {
    const { to, message } = req.body;
    try {
        const whatsappDTO = new WhatsAppDTO(to, message);
        whatsappDTO.validate();

        await sendWhatsAppNotification(to, message);
        res.status(200).json({ message: 'WhatsApp message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send WhatsApp message', error: error.message });
    }
};
