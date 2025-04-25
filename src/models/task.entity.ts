// import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { IsNotEmpty, Length, IsString, Matches } from "class-validator";

import { User } from "./user.entity";
import { Project } from "./project.entity";

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: "Title is required" })
  @IsString({ message: "Title must be a string" })
  @Length(3, 100, { message: "Title must be between 3 and 100 characters" })
  title: string;

  @Column()
  @IsNotEmpty({ message: "Description is required" })
  @IsString({ message: "Description must be a string" })
  @Length(10, 500, { message: "Description must be between 10 and 500 characters" })
  description: string;

  @Column({ type: "timestamp" })
  startDate!: Date;

  @Column({ type: "timestamp" })
  endDate!: Date;

  @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks, { eager: true })
  @JoinColumn({ name: "assigned_to" })
  assignedTo: User;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}
