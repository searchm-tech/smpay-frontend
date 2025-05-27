"use client";

import { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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

import {
  getDepartmentsApi,
  putDepartmentsApi,
  TDepartmentsPutParams,
} from "@/services/departments";
import {
  convertTreeToParams,
  convertToTreeNode,
  getNodeDepth,
} from "./constants";

import type { OrganizationTreeNode } from "@/types/tree";

const findNode = (
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

const removeNode = (nodes: OrganizationTreeNode[], id: string): boolean => {
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

interface TreeNodeProps {
  node: OrganizationTreeNode;
  level: number;
  onAddFolder: (parentId: string) => void;
  onUpdateName: (nodeId: string, newName: string) => Promise<boolean>;
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
const hasUserInChildren = (node: OrganizationTreeNode): boolean => {
  if (node.type === "user") return true;
  if (!node.children) return false;

  return node.children.some((child) => hasUserInChildren(child));
};

// 폴더 내의 전체 user 수를 계산하는 함수
const countUsersInNode = (node: OrganizationTreeNode): number => {
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

// Helper function to collect all folder names from the tree
const getAllFolderNames = (nodes: OrganizationTreeNode[]): string[] => {
  const names: string[] = [];
  const traverse = (nodeList: OrganizationTreeNode[]) => {
    nodeList.forEach((node) => {
      if (node.type === "folder") {
        names.push(node.name);
        if (node.children) {
          traverse(node.children);
        }
      }
    });
  };
  traverse(nodes);
  return names;
};

const OrganizationSection: React.FC = () => {
  const { data: session } = useSession();

  const [treeData, setTreeData] = useState<OrganizationTreeNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [errorNewFolder, setErrorNewFolder] = useState(false);
  const [errorDuplicateFolder, setErrorDuplicateFolder] = useState(false);
  const [errorMaxDepth, setErrorMaxDepth] = useState(false);

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
  };

  const handleDragEnd = (event: DragEndEvent) => {
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
          parent: OrganizationTreeNode,
          child: OrganizationTreeNode
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
    setTreeData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      const [parentNode] = findNode(newData, parentId);

      if (parentNode) {
        // 현재 부모 노드의 depth 확인
        const parentDepth = getNodeDepth(newData, parentId);

        // 4 depth 제한 체크 (새 폴더는 부모 depth + 1이 됨)
        if (parentDepth >= 4) {
          setErrorMaxDepth(true);
          return prevData;
        }

        if (!parentNode.children) {
          parentNode.children = [];
        }

        // 전체 트리에서 모든 폴더 이름 수집
        const allFolderNames = getAllFolderNames(newData);

        // "새 폴더"로 시작하는 폴더들의 번호 추출
        const baseName = "새 폴더";
        const existingNumbers: number[] = [];

        allFolderNames.forEach((name) => {
          if (name === baseName) {
            existingNumbers.push(1); // "새 폴더"는 1번으로 취급
          } else if (name.startsWith(baseName + " (")) {
            const match = name.match(/새 폴더 \((\d+)\)$/);
            if (match) {
              existingNumbers.push(parseInt(match[1]));
            }
          }
        });

        // 가장 큰 번호 찾기
        const maxNumber =
          existingNumbers.length > 0 ? Math.max(...existingNumbers) : 0;

        // 새 폴더 이름 결정
        const newFolderName =
          maxNumber === 0 ? baseName : `${baseName} (${maxNumber + 1})`;

        const newFolder: OrganizationTreeNode = {
          id: `folder-${Date.now()}`,
          name: newFolderName,
          type: "folder",
          children: [],
        };

        parentNode.children.push(newFolder);
      }

      return newData;
    });
  };

  const handleUpdateName = async (
    nodeId: string,
    newName: string
  ): Promise<boolean> => {
    let isSuccess = false;
    setTreeData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      const [node] = findNode(newData, nodeId);
      if (node) {
        // 전체 트리에서 모든 폴더 이름 수집 (현재 노드 제외)
        const allFolderNames = getAllFolderNames(newData);
        const otherFolderNames = allFolderNames.filter((name, index, arr) => {
          // 현재 노드의 이름은 제외하고 중복 체크
          return name !== node.name || arr.indexOf(name) !== index;
        });

        const isDuplicate = otherFolderNames.includes(newName);

        if (isDuplicate) {
          setErrorDuplicateFolder(true);
          isSuccess = false;
          return prevData;
        }
        node.name = newName;
        isSuccess = true;
      }
      return newData;
    });
    return isSuccess;
  };

  const handleDeleteFolder = async (nodeId: string) => {
    setTreeData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      removeNode(newData, nodeId);
      return newData;
    });
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

  const handleSave = async () => {
    if (!session?.user.agentId) return;
    try {
      setIsLoading(true);

      const params: TDepartmentsPutParams = {
        agentId: session?.user.agentId.toString(),
        departments: convertTreeToParams(treeData),
      };
      console.log("params", params);

      // const test: TDepartmentsPutParams = {
      //   agentId: session?.user.agentId.toString(),
      //   departments: [
      //     {
      //       departmentName: "최상위 부서",
      //       displayOrder: 1,
      //       userIds: [],
      //       children: [
      //         {
      //           departmentName: "두번째 부서",
      //           displayOrder: 1,
      //           userIds: [],
      //           children: [],
      //         },
      //         {
      //           departmentName: "두번째 부서2",
      //           displayOrder: 2,
      //           userIds: [],
      //           children: [
      //             {
      //               departmentName: "세번째 부서",
      //               displayOrder: 1,
      //               userIds: [],
      //               children: [],
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // };
      // console.log("test", test);

      const res = await putDepartmentsApi(params);
      console.log("res", res);
    } catch (error) {
      console.error("Error saving tree data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async (agencyId: number) => {
    try {
      setIsLoading(true);
      const res = await getDepartmentsApi(agencyId);
      if (res.departments && res.departments.length > 0) {
        const data = res.departments.map(convertToTreeNode);
        setTreeData(data);
      } else {
        alert("현재 부서 정보가 없습니다. 최상위 부서를 먼저 생성하겠습니다.");
      }
    } catch (error) {
      console.error("Error fetching tree data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!session) return;
    if (!session.user.agentId) return;

    fetchData(session.user.agentId);
  }, [session]);

  return (
    <Fragment>
      {isLoading && <LoadingUI />}
      {errorNewFolder && (
        <ConfirmDialog
          open
          content={<div>부서 이름을 입력해주세요.</div>}
          onConfirm={() => setErrorNewFolder(false)}
        />
      )}
      {errorDuplicateFolder && (
        <ConfirmDialog
          open
          content={<div>동일한 이름의 폴더가 이미 존재합니다.</div>}
          onConfirm={() => setErrorDuplicateFolder(false)}
        />
      )}
      {errorMaxDepth && (
        <ConfirmDialog
          open
          content={<div>최대 4 depth까지만 폴더를 생성할 수 있습니다.</div>}
          onConfirm={() => setErrorMaxDepth(false)}
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
        <Button onClick={handleSave}>저장</Button>
      </div>
    </Fragment>
  );
};

export default OrganizationSection;

const classNameObject =
  "h-4 w-4 text-blue-500 hover:text-blue-700 cursor-pointer";
const classNameLeft = "w-5 h-5 text-gray-400 cursor-pointer";
