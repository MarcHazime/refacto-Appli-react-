import Skill from './entity/Skill';
import Wilder from './entity/Wilder';
import typeorm from 'typeorm';

module.exports = new typeorm.DataSource({
  type: 'sqlite',
  database: './wildersdb.sqlite',
  synchronize: true,
  entities: [Wilder, Skill],
  logging: ['query', 'error'],
});
