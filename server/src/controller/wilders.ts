import DataSource from "../db";
import { Grade } from "./../entity/Grade";
import { IController } from "../entity/IController";
import { Skill } from "../entity/Skill";
import { Wilder } from "../entity/Wilder";

const wilderController: IController = {
  create: async (req, res) => {
    const { name, bio, city} = req.body;
    if (name?.length > 100 || name?.length === 0) {
      return res
        .status(422)
        .send("the name should have a length between 1 and 100 characters");
    }

    try {
      const created = await DataSource.getRepository(Wilder).save({ name, bio, city });
      res.status(201).send(created);
    } catch (err) {
      console.error(err);
      res.send("error while creating wilder");
    }
  },
  read: async (req, res) => {
    try {
      const wilders = await DataSource.getRepository(Wilder).find({relations: {grades: {skill: true}}});
      res.send(wilders.map(w => ({...w, skills: w.grades.map(g =>({ id: g.skill.id, name: g.skill.name, votes: g.votes}))})));
    } catch (err) {
      console.error(err);
      res.send("error while reading wilders");
    }
  },
  update: async (req, res) => {
    const { name} = req.body;
    if (name?.length > 100 || name?.length === 0) {
      return res
        .status(422)
        .send("the name should have a length between 1 and 100 characters");
    }

    try {
      const { affected } = await DataSource.getRepository(Wilder).update(
        req.params.id,
        req.body
      );
      if (affected !== 0) return res.send("wilder updated");
      res.sendStatus(404);
    } catch (err) {
      console.error(err);
      res.send("error while updating wilder");
    }
  },
  delete: async (req, res) => {
    try {
      const { affected } = await DataSource.getRepository(Wilder).delete(
        req.params.id
      );
      if (affected !== 0) return res.send("wilder deleted");
      res.sendStatus(404);
    } catch (err) {
      console.error(err);
    }
  },
  addSkill: async (req, res) => {
    const wilderToUpdate = await DataSource.getRepository(Wilder).findOneBy({
      id: parseInt(req.params.wilderId),
    });

    if (!wilderToUpdate) return res.status(404).send("wilder not found");

    const skillToAdd = await DataSource.getRepository(Skill).findOneBy({
      id: req.body.skillId,
    });

    if (!skillToAdd) return res.status(404).send("skill not found");

    await DataSource.getRepository(Grade).insert({
      wilder: wilderToUpdate,
      skill: skillToAdd,
    });

    res.send("skill added to wilder");
  },
  removeSkill: async (req, res) => {
    const wilderToUpdate = await DataSource.getRepository(Wilder).findOneBy({
      id: parseInt(req.params.wilderId),
    });

    if (!wilderToUpdate) return res.status(404).send("wilder not found");

    const skillToRemove = await DataSource.getRepository(Skill).findOneBy({
      id: parseInt(req.params.skillId),
    });

    if (!skillToRemove) return res.status(404).send("skill not found");

    await DataSource.getRepository(Grade).delete({
      wilderId: wilderToUpdate.id,
      skillId: skillToRemove.id,
    });
    res.send("skill deleted from wilder");
  },
};

export default wilderController;
