import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { IsEmail, IsNotEmpty, Length, IsString } from "class-validator";

import { Task } from "./task.entity";
import { Role } from "./role.entity";
import { Project } from "./project.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: "First name is required" })
  @IsString({ message: "First name must be a string" })
  @Length(2, 50, { message: "First name must be between 2 and 50 characters" })
  firstName!: string;

  @Column()
  @IsNotEmpty({ message: "Last name is required" })
  @IsString({ message: "Last name must be a string" })
  @Length(2, 50, { message: "Last name must be between 2 and 50 characters" })
  lastName!: string;

  @Column({ unique: true })
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @Column()
  @IsNotEmpty({ message: "Password is required" })
  @Length(8, 100, { message: "Password must be between 8 and 100 characters" })
  password!: string;

  @OneToMany(() => Project, (project) => project.createdBy)
  projects: Project[];

  @OneToMany(() => Task, (task) => task.assignedTo)
  tasks: Task[];

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: "role_id" })
  role: Role;
}
