import create from 'zustand'
import { devtools } from 'zustand/middleware'
import axios from "../plugins/axios";
import jwt_decode from 'jwt-decode'
import { Link, useNavigate } from "react-router-dom";
import { persist } from "zustand/middleware"


const useStore = create(persist(
    (set, get) => ({
        member: null,
        isLogin: false,
        accessToken: '',
        refreshToken: '',
        setMemberInfo: (member) => {
            set({ member: member, isLogin: true });
            // console.log("setMemberInfo", member);
            console.log("after login => member:", get().member, get().member.nickname);
        },
        getMemberInfo: () => {
            return useStore.getState().member;
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