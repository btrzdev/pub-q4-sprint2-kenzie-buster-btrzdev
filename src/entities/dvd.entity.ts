import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
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
  name: string;

  @Column({ nullable: false })
  duration: string;

  @ManyToOne(() => Cart, (cart) => cart)
  cart: Cart;

  @OneToOne(() => Stock, {
    eager: true,
  })
  @JoinColumn()
  stock: Stock;
}
