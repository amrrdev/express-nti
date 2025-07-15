export class UserRepository implements Repository {
  get(): void {}
  create(): void {}
}

export class UserRepositoryInMemory implements Repository {
  get(): void {}
  create(): void {}
}

export interface Repository {
  get(): void;
  create(): void;
}

export class UserService {
  constructor(private readonly userRepository: Repository) {}

  async getAllUsers() {
    return this.userRepository.create();
  }
}

new UserService(new UserRepositoryInMemory());
