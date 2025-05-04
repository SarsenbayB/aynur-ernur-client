import React from "react";
import { Button } from "react-bootstrap";
import { FaLock, FaLockOpen, FaTrash } from "react-icons/fa";

interface ToolbarProps {
  selectedFiles: string[];
  onBlock: () => void;
  onUnblock: () => void;
  onDelete: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ selectedFiles, onBlock, onUnblock, onDelete }) => {
  return (
    <div className="d-flex justify-content-start gap-2 m-2">
      <Button
        variant="warning"
        onClick={onBlock}
        disabled={selectedFiles.length === 0}
        size="sm"
      >
        <FaLock className="me-1" /> Block
      </Button>
      <Button
        variant="warning"
        onClick={onUnblock}
        disabled={selectedFiles.length === 0}
        size="sm"
      >
        <FaLockOpen className="me-1" /> Unblock
      </Button>
      <Button
        variant="danger"
        onClick={onDelete}
        disabled={selectedFiles.length === 0}
        size="sm"
      >
        <FaTrash className="me-1" /> Delete
      </Button>
    </div>
  );
};

export default Toolbar;
