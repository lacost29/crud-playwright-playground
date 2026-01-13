import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { IBaseUser } from "./interface";

interface IProps {
  onAddUser: (user: IBaseUser) => void;
}

const AddUserForm: React.FunctionComponent<IProps> = ({ onAddUser }) => {
  const {
    register,
    reset,
    getValues,
    watch,
    formState: { isValid, errors },
    setValue
  } = useForm<{
    gender: "female" | "male" | "other";
    name: string;
    profession: string;
    age: Date;
  }>({
    mode: "onChange", // to get errors
    defaultValues: {
      gender: "female",
      name: "",
      profession: "",
      age: new Date()
    }
  });

  const currentDate = watch("age")

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, profession, age, gender } = getValues();

    onAddUser({ name, profession, age, gender })
    reset({
      gender: "female",
      name: "",
      profession: "",
      age: new Date()
    });
  };

  return (
    <div className="user-form">
      <h1>Add users</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>
            Select gender
          </label>
          <select {...register("gender", { required: true })} style={{ minWidth: "150px", minHeight: "28px" }}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
          {errors.gender && <p style={{color:'red'}}> {errors.gender.message}</p> }
        </div>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            placeholder="please input name"
            {...register("name", { required: true, minLength: { value: 4, message: "name is too short" }, maxLength: { value: 16, message: "name is too long" } })}
          />
          {errors.name && <div className="form-error">{errors.name.message}</div>}
        </div>
        <div className="form-row">
          <label>Profession</label>
          <input
            type="text"
            placeholder="please input profession"
            {...register("profession", { required: true })}
          />
          {errors.profession && <div className="form-error">{errors.profession.message}</div>}
        </div>
        <div className="form-row">
          <label>Date of birth</label>
          {errors.age && <div className="form-error">{errors.age.message}</div>}
          <DatePicker
            showPopperArrow={false}
            peekNextMonth={true}
            dateFormat={["yyyy-MM-dd", "yyyy-MMM-dd"]}
            customInput={
              <input
                placeholder="please input age"
                {...register("age", { required: { value: true, message: "This field is required" }})}
              />
            }
            excludeDateIntervals={ [
              {
                start: new Date(),
                end: new Date(8640000000000000)
              }
            ]}
            selected={currentDate}
            onChange={(date) => {
              if(date){
                setValue("age", date);
              }
            }}
            todayButton="Today"
          />
        </div>
        <div className="form-row">
          <button disabled={!isValid}>Add new user</button>
        </div>
      </form>
    </div>
  );
};
export default AddUserForm;
