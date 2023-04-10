import { Test } from '@nestjs/testing';
import { UsersDirectoryService } from '../services/users-directory.service';
import { createCredentialsDtoStub, credentialsStub } from './users.stubs';
import { UserCredentials } from '../entities/user-credentials.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

describe('UsersDirectoryService', () => {
  let directoryService: UsersDirectoryService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersDirectoryService,
        {
          provide: getRepositoryToken(UserCredentials),
          useValue: {
            findOne: jest.fn().mockResolvedValue(credentialsStub),
            create: jest.fn().mockReturnValue(credentialsStub),
            persistAndFlush: jest.fn().mockReturnValue(true),
            flush: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    directoryService = moduleRef.get<UsersDirectoryService>(
      UsersDirectoryService
    );
  });

  describe('Create users credentials', () => {
    it('should save users credentials', async () => {
      expect(
        await directoryService.createUserCredentials(createCredentialsDtoStub)
      ).toEqual(credentialsStub);
    });
  });

  describe('Find User', () => {
    it('should find user', async () => {
      const userId = '1';

      expect(await directoryService.findUser(userId)).toEqual(credentialsStub);
    });
  });

  describe('Change user log state', () => {
    it('should log in user', async () => {
      const userId = '1';

      const { isLoggedIn } = await directoryService.changeUserLogState(
        userId,
        true
      );

      expect(isLoggedIn).toEqual(true);
    });
  });

  it('should be defined', () => {
    expect(directoryService).toBeDefined();
  });
});