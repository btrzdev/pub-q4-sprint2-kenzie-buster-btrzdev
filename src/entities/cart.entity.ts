import { Entity, Column, PrimaryColumn, JoinTable, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Dvd } from "./dvd.entity";
import { User } from "./user.entity";

@Entity("carts")
export class Cart {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  paid: boolean;

  @Column({ nullable: false, type: "float" })
  total: number;

  @ManyToOne(() => Dvd, (dvd) => dvd.cart)
  dvd: Dvd;
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
