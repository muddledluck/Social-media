import userRoute from "../module/user/user.routes";
import authRoute from "../module/auth/auth.routes";

const router = [
  {
    prefix: "/auth",
    router: authRoute,
  },
  {
    prefix: "/user",
    router: userRoute,
  },
];

export default router;
