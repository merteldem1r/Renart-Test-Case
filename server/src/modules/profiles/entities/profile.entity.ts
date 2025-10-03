import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export enum ProfileRole {
  OWNER = "owner",
  MODERATOR = "moderator",
  END_USER = "end-user",
}

@Entity({ name: "profiles" })
export class Profile {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ unique: true, type: "varchar", length: 12 })
  @Index({ unique: true })
  username!: string;

  @Column({
    type: "enum",
    enum: ProfileRole,
    default: ProfileRole.END_USER,
  })
  role!: ProfileRole;

  @Column({ nullable: true })
  display_name?: string;

  @Column({ type: "text", nullable: true, unique: true })
  phone?: string | null;

  @Column({ type: "boolean", default: false })
  phone_verified!: boolean;

  @Column({ type: "timestamptz", nullable: true, default: null })
  free_credits_granted_at?: Date | null;

  @Column({ type: "boolean", default: false })
  disabled!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updated_at!: Date;
}
