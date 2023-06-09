import { Payroll } from '../../payroll/entities/payroll.entity';
import { InitialBusinessCreationDto } from '../dto/initial-creation.dto';
import { BusinessHq } from '../entities/business.entity';

export const businessStub: BusinessHq = {
  userId: 'a',
  username: 'a',
  name: 'a',
  lastname: 'a',
  picture: 'a',
  email: 'a',
  contactNumber: 'a',
  businessName: 'a',
  rating: 2,
  longitude: '1',
  latitude: '1',
  contactAddress: 'a',
  deleted: false,
  categories: {} as any as BusinessHq['categories'],
  businessPicture: '',
  payroll: new Payroll(),
  businessId: '',
};

export const businessModificationDtoStub = {
  businessName: 'b',
  representativeName: 'b',
  address: 'b',
  latitude: '2',
  longitude: '2',
  contactNumber: '3',
  businessPicture: 'b',
};

export const initialBusinessCreationDtoStub: InitialBusinessCreationDto = {
  businessName: 'b',
  representativeName: 'b',
  email: 'a',
  latitude: '2',
  longitude: '2',
  contactNumber: '3',
  password: '123',
  picture: 'a',
  businessPicture: 'a',
  contactAddress: 'a',
};

export const completeBusinessCreationDTO = {
  businessPicture: 'a',
  password: 'a',
};

export const BusinessClassificationStub = {
  businessClassificationId: 'g',
  name: 'p',
  description: 'd',
};

export const businessesStub = [businessStub];

export const paginatedBusinessessData = {
  data: businessesStub,
  page: 1,
  totalResults: businessesStub.length,
  totalPages: Math.ceil(businessesStub.length / 10),
};

export const classificationStub = {
  BusinessClassificationId: '9',
  name: 'food',
  description: 'tasty',
};

export const classificationsStub = [classificationStub];

export const classificationDtoStub = {
  name: 'food',
  description: 'tasty',
};

export const paginatedClassificationData = {
  data: classificationsStub,
  page: 1,
  totalResults: classificationsStub.length,
  totalPages: Math.ceil(classificationsStub.length / 10),
};

export const modifyClassificationDtoStub = {
  name: 'pizza',
  description: 'spicy',
};

export const modifiedClassificationStub = {
  ...classificationDtoStub,
  ...modifyClassificationDtoStub,
};
