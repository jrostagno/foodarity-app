// const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
// eslint-disable-next-line import/no-unresolved
const cloudinary = require('cloudinary').v2;
const Company = require('../models/Company');
const CompanyType = require('../models/CompanyType');
const Address = require('../models/Address');
const City = require('../models/City');
const State = require('../models/State');

cloudinary.config(process.env.CLOUDINARY_URL);

// crear una empresa
const createCompany = async (req, res) => {
  try {
    const ownerId = req.userId; // revisar con chapa

    const {
      name,
      description,
      areaCode,
      phone,
      email,
      website,
      status,
      type,
      street,
      number,
      zipcode,
      cityId,
      stateId,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newCompany = await Company.create({
      name,
      description,
      areaCode,
      phone,
      email,
      website,
      status,
      ownerId,
    });

    const newAddress = await Address.create({
      street,
      number,
      zipcode,
    });

    await newCompany.setType(type);
    await newAddress.setCompany(newCompany);
    await newAddress.setCity(cityId);
    await newAddress.setState(stateId);
    return res.status(200).json(newCompany);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Error al crear la empresa. Revise que los tipos de datos ingresados sean correctos',
    });
  }
};

// obtner info de todas las compañias
const getCompanies = async (req, res) => {
  try {
    const listCompanies = await Company.findAll({
      include: [
        { model: CompanyType, as: 'type', attributes: ['type'] },
        { model: Address, include: [{ model: City }, { model: State }] },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (listCompanies.length > 0) {
      return res.status(200).json(listCompanies);
    }
    return res.status(404).json({ msg: 'No se encontraron compañias' });
  } catch (error) {
    return res.status(500);
  }
};

// buscar empresa/ong por id
const searchCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id, {
      include: [
        { model: CompanyType, as: 'type', attributes: ['type'] },
        { model: Address, include: [{ model: City }, { model: State }] },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ msg: 'Not found' });
    }
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

// actualizar imagen compañia

const uploadImageCompany = async (request, response) => {
  const { id, field } = request.params;

  const { userId: ownerId } = request;

  try {
    const company = await Company.findByPk(id);
    if (!company) {
      return response.status(400).json({
        message: 'Company not found',
      });
    }

    if (ownerId !== company.ownerId) {
      return response.status(401).json({ message: 'Not owner' });
    }

    const { tempFilePath } = request.files.file;

    switch (field) {
      case 'logo': {
        if (company.logo) {
          cloudinary.uploader.destroy(company.logo.public_id);
        }

        const { secure_url: secureUrl, public_id: publicId } =
          await cloudinary.uploader.upload(tempFilePath);

        await company.update({ logo: { public_id: publicId, url: secureUrl } });

        return response.status(200).json(company);
      }

      case 'banner': {
        if (company.banner) {
          cloudinary.uploader.destroy(company.banner.public_id);
        }
        const { secure_url: secureUrl, public_id: publicId } =
          await cloudinary.uploader.upload(tempFilePath);

        await company.update({
          banner: { public_id: publicId, url: secureUrl },
        });
        return response.status(200).json(company);
      }

      default:
        return response.status(400).json({
          message: 'El parametro field debe tener el valor  "logo" o "banner"',
        });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Fatal Error',
    });
  }
};

// eliminar/deshabilitar empresa/ong
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(400).json({ msg: 'No se encontro la empresa' });
    }
    await company.destroy();
    return res.status(200).json({ msg: 'Empresa eliminada' });
  } catch (error) {
    return res.status(500).json({ msg: 'Error al eliminar la empresa' });
  }
};

// update company
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      areaCode,
      phone,
      email,
      website,
      status,
      type,
      street,
      number,
      zipcode,
      cityId,
      stateId,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(400).json({ msg: 'No se encontro la empresa' });
    }

    const address = await Address.findOne({
      where: { companyId: id },
    });

    if (!address) {
      return res.status(400).json({ msg: 'No se encontro la direccion' });
    }

    await company.update({
      name,
      description,
      areaCode,
      phone,
      email,
      website,
      status,
    });

    await address.update({
      street,
      number,
      zipcode,
    });

    await company.setType(type);
    await address.setCity(cityId);
    await address.setState(stateId);

    return res.status(200).json(company);
  } catch (error) {
    return res.status(500).json({ msg: 'Error al actualizar la empresa' });
  }
};

module.exports = {
  getCompanies,
  createCompany,
  searchCompany,
  uploadImageCompany,
  deleteCompany,
  updateCompany,
};
