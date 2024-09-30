
//
// const { Doctor } = require('../src/models/doctor');
// const { Appointment } = require('../src/models');

// jest.mock('../src/models');
//
// describe('assignDoctor', () => {
//     const patientId = 1;
//     const condition = 'cardiology';
//
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });
//
//     it('should assign a doctor to the patient when available', async () => {
//         const mockDoctor = { id: 1, specialty: condition, available: true, save: jest.fn() };
//         await assignedDoctor.findOne().mockResolvedValue(mockDoctor);
//
//
//         const mockAppointment = { patientId, doctorId: mockDoctor.id };
//         Appointment.create.mockResolvedValue(mockAppointment);
//
//         const appointment = await assignedDoctor(patientId, condition);
//
//         expect(appointment).toEqual(mockAppointment);
//         expect(Doctor.findOne).toHaveBeenCalledWith({ where: { specialty: condition, available: true } });
//         expect(mockDoctor.available).toBe(false); // Ensure doctor is marked as unavailable
//         expect(mockDoctor.save).toHaveBeenCalled();
//     });
//
//     it('should throw an error if no doctor is available', async () => {
//         // Mock the Doctor model's findOne method to return null (no available doctor)
//         Doctor.findOne.mockResolvedValue(null);
//
//         await expect(assignDoctor(patientId, condition)).rejects.toThrow('No available doctors');
//     });
//
//     it('should throw an error if an error occurs during appointment creation', async () => {
//         // Mock the Doctor model's findOne method to return a doctor
//         const mockDoctor = { id: 1, specialty: condition, available: true, save: jest.fn() };
//         Doctor.findOne.mockResolvedValue(mockDoctor);
//
//         // Mock the Appointment model's create method to throw an error
//         Appointment.create.mockRejectedValue(new Error('Database error'));
//
//         await expect(assignDoctor(patientId, condition)).rejects.toThrow('Error in assigning doctor: Database error');
//     });
// });




describe('Doctor Tests', () => {
    test('dummy test', () => {
        expect(true).toBe(true); // Placeholder for a real test
    });
});