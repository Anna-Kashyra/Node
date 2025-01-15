import joi from "joi";

import { regexConstant } from "../constants/regex.constants";
import { OrderEnum } from "../enums/order.enum";
import { UserListOrderEnum } from "../enums/user-list-order.enum";

export class UserValidator {
  private static name = joi.string().min(3).max(50).trim().messages({
    "string.base": "Name must be a string.",
    "string.min": "Name must be at least 3 characters long.",
    "string.max": "Name cannot exceed 50 characters.",
    "any.required": "The 'name' field is required.",
  });

  private static age = joi.number().min(18).max(100).messages({
    "number.base": "Age must be a number.",
    "number.min": "Age must be at least 18.",
    "number.max": "Age cannot exceed 100.",
    "any.required": "The 'age' field is required.",
  });

  private static email = joi
    .string()
    .regex(regexConstant.EMAIL)
    .trim()
    .messages({
      "string.pattern.base": "Invalid email format.",
      "any.required": "The 'email' field is required.",
    });

  private static password = joi
    .string()
    .regex(regexConstant.PASSWORD)
    .trim()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, include one letter, one number, and one special character.",
      "any.required": "The 'password' field is required.",
    });

  private static phone = joi
    .string()
    .regex(regexConstant.PHONE)
    .trim()
    .messages({
      "string.pattern.base": "Invalid phone number format.",
    });

  public static create = joi.object({
    name: this.name.required(),
    age: this.age.required(),
    email: this.email.required(),
    password: this.password.required(),
    phone: this.phone.optional(),
  });

  public static update = joi.object({
    name: this.name,
    age: this.age,
    phone: this.phone,
  });

  public static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  public static forgotPassword = joi.object({
    email: this.email.required(),
  });

  public static changePassword = joi.object({
    newPassword: this.password.required(),
    oldPassword: this.password.required(),
  });

  public static getListQuery = joi.object({
    limit: joi.number().min(1).max(100).default(10),
    page: joi.number().min(1).default(1),
    search: joi.string().trim(),
    order: joi
      .string()
      .valid(...Object.values(OrderEnum))
      .default(OrderEnum.ASC),
    orderBy: joi
      .string()
      .valid(...Object.values(UserListOrderEnum))
      .default(UserListOrderEnum.CREATED_AT),
  });
}
