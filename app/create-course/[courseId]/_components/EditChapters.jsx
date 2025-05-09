
import React from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "../../../../@/components/ui/dialog";
  
import { FaEdit } from "react-icons/fa";
function EditChapters({ courseId }) {
  

  return (
   
    <Dialog>
  <DialogTrigger> <FaEdit /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

       
  );
}


export default EditChapters;