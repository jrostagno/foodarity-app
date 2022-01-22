const { Router } = require('express');

const router = new Router();
const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  uploadPhotoUser,
} = require('../../controllers/userController');
const ValidationsUser = require('../../middlewares/validations/validationUser');
const validationFiles = require('../../middlewares/validations/validationFiles');
const authMiddleware = require('../../middlewares/auth');

const { enviarMail } = require('../../controllers/nodemailerController');

router.post('/nodemailer', enviarMail);
router.post('/', ValidationsUser.withPassword, createUser);
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUser);
router.delete('/:id', authMiddleware, deleteUser);
router.put('/:id', authMiddleware, ValidationsUser.withoutPassword, updateUser);
router.patch(
  '/upload',
  authMiddleware,
  validationFiles.fileExists,
  uploadPhotoUser
);

module.exports = router;
