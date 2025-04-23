import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./task.entity";

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

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
