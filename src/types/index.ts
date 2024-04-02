import React from "react";

export interface INewUser {
  name: string,
  email: string,
  username?: string,
  password: string
}
export interface IUserFromAccount {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  bio: string,
  imageUrl: string;
  username?: string;
}
export interface ISessionUser {
  email: string
  password: string
}

export interface IContextType {
  user: IUser
  isLoading: boolean
  setUser: React.Dispatch<React.SetStateAction<IUser>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  checkAuthUser: () => Promise<boolean>
}