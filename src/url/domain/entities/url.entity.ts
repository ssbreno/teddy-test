import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../../user/domain/entities/user.entity";

@Entity()
export class Url {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  originalUrl?: string;

  @Column()
  shortUrl?: string;

  @Column({ default: 0 })
  clickCount?: number;

  @ManyToOne(() => User, (user) => user.urls)
  user?: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
