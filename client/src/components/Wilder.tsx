import { Dispatch, SetStateAction } from 'react';

import { Iwilder } from '../types/Iwilders';
import Skill from './Skill';
import blank_profile from '../assets/avatar.png';
import {
  deleteWilder,
} from '../services/wilders';
import styles from './Wilder.module.css';

interface WilderProps {
  wilder: Iwilder
  setWilders: Dispatch<SetStateAction<Iwilder[]>>
}
const Wilder = ({
  wilder: {id, name, skills = []},
  setWilders
}: WilderProps) => {
  const handleDelete = async () => {
    try {
      setWilders((oldList) => oldList.filter((wilder) => wilder.id !== id));
      await deleteWilder(id);
    } catch (err) {
      console.error(err);
    }
  };

  

  return (
    <article className={styles.card}>
      <img src={blank_profile} alt={name} />
      <h3>{name[0].toUpperCase() + name.split('').splice(1).join('')}</h3>
      <h4>Wild Skills</h4>

      {
      <ul className={styles.skills}>
        {skills.map((skill, index) => (
          <Skill key={index} title={skill.name} votes={skill.votes}/>
        ))}
      </ul>   
      }
      <br />
      <button onClick={handleDelete}>Delete</button>
    </article>
  );
};

export default Wilder;
