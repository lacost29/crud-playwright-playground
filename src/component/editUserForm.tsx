import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { IUser } from "./interface";

interface IProps {
  user: IUser;
  onUpdateUser: (id: number, user: IUser) => void;
  setEdit: (bool: boolean) => void;
}

export default function EditUserForm({ user, onUpdateUser, setEdit }: IProps) {
  const {
    register,
    reset,
    getValues,
    setValue,
    watch,
    formState: { isValid, errors }
  } = useForm({
    mode: "onChange", // to get errors
    defaultValues: {
      gender: user.gender,
      name: user.name,
      profession: user.profession,
      age: user.age
    }
  });

  const currentDate = watch("age")

  useEffect(() => reset({
    name: user.name,
    profession: user.profession,
    age: user.age,
    gender: user.gender
  }), [user])

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, profession, age, gender } = getValues();

    onUpdateUser(user.id, { id: user.id, name, profession, age, gender });
  };

  return (
    <div className="user-form">
      <h1>edit users</h1>
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
            {...register("name", { required: { value: true, message: "This field is required" }, minLength: { value: 4, message: "name is too short" }, maxLength: { value: 16, message: "name is too long" } })}
          />
          {errors.name && <div className="form-error">{errors.name.message}</div>}
        </div>
        <div className="form-row">
          <label>Profession</label>
          <input
            type="text"
            placeholder="please input profession"
            {...register("profession", { required: { value: true, message: "This field is required" } })}
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
          <button disabled={!isValid}>Update</button>
          <button onClick={() => setEdit(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
