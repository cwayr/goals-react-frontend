import { useContext, useEffect, useState } from "react";
import UserContext from "./context/userContext";
import { Grid } from "@mui/material";
import GoalsAPI from "./api/api";
import Goal from "./Goal";
import { v4 as uuidv4 } from "uuid";

function GoalList() {
  const { currentUser } = useContext(UserContext);
  const [goals, setGoals] = useState(currentUser.goals);

  useEffect(() => {
    async function fetchGoals() {
      let user = await GoalsAPI.getCurrentUser(currentUser.username);
      setGoals(user.goals);
    }
    fetchGoals();
  }, [currentUser.username]);

  function goalsList() {
    return goals.map(function (goal) {
      const newId = uuidv4();
      return (
        <Grid item xs={4}>
          <Goal key={newId} data={goal} />
        </Grid>
      );
    });
  }

  return (
    <Grid container spacing={3} mt={2}>
      {goalsList()}
    </Grid>
  );
}

export default GoalList;
