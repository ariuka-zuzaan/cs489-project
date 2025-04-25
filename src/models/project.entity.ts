import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Task } from "./task.entity";
import { Role } from "./role.entity";
import { User } from "./user.entity";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ type: "timestamp" })
  startDate!: Date;

  @Column({ type: "timestamp" })
  endDate!: Date;

  @ManyToOne(() => User, (user) => user.projects, { eager: true })
  @JoinColumn({ name: "created_by" })
  createdBy: User;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
