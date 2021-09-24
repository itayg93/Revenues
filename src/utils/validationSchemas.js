import * as Yup from 'yup';

import constants from './constants';

export default {
  REGISTER: Yup.object().shape({
    name: Yup.string().required().label(constants.NAME),
    email: Yup.string().required().email().label(constants.EMAIL),
    password: Yup.string().required().min(6).label(constants.PASSWORD),
  }),
  LOGIN: Yup.object().shape({
    email: Yup.string().required().email().label(constants.EMAIL),
    password: Yup.string().required().min(6).label(constants.PASSWORD),
  }),
  PROFILE: Yup.object().shape({
    taxRefunds: Yup.boolean(),
    taxPoints: Yup.number(),
    commissionRate: Yup.number(),
    compulsoryInsurance: Yup.number(),
    collateralInsurance: Yup.number(),
  }),
  EXPENSE: Yup.object().shape({
    type: Yup.string(),
    cost: Yup.number().required(constants.REQUIRED),
    comment: Yup.string(),
  }),
  SHIFT: Yup.object().shape({
    deliveries: Yup.number().required(constants.REQUIRED),
    wolt: Yup.number().required(constants.REQUIRED),
    creditTips: Yup.number(),
    cashTips: Yup.number(),
  }),
};
