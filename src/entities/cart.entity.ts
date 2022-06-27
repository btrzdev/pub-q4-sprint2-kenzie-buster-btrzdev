import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Dvd } from "./dvd.entity";
import { User } from "./user.entity";

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  paid: boolean;

  @Column({ nullable: false, type: "float" })
  total: number;

  @ManyToOne(() => Dvd, (dvd) => dvd.carts, { eager: true })
  dvd: Dvd;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;
}
