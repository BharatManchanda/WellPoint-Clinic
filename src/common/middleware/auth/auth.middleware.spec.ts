import { AuthMiddleware } from './auth.middleware';

describe('AuthMiddleware', () => {
  it('should be defined', () => {
    const mockJwtService: any = {
      verify: jest.fn(),
    };

    const mockUserModel: any = {
      findById: jest.fn(),
    };

    const middleware = new AuthMiddleware(
      mockJwtService,
      mockUserModel,
    );

    expect(middleware).toBeDefined();
  });
});