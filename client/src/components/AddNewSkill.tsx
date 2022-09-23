import { SubmitHandler, useForm } from "react-hook-form";
import { useState, Dispatch, SetStateAction, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { createSkill, getAllSkills } from "../services/skills";
import { Iskills } from "../types/Iskills";

type FormData = {
  name: string;
};

interface SkillsProps {
  skills: Iskills;
  name: string;
  setSkills: Dispatch<SetStateAction<Iskills[]>>;
}

function AddNewSkill() {
  const [skills, setSkills] = useState<SkillsProps[]>([]);
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await createSkill(data);
      setSkills(await getAllSkills());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      setSkills(await getAllSkills());
    })();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          Skill :{" "}
          <input
            {...register("name", { required: true })}
            placeholder="new skill"
          />
        </label>
        <button type="submit">Ajouter</button>
        <br />
        <br />
      </form>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Skill</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill) => (
              <TableRow
                key={skill.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{skill.name}</TableCell>
                <TableCell align="left">
                  <IconButton aria-label="delete" size="large">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AddNewSkill;
