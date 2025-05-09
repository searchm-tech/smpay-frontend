"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

import type { DepartmentTreeNode } from "@/types/tree";

interface TreeNodeProps {
  node: DepartmentTreeNode;
  level: number;
  selectedId?: string;
  onSelect?: (node: DepartmentTreeNode) => void;
}

// 부서 선택 트리 뷰
const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  node,
  level,
  selectedId,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    if (onSelect) onSelect(node);
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex items-center gap-2 py-2 px-2 rounded-md hover:bg-gray-50 cursor-pointer",
          selectedId === node.id && "bg-blue-50"
        )}
        style={{
          paddingLeft: `${level * 24}px`,
        }}
        onClick={handleClick}
      >
        {node.children && node.children.length > 0 ? (
          <div
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </div>
        ) : (
          <div className="w-4" /> // 간격 맞추기용 빈 div
        )}
        <Folder className="w-5 h-5 text-gray-400" />
        <span className="flex-1">{node.name}</span>
      </div>

      {isOpen && node.children && (
        <div className="w-full">
          {node.children.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface DepartmentTreeProps {
  data: DepartmentTreeNode[];
  selectedId?: string;
  onSelect?: (node: DepartmentTreeNode) => void;
}

const DepartmentTree: React.FC<DepartmentTreeProps> = ({
  data,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="w-full">
      {data.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          level={0}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default DepartmentTree;
