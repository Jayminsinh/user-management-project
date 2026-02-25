import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    theme: "light",
    admin: [],
    users: [],
    currentUser: null,
    isAuth: false,
    loading: false,
    error: null
};


export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const responce = await fetch(`${import.meta.env.VITE_API_URL}/users`);
            if (!responce.ok) throw new Error("Failed to fetch users");
            // console.log("responce :", responce)
            return await responce.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addUser = createAsyncThunk(
    "users/addUser",
    async (user, { rejectWithValue }) => {
        try {
            const responce = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            if (!responce.ok) throw new Error("Failed to add users");
            return await responce.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const responce = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
                method: "DELETE",
            });

            if (!responce.ok) throw new Error("Failed to delete users");
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (user, { rejectWithValue }) => {
        try {
            const responce = await fetch(`${import.meta.env.VITE_API_URL}/users/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            if (!responce.ok) throw new Error("Failed to update users");
            return await responce.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === "light" ? "dark" : "light"
        },
        addAdmin(state, action) {
            state.admin.push(action.payload)
        },
        updateAdmin(state, action) {
            const { email, updatedData } = action.payload
            state.admin = state.admin.map(
                (a) => {
                    if (a.email === email) {
                        return {
                            ...a, ...updatedData
                        }
                    } else {
                        return a;
                    }
                }
            )
        },
        // addUser(state, action) {
        //     state.users.push(action.payload);
        // },
        // removeUser(state, action) {
        //     state.users = state.users.filter(
        //         (user) => user.email !== action.payload
        //     );
        // },
        // updateUser(state, action) {
        //     const { email, updatedData } = action.payload
        //     state.users = state.users.map(
        //         (user) => {
        //             if (user.email === email) {
        //                 return {
        //                     ...user, ...updatedData
        //                 }
        //             } else {
        //                 return user;
        //             }
        //         }
        //     )
        // },
        loginUser(state, action) {
            state.currentUser = action.payload
            state.isAuth = true;
        },
        logoutUser(state, action) {
            state.currentUser = null
            state.isAuth = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                // console.log("payload : ", action.payload)
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })

            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(
                    (user) => user.id !== action.payload
                );
            })

            .addCase(updateUser.fulfilled, (state, action) => {
                state.users = state.users.map(
                    (user) => user.id === action.payload.id
                        ? action.payload
                        : user
                );
            });
    }
});

export const { loginUser, logoutUser, addAdmin, updateAdmin, toggleTheme } = userSlice.actions;
export default userSlice.reducer;