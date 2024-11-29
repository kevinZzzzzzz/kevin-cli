import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const BaseSlice = createSlice({
  name: 'Base',
  initialState: {
    organizaTree: [], // 组织结构数
    origanizaList: [], // 组织列表
    origanizaMap: [], // 组织映射列表
    departmentList: [], // 部门列表
    departmentMap: [], // 部门映射列表
    roleList: [], // 角色列表
    roleMap: [], // 角色映射列表
  },
  reducers: {
    changeOrganizaTree(state: any, {payload}) {
      state.organizaTree = payload.organizaTree
    },
    changeOriganiza(state: any, {payload}) {
      state.origanizaList = payload.origanizaList
      const map = {}
      payload.origanizaList.forEach((d: any) => {
        if (!map[d.value]) {
          map[d.value] = {
            ...d
          }
        }
      });
      state.origanizaMap = map
    },
    changeDepartment(state: any, {payload}) {
      state.departmentList = payload.departmentList
      const map = {}
      payload.departmentList.forEach((d: any) => {
        if (!map[d.value]) {
          map[d.value] = {
            ...d
          }
        }
      });
      state.departmentMap = map
    },
    changeRole(state: any, {payload}) {
      state.roleList = payload.roleList
      const map = {}
      payload.roleList.forEach((d: any) => {
        if (!map[d.value]) {
          map[d.value] = {
            ...d
          }
        }
      });
      state.roleMap = map
    },
  }
})

export const { changeOriganiza, changeDepartment, changeOrganizaTree, changeRole } = BaseSlice.actions
export default BaseSlice.reducer