import { UseStorageProps } from "../../helpers/storage";
import { AccessTokensResponseDto } from "@monorepo/api-client/src/models/AccessTokensResponseDto";
import { useAppSelector } from "../../redux/hooks";
import { globalCacheStateSelector } from "../../redux/slices/globaCache.slice";
import useSWR, { SWRConfiguration, useSWRConfig } from "swr";
export interface UserOptions extends UseStorageProps {
  // Required
  onLogout: () => void;
  refreshAccessToken: (
    timeRemaining?: number,
    forceRefresh?: boolean,
    tokens?: { access?: string | null; refresh?: string | null }
  ) => Promise<AccessTokensResponseDto | undefined>;

  // Optional
  access?: string | null;
  refresh?: string | null;
  setAccess?: (token: string | undefined) => void;
  forceStorage?: boolean;
  userExtensionOverride?: string;
}

export const useUser = (options: UserOptions, config?: SWRConfiguration) => {
  const {
    useStorage,
    onLogout,
    refreshAccessToken,
    access,
    refresh,
    forceStorage,
    setAccess,
  } = options ?? {};
  const { cache } = useSWRConfig();
  const { userExtension } = useAppSelector(globalCacheStateSelector);
};
