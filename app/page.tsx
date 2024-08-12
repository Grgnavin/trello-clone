'use client';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  const ClickHandler = () => {
    toast({
      title: "",
      description: "Redirecting to Dashboard"
    })
      router.push('/dashboard');
  }

  return (
    <Button onClick={ClickHandler}>Go to DashBoard</Button>
  );
}
