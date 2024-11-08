import { Wallet } from '../models/wallet.js';
import { initializePayment } from '../services/paymentService.js';

 const addFunds = async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentLink = await initializePayment(req.user.email, amount);
        res.json({ paymentLink });
    } catch (error) {
        res.status(500).json({ message: 'Error adding funds', error });
    }
};

 const viewWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ where: { userId: req.user.id } });
        res.json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving wallet', error });
    }
};
export default {addFunds,viewWallet}