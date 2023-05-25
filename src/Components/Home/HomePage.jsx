import { useEffect, useState } from "react";
import "./home.scss";
import { deleteUser, getAllUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../createInstance";
import Sidebar from "Components/Sidebar/Sidebar";
import NavBar from "Components/NavBar/NavBar";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ExpandItem from "Components/ExpandItem/ExpandItem";
import Column from "Components/Column/Column";
import { initStateBoard } from "exaple-data/exampleData";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const HomePage = () => {
  const [initState, setInitState] = useState(initStateBoard);
  const [selectedColumn, setSelectedColumn] = useState(null);
  //DUMMY DATA
  const user = useSelector((state) => state.auth?.login?.currentUser);
  const userData = useSelector((state) => state.users.users.allUsers);
  const msg = useSelector((state) => state.users.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const onDragEnd = (result) => {
    // TODO: reorder our column
    const { destination, source, draggableId, type } = result;
    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === "task") {
      const startColumn = initState.columns[source.droppableId];
      const finishColumn = initState.columns[destination.droppableId];

      if (source.droppableId === destination.droppableId) {
        const column = initState.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...column,
          taskIds: newTaskIds,
        };

        const newState = {
          ...initState,
          columns: {
            ...initState.columns,
            [newColumn.id]: newColumn,
          },
        };
        setInitState(newState);
      } else {
        const newTaskIdsStartColumn = startColumn.taskIds;
        newTaskIdsStartColumn.splice(source.index, 1);
        const newTaskIdsFinishColumn = finishColumn.taskIds;
        newTaskIdsFinishColumn.splice(destination.index, 0, draggableId);
        const newStartColumn = {
          ...startColumn,
          taskIds: newTaskIdsStartColumn,
        };
        const newFinishColumn = {
          ...finishColumn,
          taskIds: newTaskIdsFinishColumn,
        };

        const newState = {
          ...initState,
          columns: {
            ...initState.columns,
            [newStartColumn.id]: newStartColumn,
            [newFinishColumn.id]: newFinishColumn,
          },
        };

        setInitState(newState);
      }
    }
    if (type === "column") {
      const newColumnOrder = initState.columnOrder;
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = { ...initState, columnOrder: newColumnOrder };

      setInitState(newState);
    }
  };

  const onDragStart = () => {};

  const onDragUpdate = (update) => {
    const { destination } = update;
  };

  const onAddColumn = (data) => {
    console.log("column data: ", data);
    const newColumn = {
      id: `column-${initState.columnOrder.length + 1}`,
      columnName: data.title,
      taskIds: [],
    };

    const newState = {
      ...initState,
      columns: {
        ...initState.columns,
      },
      columnOrder: [...initState.columnOrder, newColumn.id],
    };

    newState.columns[`${newColumn.id}`] = newColumn;
    setInitState(newState);
  };

  const onAddTask = (data) => {
    console.log("data card: ", data);
    const tasks = initState.tasks;
    const columns = initState.columns;
    const column = columns[selectedColumn];
    const newTasks = {
      taskId: `task-${Object.keys(tasks).length + 1}`,
      taskName: data.taskName,
    };
    const newColumn = {
      ...column,
      taskIds: [...column.taskIds, newTasks.taskId],
    };

    tasks[newTasks.taskId] = newTasks;

    const newState = {
      ...initState,
      tasks: tasks,
      columns: { ...initState.columns, [column.id]: newColumn },
    };

    console.log(newState);
    setInitState(newState);
  };

  const handleDelete = (id) => {
    console.log(id);
    deleteUser(user?.accessToken, dispatch, id, axiosJWT);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getAllUser(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  return (
    <main className="home-container">
      <NavBar />
      <div className="home-content">
        <Sidebar />
        <div className="content">
          <div className="content__header">
            <div className="left">
              <h1 className="board__name item-header">Web_dev</h1>
              <div className="favorite item-header">
                <StarOutlineRoundedIcon
                  sx={{ width: "20px", height: "20px" }}
                />
              </div>
            </div>
            <div className="right">
              <div className="actions">
                <div className="utilities item-header">
                  <RocketLaunchOutlinedIcon
                    sx={{ width: "16px", height: "16px" }}
                  />
                  Tiện ích bổ sung
                </div>
                <div className="item-header">
                  <FlashOnRoundedIcon sx={{ width: "16px", height: "16px" }} />
                  Tự động hóa
                </div>{" "}
                <div className="item-header">
                  <FilterListRoundedIcon
                    sx={{ width: "16px", height: "16px" }}
                  />
                  Lọc
                </div>
              </div>
              <div className="project__setting">
                <div className="avatar">
                  <Avatar
                    sx={{
                      bgcolor: deepOrange[500],
                      width: "24px",
                      height: "24px",
                      fontSize: "13px",
                      display: "flex",
                    }}
                  >
                    N
                  </Avatar>
                </div>
                <div className="share">
                  <PersonAddAltOutlinedIcon
                    sx={{ width: "16px", height: "16px" }}
                  />
                  Chia sẻ
                </div>
                <div className="item-header more">
                  <MoreHorizOutlinedIcon
                    sx={{ width: "16px", height: "16px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="content__body">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                droppableId="all-columns"
                direction="horizontal"
                type="column"
              >
                {(provided) => (
                  <div
                    className="listColumn"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {initState.columnOrder.map((col, index) => (
                      <div key={col}>
                        <Column
                          key={col}
                          index={index}
                          tasks={initState.tasks}
                          columnInfo={initState.columns[col]}
                          setSelectedColumn={setSelectedColumn}
                          selectedColumn={selectedColumn}
                          handleAddTask={onAddTask}
                        />
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <ExpandItem
              title="Thêm danh sách khác"
              handleAddColumn={onAddColumn}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
