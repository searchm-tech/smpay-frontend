import { cn } from "@/lib/utils";
import type { TDepartmentFolder, TParamsDepartments } from "@/types/department";
import type { OrganizationTreeNode } from "@/types/tree";
import { useDraggable, useDroppable } from "@dnd-kit/core";

import { useState } from "react";

import { ConfirmDialog } from "@/components/composite/modal-components";

import {
  CircleCheckBig,
  FilePenLine,
  Folder,
  FolderOpen,
  FolderPlus,
  Move,
  Trash2,
  User,
  X,
} from "lucide-react";
import { TreeNodeProps } from "./OrganizationSection";

// BE 부서 조회 데이터 -> 트리 노드
export const convertToTreeNode = (
  node: TDepartmentFolder
): OrganizationTreeNode => {
  const treeNode: OrganizationTreeNode = {
    id: `dept-${node.departmentId}`,
    name: node.name,
    type: "folder",
    originId: node.departmentId,
    children: [
      ...node.users.map((user) => ({
        id: `user-${user.userId}`,
        name: user.name,
        type: "user" as const,
        originId: user.userId,
        userData: user,
      })),
      ...node.children.map((child) => convertToTreeNode(child)),
    ],
  };
  return treeNode;
};

// 트리 노드 -> BE 부서 저장 데이터
export function convertTreeToParams(
  nodes: OrganizationTreeNode[]
): TParamsDepartments[] {
  return nodes
    .filter((node) => node.type === "folder")
    .map((node, idx) => ({
      departmentId: node.originId ?? 0,
      departmentName: node.name,
      displayOrder: idx + 1,
      userIds: (node.children ?? [])
        .filter((child) => child.type === "user" && child.userData)
        .map((child) => child.userData!.userId),
      children: convertTreeToParams(node.children ?? []),
    }));
}

export const getNodeDepth = (
  nodes: OrganizationTreeNode[],
  targetId: string
): number => {
  const findDepth = (
    nodeList: OrganizationTreeNode[],
    currentDepth: number
  ): number => {
    for (const node of nodeList) {
      if (node.id === targetId) {
        return currentDepth;
      }
      if (node.children) {
        const depth = findDepth(node.children, currentDepth + 1);
        if (depth !== -1) return depth;
      }
    }
    return -1;
  };
  return findDepth(nodes, 1); // 최상위 레벨을 1로 시작
};

// 폴더 내에 user가 있는지 확인하는 함수
export const hasUserInChildren = (node: OrganizationTreeNode): boolean => {
  if (node.type === "user") return true;
  if (!node.children) return false;

  return node.children.some((child) => hasUserInChildren(child));
};

// 폴더 내의 전체 user 수를 계산하는 함수
export const countUsersInNode = (node: OrganizationTreeNode): number => {
  if (node.type === "user") return 1;
  if (!node.children) return 0;

  return node.children.reduce((sum, child) => sum + countUsersInNode(child), 0);
};

// 트리 노드 찾기
export const findNode = (
  nodes: OrganizationTreeNode[],
  id: string
): [
  OrganizationTreeNode | null,
  OrganizationTreeNode[] | null,
  OrganizationTreeNode | null
] => {
  for (const node of nodes) {
    if (node.id === id) {
      return [node, nodes, null];
    }
    if (node.children) {
      const [found, parent, grandParent] = findNode(node.children, id);
      if (found) {
        return [found, parent, node];
      }
    }
  }
  return [null, null, null];
};

export const removeNode = (
  nodes: OrganizationTreeNode[],
  id: string
): boolean => {
  const index = nodes.findIndex((node) => node.id === id);
  if (index !== -1) {
    nodes.splice(index, 1);
    return true;
  }
  for (const node of nodes) {
    if (node.children) {
      if (removeNode(node.children, id)) {
        return true;
      }
    }
  }
  return false;
};

export const DroppableFolder: React.FC<{
  id: string;
  children: React.ReactNode;
  isOpen: boolean;
}> = ({ id, children, isOpen }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "transition-colors duration-200",
        isOver && "bg-blue-50",
        isOpen && "pb-2 rounded-md"
      )}
    >
      {children}
    </div>
  );
};

// 트리 노드 컴포넌트
export const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  node,
  level,
  onAddFolder,
  onUpdateName,
  onDeleteFolder,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(node.name);
  const [showDeleteError, setShowDeleteError] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: node.id,
      data: {
        type: node.type,
      },
    });

  const handleToggle = () => {
    if (node.type === "folder") {
      setIsOpen(!isOpen);
    }
  };

  const handleNameSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const success = await onUpdateName(node.id, editName);
      if (success) {
        setIsEditing(false);
      }
    } else if (e.key === "Escape") {
      setEditName(node.name);
      setIsEditing(false);
    }
  };

  const handleDelete = (node: OrganizationTreeNode) => {
    if (node.type === "folder") {
      if (hasUserInChildren(node)) {
        setShowDeleteError(true);
      } else {
        onDeleteFolder(node.id);
      }
    }
  };

  // 이동하는 트리
  const style: React.CSSProperties | undefined = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        backgroundColor: "white",
        position: "relative" as const,
        zIndex: 999,
      }
    : undefined;

  const content = (
    <div
      ref={setNodeRef}
      className={`flex items-center gap-2 py-2 px-2 rounded-md ${
        node.type === "folder" ? "hover:bg-gray-50" : "cursor-default"
      } ${isDragging ? "opacity-50" : ""}`}
      style={{
        paddingLeft: `${level * 24}px`,
        ...(isDragging ? { border: "2px solid #4A90E2" } : {}),
        ...style,
      }}
    >
      {node.type === "folder" ? (
        isOpen ? (
          <FolderOpen className={classNameLeft} onClick={handleToggle} />
        ) : (
          <Folder className={classNameLeft} onClick={handleToggle} />
        )
      ) : (
        <User className={classNameLeft} />
      )}
      <div
        {...attributes}
        {...listeners}
        className="flex-1 flex items-center gap-2 cursor-move"
      >
        {isEditing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={handleNameSubmit}
            className="flex-1 bg-white border rounded px-2 py-1 text-sm"
            autoFocus
          />
        ) : (
          <>
            <span>{node.name}</span>
            {node.type === "folder" && (
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <User className="w-3 h-3" />
                {countUsersInNode(node)}명
              </div>
            )}
          </>
        )}
      </div>

      {node.type === "user" && (
        <div {...listeners} className="touch-none cursor-move">
          <Move className={classNameObject} />
        </div>
      )}

      {node.type === "folder" &&
        (!isEditing ? (
          <div className="flex items-center gap-2">
            <FolderPlus
              className={classNameObject}
              onClick={(e) => {
                e.stopPropagation();
                onAddFolder(node.id);
              }}
            />
            <div {...listeners} className="touch-none cursor-move">
              <Move className={classNameObject} />
            </div>
            <FilePenLine
              className={classNameObject}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            />
            <Trash2
              className={classNameObject}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(node);
              }}
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CircleCheckBig
              className={cn(classNameObject, "text-green-500")}
              onClick={async (e) => {
                e.stopPropagation();
                const success = await onUpdateName(node.id, editName);
                if (success) {
                  setIsEditing(false);
                }
              }}
            />
            <X
              className={cn(classNameObject, "text-red-500")}
              onClick={(e) => {
                e.stopPropagation();
                setEditName(node.name);
                setIsEditing(false);
              }}
            />
          </div>
        ))}
    </div>
  );

  return (
    <div className="w-full">
      {showDeleteError && (
        <ConfirmDialog
          open
          content={
            <div className="text-center">
              <p>하위 그릅원이 있으면 그룹을 삭제할 수 없습니다.</p>
              <p>그룹원을 이동한 후 다시 시도해주세요.</p>
            </div>
          }
          onConfirm={() => setShowDeleteError(false)}
        />
      )}
      {node.type === "folder" ? (
        <DroppableFolder id={node.id} isOpen={isOpen}>
          {content}
          {isOpen && node.children && (
            <div className="w-full">
              {node.children.map((child) => (
                <TreeNodeComponent
                  key={child.id}
                  node={child}
                  level={level + 1}
                  onAddFolder={onAddFolder}
                  onUpdateName={onUpdateName}
                  onDeleteFolder={onDeleteFolder}
                />
              ))}
            </div>
          )}
        </DroppableFolder>
      ) : (
        <div>{content}</div>
      )}
    </div>
  );
};

const classNameObject =
  "h-4 w-4 text-blue-500 hover:text-blue-700 cursor-pointer";
const classNameLeft = "w-5 h-5 text-gray-400 cursor-pointer";
