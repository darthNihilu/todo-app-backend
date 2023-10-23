import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Category {
  TASK = 'task',
  VIDEO = 'video',
  SHOPPING = 'shopping',
}

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  date: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: Category.TASK })
  category: Category;
}
