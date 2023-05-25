import React, { useState } from "react";
import "./Sidebar.scss";
import { getFirstChart } from "ultils";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const workSpace = {
  _id: 1,
  name: "Học Tập",
};

const boards = [
  { _id: 1, name: "Board 1" },
  { _id: 2, name: "Board 2" },
  { _id: 3, name: "Board 3" },
  { _id: 4, name: "Board 4" },
];

function Sidebar() {
  const [isShow, setIsShow] = useState(true);
  const [hide, setHide] = useState(false);

  const handleClickHideBtn = () => {
    setIsShow(false);
    setTimeout(() => {
      setHide(true);
    }, 300);
  };

  const handleClickShowBtn = () => {
    setHide(false);
    setIsShow(true);
  };

  return !hide ? (
    <div className={`Sidebar ${isShow ? "show" : "hide"}`}>
      <div className="workSpace">
        <div className="workSpace__wrapper">
          <div className="workSpace__icon">{getFirstChart(workSpace.name)}</div>
          <div className="workSpace__info">
            <div className="workSpace__name">{workSpace.name}</div>
            <div className="workSpace__desc">Miễn phí</div>
          </div>
          <div className="close__btn" onClick={handleClickHideBtn}>
            <ArrowBackIosRoundedIcon
              sx={{ width: "14px", height: "14px", fontWeight: "900" }}
            />
          </div>
        </div>
      </div>
      <div className="others">
        <div className="board">
          <SpaceDashboardOutlinedIcon sx={{ width: "16px", height: "16px" }} />
          <div className="board__text">Bảng</div>
        </div>
        <div className="member">
          <PersonOutlineOutlinedIcon sx={{ width: "16px", height: "16px" }} />
          <div className="member__text">Thành viên</div>
          <span className="member__add">
            <AddRoundedIcon sx={{ width: "16px", height: "16px" }} />
          </span>
        </div>
        <div className="settingWorkSpace">
          <PersonOutlineOutlinedIcon sx={{ width: "16px", height: "16px" }} />
          <div className="settingWorkSpace__text">
            Các cài đặt Không gian làm việc
          </div>
          <span className="settingWorkSpace__add">
            <ExpandMoreRoundedIcon sx={{ width: "16px", height: "16px" }} />
          </span>
        </div>
        <div className="yourBoards">
          <div className="yourBoards__text">Các bảng của bạn</div>
          <span className="yourBoards__add">
            <AddRoundedIcon sx={{ width: "16px", height: "16px" }} />
          </span>
        </div>
        <div className="listBoard">
          {boards.map((boardItem) => (
            <div className="boardItem">
              <div className="boardItem__icon">
                {getFirstChart(boardItem.name)}
              </div>
              <div className="boardItem__name">{boardItem.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="Sidebar__hidden">
      <span className="Sidebar__icon-show" onClick={handleClickShowBtn}>
        <ChevronRightRoundedIcon sx={{ width: "20px", height: "20px" }} />
      </span>
    </div>
  );
}

export default Sidebar;
