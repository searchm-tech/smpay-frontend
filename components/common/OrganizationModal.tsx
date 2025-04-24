import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UsersIcon } from "@heroicons/react/24/outline";
import OrganizationTree from "./OrganizationTree";

interface OrganizationModalProps {
  trigger?: React.ReactNode;
}

const OrganizationModal: React.FC<OrganizationModalProps> = ({
  trigger = (
    <Button variant="outline" className="w-full justify-start">
      <UsersIcon className="mr-2 h-4 w-4" />
      조직도
    </Button>
  ),
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>조직도</DialogTitle>
        </DialogHeader>
        <div className="max-h-[600px] overflow-y-auto">
          <OrganizationTree />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationModal;
