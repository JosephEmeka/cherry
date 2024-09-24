const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    middleName:{
        type: DataTypes.STRING,
        allowNull: false
    },

    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
    },


    role: {
        type: DataTypes.ENUM('admin', 'doctor', 'patient'),
        allowNull: false,
        defaultValue: 'patient',
    },

    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },

    address: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Doctor-Specific Fields
    specialty: {
        type: DataTypes.STRING,
        allowNull: true, // This field is only required for doctors
    },
    workSchedule: {
        type: DataTypes.JSON, // Store doctor’s available time slots (e.g., [{day: "Monday", start: "09:00", end: "17:00"}])
        allowNull: true,
    },

    // Patient-Specific Fields
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: true,
    },
    healthHistory: {
        type: DataTypes.TEXT, // Store medical history in text or JSON format
        allowNull: true,
    },
    assignedDoctor: {
        type: DataTypes.INTEGER
    },

    // Admin-Specific Fields
    adminLevel: {
        type: DataTypes.ENUM('super', 'regular'),
        allowNull: true,
        defaultValue: 'regular', // Only relevant for admins
    },

    // Common Fields
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'suspended'),
        allowNull: false,
        defaultValue: 'active',
    },

    // Metadata
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    // Hooks for hashing passwords before storing them
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        },
    },
});

// Password verification method
User.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Role-based access checks
User.prototype.isAdmin = function () {
    return this.role === 'admin';
};

User.prototype.isDoctor = function () {
    return this.role === 'doctor';
};

User.prototype.isPatient = function () {
    return this.role === 'patient';
};

module.exports = User;


// Associations
User.associate = (models) => {
    User.hasMany(models.Appointment, { foreignKey: 'doctorId' });
    User.hasMany(models.MedicalRecord, { foreignKey: 'patientId' });
};

module.exports = User;