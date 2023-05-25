import React, { useEffect, useState } from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import "./Column.scss";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Card from "Components/Card/Card";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";

const Column = ({
  columnInfo,
  tasks,
  setSelectedColumn,
  selectedColumn,
  index,
  handleAddTask,
}) => {
  const { handleSubmit, register, reset, getValues } = useForm();

  const [isExpand, setIsExpand] = useState(false);
  const [cardText, setCardText] = useState("");

  const onSubmitForm = (data) => {
    handleAddTask(data);
    reset();
  };

  const handleAddCard = (e) => {
    setCardText("");
    e.stopPropagation();
    setIsExpand(true);
    setSelectedColumn(columnInfo.id);
  };

  const onCloseAddCard = (e) => {
    e.stopPropagation();
    setIsExpand(false);
    setSelectedColumn(null);
  };

  useEffect(() => {
    // handle click outside addBoard card
    document.addEventListener("click", (evt) => {
      const flyoutEl = document.getElementById(`column-${columnInfo.id}`);
      let targetEl = evt.target;
      do {
        if (targetEl == flyoutEl) {
          return;
        }
        // Go up the DOM
        targetEl = targetEl.parentNode;
      } while (targetEl);
      // This is a click outside.
      if (selectedColumn === columnInfo.id && isExpand) {
        console.log("id: ", selectedColumn);
        onCloseAddCard(evt);
      }
      // console.log("click outside");
    });
  }, [selectedColumn]);

  return (
    <Draggable draggableId={columnInfo.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          id={`column-${columnInfo.id}`}
          className={`Board ${
            isExpand && columnInfo.id === selectedColumn ? "expand" : "collapse"
          }`}
        >
          <div className="header" {...provided.dragHandleProps}>
            <h1 className="header__name">{columnInfo.columnName}</h1>
            <span className="header__more-btn">
              <MoreHorizRoundedIcon sx={{ width: "16px", height: "16px" }} />
            </span>
          </div>
          <Droppable droppableId={columnInfo.id} type="task">
            {(provided, snapshot) =>
              columnInfo.taskIds.length ? (
                <div
                  className="body"
                  ref={provided.innerRef}
                  {...provided.droppableProp}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {columnInfo.taskIds?.map((taskId, index) => (
                    <Card key={taskId} cardInfo={tasks[taskId]} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              ) : (
                <div
                  className="empty-body"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                ></div>
              )
            }
          </Droppable>

          <div className="footer">
            <div
              className={`footer__addCard ${
                isExpand && columnInfo.id === selectedColumn
                  ? "expand"
                  : "collapse"
              }`}
              onClick={(e) => handleAddCard(e)}
            >
              {isExpand && columnInfo.id === selectedColumn ? (
                <form
                  onSubmit={handleSubmit(onSubmitForm)}
                  className="addCard__field"
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      e.preventDefault();
                      onSubmitForm(getValues());
                    }
                  }}
                >
                  <textarea
                    {...register("taskName")}
                    className="addCard__input"
                    placeholder="Nhập tiêu đề cho thẻ này..."
                    // value={cardText}
                    // onChange={(e) => {
                    //   setCardText(e.target.value);
                    // }}
                  />
                  <div className="addCard__actions">
                    <div className="addClose">
                      <button type="submit" className="addCard__btn">
                        Thêm thẻ
                      </button>
                      <div
                        className="addCard__close"
                        onClick={(e) => onCloseAddCard(e)}
                      >
                        <CloseRoundedIcon />
                      </div>
                    </div>
                    <div className="addCard__more">
                      <MoreHorizRoundedIcon />
                    </div>
                  </div>
                </form>
              ) : (
                <div className="addCard">
                  <span className="addCard__icon">
                    <AddRoundedIcon sx={{ width: "16px", height: "16px" }} />
                  </span>
                  <div className="addCard__text">Thêm thẻ</div>
                </div>
              )}
            </div>
            {!isExpand && (
              <div className="createByModel">
                <DashboardCustomizeRoundedIcon
                  sx={{ width: "16px", height: "16px" }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
