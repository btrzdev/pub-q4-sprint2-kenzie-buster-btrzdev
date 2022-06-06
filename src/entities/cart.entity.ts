import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Cart {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  paid: boolean;

  @Column({ nullable: false })
  total: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
