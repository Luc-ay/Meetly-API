import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { compareValues, hashValue } from '../../utils/bcrypt'
import { Integration } from './integration.entity'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  username: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: true })
  imageurl: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Integration, (integration) => integration.user)
  integrations: Integration[]
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hashValue(this.password)
    }
  }

  async comparePassword(Candidateassword: string) {
    return compareValues(Candidateassword, this.password)
  }

  omitPassword(): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = this
    return userWithoutPassword as Omit<User, 'password'>
  }
}
