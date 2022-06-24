import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Dvd } from "./dvd.entity";

@Entity("stock")
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: false, type: "integer" })
  quantity: number;

  @Column({ nullable: false, type: "float" })
  price: number;

  @OneToOne(() => Dvd, (dvd) => dvd.stock)
  dvd?: Dvd;
}
