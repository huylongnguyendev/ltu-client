import { toast } from "sonner";
import baseApiClient from "./base.service";

export const enrollService = {
  create: async (payload: any) => {
    try {
      const res = await baseApiClient.post("/enroll", payload);
      return res.data;
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  },

  startTest: async (payload: { id: string }) => {
    try {
      const res = await baseApiClient.patch(`/enroll/start/${payload.id}`);
      return res.data;
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  },

  getTestRoom: async (payload: {id: string}) => {
    try {
      const res = await baseApiClient.get(`/enroll/${payload.id}`);
      return res.data;
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
};
