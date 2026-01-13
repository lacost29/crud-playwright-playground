import React from "react";
import { IUser } from "./interface";

interface IProps {
  users: Array<IUser>;
  onEdit: (user: IUser) => void;
  onDelete: (user: IUser) => void;
}

const UserTable: React.FunctionComponent<IProps> = props => {
  return (
    <div className="user-table">
      <h1>View users</h1>
      <table>
        <thead>
          <tr>
            <th>Gender</th>
            <th>Name</th>
            <th>Date of birth</th>
            <th>Profession</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length > 0 ? (
            props.users.map(i => (
              <tr key={i.id}>
                <td style={{padding: "3px"}}>{i["gender"]}</td>
                <td style={{padding: "3px"}}>{i["name"]}</td>
                <td style={{padding: "3px"}}>{i["age"].toISOString().substring(0, 10)}</td>
                <td style={{padding: "3px"}}>{i["profession"]}</td>
                <td style={{padding: "3px"}}>
                  <button onClick={() => props.onEdit(i)}>edit</button>
                  <button onClick={() => props.onDelete(i)}>delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>no users</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;
