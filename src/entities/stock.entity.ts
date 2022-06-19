import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Dvd } from "./dvd.entity";

@Entity("stock")
export class Stock {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: false, type: "integer" })
  quantity: number;

  @Column({ nullable: false, type: "float" })
  price: number;

  @OneToMany(() => Dvd, (dvd) => dvd)
  dvds: Dvd[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
