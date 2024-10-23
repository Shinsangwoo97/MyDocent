'use client'

import {create} from 'zustand';

// 상태와 타입 정의
interface StoreState {
  uuidList: string[];
  addUuid: (uuid: string) => void;
  removeUuid: (uuid: string) => void;
  checkUuid: (uuid: string) => string; // UUID 확인 함수 추가
}

const useStore = create<StoreState>((set, get) => ({
  uuidList: [],

  // UUID 추가
  addUuid: (uuid: string) => set((state) => ({
    uuidList: [...state.uuidList, uuid]
  })),

  // UUID 삭제
  removeUuid: (uuid: string) => set((state) => ({
    uuidList: state.uuidList.filter((item) => item !== uuid)
  })),

  // UUID 확인
  checkUuid: (uuid: string) => {
    const uuidList = get().uuidList; // 현재 상태에서 uuidList 가져오기
    return uuidList.includes(uuid) ? "확인 완료" : "불가"; // UUID가 리스트에 있으면 "확인 완료", 없으면 "불가"
  }
}));

export default useStore;
