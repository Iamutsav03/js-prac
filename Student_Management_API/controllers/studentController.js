const Student = require('../models/student');

const isPositiveInteger = (value) => {
  return Number.isInteger(Number(value)) && Number(value) > 0;
};

const sendDatabaseError = (res, error) => {
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ message: 'A student with this email already exists' });
  }

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.errors.map((item) => item.message)
    });
  }

  return res.status(500).json({ message: 'Database operation failed', error: error.message });
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      order: [['id', 'ASC']]
    });
    return res.status(200).json(students);
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

const getStudentById = async (req, res) => {
  try {
    if (!isPositiveInteger(req.params.id)) {
      return res.status(400).json({ message: 'A valid student ID is required' });
    }

    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json(student);
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, email, age, course } = req.body;
    const student = await Student.create({ name, email, age, course });
    return res.status(201).json(student);
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

const updateStudent = async (req, res) => {
  try {
    if (!isPositiveInteger(req.params.id)) {
      return res.status(400).json({ message: 'A valid student ID is required' });
    }

    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const allowedFields = ['name', 'email', 'age', 'course'];
    const updates = {};
    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'Provide at least one student field to update' });
    }

    await student.update(updates);
    return res.status(200).json(student);
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

const deleteStudent = async (req, res) => {
  try {
    if (!isPositiveInteger(req.params.id)) {
      return res.status(400).json({ message: 'A valid student ID is required' });
    }

    const deleted = await Student.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    return sendDatabaseError(res, error);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};