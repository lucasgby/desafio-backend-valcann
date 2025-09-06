import type{ User } from "./User";
import users from "../mock/mock-users.json";

export class UserRepository {
  private data: User[] = users;

  findAll(
    page: number,
    page_size: number,
    q?: string,
    role?: string,
    is_active?: boolean
  ): { users: User[]; total: number } {
    let result = [...this.data];

    if (q) {
      const query = q.toLowerCase();

      result = result.filter((value) =>
        value.name.toLowerCase().includes(query) ||
        value.email.toLowerCase().includes(query)
      );
    }

    if (role) {
      result = result.filter((value) => value.role === role);
    }

    if (typeof is_active === 'boolean') {
      result = result.filter((status) => status.is_active === is_active);
    }

    const totalRegister = result.length;
    const start = (page - 1) * page_size;
    const end = start + page_size;

    return {
      users: result.slice(start, end),
      total: totalRegister
    }
  }

  findById(id: number) : User | undefined {
    return this.data.find((user) => user.id === id);
  }
}