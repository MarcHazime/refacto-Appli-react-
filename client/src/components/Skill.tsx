import { Iskills } from '../types/Iskills';
import styles from './Skill.module.css';

const Skill = ({ title, votes }: Iskills) => {
  return (
    <li className={styles.skill}>
      {title}
      {<span className={styles.votes}>{votes}</span>}
    </li>
  );
};

export default Skill;
