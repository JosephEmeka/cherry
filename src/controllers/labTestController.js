const { LabTest, MedicalRecord } = require('../models');
const { uploadFile } = require('../services/uploadService');

// Request a new lab test
const requestLabTest = async (req, res) => {
    const { testName, doctorId, patientId } = req.body;
    try {
        const labTest = await LabTest.create({ testName, doctorId, patientId, status: 'requested' });
        res.status(201).json({ message: 'Lab test requested', labTest });
    } catch (error) {
        res.status(500).json({ message: 'Error requesting lab test', error });
    }
};

// Upload lab test result
const uploadLabTestResult = async (req, res) => {
    try {
        const filePath = await uploadFile(req.file);
        const { labTestId, doctorNote } = req.body;
        const labTest = await LabTest.findByPk(labTestId);
        labTest.resultUrl = filePath;
        labTest.doctorNote = doctorNote;
        labTest.status = 'completed';
        await labTest.save();
        res.status(201).json({ message: 'Lab test result uploaded', labTest });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading lab test result', error });
    }
};

module.exports = { requestLabTest, uploadLabTestResult };
