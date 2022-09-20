import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

// module.exports = new EntitySchema({
//   name: 'Skill',
//   columns: {
//     id: {
//       primary: true,
//       type: 'int',
//       generated: true,
//     },
//     name: {
//       type: 'text',
//       unique: true,
//     },
//   },
// });

@Entity()
class Skill {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  votes: number

  
}


export default Skill