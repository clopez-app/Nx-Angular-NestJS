import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class AccountType {
  @PrimaryKey()
  idAccount: string = v4();

  @Property({ type: 'string', length: 50 })
  name: string;
}
