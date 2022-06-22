import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Dvd } from "./dvd.entity";

@Entity("carts")
export class Cart {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  paid: boolean;

  @Column({ nullable: false, type: "float" })
  total: number;

  @ManyToMany((type) => Dvd, {eager: true,})
  @JoinTable()
  dvds: Dvd[] 

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
