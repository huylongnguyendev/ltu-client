import type { EnrollRes } from "#/@types/enroll.type";
import TestRoom from "#/components/test-room/TestRoom";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import formatTime from "#/lib/formatTime";
import { enrollService } from "#/services/enroll.service";
import { store } from "#/store/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { TimerIcon, XIcon } from "lucide-react";
import { useAppStore } from "magos/react";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/test-room/$testRoomId")({
  staticData: { hideLayout: true },
  component: RouteComponent,
});

function RouteComponent() {
  const { testRoomId } = Route.useParams();
  const [enrollState, actions] = useAppStore(store.enroll);
  const { enroll } = enrollState;

  const {
    data: getEnroll,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["enroll", "item", testRoomId],
    queryFn: () => enrollService.getTestRoom({ id: testRoomId }),
    staleTime: 0,
  });

  const { isPending, mutate: enrollStart } = useMutation({
    mutationFn: async (payload: { id: string }) =>
      enrollService.startTest(payload),
    onSuccess: (data: EnrollRes) => {
      if (data) {
        actions.setNewEnroll(data);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (getEnroll) {
      actions.setNewEnroll(getEnroll);
    }
  }, [getEnroll, actions]);

  const handleStartTest = () => {
    enrollStart({ id: testRoomId });
  };

  if (isLoading)
    return (
      <main className="relative h-dvh flex flex-col justify-center items-center z-10">
        <div className="absolute size-full bg-black/10 backdrop-blur-2xl -z-10" />
        <div className="w-full h-41.5 max-w-lg p-4 rounded-md bg-background border shadow-md dark:shadow-accent flex justify-center items-center gap-2">
          <Spinner />
          <p className="font-semibold">Loading data</p>
        </div>
      </main>
    );

  if (isError) {
    return (
      <main className="h-dvh flex items-center justify-center p-4">
        <div className="text-center bg-background p-8 border rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-destructive">
            Oop! Không tìm thấy bài thi
          </h2>
          <p className="mt-2 text-muted-foreground">
            Mã phòng thi không tồn tại hoặc đã hết hạn.
          </p>
          <Button className="mt-6" onClick={() => window.history.back()}>
            Quay lại
          </Button>
        </div>
      </main>
    );
  }

  if (enroll?.startAt && enroll.expectedEnd && enroll?.exam) {
    return <TestRoom exam={enroll.exam} />;
  }

  return (
    <>
      <main className="relative h-dvh flex flex-col justify-center items-center z-10">
        <div className="absolute size-full bg-black/10 backdrop-blur-2xl -z-10" />
        <div className="w-full max-w-lg p-4 rounded-md bg-background border shadow-md dark:shadow-accent text-center">
          <h1 className="text-lg font-semibold">{enroll.exam?.name}</h1>
          <div className="mt-4 mb-8">
            <div className="flex justify-center items-baseline-last gap-1">
              <p className="font-medium">Total Question:</p>
              <p className="text-accent-foreground font-semibold">
                {enroll.exam?.totalQuestion}
              </p>
            </div>
            <div className="flex justify-center items-baseline-last gap-1">
              <p className="font-medium">Time:</p>
              <p className="text-accent-foreground font-semibold">
                {formatTime(enroll.exam?.timeLimit || 0)}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={() => window.history.back()}
            >
              <XIcon />
              Cancel
            </Button>
            <Button disabled={isPending} onClick={handleStartTest}>
              <TimerIcon />
              Start
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
