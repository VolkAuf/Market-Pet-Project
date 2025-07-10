import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  article!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column("int", { default: 0 })
  quantity!: number;

  @Column({ nullable: true })
  imageUrl!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
