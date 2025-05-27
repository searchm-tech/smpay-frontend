// TODO : 폴더 트리 구조 참고용
"use client";

import { Fragment, useState } from "react";

import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  useDraggable,
  useDroppable,
  MeasuringStrategy,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
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
import { cn } from "@/lib/utils";
import LoadingUI from "@/components/common/Loading";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserData {
  email: string;
  position: string;
}

interface TreeNode {
  id: string;
  name: string;
  type: "folder" | "user";
  userData?: UserData;
  children?: TreeNode[];
}

const findNode = (
  nodes: TreeNode[],
  id: string
): [TreeNode | null, TreeNode[] | null, TreeNode | null] => {
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

const removeNode = (nodes: TreeNode[], id: string): boolean => {
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

const initialTreeData: TreeNode[] = [
  {
    id: "dev-hq",
    name: "개발본부",
    type: "folder",
    children: [
      {
        id: "web-dev",
        name: "웹개발팀",
        type: "folder",
        children: [
          {
            id: "user-1",
            name: "김철수",
            type: "user",
            userData: {
              email: "kim@example.com",
              position: "팀장",
            },
          },
          {
            id: "user-2",
            name: "이영희",
            type: "user",
            userData: {
              email: "lee@example.com",
              position: "선임개발자",
            },
          },
        ],
      },
      {
        id: "game-dev",
        name: "게임개발팀",
        type: "folder",
        children: [
          {
            id: "user-3",
            name: "박지성",
            type: "user",
            userData: {
              email: "park@example.com",
              position: "팀장",
            },
          },
          {
            id: "user-4",
            name: "손흥민",
            type: "user",
            userData: {
              email: "son@example.com",
              position: "게임 디자이너",
            },
          },
          {
            id: "user-5",
            name: "황희찬",
            type: "user",
            userData: {
              email: "hwang@example.com",
              position: "게임 개발자",
            },
          },
        ],
      },
    ],
  },
];

interface TreeNodeProps {
  node: TreeNode;
  level: number;
  onAddFolder: (parentId: string) => void;
  onUpdateName: (nodeId: string, newName: string) => void;
  onDeleteFolder: (nodeId: string) => void;
}

const DroppableFolder: React.FC<{
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

// 폴더 내에 user가 있는지 확인하는 함수
const hasUserInChildren = (node: TreeNode): boolean => {
  if (node.type === "user") return true;
  if (!node.children) return false;

  return node.children.some((child) => hasUserInChildren(child));
};

// 폴더 내의 전체 user 수를 계산하는 함수
const countUsersInNode = (node: TreeNode): number => {
  if (node.type === "user") return 1;
  if (!node.children) return 0;

  return node.children.reduce((sum, child) => sum + countUsersInNode(child), 0);
};

const TreeNodeComponent: React.FC<TreeNodeProps> = ({
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

  const handleNameSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onUpdateName(node.id, editName);
      setIsEditing(false);
    } else if (e.key === "Escape") {
      setEditName(node.name);
      setIsEditing(false);
    }
  };

  const handleDelete = (node: TreeNode) => {
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
              onClick={(e) => {
                e.stopPropagation();
                onUpdateName(node.id, editName);
                setIsEditing(false);
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

const OrganizationSection: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>(initialTreeData);
  // const [activeId, setActiveId] = useState<string | null>(null);

  const [loadingAddFolder, setLoadingAddFolder] = useState(false);
  const [loadingUpdateName, setLoadingUpdateName] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorNewFolder, setErrorNewFolder] = useState(false);

  const [newFolderName, setNewFolderName] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 0,
      },
    })
  );

  const handleDragStart = (event: any) => {
    const { active } = event;
    // setActiveId(active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    // setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    const draggedId = active.id as string;
    const overId = over.id as string;

    if (draggedId === overId) return;

    setTreeData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      const [draggedNode, draggedParent] = findNode(newData, draggedId);
      const [overNode] = findNode(newData, overId);

      if (!draggedNode || !overNode || !draggedParent) return prevData;

      // 드래그된 노드가 사용자일 때
      if (draggedNode.type === "user" && overNode.type === "folder") {
        removeNode(newData, draggedId);
        if (!overNode.children) {
          overNode.children = [];
        }
        overNode.children.unshift(draggedNode);
        return newData;
      }

      // 드래그된 노드가 폴더일 때
      if (draggedNode.type === "folder" && overNode.type === "folder") {
        // 자기 자신을 자신의 하위로 이동하는 것을 방지
        const hasCircularDependency = (
          parent: TreeNode,
          child: TreeNode
        ): boolean => {
          if (parent.id === child.id) return true;
          if (!parent.children) return false;
          return parent.children.some((node) =>
            hasCircularDependency(node, child)
          );
        };

        if (hasCircularDependency(draggedNode, overNode)) {
          return prevData;
        }

        removeNode(newData, draggedId);
        if (!overNode.children) {
          overNode.children = [];
        }
        overNode.children.unshift(draggedNode);
        return newData;
      }

      return prevData;
    });
  };

  const handleAddFolder = async (parentId: string) => {
    if (loadingAddFolder) return;
    setLoadingAddFolder(true);
    try {
      const { result } = await fetchAddFolder(parentId);
      if (!result) return;
      setTreeData((prevData) => {
        const newData = JSON.parse(JSON.stringify(prevData));
        const [parentNode] = findNode(newData, parentId);

        if (parentNode) {
          if (!parentNode.children) {
            parentNode.children = [];
          }

          const newFolder: TreeNode = {
            id: `folder-${Date.now()}`,
            name: "새 폴더",
            type: "folder",
            children: [],
          };

          parentNode.children.push(newFolder);
        }

        return newData;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAddFolder(false);
    }
  };

  const handleUpdateName = async (nodeId: string, newName: string) => {
    if (loadingUpdateName) return;
    setLoadingUpdateName(true);
    try {
      const { result } = await fetchUpdateName(nodeId, newName);
      if (!result) return;

      setTreeData((prevData) => {
        const newData = JSON.parse(JSON.stringify(prevData));
        const [node] = findNode(newData, nodeId);
        if (node) {
          node.name = newName;
        }
        return newData;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUpdateName(false);
    }
  };

  const handleDeleteFolder = async (nodeId: string) => {
    if (loadingDelete) return;
    setLoadingDelete(true);
    try {
      const { result } = await fetchDeleteFolder(nodeId);
      if (!result) return;

      setTreeData((prevData) => {
        const newData = JSON.parse(JSON.stringify(prevData));
        removeNode(newData, nodeId);
        return newData;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleAddTopFolder = () => {
    if (newFolderName === "") {
      setErrorNewFolder(true);
      return;
    }

    setTreeData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      newData.push({
        id: `folder-${Date.now()}`,
        name: newFolderName,
        type: "folder",
        children: [],
      });
      return newData;
    });

    setNewFolderName("");
  };

  return (
    <Fragment>
      {(loadingAddFolder || loadingUpdateName || loadingDelete) && (
        <LoadingUI />
      )}
      {errorNewFolder && (
        <ConfirmDialog
          open
          content={<div>부서 이름을 입력해주세요.</div>}
          onConfirm={() => setErrorNewFolder(false)}
        />
      )}
      <DndContext
        sensors={sensors}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
        modifiers={[restrictToWindowEdges]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col h-[calc(100vh-20rem)]">
          <div className="flex-1 w-full mx-auto p-4 border rounded-lg bg-white overflow-y-auto">
            {treeData.map((node) => (
              <TreeNodeComponent
                key={node.id}
                node={node}
                level={0}
                onAddFolder={handleAddFolder}
                onUpdateName={handleUpdateName}
                onDeleteFolder={handleDeleteFolder}
              />
            ))}
          </div>
        </div>
      </DndContext>

      <div className="w-full my-4 px-4 py-2 border rounded-lg bg-white flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          +<span className="text-[#148AFF]">최상위 부서</span>{" "}
          <span>부서 추가</span>
        </div>

        <Input
          placeholder="부서 이름"
          className="max-w-xs"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <Button onClick={handleAddTopFolder}>부서 추가</Button>
      </div>
    </Fragment>
  );
};

export default OrganizationSection;

const classNameObject =
  "h-4 w-4 text-blue-500 hover:text-blue-700 cursor-pointer";
const classNameLeft = "w-5 h-5 text-gray-400 cursor-pointer";

// api 자식 폴더 추가
const fetchAddFolder = async (parentId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    result: true,
  };
};

// api 이름 수정
const fetchUpdateName = async (nodeId: string, newName: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    result: true,
  };
};

// api 폴더 삭제
const fetchDeleteFolder = async (nodeId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    result: true,
  };
};
