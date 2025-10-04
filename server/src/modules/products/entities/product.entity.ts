import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Check(`"popularityScore" >= 0 AND popularityScore <= 1`)
@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, type: "varchar", length: 12 })
  @Index({ unique: true })
  name!: string;

  @Column({ type: "double precision", nullable: false })
  popularityScore!: number;

  @Column({ type: "double precision", nullable: false })
  weight: number;

  @Column({ type: "boolean", default: false })
  disabled!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;
}
