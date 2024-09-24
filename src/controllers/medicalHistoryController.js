const { MedicalRecord, LabTest } = require('../models');
const { uploadFile } = require('../services/uploadService');

const viewMedicalHistory = async (req, res) => {
    try {
        const history = await MedicalRecord.findAll({ where: { patientId: req.user.id } });
        res.status(200).json({ history });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching medical history', error });
    }
};

const uploadMedicalDocument = async (req, res) => {
    try {
        const filePath = await uploadFile(req.file);
        const record = await MedicalRecord.create({
            patientId: req.user.id,
            documentUrl: filePath,
            description: req.body.description
        });
        res.status(201).json({ message: 'Document uploaded', record });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading document', error });
    }
};

const getMedicalHistory = async (req, res) => {
    try {
        const medicalRecords = await MedicalRecord.findAll({ where: { patientId: req.user.id } });
        const labTests = await LabTest.findAll({ where: { patientId: req.user.id } });
        res.json({ medicalRecords, labTests });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving medical history', error });
    }
};


module.exports = { viewMedicalHistory, uploadMedicalDocument, getMedicalHistory };
