import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/dbConfig';
import Doctor from '../../doctors/models/doctor';
import Patient from '../../users/models/patient';

class Appointment extends Model {}

Appointment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        doctorId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Doctor,
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        patientId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Patient,
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        appointmentDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
            allowNull: false,
            defaultValue: 'scheduled',
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Appointment',
        timestamps: true,
        paranoid: true,
    }
);

Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });
Patient.hasMany(Appointment, { foreignKey: 'patientId' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

export default Appointment;
