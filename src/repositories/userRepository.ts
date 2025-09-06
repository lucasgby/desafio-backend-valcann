import type { User } from "./User";
import users from "../mock/mock-users.json";

interface FilterOptions {
  q?: string;
  role?: string;
  is_active?: boolean;
}

export class UserRepository {
  private data: User[] = users;

  private filterUsers(users: User[], filters: FilterOptions): User[] {
    const { q, role, is_active } = filters;

    return users.filter((user) => {
      const matchesQuery = q
        ? user.name.toLowerCase().includes(q.toLowerCase()) ||
        user.email.toLowerCase().includes(q.toLowerCase())
        : true;

      const matchesRole = role ? user.role === role : true;

      const matchesStatus =
        typeof is_active === "boolean" ? user.is_active === is_active : true;

      return matchesQuery && matchesRole && matchesStatus;
    });
  }

  findAll(
    page: number,
    page_size: number,
    q?: string,
    role?: string,
    is_active?: boolean
  ): { users: User[]; total: number } {
    let result = [...this.data];

    result = this.filterUsers(result, { q, role, is_active });

    const totalRegister = result.length;
    const start = (page - 1) * page_size;
    const end = start + page_size;

    return {
      users: result.slice(start, end),
      total: totalRegister
    }
  }

  findById(id: number): User | undefined {
    return this.data.find((user) => user.id === id);
  }
}