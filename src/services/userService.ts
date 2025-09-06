import { NotFoundError } from "../model/error/apiError";
import { UserRepository } from "../repositories/userRepository";

const repository = new UserRepository();

export class UserService {
  getUsers(query: {
    page?: number;
    page_size?: number;
    q?: string;
    role?: string;
    is_active?: boolean
  }) {
    const page = Math.max(1, Number(query.page) || 1);
    const pageSize = Math.min(50, Number(query.page_size) || 10);

    const { total, users } = repository.findAll(
      page,
      pageSize,
      query.q,
      query.role,
      query.is_active
    );

    return {
      data: users,
      pagination: {
        page,
        page_size: pageSize,
        total,
        total_pages: Math.ceil(total / pageSize),
      },
    };
  }

  getUserById(id: number) {
    const user = repository.findById(id);
    
    if (!user) throw new NotFoundError("User not found");

    return { data: user };
  }
}