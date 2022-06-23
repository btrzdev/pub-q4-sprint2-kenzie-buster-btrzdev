import { compare } from "bcrypt";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Cart } from "./cart.entity";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 30 })
  name: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdm: boolean;

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  comparePwd = async (receivedPwd: string): Promise<boolean> => {
    return await compare(receivedPwd, this.password);
  };
}
