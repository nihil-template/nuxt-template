import type { ListDataType, ResponseType, UserInfo } from '~/types/common.types';

export const useUserStore = defineStore('userStore', () => {
  // 사용자 목록
  const userInfoList = ref([]);

  // 사용자 총계
  const userInfoListCount = ref(0);

  // 단일 사용자 정보
  const userInfo = ref();

  const getUserList = async (
    callback?: (data: ResponseType<ListDataType<UserInfo>>) => void,
    errorCallback?: (error: ResponseType<ListDataType<UserInfo>>) => void
  ) => {
    await useGet<ListDataType<UserInfo>>(
      '/users',
      undefined,
      (data) => {
        console.log('✅ 사용자 목록 조회 성공:', data);
      },
      (error) => {
        console.error('❌ 사용자 목록 조회 실패:', error);
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
