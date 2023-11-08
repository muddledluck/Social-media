import { useLocalStorage } from "@/hooks/storage/useLocalStorage";
import { UserOptions, useUser } from "@monorepo/ui-core/src/hooks/user/useUser";
import { refreshAccessToken } from "../../helpers/auth/token";
import { useRouter } from "next/router";
import { SWRConfiguration } from "swr";
export const useUserWeb = (
  options?: Partial<UserOptions>,
  config?: SWRConfiguration
) => {
  const router = useRouter();
  return useUser(
    {
      useStorage: useLocalStorage,
      refreshAccessToken,
      onLogout: () => router.push("/login"),
      ...options,
    },
    config
  );
};
