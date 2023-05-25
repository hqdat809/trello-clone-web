import React, { useEffect, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import "./ExpandItem.scss";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useForm } from "react-hook-form";

const ExpandItem = ({ title, handleAddColumn }) => {
  const { handleSubmit, register, reset } = useForm();
  const [isExpand, setIsExpand] = useState(false);

  const handleClickExpanse = (e) => {
    e.stopPropagation();
    setIsExpand(true);
  };

  const onSubmit = (data) => {
    reset();
    handleAddColumn(data);
  };

  const handleClickClose = (e) => {
    e.stopPropagation();
    setIsExpand(false);
  };

  useEffect(() => {
    // handle click outside addBoard card
    document.addEventListener("click", (evt) => {
      const flyoutEl = document.getElementById("ExpandItem");
      let targetEl = evt.target;
      do {
        if (targetEl == flyoutEl) {
          return;
        }
        // Go up the DOM
        targetEl = targetEl.parentNode;
      } while (targetEl);
      // This is a click outside.
      handleClickClose(evt);
    });
  }, []);

  return (
    <div
      id="ExpandItem"
      className="ExpandItem"
      onClick={(e) => handleClickExpanse(e)}
      //   onBlur={(e) => handleClickClose(e)}
    >
      <div className={`add ${isExpand ? "expand" : "collapse"}`}>
        {isExpand ? (
          <form onSubmit={handleSubmit(onSubmit)} className="expand__content">
            <input
              {...register("title")}
              autoFocus
              placeholder="Nhập tiêu đề danh sách..."
            />
            <div className="actions">
              <button
                className="add-btn"
                type="submit"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Thêm danh sách
              </button>
              <div className="close" onClick={(e) => handleClickClose(e)}>
                <CloseRoundedIcon />
              </div>
            </div>
          </form>
        ) : (
          <div className="content">
            <AddRoundedIcon sx={{ width: "16px", height: "16px" }} />
            {title}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandItem;
