import { FC, useState } from "react";
import { Button, Input, Typography } from "antd";

import { CloseOutlined, EditOutlined } from "@ant-design/icons";

import RemoveTargetBtn from "features/remove-target-btn";

import DateDistanceToNow from "features/date-distance-to-now";

import ItemTimer from "features/item-timer";

import styles from "./index.module.scss";

import { TodoCardItemProps } from "./config";

const { Text } = Typography;

const TodoCardItem: FC<TodoCardItemProps> = ({ item, toggleCompleted, removeItem, updateItem }) => {
  const [isEditig, setIsEditing] = useState<boolean>(false);
  const [editableStr, setEditableStr] = useState<string>(item.title);
  const [status, setStatus] = useState<"" | "warning">("");

  const editConfirm = () => {
    if (editableStr.length >= 3 && editableStr.length <= 35) {
      setStatus("");
      updateItem(item.id, editableStr, "title");
      setIsEditing(false);
    } else {
      setStatus("warning");
    }
  };

  const onPressEscaoe = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditableStr(item.title);
    }
  };

  return (
    <>
      {isEditig ? (
        <Input
          autoFocus
          status={status}
          value={editableStr}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditableStr(e.target.value)}
          onKeyDown={onPressEscaoe}
          onPressEnter={editConfirm}
        />
      ) : (
        <div className={styles.item__main}>
          <Text onClick={toggleCompleted} delete={!item.completed} style={{ cursor: "pointer" }}>
            {editableStr}
          </Text>
          <Button type="ghost" onClick={() => setIsEditing(true)} className={styles.editBtn}>
            <EditOutlined />
          </Button>
        </div>
      )}
      <div className={styles.item__info}>
        {!isEditig && <DateDistanceToNow dateValue={item.creationDate} />}
        {!isEditig && (
          <ItemTimer value={item.timerVal} itemId={item.id} updateItem={updateItem} completed={item.completed} />
        )}
        <RemoveTargetBtn confirm={removeItem} itemLabel={item.title}>
          <CloseOutlined className={styles.btn} />
        </RemoveTargetBtn>
      </div>
    </>
  );
};

export default TodoCardItem;
