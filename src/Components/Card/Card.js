import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import "./Card.scss";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ cardInfo, index }) => {
  return (
    <Draggable draggableId={cardInfo.taskId} index={index}>
      {(provided, snapshot) => (
        <div
          className="Card"
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div className="Card__title" {...provided.dragHandleProps}>
            {cardInfo.taskName}
          </div>
          <div className="Card__edit">
            <EditIcon sx={{ width: "14px", height: "14px" }} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
