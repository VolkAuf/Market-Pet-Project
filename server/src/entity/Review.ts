import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  text!: string;
}
