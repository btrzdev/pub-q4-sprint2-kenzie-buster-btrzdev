import { compare } from "bcrypt";
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Cart } from "./cart.entity"
@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 30 })
  name: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdm: boolean;

  @OneToOne((type) => Cart, {
      eager: true
  })@JoinColumn()
  cart: Cart;


  comparePwd = async (receivedPwd: string): Promise<boolean> => {
    return await compare(receivedPwd, this.password);
  };

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
