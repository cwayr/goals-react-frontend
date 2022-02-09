import { useState, useContext } from "react";
import UserContext from "../context/userContext";
import getMonthsFromNow from "../helpers/getMonthsFromNow";

function NewGoalForm({ createGoal }) {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  const initialState = {
    name: "",
    target_weight: "",
    timeline: 0,
  };

  const [formData, setFormData] = useState(initialState);

  /** Generate goal data from form data
   *
   * Returns { name, username, start_weight, target_weight, timeline, start_date, end_date }
   */
  function setGoalData(data) {
    let goalData = {};

    goalData.name = data.name;
    goalData.username = currentUser.username;
    goalData.start_weight = null;
    goalData.target_weight = +data.target_weight;

    let { current_date, target_date } = getMonthsFromNow(+data.timeline);
    goalData.timeline = +data.timeline;
    goalData.start_date = current_date;
    console.log("current_date: ", current_date);
    goalData.end_date = target_date;
    console.log("target_date: ", target_date);

    return goalData;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  async function handleSubmit(e) {
    console.log(formData);
    e.preventDefault();
    let goalData = setGoalData(formData);
    console.log(goalData);
    await createGoal(goalData);
  }

  return (
    <div className="NewGoalForm">
      <h1>This is the goal form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="target_weight"
          placeholder="goal one rep max"
          value={formData.target_weight}
          onChange={handleChange}
          required
        />
        <select name="timeline" onChange={handleChange}>
          <option value="3">3 months</option>
          <option value="6">6 months</option>
          <option value="9">9 months</option>
          <option value="12">1 year</option>
        </select>
        <button type="submit" onSubmit={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}

export default NewGoalForm;
