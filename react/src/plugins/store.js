import create from 'zustand'
import axios from "../plugins/axios";
import jwt_decode from 'jwt-decode'
import { Link, useNavigate } from "react-router-dom";
import { persist } from "zustand/middleware"

//로컬스토리지 저장. 리프레쉬토큰 , 액세스 토큰
const useStore = create(persist(
    (set, get) => ({
        member: null,
        isLogin: false,
        accessToken: '',
        refreshToken: '',
        setMemberInfo: (member) => {
            set({ member: member, isLogin: true });
            console.log("after login => member:", get().member, get().member.nickname);
        },
        getMemberInfo: () => {
            if (get().member !== null) {
                return get().member;
            }
        },
        getMemberRole: () => {
            if (get().member !== null) {
                return get().member.authorities[0].authority;// "ROLE_USER"
            }
        },
        logout: () => {
            localStorage.clear();
            set({
                member: null,
                isLogin: false,
                accessToken: '',
                refreshToken: '',
            });
            console.log("after logout => member:", get().member);
        },
    }),
    {
        name: "food-storage", // unique name
        getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    }
))


export default useStore;