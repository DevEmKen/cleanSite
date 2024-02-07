import React, { useEffect, useState } from "react";

import { UserType, FullUserType, TableStateType } from "./Types/TableTypes";

import { useSelector, useDispatch } from "react-redux";
import { sortByProperty, setTableData } from "./Redux/TableSlice";

type titleType = {
  name: string;
  sortId: string;
  active: string | null;
  styling: any;
};

const tableTitlesInit: titleType[] = [
  {
    name: "First Name",
    sortId: "firstName",
    active: null,
    styling: { width: "150px" },
  },
  {
    name: "Last Name",
    sortId: "lastName",
    active: null,
    styling: { width: "150px" },
  },
  { name: "City", sortId: "city", active: null, styling: { width: "150px" } },
  { name: "State", sortId: "state", active: null, styling: { width: "150px" } },
  {
    name: "Country",
    sortId: "country",
    active: null,
    styling: { width: "150px" },
  },
  { name: "Age", sortId: "age", active: null, styling: { width: "150px" } },
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
    setTableTitles(
      tableTitles.map((title) => {
        if (title.sortId === sortBy) {
          if (title.active === null) return { ...title, active: "up" };
          if (title.active === "up") return { ...title, active: "down" };
          if (title.active === "down") return { ...title, active: "up" };
        }
        return { ...title, active: null };
      })
    );
  };

  const [tableTitles, setTableTitles] = useState(tableTitlesInit);
  const [numUsersToDownload, setNumUsersToDownload] = useState(10);

  const users = useSelector(
    (state: { TableSlice: TableStateType }) => state.TableSlice
  );
  const dispatch = useDispatch();

  return (
    <>
      <TableControls
        numUsersToDownload={numUsersToDownload}
        setNumUsersToDownload={setNumUsersToDownload}
      />
      <div className="table-frame">
        <div className="table-properties">
          {tableTitles.map((title) => (
            <div
              className="table-title"
              style={title.styling}
              onClick={() => handleSort(title.sortId)}
            >
              {title.name}
              <div className="sort-indicator">
                {!title.active ? null : title.active === "up" ? "^" : "v"}
              </div>
            </div>
          ))}
        </div>
      </div>
      {users.tableArr?.map((user: UserType) => (
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

type tableControlsPropsType = {
  numUsersToDownload: number;
  setNumUsersToDownload: React.Dispatch<React.SetStateAction<number>>;
};

const TableControls: React.FC<tableControlsPropsType> = ({
  numUsersToDownload,
  setNumUsersToDownload,
}) => {
  return (
    <>
      <form>
        <input type="text" value="10"></input>
      </form>
    </>
  );
};

export default UserTable;
