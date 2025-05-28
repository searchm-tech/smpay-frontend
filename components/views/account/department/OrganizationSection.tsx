"use client";

import { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  MeasuringStrategy,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import { cn } from "@/lib/utils";
import LoadingUI from "@/components/common/Loading";
import { ConfirmDialog } from "@/components/composite/modal-components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  useMutationDepartments,
  useQueryDepartments,
} from "@/hooks/queries/departments";

import {
  convertTreeToParams,
  convertToTreeNode,
  getNodeDepth,
  findNode,
  removeNode,
  TreeNodeComponent,
} from "./constants";

import type { OrganizationTreeNode } from "@/types/tree";
import type { TDepartmentsPutParams } from "@/services/departments";

export interface TreeNodeProps {
  node: OrganizationTreeNode;
  level: number;
  onAddFolder: (parentId: string) => void;
  onUpdateName: (nodeId: string, newName: string) => Promise<boolean>;
  onDeleteFolder: (nodeId: string) => void;
}

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
  const enabled = !!session?.user.agentId;

  const { refetch, isFetching: loadingDepartmentsQuery } = useQueryDepartments(
    session?.user.agentId || 0,
    { enabled }
  );

  const { mutate: mutateDepartments, isPending: loadingDepartmentsMutation } =
    useMutationDepartments({
      onSuccess: () => setSuccessSave(true),
      onError: (error) => {
        console.error("Error saving tree data:", error);
      },
    });

  const [treeData, setTreeData] = useState<OrganizationTreeNode[]>([]);

  const [errorNewFolder, setErrorNewFolder] = useState(false);
  const [errorDuplicateFolder, setErrorDuplicateFolder] = useState(false);
  const [errorMaxDepth, setErrorMaxDepth] = useState(false);
  const [errorNoData, setErrorNoData] = useState(false);

  const [successSave, setSuccessSave] = useState(false);

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
    const params: TDepartmentsPutParams = {
      agentId: session?.user.agentId.toString(),
      departments: convertTreeToParams(treeData),
    };
    mutateDepartments(params);
  };

  const handleInitAddTopFolder = () => {
    if (!session?.user.agentId) return;
    const params: TDepartmentsPutParams = {
      agentId: session.user.agentId.toString(),
      departments: [
        {
          departmentName: "최상위 부서",
          displayOrder: 1,
          userIds: [session.user.userId],
          children: [
            {
              departmentName: "새폴 더",
              displayOrder: 1,
              userIds: [],
              children: [],
            },
          ],
        },
      ],
    };
    mutateDepartments(params);
  };

  useEffect(() => {
    if (!enabled) return;

    refetch()
      .then((res) => {
        if (res.status === "success" && res.data && res.data.length > 0) {
          const data = res.data.map(convertToTreeNode);
          setTreeData(data);
        } else {
          setErrorNoData(true);
          console.log("errorNoData");
        }
      })
      .catch((error) => {
        setErrorNoData(true);
        console.log("Error fetching tree data:", error);
      });
  }, [enabled]);

  const loadingDepartments =
    loadingDepartmentsQuery || loadingDepartmentsMutation;

  return (
    <Fragment>
      {loadingDepartments && <LoadingUI />}
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

      {errorNoData && (
        <ConfirmDialog
          open
          cancelDisabled
          onConfirm={handleInitAddTopFolder}
          content={
            <div>
              현재 부서 정보가 없습니다. 최상위 부서를 먼저 생성하겠습니다.
            </div>
          }
        />
      )}
      {successSave && (
        <ConfirmDialog
          open
          content={<div>부서 정보가 저장되었습니다.</div>}
          onConfirm={() => {
            refetch();
            setSuccessSave(false);
            setErrorNoData(false);
          }}
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
