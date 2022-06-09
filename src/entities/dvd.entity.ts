import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Dvd {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  duration: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}