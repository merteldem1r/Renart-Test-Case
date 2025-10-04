import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Check(`"popularity_score" >= 0 AND popularity_score <= 1`)
@Entity({ name: "products" })
export class Product {
  @PrimaryColumn("uuid")
  id!: string;

  @Index({ unique: true })
  @Column({ unique: true, type: "varchar", length: 64 })
  name!: string;

  @Column({ type: "numeric", nullable: false })
  popularity_score!: number;

  @Column({ type: "numeric", nullable: false })
  weight: number;

  @Column({ type: "jsonb", nullable: true })
  images?: { yellow: string; rose: string; white: string };

  @Column({ type: "boolean", default: false })
  disabled!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;
}
