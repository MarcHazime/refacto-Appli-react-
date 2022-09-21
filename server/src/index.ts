import DataSource from'./db';
import cors from 'cors';
import express from 'express';
import skillsController from './controller/skills';
import wildersController from './controller/wilders';

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/wilders', wildersController.create);
app.get('/wilders', wildersController.read);
app.patch('/wilders/:id', wildersController.update);
app.delete('/wilders/:id', wildersController.delete);
app.post('/wilders/:wilderId/skills', wildersController.addSkill);
app.delete('/wilders/:wilderId/skills/:skillId', wildersController.removeSkill);

app.post('/skills', skillsController.create);
app.get('/skills', skillsController.read);
app.patch('/skills/:id', skillsController.update);
app.delete('/skills/:id', skillsController.delete);

const start = async (): Promise<void> => {
  await DataSource.initialize();

  app.listen(5000, () => {
    console.log('listening on port 5000');
  });
};

void start();
