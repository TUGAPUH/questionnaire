import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "../../Components/Button/Button";

export const QuestionForm = ({
  val,
  ind,
  setValue,
  value,
  btnValue,
  handleClick,
  isDisabled
}) => {

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <FormControl disabled={isDisabled} key={ind}>
        <FormLabel
          style={{ textAlign: "center", marginBottom: "30px" }}
          className="radio__label"
          id="demo-radio-buttons-group-label"
        >
          {val.question}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {val.answers.map((answer, ind) => {
            return (
              <FormControlLabel
                key={ind}
                value={answer.answer}
                control={<Radio />}
                label={answer.answer}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <Button style={{ marginTop: "20%" }} onClick={handleClick}>
        {btnValue}
      </Button>
    </div>
  );
};
