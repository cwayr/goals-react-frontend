import { useContext, useEffect, useState } from "react";
import UserContext from "./context/userContext";
import { Grid } from "@mui/material";
import GoalsAPI from "./api/api";
import Goal from "./Goal";

function GoalList() {
  const { currentUser } = useContext(UserContext);
  const [goals, setGoals] = useState(currentUser.goals);

  useEffect(() => {
    async function fetchGoals() {
      let user = await GoalsAPI.getCurrentUser(currentUser.username);
      setGoals(user.goals);
    }
    fetchGoals();
  }, []);

  function goalsList() {
    return goals.map((goal) => (
      <Grid item xs={4}>
        <Goal key={goal.id} data={goal} />
      </Grid>
    ));
  }

  return (
    <Grid container spacing={3} mt={2}>
      {goalsList()}
    </Grid>
  );
}

export default GoalList;
