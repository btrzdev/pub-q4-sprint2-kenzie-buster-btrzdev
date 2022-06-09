import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Stock {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: false, type: "integer" })
  quantity: number;

  @Column({ nullable: false, type: "float" })
  price: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
