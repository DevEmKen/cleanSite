import React, { useEffect, useState } from "react";

import { UserType, FullUserType, TableStateType } from "./Types/TableTypes";

import { useSelector, useDispatch } from "react-redux";
import { sortByProperty, setTableData } from "./Redux/TableSlice";

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

  const users = useSelector((state: any) => state.TableSlice);
  const dispatch = useDispatch();

  return (
    <>
      {users.tableArr.map((user: UserType) => {
        return <div>{user.firstName}</div>;
      })}
    </>
  );
};

export default UserTable;
