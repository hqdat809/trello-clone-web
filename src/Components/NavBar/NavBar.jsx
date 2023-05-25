import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "@mui/material/Avatar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import AppsIcon from "@mui/icons-material/Apps";
import { deepOrange } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { createAxios } from "createInstance";
import { logoutUser } from "redux/apiRequest";
import { logoutSuccess } from "redux/authSlice";
import "./navbar.scss";
import { getFirstChart } from "ultils";

const workSpaces = [
  { _id: 1, name: "Work Space 1" },
  { _id: 2, name: "Work Space 2" },
  { _id: 3, name: "Work Space 3" },
  { _id: 4, name: "Work Space 4" },
];
const boards = [
  { _id: 1, name: "Board 1" },
  { _id: 2, name: "Board 2" },
  { _id: 3, name: "Board 3" },
  { _id: 4, name: "Board 4" },
];

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const [workSpace, setWorkSpace] = useState(0);
  const [boardId, setBoardId] = useState(0);

  const handleLogout = () => {
    logoutUser(dispatch, navigate, user?.accessToken, axiosJWT);
  };

  const handleSelectWorkSpace = (e) => {
    // setWorkSpace(e.target.value);
  };

  const handleSelectBoard = (e) => {
    // setBoardId(e.target.value);
  };

  return (
    <nav className="navbar-container">
      <div className="left">
        <div className="menu-icon">
          <span>
            <AppsIcon className="app-icon" fontSize="small" />
          </span>
        </div>
        <div className="logo">
          <div className="logo-img"></div>
        </div>
        <div className="select-workSpace">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="select"
            value={workSpace}
            onChange={handleSelectWorkSpace}
            IconComponent={(props) => (
              <ExpandMoreIcon className={`select-icon ${props.className}`} />
            )}
          >
            <MenuItem className="select-label" value={0}>
              Các không gian làm việc
            </MenuItem>
            {workSpaces.map((workSpace) => (
              <MenuItem value={workSpace._id}>
                <div className="menuItem_wrapper">
                  <div className="menuItem_icon">
                    {getFirstChart(workSpace.name)}
                  </div>
                  {workSpace.name}
                </div>
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="select-boards">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="select"
            value={boardId}
            onChange={handleSelectBoard}
            IconComponent={(props) => (
              <ExpandMoreIcon className={`select-icon ${props.className}`} />
            )}
          >
            <MenuItem className="select-label" value={0}>
              Các bảng của bạn
            </MenuItem>
            {boards.map((workSpace) => (
              <MenuItem value={workSpace._id}>{workSpace.name}</MenuItem>
            ))}
          </Select>
        </div>
        <div className="create-board"></div>
      </div>
      <div className="right">
        <div className="search">
          <span>
            <SearchIcon className="search-icon" />
          </span>
          <input type="text" className="search-input" placeholder="Tìm kiếm" />
        </div>
        <div className="icons">
          <span>
            <NotificationsNoneOutlinedIcon fontSize="small" />
          </span>
          <span>
            <HelpOutlineIcon fontSize="small" />
          </span>{" "}
          <span>
            <DarkModeIcon fontSize="small" />
          </span>
        </div>
        <div className="avt">
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: "22px",
              height: "22px",
              fontSize: "12px",
              display: "flex",
            }}
          >
            N
          </Avatar>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
