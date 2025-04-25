import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Task } from "./task.entity";
import { User } from "./user.entity";
import { IsNotEmpty, IsString, Length } from "class-validator";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  @Length(3, 100, { message: "Name must be between 3 and 100 characters" })
  name!: string;

  @Column()
  @IsNotEmpty({ message: "Description is required" })
  @IsString({ message: "Description must be a string" })
  @Length(10, 500, { message: "Description must be between 10 and 500 characters" })
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
