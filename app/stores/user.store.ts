import type { ListDataType, ResponseType, UserInfo } from '~/types/common.types';

export const useUserStore = defineStore('userStore', () => {
  // 사용자 목록
  const userInfoList = ref<UserInfo[]>([]);

  // 사용자 총계
  const userInfoListCount = ref(0);

  // 단일 사용자 정보
  const userInfo = ref();

  const getUserList = async (
    callback?: (data: UserInfo[], totalCnt: number) => void,
    errorCallback?: (error: ResponseType<ListDataType<UserInfo>>) => void
  ) => {
    await useGet<ListDataType<UserInfo>>(
      '/users',
      undefined,
      (res) => {
        userInfoList.value = res?.data.list ?? [];
        userInfoListCount.value = res?.data.totalCnt ?? 0;

        if (callback) {
          callback(res?.data.list ?? [], res?.data.totalCnt ?? 0);
        }
      },
      (error) => {
        if (errorCallback) {
          errorCallback(error);
        }
      }
    );
  };

  return {
    userInfoList,
    userInfoListCount,
    userInfo,

    getUserList,
  };
});
