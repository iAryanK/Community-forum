"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { approvePost } from "@/lib/admin.action";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const ApprovalButton = ({ postId }: { postId: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleApproval = async () => {
    setIsLoading(true);
    const res = await approvePost(postId);
    setIsLoading(false);
    if (!res) {
      toast({
        title: "Error !",
        description: "Failed to approve post",
      });
    } else {
      router.refresh();
    }
  };

  return (
    <Button onClick={handleApproval}>
      {isLoading && <Loader className="animate-spin" size={18} />} Approve post
    </Button>
  );
};

export default ApprovalButton;
