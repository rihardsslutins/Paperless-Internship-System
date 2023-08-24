import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: '',
        name: '',
        surname: '',
        school: '',
        field: '',
        company: '',
        gender: '',
        phone: '',
        email: '',
        password: '',
        internships: '',
        teachers: '',
        students: '',
        interns: '',
        role: '',
    },
    reducers: {
        setUser: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.school = action.payload.school;
            state.field = action.payload.field;
            state.company = action.payload.company;
            state.gender = action.payload.gender;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.internships = action.payload.internships;
            state.teachers = action.payload.teachers;
            state.students = action.payload.students;
            state.interns = action.payload.interns;
            state.role = action.payload.role;
        },
        clearUser: (state) => {
            state._id = '';
            state.name = '';
            state.surname = '';
            state.school = '';
            state.field = '';
            state.company = '';
            state.gender = '';
            state.phone = '';
            state.email = '';
            state.password = '';
            state.internships = '';
            state.teachers = '';
            state.students = '';
            state.interns = '';
            state.role = '';
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
