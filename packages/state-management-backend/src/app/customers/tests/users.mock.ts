import { JwtInfo } from '../../auth/interfaces/jwtinfo.type';
import { User } from '../../users/entities/user.entity';
import { CreateCustomerDto } from '../dto/create-customer.dto';

export const mockUser: User = {
  name: 'test',
  picture: '',
  lastname: 'test',
  email: 'test@example.com',
  username: 'test',
  contactNumber: '1313412341',
  userId: 'userid',
};

export const mockCurrentCustomer: JwtInfo = {
  sub: 'asdf',
  role: 'customer',
  iat: 0,
  exp: 0,
};

export const mockUserResponse: Partial<User> = {
  name: 'test',
  picture: '',
  lastname: 'test',
  email: 'test@example.com',
  username: 'test',
  contactNumber: '1313412341',
};

export const mockCreateCustomerDto: CreateCustomerDto = {
  name: 'test',
  picture: '',
  lastname: 'test',
  email: 'test@example.com',
  username: 'test',
  password: 'test',
  contactNumber: '1313412341',
};

export const mockMultipleUsersResponse = [
  {
    name: 'test',
    picture: '',
    lastname: 'test',
    email: 'test@example.com',
    username: 'test',
    password: 'password',
    contactNumber: 1313412341,
  },
  {
    name: 'test2',
    picture: '',
    lastname: 'test2',
    email: 'test2@example.com',
    username: 'test2',
    password: 'password',
    contactNumber: 1313412341,
  },
];
