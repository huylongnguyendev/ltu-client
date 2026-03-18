import type { ExamItem } from "#/@types/exam.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useAppStore } from "magos/react";
import { store } from "#/store/store";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { enrollService } from "#/services/enroll.service";
import type { EnrollRequest, EnrollRes } from "#/@types/enroll.type";

function ExamCardItem({ test }: { test: ExamItem }) {
  const date = new Date(test.createdAt).toLocaleDateString("vi", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const navigate = useNavigate();
  const [getUser] = useAppStore(store.user);
  const [, actions] = useAppStore(store.enroll);
  const { user } = getUser;

  const { mutate: enroll, isPending } = useMutation({
    mutationKey: ["enroll", "item"],
    mutationFn: async (payload: EnrollRequest) => enrollService.create(payload),
    onSuccess: (data: EnrollRes) => {
      if (data) {
        actions.setNewEnroll(data);
        navigate({
          to: "/test-room/$testRoomId",
          params: { testRoomId: data.enroll.id },
        });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSelectExam = (id: string) => {
    if (user.id) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen().catch((err) => {
          console.warn(`Không thể mở toàn màn hình: ${err.message}`);
        });
      }
      enroll({ examId: id, userId: user.id });
    } else {
      toast.error("Please login before do the test.");
      navigate({ to: "/demo/login" });
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <img
            src={test.img}
            alt={test.name}
            loading="lazy"
            className="w-full h-44 object-cover rounded-t-md"
          />
        </CardContent>
        <CardHeader className="py-0">
          <CardTitle className="py-0">{test.name}</CardTitle>
        </CardHeader>
        <CardFooter className="justify-between py-0">
          <CardDescription>{date}</CardDescription>
          <Button
            disabled={isPending}
            onClick={() => handleSelectExam(test.id)}
          >
            Enroll now
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default ExamCardItem;
