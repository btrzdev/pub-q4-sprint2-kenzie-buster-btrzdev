import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Cart } from "./cart.entity";
import { Stock } from "./stock.entity";

@Entity("dvds")
export class Dvd {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  duration: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Cart, (cart) => cart)
  cart: Cart[];

  @OneToOne(() => Stock, {
    eager: true,
  })
  @JoinColumn()
  stock: Stock;
}
