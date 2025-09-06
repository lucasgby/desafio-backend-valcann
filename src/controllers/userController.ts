import type { Request, Response } from "express";

import { UserService } from "../services/userService";
import { userIdParamSchema, userQuerySchema } from "../model/validators/userSchema";

const service = new UserService();

export class UserController {
  static getUsers(request: Request, response: Response) {
    const query = userQuerySchema.parse(request.query);

    const result = service.getUsers({
      page: query.page,
      is_active: query.is_active,
      page_size: query.page_size,
      q: query.q,
      role: query.role
    });

    return response.json(result);
  }

  static getUserById(request: Request, response: Response) {
    const { id } = userIdParamSchema.parse(request.params);

    const result = service.getUserById(id);

    return response.json(result);
  }
}