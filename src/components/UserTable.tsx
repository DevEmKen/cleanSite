import React, { useEffect, useState } from "react";

import { UserType, FullUserType, TableStateType } from "./Types/TableTypes";

import { useSelector, useDispatch } from "react-redux";
import { sortByProperty, setTableData } from "./Redux/TableSlice";

const tableTitles = [
  { name: "First Name", sortId: "firstName", styling: { width: "150px" } },
  { name: "Last Name", sortId: "lastName", styling: { width: "150px" } },
  { name: "City", sortId: "city", styling: { width: "150px" } },
  { name: "State", sortId: "state", styling: { width: "150px" } },
  { name: "Country", sortId: "country", styling: { width: "150px" } },
  { name: "Age", sortId: "age", styling: { width: "150px" } },
];

const UserTable = () => {
  const fetchUsers = async (fetchAmount: number): Promise<FullUserType> => {
    const numberedURL = "https://randomuser.me/api/?results=" + fetchAmount;
    try {
      const response = await fetch(numberedURL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error with API:: " + error);
      throw error;
    }
  };

  const cleanUsers = (userArr: FullUserType): UserType[] => {
    return userArr.results.map((user) => ({
      firstName: user.name.first,
      lastName: user.name.last,
      city: user.location.city,
      state: user.location.state,
      country: user.location.country,
      age: user.dob.age,
    }));
  };

  const initializeTable = async () => {
    const users = await fetchUsers(10);
    const minUsers = cleanUsers(users);
    dispatch(setTableData(minUsers));
  };

  useEffect(() => {
    initializeTable();
  }, []);

  const handleSort = (sortBy: string) => {
    dispatch(sortByProperty(sortBy));
  };

  const users = useSelector((state: any) => state.TableSlice);
  const dispatch = useDispatch();

  return (
    <>
      <div className="table-properties">
        {tableTitles.map((title) => (
          <div
            className="table-title"
            style={title.styling}
            onClick={() => handleSort(title.sortId)}
          >
            {title.name}
          </div>
        ))}
      </div>
      {users.tableArr.map((user: UserType) => (
        <div className="table-row">
          <div className="table-entry" style={{ width: "150px" }}>
            {user.firstName}
          </div>
          <div className="table-entry" style={{ width: "150px" }}>
            {user.lastName}
          </div>
          <div className="table-entry" style={{ width: "150px" }}>
            {user.city}
          </div>
          <div className="table-entry" style={{ width: "150px" }}>
            {user.state}
          </div>
          <div className="table-entry" style={{ width: "150px" }}>
            {user.country}
          </div>
          <div className="table-entry" style={{ width: "150px" }}>
            {user.age}
          </div>
        </div>
      ))}
    </>
  );
};

export default UserTable;
