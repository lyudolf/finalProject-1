import create from 'zustand'
import { devtools } from 'zustand/middleware'
import axios from "../plugins/axios";
import jwt_decode from 'jwt-decode'

const useStore = create(devtools(set => ({

    member: null,
    isLogin: false,
    accessToken: '',
    refreshToken: '',
    setMemberInfo: (member) => set({ member: member, isLogin: true }),
    login: async (loginId, password) => {

        const formData = new FormData();
        formData.append("loginId", loginId);
        formData.append("password", password);


        await axios.post("/api/login", formData)
            .then((response) => {
                console.log(response.data);
                const token = response.data;

                localStorage.setItem("accessToken", response.data);
                localStorage.setItem("username", useStore.getState().member.nickname); //임시

                const dt = jwt_decode(token);
                console.log(dt);
                console.log(dt.member);
                set({
                    member: dt.member,
                    isLogin: true,
                    accessToken: '',
                    refreshToken: '',
                })

            }).catch((error) => {
                console.log(error);
            });


    },
    logout: () => {
        localStorage.clear();
        set({
            member: null,
            isLogin: false,
            accessToken: '',
            refreshToken: '',
        })
    },

})));



//로그인
//

// const useStore2 = create(set => ({
//     fishies: {},
//     fetch: async pond => {
//         const response = await fetch(pond)
//         set({ fishies: await response.json() })
//     }
// }))
export default useStore;